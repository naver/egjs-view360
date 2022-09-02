/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Renderer, { RendererEvents } from "./Renderer";
import Camera from "../core/Camera";
import Entity from "../core/Entity";
import { EVENTS } from "../const/external";
import Emittable from "../type/Emittable";
import WebGLContext from "../webgl/WebGLContext";

class WebGLRenderer extends Renderer {
  public readonly ctx: WebGLContext;
  private _renderQueued: boolean;

  public constructor(emitter: Emittable<RendererEvents>, canvas: HTMLCanvasElement) {
    super(emitter, canvas);

    this.ctx = new WebGLContext(canvas);
    this._renderQueued = false;
  }

  public destroy(): void {
    this._renderQueued = false;
  }

  /**
   *
   */
  public render(entity: Entity, camera: Camera) {
    const emitter = this._emitter;

    this._renderQueued = false;

    emitter.trigger(EVENTS.BEFORE_RENDER, {
      type: EVENTS.BEFORE_RENDER
    });

    this._onRender(entity, camera);

    emitter.trigger(EVENTS.RENDER, {
      type: EVENTS.RENDER
    });
  }

  /**
   *
   * @param entity
   * @param camera
   */
  public queueRender(entity: Entity, camera: Camera) {
    if (this._renderQueued) return;

    this._renderQueued = true;

    requestAnimationFrame(() => {
      this.render(entity, camera);
    });
  }

  protected _onRender(entity: Entity, camera: Camera) {
    const ctx = this.ctx;

    if (ctx.lost) return;

    ctx.clear();
    entity.render(this, camera);
  }
}

export default WebGLRenderer;
