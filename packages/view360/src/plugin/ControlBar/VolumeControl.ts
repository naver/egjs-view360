/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import RangeControl from "./RangeControl";
import View360 from "../../View360";
import TextureVideo from "../../texture/TextureVideo";
import * as BROWSER from "../../const/browser";
import { CONTROL_EVENTS } from "../../const/internal";
import { EVENTS } from "../../const/external";

/**
 * Show video volume control.
 * @ko 비디오 볼륨 조절 버튼을 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class VolumeControl extends ControlBarItem {
  public get element() { return this._rootEl; }

  private _controlBar: ControlBar | null;
  private _rootEl: HTMLButtonElement;
  private _buttonEl: HTMLElement;
  private _rangeControl: RangeControl;
  private _video: TextureVideo | null;

  /**
   * Create a new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    position = ControlBar.POSITION.MAIN_RIGHT,
    order = 9999
  }: Partial<ControlBarItemOptions> = {}) {
    super({
      position,
      order
    });

    this._controlBar = null;
    this._rangeControl = new RangeControl();
    this._createElements();

    this._video = null;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const video = viewer.projection?.getTexture();
    const root = this._rootEl;
    const button = this._buttonEl;
    const rangeControl = this._rangeControl;
    const className = controlBar.className;
    const unavailableClass = className.UNAVAILABLE;

    if (!video || !video.isVideo()) {
      root.classList.add(unavailableClass);
      return;
    }

    root.classList.remove(unavailableClass);
    root.classList.add(className.CONTROLS_BUTTON);
    root.classList.add(className.VOLUME_ROOT);
    button.classList.add(className.CONTROLS_BUTTON);

    if (video.source.muted) {
      button.classList.add(className.MUTED_BUTTON);
    } else {
      button.classList.add(className.UNMUTED_BUTTON);
    }

    viewer.on(EVENTS.RESIZE, this._onResize);
    root.addEventListener(BROWSER.EVENTS.TRANSITION_END, this._onResize);
    button.addEventListener(BROWSER.EVENTS.CLICK, this._onClick);

    video.source.addEventListener(BROWSER.EVENTS.VIDEO_VOLUME_CHANGE, this._onVolumeChange);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_LOADED_DATA, this._updateDisplay);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_CAN_PLAYTHROUGH, this._updateDisplay);

    rangeControl.init(className);
    rangeControl.on(CONTROL_EVENTS.INPUT_START, this._onHold);
    rangeControl.on(CONTROL_EVENTS.CHANGE, this._onChange);
    rangeControl.on(CONTROL_EVENTS.INPUT_END, this._onRelease);

    this._controlBar = controlBar;
    this._video = video;

    this._updateDisplay();
  }

  public destroy(viewer: View360) {
    const video = this._video;
    const button = this._buttonEl;
    const root = this._rootEl;

    root.className = "";
    button.className = "";

    viewer.off(EVENTS.RESIZE, this._onResize);
    root.removeEventListener(BROWSER.EVENTS.TRANSITION_END, this._onResize);
    button.removeEventListener(BROWSER.EVENTS.CLICK, this._onClick);

    if (video) {
      video.source.removeEventListener(BROWSER.EVENTS.VIDEO_VOLUME_CHANGE, this._onVolumeChange);
      video.source.removeEventListener(BROWSER.EVENTS.VIDEO_LOADED_DATA, this._updateDisplay);
      video.source.removeEventListener(BROWSER.EVENTS.VIDEO_CAN_PLAYTHROUGH, this._updateDisplay);
    }

    this._controlBar = null;
    this._rangeControl.destroy();
    this._video = null;
  }

  private _onResize = () => {
    this._rangeControl.resize();
    this._updateDisplay();
  }

  private _onClick = () => {
    const video = this._video;
    if (!video || this._rootEl.disabled) return;

    video.source.muted = !video.source.muted;
  };

  private _onVolumeChange = () => {
    const button = this._buttonEl;
    const video = this._video;
    const controlBar = this._controlBar;

    if (!video || !controlBar) return;

    const className = controlBar.className;

    if (video.source.muted || video.source.volume === 0) {
      button.classList.add(className.MUTED_BUTTON);
      button.classList.remove(className.UNMUTED_BUTTON);
    } else {
      button.classList.add(className.UNMUTED_BUTTON);
      button.classList.remove(className.MUTED_BUTTON);
    }

    this._updateDisplay();
  };

  private _createElements() {
    const root = document.createElement(BROWSER.EL_BUTTON);
    const buttonEl = document.createElement(BROWSER.EL_DIV);

    root.appendChild(this._rangeControl.rootEl);
    root.appendChild(buttonEl);
    root.title = "Toggle Mute";

    this._rootEl = root;
    this._buttonEl = buttonEl;
  }

  private _onHold = (progress: number) => {
    const video = this._video;
    const controlBar = this._controlBar;

    if (!video || !controlBar) return;

    const className = controlBar.className;

    video.source.volume = progress;

    this._rootEl.classList.add(className.FIXED);
    controlBar.containerEl.classList.add(className.FIXED);

    this._updateDisplay();
  };

  private _onChange = (progress: number) => {
    const video = this._video;
    if (!video) return;

    video.source.volume = progress;
    if (progress > 0) {
      video.source.muted = false;
    } else {
      video.source.muted = true;
    }

    this._updateDisplay();
  };

  private _onRelease = () => {
    const controlBar = this._controlBar;
    if (!controlBar) return;

    const className = controlBar.className;

    this._rootEl.classList.remove(className.FIXED);
    controlBar.containerEl.classList.remove(className.FIXED);
  };

  private _updateDisplay = () => {
    const video = this._video;
    const root = this._rootEl;
    if (!video) return;

    if (!video.hasAudio()) {
      root.disabled = true;
      return;
    }

    root.disabled = false;

    const volume = video.source.muted ? 0 : video.source.volume;

    this._rangeControl.updateStyle(volume);
  };
}

export default VolumeControl;
