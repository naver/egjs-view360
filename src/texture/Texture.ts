/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 *
 */
abstract class Texture {
  private _source: TexImageSource;

  public get source() { return this._source; }

  public constructor(source: TexImageSource) {
    this._source = source;
  }

  public update() {
    // DO_NOTHING
  }
}

export default Texture;
