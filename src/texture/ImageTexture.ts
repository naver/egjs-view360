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

  private _image: HTMLImageElement;

  public get width() { return this._image.naturalWidth; }
  public get height() { return this._image.naturalHeight; }
  public get source() { return this._image; }

  public constructor(image: HTMLImageElement, webglTexture: WebGLTexture) {
    this.webglTexture = webglTexture;

    this._image = image;
  }

  public update() {
    // TODO: Split if necessary
  }
}

export default ImageTexture;
