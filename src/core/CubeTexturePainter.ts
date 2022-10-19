/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture2D from "../texture/Texture2D";

class CubeTextureConverter {
  public readonly texture: Texture2D;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _row: number;
  private _column: number;
  private _size: number;

  public constructor(texture: Texture2D) {
    this.texture = texture;
    const canvas = document.createElement("canvas");

    this._calcRenderingSize();

    canvas.width = this._size;
    canvas.height = this._size;

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d")!;
  }

  public destroy() {
    const canvas = this._canvas;

    canvas.width = 0;
    canvas.height = 0;
    this._canvas = null as any;
  }

  public draw(gl: WebGLRenderingContext | WebGL2RenderingContext) {
    const size = this._size;
    const texture = this.texture;
    let surfaceIdx = 0;

    console.log([
      gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ]);

    for (let row = 0; row < this._row; row++) {
      for (let column = 0; column < this._column; column++) {
        const x = size * column;
        const y = size * row;

        console.log(x, y, gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx);

        this._ctx.drawImage(texture.source as CanvasImageSource, x, y, size, size, 0, 0, size, size);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);

        surfaceIdx++;
      }
    }
  }

  private _calcRenderingSize() {
    const {
      width,
      height
    } = this.texture;
    const aspect = width / height;

    if (aspect === 1 / 6) {
      this._size = width;
      this._row = 6;
      this._column = 1;
    } else if (aspect === 6) {
      this._size = height;
      this._row = 1;
      this._column = 6;
    } else if (aspect === 2 / 3) {
      this._size = width * 0.5;
      this._row = 3;
      this._column = 2;
    } else {
      this._size = width / 3;
      this._row = 2;
      this._column = 3;
    }
  }
}

export default CubeTextureConverter;
