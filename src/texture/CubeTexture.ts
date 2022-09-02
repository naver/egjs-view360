/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

class CubeTexture implements Texture {
  public readonly webglTexture: WebGLTexture;

  private _images: HTMLImageElement[];

  // FIXME:
  public get width() { return this._images[0].naturalWidth; }
  public get height() { return this._images[0].naturalHeight; }
  public get source() { return this._images[0]; }

  public constructor(image: HTMLImageElement[], webglTexture: WebGLTexture) {
    this.webglTexture = webglTexture;

    this._images = image;
  }

  public update() {
    // TODO: Update canvas2d
  }
}

export default CubeTexture;
