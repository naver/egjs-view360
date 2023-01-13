/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 * @hidden
 */
class Texture2D extends Texture {
  public source: Exclude<TexImageSource, ImageData>;

  public constructor({
    source,
    width,
    height,
    flipY
  }: {
    source: Exclude<TexImageSource, ImageData>;
    width: number;
    height: number;
    flipY: boolean;
  }) {
    super({
      width,
      height,
      flipY
    });

    this.source = source;
  }
}

export default Texture2D;
