/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Renderer from "./Renderer";
import Camera from "../core/Camera";
import Entity from "../core/Entity";
import WebGLContext from "../webgl/WebGLContext";

class WebGLRenderer extends Renderer {
  public readonly ctx: WebGLContext;

  public constructor(canvas: HTMLCanvasElement, debug: boolean) {
    super(canvas);

    this.ctx = new WebGLContext(canvas, debug);
  }

  /**
   *
   */
  public render(entity: Entity, camera: Camera) {
    const ctx = this.ctx;

    if (ctx.lost) return;

    ctx.clear();
    entity.render(this, camera);
  }

  public resize() {
    super.resize();
    this.ctx.resize();
  }
}

export default WebGLRenderer;
