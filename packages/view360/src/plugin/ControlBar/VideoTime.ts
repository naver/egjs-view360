/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ControlBar from "./ControlBar";
import ControlBarItem, { ControlBarItemOptions } from "./ControlBarItem";
import View360 from "../../View360";
import TextureVideo from "../../texture/TextureVideo";
import * as BROWSER from "../../const/browser";
import { VIDEO_TIME_CHANGE_EVENT } from "../../const/internal";

/**
 * Show video current / total time.
 * @ko 비디오의 현재 / 총 재생시간을 표시합니다.
 * @category Plugin
 * @group ControlBar
 * @since 4.0.0
 */
class VideoTime extends ControlBarItem {
  public readonly element: HTMLElement;
  private _video: TextureVideo | null;
  private _currentTime: number;
  private _duration: number;

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

    this.element = document.createElement(BROWSER.EL_DIV);

    this._video = null;
    this._currentTime = 0;
    this._duration = 0;
  }

  public init(viewer: View360, controlBar: ControlBar) {
    const video = viewer.projection?.getTexture();
    const element = this.element;
    const className = controlBar.className;

    if (!video || !video.isVideo()) {
      element.classList.add(className.UNAVAILABLE);
      return;
    }

    element.classList.add(className.VIDEO_TIME_DISPLAY);
    element.classList.remove(className.UNAVAILABLE);

    video.source.addEventListener(BROWSER.EVENTS.VIDEO_TIME_UPDATE, this._onTimeUpdate);
    video.source.addEventListener(BROWSER.EVENTS.VIDEO_DURATION_CHANGE, this._onDurationChange);
    video.source.addEventListener(VIDEO_TIME_CHANGE_EVENT, this._onCustomTimeChange);

    this._video = video;
    this._currentTime = video.source.currentTime;
    this._duration = video.source.duration;

    this._updateDisplay();
  }

  public destroy() {
    const video = this._video;

    if (!video) return;

    this.element.className = "";
    video.source.removeEventListener(BROWSER.EVENTS.VIDEO_TIME_UPDATE, this._onTimeUpdate);
    video.source.removeEventListener(BROWSER.EVENTS.VIDEO_DURATION_CHANGE, this._onDurationChange);
    video.source.removeEventListener(VIDEO_TIME_CHANGE_EVENT, this._onCustomTimeChange);

    this._video = null;
  }

  private _onTimeUpdate = () => {
    const video = this._video;
    if (!video) return;

    this._currentTime = video.source.currentTime;
    this._updateDisplay();
  };

  private _onDurationChange = () => {
    const video = this._video;
    if (!video) return;

    this._duration = video.source.duration;
    this._updateDisplay();
  };

  private _onCustomTimeChange = (evt: CustomEvent<{ time: number }>) => {
    this._currentTime = evt.detail.time;
    this._updateDisplay();
  };

  private _updateDisplay() {
    const time = this._currentTime;
    const timeMinute = Math.floor(time / 60);
    const timeSeconds = Math.floor(time - timeMinute * 60);
    const timeSecondsFormatted = timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds;

    const duration = this._duration;
    const durationMinute = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration - durationMinute * 60);
    const durationSecondsFormatted = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;

    this.element.innerText = `${timeMinute}:${timeSecondsFormatted} / ${durationMinute}:${durationSecondsFormatted}`;
  }
}

export default VideoTime;
