/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class VideoTexture implements Texture {
  private _video: HTMLVideoElement;

  public constructor(video: HTMLVideoElement) {
    this._video = video;
  }

  public update() {
    // TODO:
    // this._source.requestVideoFrameCallback();
  }

  public createWebGLTexture(gl: WebGLRenderingContext): WebGLTexture {

  };
}

export default VideoTexture;
