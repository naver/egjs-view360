/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Renderer from "./Renderer";
import Camera from "../core/Camera";
import Entity from "../core/Entity";
import { EVENTS } from "../const/external";
import WebGLContext from "../webgl/WebGLContext";

class WebGLRenderer extends Renderer {
  public readonly ctx: WebGLContext;
  private _renderQueued: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.ctx = new WebGLContext(canvas);
  }

  /**
   *
   */
  public render(entity: Entity, camera: Camera) {
    const ctx = this.ctx;

    if (ctx.lost) return;

    this.trigger(EVENTS.BEFORE_RENDER);

    this._onRender(entity, camera);

    this.trigger(EVENTS.RENDER);
  }

  protected _onRender(entity: Entity, camera: Camera) {
    const ctx = this.ctx;

    ctx.clear();
    entity.render(this, camera);
  }
}

export default WebGLRenderer;