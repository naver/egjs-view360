/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class ImageTexture implements Texture {
  private _image: HTMLImageElement;

  public constructor(image: HTMLImageElement) {
    this._image = image;
  }

  public update() {

  }

  public createWebGLTexture(gl: WebGLRenderingContext): WebGLTexture {

  };
}

export default ImageTexture;
