/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import View360 from "../../View360";
import TextureVideo from "../../texture/TextureVideo";
import * as BROWSER from "../../const/browser";

/**
 * Show video play / pause button.
 * @ko 비디오 재생 / 일시정지 버튼을 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class PlayButton extends ControlBarItem {
  public readonly element: HTMLElement;
  private _controlBar: ControlBar | null;
  private _video: TextureVideo | null;
  private _paused: boolean;

  /**
   * Create a new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    position = ControlBar.POSITION.MAIN_LEFT,
    order = 9999
  }: Partial<ControlBarItemOptions> = {}) {
    super({
      position,
      order
    });

    this.element = document.createElement(BROWSER.EL_BUTTON);

    this._video = null;
    this._paused = true;
    this._controlBar = null;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const element = this.element;
    const video = viewer.projection?.getTexture();
    const className = controlBar.className;
    const unavailableClass = className.UNAVAILABLE;

    if (!video || !video.isVideo()) {
      element.classList.add(unavailableClass);
      return;
    }

    element.classList.add(className.CONTROLS_BUTTON);
    element.classList.remove(unavailableClass);

    const paused = video.isPaused();
    this._video = video;
    this._paused = paused;
    this._controlBar = controlBar;

    if (paused) {
      this._onPause();
    } else {
      this._onPlay();
    }

    element.addEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_PLAY, this._onPlay);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_PAUSE, this._onPause);
  }

  public destroy() {
    const video = this._video;
    const element = this.element;

    if (!video) return;

    element.className = "";
    element.removeEventListener(BROWSER.EVENTS.CLICK, this._onClick);
    video.source.removeEventListener(BROWSER.EVENTS.VIDEO_PLAY, this._onPlay);
    video.source.removeEventListener(BROWSER.EVENTS.VIDEO_PAUSE, this._onPause);

    this._video = null;
    this._paused = true;
    this._controlBar = null;
  }

  private _onClick = () => {
    const video = this._video;
    if (!video) return;

    if (this._paused) {
      video.source.play();
    } else {
      video.source.pause();
    }
  };

  private _onPlay = () => {
    if (!this._controlBar) return;

    const element = this.element;
    const className = this._controlBar.className;

    element.classList.add(className.PAUSE_BUTTON);
    element.classList.remove(className.PLAY_BUTTON);
    element.title = "Pause Video";

    this._paused = false;
  };

  private _onPause = () => {
    if (!this._controlBar) return;

    const element = this.element;
    const className = this._controlBar.className;

    element.classList.add(className.PLAY_BUTTON);
    element.classList.remove(className.PAUSE_BUTTON);
    element.title = "Play Video";

    this._paused = true;
  };
}

export default PlayButton;
