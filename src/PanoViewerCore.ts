/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360Error from "./core/View360Error";
import Renderer from "./renderer/Renderer";
import WebGLRenderer from "./renderer/WebGLRenderer";
import ERROR from "./const/error";
import { EVENTS } from "./const/external";
import { findCanvas } from "./utils";
import Emittable from "./type/Emittable";
import * as EVENT_TYPES from "./type/event";

/**
 * @interface
 * @see [Events](/docs/events/ready) page for detailed information
 */
export interface PanoViewerEvents {
  [EVENTS.READY]: EVENT_TYPES.ReadyEvent<PanoViewerCore>;
  [EVENTS.RESIZE]: EVENT_TYPES.ResizeEvent<PanoViewerCore>;
  [EVENTS.BEFORE_RENDER]: EVENT_TYPES.BeforeRenderEvent<PanoViewerCore>;
  [EVENTS.RENDER]: EVENT_TYPES.RenderEvent<PanoViewerCore>;
}

/**
 * @interface
 * @see [Options](/docs/options/source/src) page for detailed information
 */
export interface PanoViewerOptions {
  src: string | HTMLElement;
  canvasSelector: string;
}

/**
 *
 */
class PanoViewerCore {
  protected _rootEl: HTMLElement;
  protected _emitter: Emittable<PanoViewerEvents>;
  protected _renderer: Renderer;
  protected _initialized: boolean;

  protected _src?: PanoViewerOptions["src"];
  protected _canvasSelector: PanoViewerOptions["canvasSelector"];

  public get root() { return this._rootEl; }
  public get src() { return this._src; }

  /**
   *
   */
  public constructor(root: HTMLElement, eventEmitter: Emittable<PanoViewerEvents>, {
    src,
    canvasSelector = "canvas"
  }: Partial<PanoViewerOptions> = {}) {
    this._rootEl = root;
    this._emitter = eventEmitter;
    this._initialized = false;

    // Options
    this._src = src;
    this._canvasSelector = canvasSelector;

    // Core components
    const canvas = findCanvas(root, canvasSelector);
    this._renderer = new WebGLRenderer(eventEmitter, canvas);
  }

  public destroy() {
    this._renderer.destroy();
  }

  /**
   * Initialize View360
   */
  public async init() {
    if (!this._src) {
      throw new View360Error(ERROR.MESSAGES.PROVIDE_SRC_FIRST, ERROR.CODES.PROVIDE_SRC_FIRST);
    }

    this._renderer.init();
  }

  /**
   */
  public resize() {
    this._renderer.resize();
  }
}

export default PanoViewerCore;
