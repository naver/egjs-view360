/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import TextureVideo from "./TextureVideo";
import TextureCube from "./TextureCube";

/**
 * @hidden
 */
abstract class Texture {
  public width: number;
  public height: number;
  public flipY: boolean;
  public wrapS: number;
  public wrapT: number;

  public constructor({
    width,
    height,
    flipY
  }: {
    width: number;
    height: number;
    flipY: boolean;
  }) {
    this.width = width;
    this.height = height;
    this.flipY = flipY;
    this.wrapS = WebGLRenderingContext.CLAMP_TO_EDGE;
    this.wrapT = WebGLRenderingContext.CLAMP_TO_EDGE;
  }

  public destroy() {
    // DO_NOTHING
  }

  public isVideo(): this is TextureVideo {
    return false;
  }

  public isCube(): this is TextureCube {
    return false;
  }
}

export default Texture;
