/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import RangeControl from "./RangeControl";
import View360 from "../../View360";
import TextureVideo from "../../texture/TextureVideo";
import { CONTROL_EVENTS, VIDEO_TIME_CHANGE_EVENT } from "../../const/internal";
import { CONTROL_BAR_ITEM_POSITION } from "./const";
import { EVENTS } from "../../const/external";
import * as BROWSER from "../../const/browser";

/**
 * Show video progress bar.
 * @ko 비디오의 프로그레스 바를 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class ProgressBar extends ControlBarItem {
  public get element() { return this._rangeControl.rootEl; }

  private _controlBar: ControlBar | null;
  private _video: TextureVideo | null;
  private _rangeControl: RangeControl;

  private _wasPaused: boolean;
  private _currentTime: number;
  private _duration: number;
  private _playPromise: Promise<void> | null;

  /**
   * Create a new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor({
    position = CONTROL_BAR_ITEM_POSITION.MAIN_TOP,
    order = 9999
  }: Partial<ControlBarItemOptions> = {}) {
    super({
      position,
      order
    });

    this.position = position;
    this.order = order;

    this._controlBar = null;
    this._rangeControl = new RangeControl();

    this._video = null;
    this._wasPaused = false;
    this._currentTime = 0;
    this._duration = 0;
    this._playPromise = null;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const video = viewer.projection?.getTexture();
    const element = this.element;
    const rangeControl = this._rangeControl;
    const unavailableClass = controlBar.className.UNAVAILABLE;

    if (!video || !video.isVideo()) {
      element.classList.add(unavailableClass);
      return;
    }

    element.classList.remove(unavailableClass);
    element.classList.add(controlBar.className.PROGRESS_ROOT);
    viewer.on(EVENTS.RESIZE, this._onResize);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_TIME_UPDATE, this._onTimeUpdate);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_DURATION_CHANGE, this._onDurationChange);
    video.source.addEventListener(VIDEO_TIME_CHANGE_EVENT, this._onTimeUpdate);
    rangeControl.init(controlBar.className);
    rangeControl.on(CONTROL_EVENTS.INPUT_START, this._onHold);
    rangeControl.on(CONTROL_EVENTS.CHANGE, this._onControl);
    rangeControl.on(CONTROL_EVENTS.INPUT_END, this._onRelease);

    this._video = video;
    this._currentTime = video.source.currentTime;
    this._duration = video.source.duration;
    this._controlBar = controlBar;

    rangeControl.updateStyle(this._currentTime / this._duration);
  }

  public destroy(viewer: View360) {
    const video = this._video;

    viewer.off(EVENTS.RESIZE, this._onResize);

    if (video) {
      video.source.removeEventListener(BROWSER.EVENTS.VIDEO_TIME_UPDATE, this._onTimeUpdate);
      video.source.removeEventListener(BROWSER.EVENTS.VIDEO_DURATION_CHANGE, this._onDurationChange);
      video.source.removeEventListener(VIDEO_TIME_CHANGE_EVENT, this._onTimeUpdate);
    }

    this._rangeControl.destroy();
    this._video = null;
    this._playPromise = null;
  }

  private _onResize = () => {
    this._rangeControl.resize();
  }

  private _onTimeUpdate = () => {
    const video = this._video;
    if (!video) return;

    this._currentTime = video.source.currentTime;
    this._rangeControl.updateStyle(this._currentTime / this._duration);
  };

  private _onDurationChange = () => {
    const video = this._video;
    if (!video) return;

    this._duration = video.source.duration;
    this._rangeControl.updateStyle(this._currentTime / this._duration);
  };

  private _onHold = (progress: number) => {
    const video = this._video;
    const controlBar = this._controlBar;
    if (!video || !controlBar) return;

    const paused = video.isPaused();

    video.source.pause();

    const time = video.source.duration * progress;
    video.source.currentTime = time;
    video.source.dispatchEvent(new CustomEvent(VIDEO_TIME_CHANGE_EVENT, { detail: { time }}));

    controlBar.rootEl.classList.add(controlBar.className.FIXED);
    this._wasPaused = !this._playPromise && paused;
  };

  private _onControl = (progress: number) => {
    const video = this._video;
    if (!video) return;

    const time = video.source.duration * progress;
    video.source.currentTime = time;
    video.source.dispatchEvent(new CustomEvent(VIDEO_TIME_CHANGE_EVENT, { detail: { time }}));
  };

  private _onRelease = () => {
    const video = this._video;
    const controlBar = this._controlBar;

    if (video && controlBar) {
      if (!this._wasPaused && !this._playPromise) {
        this._playPromise = video.source.play()
          .catch(() => void 0);

        // This should not be chained
        this._playPromise.then(() => {
          this._playPromise = null;
        });

        controlBar.rootEl.classList.remove(controlBar.className.FIXED);
      }
    }

    this._wasPaused = false;
  };
}

export default ProgressBar;
