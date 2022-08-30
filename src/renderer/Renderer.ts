/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { EVENTS } from "../const/external";
import * as EVENT_TYPES from "../type/event";
import Emittable from "../type/Emittable";

export interface RendererEvents {
  [EVENTS.BEFORE_RENDER]: EVENT_TYPES.BeforeRenderEvent<any>;
  [EVENTS.RENDER]: EVENT_TYPES.RenderEvent<any>;
}

/**
 *
 */
abstract class Renderer {
  protected _emitter: Emittable<RendererEvents>;
  protected _canvas: HTMLCanvasElement;
  protected _elementSize: { x: number, y: number };
  protected _pixelRatio: number;

  /**
   *
   * @param canvas
   */
  public constructor(emitter: Emittable<RendererEvents>, canvas: HTMLCanvasElement) {
    this._emitter = emitter;
    this._canvas = canvas;
    this._elementSize = { x: 0, y: 0 };
    this._pixelRatio = 1;
  }

  public abstract init(): void;
  public abstract destroy(): void;

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
