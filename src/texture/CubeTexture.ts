/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

class CubeTexture implements Texture {
  private _images: HTMLImageElement[];

  public constructor(image: HTMLImageElement[]) {
    this._images = image;
  }

  public update() {

  }

  public createWebGLTexture(gl: WebGLRenderingContext): WebGLTexture {

  };
}

export default CubeTexture;
