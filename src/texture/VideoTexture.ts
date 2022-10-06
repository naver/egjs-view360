/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class VideoTexture implements Texture {
  public readonly webglTexture: WebGLTexture;
  public readonly isVideo: boolean;

  private _video: HTMLVideoElement;

  public get source() { return this._video; }

  public constructor(video: HTMLVideoElement, webglTexture: WebGLTexture) {
    this.webglTexture = webglTexture;
    this.isVideo = true;

    this._video = video;
  }

  public update() {
    // this._video.requestVideoFrameCallback(() => void 0);
  }
}

export default VideoTexture;
