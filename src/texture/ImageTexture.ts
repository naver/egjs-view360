/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class ImageTexture implements Texture {
  public readonly webglTexture: WebGLTexture;
  public isVideo: boolean;
  public flipY: boolean;

  private _image: HTMLImageElement;

  public get source() { return this._image; }

  public constructor(image: HTMLImageElement, webglTexture: WebGLTexture) {
    this.webglTexture = webglTexture;
    this.isVideo = false;
    this.flipY = true;

    this._image = image;
  }
}

export default ImageTexture;
