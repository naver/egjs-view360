/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture2D from "../texture/Texture2D";
import { range, reorderCube } from "../utils";

/** @hidden */
class CubeTexturePainter {
  public readonly texture: Texture2D;
  private _renderingOrder: number[];
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _row: number;
  private _column: number;
  private _size: number;

  public get size() { return this._size; }

  public constructor(texture: Texture2D, cubemapOrder: string) {
    this.texture = texture;
    this._renderingOrder = reorderCube(range(6), cubemapOrder);

    const canvas = document.createElement("canvas");

    this._calcRenderingSize();

    canvas.width = this._size;
    canvas.height = this._size;

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d")!;
  }

  public destroy() {
    const canvas = this._canvas;

    // release memories
    canvas.width = 1;
    canvas.height = 1;
    this._canvas = null as any;
  }

  public draw(gl: WebGLRenderingContext | WebGL2RenderingContext, isWebGL2: boolean) {
    const size = this._size;
    const texture = this.texture;
    let surfaceIdx = 0;

    for (let row = 0; row < this._row; row++) {
      for (let column = 0; column < this._column; column++) {
        const x = size * column;
        const y = size * row;
        const renderingFace = this._renderingOrder[surfaceIdx];

        this._ctx.drawImage(texture.source as CanvasImageSource, x, y, size, size, 0, 0, size, size);

        if (isWebGL2) {
          gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderingFace, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
        } else {
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderingFace, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
        }

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

export default CubeTexturePainter;
