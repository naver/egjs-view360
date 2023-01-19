/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import View360 from "../../View360";
import * as BROWSER from "../../const/browser";
import { FULLSCREEN_CHANGE } from "../../const/browser";
import TextureVideo from "../../texture/TextureVideo";
import { isFullscreen } from "../../utils";

/**
 * Options for ControlBar's {@link ControlBarOptions#autoHide}
 * @ko ControlBar의 {@link ControlBarOptions#autoHide}용 옵션
 * @category Plugin
 * @since 4.0.0
 */
export interface AutoHideOptions {
  /**
   * Initial delay before the control bar hides (ms)
   * @ko 컨트롤바가 처음으로 표시되고 사라지기까지 걸리는 시간 (ms)
   * @default 3000
   * @since 4.0.0
   */
  initialDelay: number;
  /**
   * Delay time before hiding the control bar after mouse leave (ms)
   * @ko 마우스가 컨트롤바 영역을 떠난 뒤 컨트롤바가 사라지기까지 걸리는 시간 (ms)
   * @default 0
   * @since 4.0.0
   */
  delay: number;
  /**
   * Delay time before hiding the control bar becomes active, like touch on mobile device or mouse move in fullscreen mode (ms)
   * @ko 모바일이나 풀스크린 환경 등에서 사용자 입력이 없을 때 컨트롤바가 사라지기까지 걸리는 시간 (ms)
   * @default 3000
   * @since 4.0.0
   */
  idleDelay: number;
}

class AutoHide {
  private _initialDelay: AutoHideOptions["initialDelay"];
  private _delay: AutoHideOptions["delay"];
  private _idleDelay: AutoHideOptions["idleDelay"];

  private _controlBar: ControlBar;
  private _timer: number;
  private _isGrabbing: boolean;
  private _isCursorInside: boolean;
  private _isFullscreen: boolean;
  private _targetEl: HTMLElement | null;
  private _video: TextureVideo | null;

  public get enabled() { return !!this._targetEl; }
  public get hidden() { return this._controlBar.containerEl.classList.contains(this._hiddenClass); }

  private get _hiddenClass() { return this._controlBar.className.HIDDEN; }
  private get _fixedClass() { return this._controlBar.className.FIXED; }

  public constructor(controlBar: ControlBar, {
    initialDelay = 3000,
    delay = 0,
    idleDelay: activationDelay = 3000
  }: Partial<AutoHideOptions>) {
    this._controlBar = controlBar;
    this._initialDelay = initialDelay;
    this._delay = delay;
    this._idleDelay = activationDelay;
    this._timer = -1;
    this._isCursorInside = false;
    this._isGrabbing = false;
    this._isFullscreen = false;
    this._video = null;
    this._targetEl = null;
  }

  public enable(viewer: View360) {
    if (this._targetEl) {
      this.disable(viewer);
    }

    const initialDelay = this._initialDelay;
    const root = viewer.root;

    this._targetEl = viewer.root;
    this._timer = window.setTimeout(() => {
      this.hide();
    }, initialDelay);

    root.addEventListener(BROWSER.EVENTS.MOUSE_DOWN, this._onHold);
    root.addEventListener(BROWSER.EVENTS.MOUSE_ENTER, this._onMouseEnter);
    root.addEventListener(BROWSER.EVENTS.MOUSE_MOVE, this._onMouseMove);
    root.addEventListener(BROWSER.EVENTS.MOUSE_LEAVE, this._onMouseLeave);
    this._addFullscreenHandlers();

    const video = viewer.projection?.getTexture();
    if (!video || !video.isVideo()) {
      return;
    }

    if (video.isPaused()) {
      this._controlBar.containerEl.classList.add(this._fixedClass);
    }

    video.source.addEventListener(BROWSER.EVENTS.VIDEO_PLAY, this._onVideoPlay);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_PAUSE, this._onVideoPause);

    this._video = video;
  }

  public disable(viewer: View360) {
    if (!this._targetEl) return;

    const controlBar = this._controlBar;
    const root = viewer.root;
    const video = this._video;

    root.removeEventListener(BROWSER.EVENTS.MOUSE_DOWN, this._onHold);
    window.removeEventListener(BROWSER.EVENTS.MOUSE_UP, this._onRelease);
    root.removeEventListener(BROWSER.EVENTS.MOUSE_ENTER, this._onMouseEnter);
    root.removeEventListener(BROWSER.EVENTS.MOUSE_MOVE, this._onMouseMove);
    root.removeEventListener(BROWSER.EVENTS.MOUSE_LEAVE, this._onMouseLeave);
    this._removeFullscreenHandlers();

    window.clearTimeout(this._timer);
    controlBar.containerEl.classList.remove(this._fixedClass);

    if (video) {
      video.source.removeEventListener(BROWSER.EVENTS.VIDEO_PLAY, this._onVideoPlay);
      video.source.removeEventListener(BROWSER.EVENTS.VIDEO_PAUSE, this._onVideoPause);
    }

    this._isCursorInside = false;
    this._isGrabbing = false;
    this._video = null;
    this._targetEl = null;
  }

  public show() {
    this._clearHideTimer();
    this._controlBar.containerEl.classList.remove(this._hiddenClass);
  }

  public showTemporaliy() {
    this.show();
    this._hideAfterDelay(this._idleDelay);
  }

  public hide() {
    this._clearHideTimer();
    this._controlBar.containerEl.classList.add(this._hiddenClass);
  }

  private _clearHideTimer() {
    if (this._timer) {
      window.clearTimeout(this._timer);
      this._timer = -1;
    }
  }

  private _hideAfterDelay(delay = this._delay) {
    if (this._isGrabbing || (!this._isFullscreen && this._isCursorInside)) return;

    this._clearHideTimer();
    if (delay <= 0) {
      this.hide();
    } else {
      this._timer = window.setTimeout(() => {
        this.hide();
      }, delay);
    }
  }

  private _onMouseEnter = () => {
    this._isCursorInside = true;
    this.show();
  };

  private _onMouseLeave = () => {
    this._isCursorInside = false;
    this._hideAfterDelay();
  };

  private _onMouseMove = () => {
    if (!this._isFullscreen) return;

    this.showTemporaliy();
  }

  private _onHold = (evt: PointerEvent) => {
    this._isGrabbing = true;

    if (evt.pointerType === "mouse") {
      this._isCursorInside = true;
    }

    window.addEventListener(BROWSER.EVENTS.MOUSE_UP, this._onRelease);

    this.show();
  };

  private _onRelease = () => {
    this._isGrabbing = false;

    window.removeEventListener(BROWSER.EVENTS.MOUSE_UP, this._onRelease);

    this._hideAfterDelay();
  };

  private _onVideoPlay = () => {
    const root = this._targetEl;
    if (!root) return;

    this._controlBar.containerEl.classList.remove(this._fixedClass);
  };

  private _onVideoPause = () => {
    const root = this._targetEl;
    if (!root) return;

    this._controlBar.containerEl.classList.add(this._fixedClass);
  };

  private _addFullscreenHandlers() {
    FULLSCREEN_CHANGE.forEach(evtName => {
      document.addEventListener(evtName, this._onFullscreenChange);
    });
  }

  private _removeFullscreenHandlers() {
    FULLSCREEN_CHANGE.forEach(evtName => {
      document.removeEventListener(evtName, this._onFullscreenChange);
    });
  }

  private _onFullscreenChange = () => {
    this._isFullscreen = isFullscreen();

    if (this._isFullscreen) {
      this._hideAfterDelay();
    }
  };
}

export default AutoHide;
