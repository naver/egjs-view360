/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture2D from "../texture/Texture2D";

export interface ImageSpriteOptions {
  texture: Texture2D;
  columns: number;
  rows: number;
}

class ImageSprite {
  private _texture: Texture2D;
  private _columns: number;
  private _rows: number;

  public constructor({
    texture,
    columns,
    rows
  }: ImageSpriteOptions) {
    this._texture = texture;
    this._columns = columns;
    this._rows = rows;
  }
}

export default ImageSprite;
