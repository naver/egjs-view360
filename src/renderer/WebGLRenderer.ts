/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Renderer, { RendererEvents } from "./Renderer";
import View360Error from "../core/View360Error";
import Camera from "../core/Camera";
import Entity from "../core/Entity";
import Material from "../core/Material";
import Geometry from "../geometry/Geometry";
import { EVENTS } from "../const/external";
import ERROR from "../const/error";
import * as BROWSER from "../const/browser";
import { DEFAULT_CLASS } from "../const/external";
import Emittable from "../type/Emittable";

class WebGLRenderer extends Renderer {
  private _ctx: WebGLRenderingContext;
  private _contextLost: boolean;
  private _renderQueued: boolean;
  private _lastFrameTime: number;

  public constructor(emitter: Emittable<RendererEvents>, canvas: HTMLCanvasElement) {
    super(emitter, canvas);

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_LOST, this._onContextLost);
    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_RESTORED, this._onContextRestore);

    this._contextLost = false;
    this._renderQueued = false;
    this._lastFrameTime = 0;
  }

  public init() {
    const gl = this._getContext();

    this._gl = gl;
    this._lastFrameTime = Date.now();
  }

  public destroy(): void {
    this._renderQueued = false;
  }

  public resize() {
    super.resize();

    const gl = this._gl;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }

  /**
   *
   */
  public renderFrame(entity: Entity, camera: Camera, delta?: number) {
    const time = Date.now();
    const emitter = this._emitter;
    const timeDelta = delta ?? (time - this._lastFrameTime);

    this._renderQueued = false;

    emitter.trigger(EVENTS.BEFORE_RENDER, {
      type: EVENTS.BEFORE_RENDER,
      delta: timeDelta
    });

    this._onRender(entity, camera, timeDelta);
    this._lastFrameTime = time;

    emitter.trigger(EVENTS.RENDER, {
      type: EVENTS.RENDER,
      delta: timeDelta
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
      const delta = Date.now() - this._lastFrameTime;
      this.renderFrame(entity, camera, delta);
    });
  }

  public drawGeometry(geometry: Geometry) {
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(), gl.STATIC_DRAW);
    // gl.drawElements(gl.TRIANGLES);
  }

  public useMaterial(material: Material) {
    // gl.useProgram()
  }

  protected _onRender(entity: Entity, camera: Camera, delta: number) {
    if (this._contextLost) return;

    const gl = this._gl;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    entity.render(this);

    // TODO:
  }

  private _onContextLost = () => {
    const canvas = this._canvas;
    canvas.classList.add(DEFAULT_CLASS.CTX_LOST);
  };

  private _onContextRestore = () => {
    const canvas = this._canvas;
    canvas.classList.remove(DEFAULT_CLASS.CTX_LOST);
  };
}

export default WebGLRenderer;
