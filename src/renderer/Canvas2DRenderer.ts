/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Renderer from "./Renderer";
import Sprite from "../sprite/Sprite";
import View360Error from "../core/View360Error";
import ERROR from "../const/error";

class Canvas2DRenderer extends Renderer {
  private _ctx: CanvasRenderingContext2D;

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new View360Error(ERROR.MESSAGES.FAILED_CREATE_CONTEXT_2D, ERROR.CODES.FAILED_CREATE_CONTEXT_2D);

    this._ctx = ctx;
  }

  /**
   *
   */
  public render(sprite: Sprite, index: number) {
    const ctx = this._ctx;
    const {
      x: renderingWidth,
      y: renderingHeight
    } = this._elementSize;

    const {
      source,
      x,
      y,
      width,
      height
    } = sprite.getImage(index);

    ctx.drawImage(source, x, y, width, height, 0, 0, renderingWidth, renderingHeight);
  }

  public resize() {
    super.resize();

    const pixelRatio = this._pixelRatio;
    this._ctx.scale(pixelRatio, pixelRatio);
  }
}

export default Canvas2DRenderer;
