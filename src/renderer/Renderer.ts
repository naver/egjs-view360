/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { EVENTS } from "../const/external";

export interface RendererEvents {
  [EVENTS.BEFORE_RENDER]: void;
  [EVENTS.RENDER]: void;
}

/**
 *
 */
abstract class Renderer extends Component<RendererEvents> {
  protected _canvas: HTMLCanvasElement;
  protected _elementSize: { x: number, y: number };
  protected _pixelRatio: number;

  public get width() { return this._elementSize.x; }
  public get height() { return this._elementSize.y; }
  public get aspect() { return this._elementSize.x / this._elementSize.y; }

  /**
   *
   * @param canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
    super();
    this._canvas = canvas;
    this._elementSize = { x: 0, y: 0 };
    this._pixelRatio = 1;
  }

  /**
   *
   */
  public resize() {
    const canvas = this._canvas;
    const canvasSize = this._elementSize;
    const devicePixelRatio = window.devicePixelRatio;

    canvasSize.x = canvas.clientWidth;
    canvasSize.y = canvas.clientHeight;

    canvas.width = canvasSize.x * devicePixelRatio;
    canvas.height = canvasSize.y * devicePixelRatio;

    this._pixelRatio = devicePixelRatio;
  }
}

export default Renderer;
