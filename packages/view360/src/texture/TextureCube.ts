/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 * @hidden
 */
class TextureCube extends Texture {
  public sources: TexImageSource[];

  public constructor({
    sources,
    width,
    height,
    flipY
  }: {
    sources: TexImageSource[];
    width: number;
    height: number;
    flipY: boolean;
  }) {
    super({
      width,
      height,
      flipY
    });

    this.sources = sources;
  }

  public isCube(): this is TextureCube { return true; }
}

export default TextureCube;
