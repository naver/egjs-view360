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

  private _video: HTMLVideoElement;

  public get width() { return this._video.videoWidth; }
  public get height() { return this._video.videoHeight; }
  public get source() { return this._video; }

  public constructor(video: HTMLVideoElement, webglTexture: WebGLTexture) {
    this.webglTexture = webglTexture;

    this._video = video;
  }

  public update() {
    // TODO:
    // this._source.requestVideoFrameCallback();
  }
}

export default VideoTexture;
