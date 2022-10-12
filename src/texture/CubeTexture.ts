/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

class CubeTexture implements Texture {
  public readonly webglTexture: WebGLTexture;
  public readonly images: HTMLImageElement[];
  public isVideo: boolean;
  public flipY: boolean;

  public get source() { return this.images[0]; }

  public constructor(image: HTMLImageElement[], webglTexture: WebGLTexture) {
    this.webglTexture = webglTexture;
    this.isVideo = false;
    this.images = image;
    this.flipY = false;
  }
}

export default CubeTexture;
