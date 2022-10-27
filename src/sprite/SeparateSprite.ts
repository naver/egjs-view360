/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Sprite from "./Sprite";
import Texture2D from "../texture/Texture2D";

/**
 * Sprite with multiple images
 */
class SeparateSprite implements Sprite {
  public readonly length: number;

  private _textures: Texture2D[];

  public constructor(textures: Texture2D[]) {
    this._textures = textures;
    this.length = textures.length;
  }

  public getImage(index: number) {
    const image = this._textures[index];

    return {
      source: image.source,
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    };
  }
}

export default SeparateSprite;
