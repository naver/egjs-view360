import TextureVideo from "../../texture/TextureVideo";
import * as BROWSER from "../../const/browser";
import { clamp } from "../../utils";
import { VIDEO_TIME_CHANGE_EVENT } from "../../const/internal";

class VideoControl {
  private _video: TextureVideo | null;

  public enable(root: HTMLElement, video: TextureVideo) {
    this._video = video;
    // capture is needed for resolving conflict with keyboard control
    root.addEventListener(BROWSER.EVENTS.KEY_DOWN, this._onKeyDown, true);
  }

  public disable(root: HTMLElement) {
    this._video = null;
    root.removeEventListener(BROWSER.EVENTS.KEY_DOWN, this._onKeyDown, true);
  }

  private _onKeyDown = (event: KeyboardEvent) => {
    const video = this._video;
    if (!video) return;

    event.preventDefault();
    event.stopPropagation();

    const videoEl = video.source;
    const keyPressed = event.keyCode != null
      ? BROWSER.DIRECTION_KEY_CODE[event.keyCode]
      : BROWSER.DIRECTION_KEY_NAME[event.key];

    switch (keyPressed) {
      case "LEFT":
      case "RIGHT":
        return this._changeVideoTime(videoEl, keyPressed === "RIGHT");
      case "UP":
      case "DOWN":
        return this._changeVideoVolume(videoEl, keyPressed === "UP");
    }

    const spacePressed = event.keyCode === BROWSER.SPACE_KEY_CODE || event.key === BROWSER.SPACE_KEY_NAME;
    if (spacePressed) {
      this._toggleVideo(video);
    }
  }

  private _changeVideoTime(video: HTMLVideoElement, forward: boolean) {
    const delta = forward ? 5 : -5;

    video.currentTime += delta;
    video.dispatchEvent(new CustomEvent(VIDEO_TIME_CHANGE_EVENT, { detail: { time: video.currentTime }}));
  }

  private _changeVideoVolume(video: HTMLVideoElement, increase: boolean) {
    const delta = increase ? 0.1 : -0.1;

    if (video.muted) {
      video.volume = clamp(delta, 0, 1);
    } else {
      video.volume = clamp(video.volume + delta, 0, 1);
    }

    if (video.volume > 0) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  }

  private _toggleVideo(video: TextureVideo) {
    if (video.isPaused()) {
      video.source.play();
    } else {
      video.source.pause();
    }
  }
}

export default VideoControl;
