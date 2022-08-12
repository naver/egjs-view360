/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Scene from "../core/Scene";
import Camera from "../core/Camera";
import Vector2 from "../math/Vector2";
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
  protected _rootEl: HTMLElement;
  protected _renderQueued: boolean;
  protected _elementSize: Vector2;
  protected _pixelRatio: number;

  /**
   *
   * @param root
   */
  public constructor(emitter: Emittable<RendererEvents>, root: HTMLElement) {
    this._emitter = emitter;
    this._rootEl = root;
    this._renderQueued = false;
    this._elementSize = new Vector2();
    this._pixelRatio = 1;
  }

  public abstract init(): void;
  protected abstract _onRender(): void;

  /**
   *
   */
  public destroy() {
    this._renderQueued = false;
  }

  /**
   *
   */
  public resize() {
    const rootEl = this._rootEl;

    this._elementSize.set(rootEl.clientWidth, rootEl.clientHeight);
    this._pixelRatio = window.devicePixelRatio;
  }

  /**
   *
   */
  public render(scene: Scene, camera: Camera) {

  }

  /**
   *
   */
  public renderSingleFrame(immediate = false) {
    if (immediate) {
      this._renderFrame(0);
    } else if (!this._renderQueued) {
      requestAnimationFrame(() => {
        this._renderFrame(0);
      });
      this._renderQueued = true;
    }
  }

  private _renderFrame(delta: number) {
    const emitter = this._emitter;
    const deltaMiliSec = delta * 1000;

    this._renderQueued = false;

    emitter.trigger(EVENTS.BEFORE_RENDER, {
      type: EVENTS.BEFORE_RENDER,
      delta: deltaMiliSec
    });

    this._onRender();

    emitter.trigger(EVENTS.RENDER, {
      type: EVENTS.RENDER,
      delta: deltaMiliSec
    });
  }
}

export default Renderer;
