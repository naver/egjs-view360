/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

class CubeTexture implements Texture {
  public readonly webglTexture: WebGLTexture;
  public readonly isVideo: boolean;

  private _images: HTMLImageElement[];

  public get source() { return this._images[0]; }

  public constructor(image: HTMLImageElement[], webglTexture: WebGLTexture) {
    this.webglTexture = webglTexture;
    this.isVideo = false;

    this._images = image;
  }

  public update() {
    // TODO: Update canvas2d
  }
}

export default CubeTexture;
