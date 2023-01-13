/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture2D from "./Texture2D";

/**
 * @hidden
 */
class TextureVideo extends Texture2D {
  public source: HTMLVideoElement;

  public destroy() {
    const video = this.source;

    video.pause();
    video.removeAttribute("src");
    video.load();
  }

  public isVideo(): this is TextureVideo { return true; }

  public isPaused() {
    const video = this.source;

    return video.paused || video.ended || video.readyState <= 2;
  }

  public hasAudio() {
    const video = this.source as any;

    if (video.audioTracks) {
      return video.audioTracks.length > 0;
    }

    if (video.webkitAudioDecodedByteCount != null) {
      return video.webkitAudioDecodedByteCount > 0;
    }

    if (video.mozHasAudio != null) {
      return video.mozHasAudio;
    }

    // We don't know whether the video has audio or not, return true
    return true;
  }
}

export default TextureVideo;
