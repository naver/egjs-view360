/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4 } from "gl-matrix";
import Camera from "./Camera";
import Projection from "../projection/Projection";
import WebGLContext from "./WebGLContext";
import XRManager from "./XRManager";

/**
 * Projection renderer, based on WebGL
 * @ko WebGL 기반의 프로젝션 렌더러
 * @since 4.0.0
 */
class WebGLRenderer {
  private _canvas: HTMLCanvasElement;
  private _elementSize: { x: number, y: number };
  private _pixelRatio: number;

  public readonly ctx: WebGLContext;

  /**
   * Canvas element
   * @ko 캔버스 엘리먼트
   * @since 4.0.0
   */
  public get canvas() { return this._canvas; }
  /**
   * Canvas's width (`devicePixelRatio` is not applied)
   * @ko 캔버스의 보이는 너비 (`devicePixelRatio`가 적용되지 않은)
   * @since 4.0.0
   */
  public get width() { return this._elementSize.x; }
  /**
   * Canvas's height (`devicePixelRatio` is not applied)
   * @ko 캔버스의 높이 (`devicePixelRatio`가 적용되지 않은)
   * @since 4.0.0
   */
  public get height() { return this._elementSize.y; }
  /**
   * Current `devicePixelRatio` value.
   * @ko 현재 `devicePixelRatio` 값.
   * @since 4.0.0
   * @example
   * ```js
   * cosnt renderingWidth = view360.renderer.width * view360.renderer.pixelRatio;
   * ```
   */
  public get pixelRatio() { return this._pixelRatio; }
  /**
   * Width / height ratio (= width / height)
   * @ko 너비 / 높이의 비율 (= width / height)
   * @since 4.0.0
   * @example
   * ```js
   * const aspect = view360.renderer.width / view360.renderer.pixelRatio;
   * assert(aspect === view360.renderer.aspect);
   * ```
   */
  public get aspect() { return this._elementSize.x / this._elementSize.y; }

  /**
   * Create new instance
   * @ko 새 인스턴스를 생성합니다.
   * @param canvas - Canvas element {@ko 캔버스 엘리먼트}
   * @param debug - Whether to enable WebGL debugging {@ko WebGL debug 활성화 여부 }
   */
  public constructor(canvas: HTMLCanvasElement, debug: boolean) {
    this._canvas = canvas;
    this._elementSize = { x: 0, y: 0 };
    this._pixelRatio = 1;
    this.ctx = new WebGLContext(canvas, debug);
  }

  /**
   * Destroy instance and release all resources.
   * @ko 인스턴스를 제거하고 사용된 리소스를 전부 해제합니다.
   * @since 4.0.0
   */
  public destroy() {
    const canvas = this._canvas;

    this.ctx.destroy();
    canvas.width = 1;
    canvas.height = 1;
  }

  /**
   * Resize canvas and renew inner size cache.
   * @ko 캔버스의 크기를 재계산해서 내부의 사이즈 캐시값을 갱신합니다.
   * @since 4.0.0
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
    this.ctx.resize();
  }

  /**
   * Render projection
   * @ko 프로젝션을 렌더링합니다.
   * @param projection - Projection to render {@ko 렌더링할 프로젝션}
   * @param cameraa - Camera instance {@ko 카메라의 인스턴스}
   * @since 4.0.0
   */
  public render(projection: Projection, camera: Camera) {
    const ctx = this.ctx;
    const mesh = projection.mesh;
    if (ctx.lost || !mesh) return;

    ctx.clear();
    ctx.useProgram(mesh.program);
    ctx.updateCommonUniforms(mesh, camera, mesh.program);
    projection.update(camera);
    ctx.updateUniforms(mesh.program);
    ctx.draw(mesh.vao, mesh.program);
  }

  /**
   * Render VR frame, only used for rendering frames inside VR sessions.
   * @ko VR 프레임을 렌더링합니다. VR 세션 진입 도중에만 사용됩니다.
   * @internal
   * @param projection - Projection to render {@ko 렌더링할 프로젝션}
   * @param vr - Instance of XRManager {@ko XRManager의 인스턴스}
   * @param frame - VR frame {@ko VR 프레임}
   * @since 4.0.0
   */
  public renderVR(projection: Projection, vr: XRManager, frame: XRFrame) {
    const ctx = this.ctx;
    const mesh = projection.mesh;
    const eyeParams = vr.getEyeParams(frame);

    if (!eyeParams || !mesh) return;

    ctx.bindXRFrame(frame);
    ctx.useProgram(mesh.program);
    ctx.updateUniforms(mesh.program);

    eyeParams.forEach((eye, eyeIndex) => {
      const viewport = eye.viewport;
      // We're using "mesh.matrix"(=local matrix) here for efficiency
      // As projection doesn't require world matrix, as it doesn't have any parent or child
      const mvMatrix = mat4.multiply(mat4.create(), eye.vMatrix, mesh.matrix);

      ctx.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      ctx.updateVRUniforms(mesh.program, mvMatrix, eye.pMatrix, eyeIndex);
      ctx.draw(mesh.vao, mesh.program);
    });
  }
}

export default WebGLRenderer;
