/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Sprite from "./Sprite";
import Texture2D from "../texture/Texture2D";

export interface PackedSpriteOptions {
  texture: Texture2D;
  columns: number;
  rows: number;
}

/**
 * Multiple images packed from a single graphic image
 */
class PackedSprite implements Sprite {
  private _texture: Texture2D;
  private _columns: number;
  private _rows: number;

  public get length() { return this._columns * this._rows; }

  public constructor({
    texture,
    columns,
    rows
  }: PackedSpriteOptions) {
    this._texture = texture;
    this._columns = columns;
    this._rows = rows;
  }

  public getImage(index: number) {
    const texture = this._texture;
    const rows = this._rows;
    const columns = this._columns;

    const row = Math.floor(index / columns);
    const column = index - row * columns;

    const width = texture.width / columns;
    const height = texture.height / rows;

    console.log(width, height);

    return {
      source: texture.source,
      x: column * width,
      y: row * height,
      width,
      height
    };
  }
}

export default PackedSprite;
