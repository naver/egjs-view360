/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4, vec3 } from "gl-matrix";
import { DEG_TO_RAD } from "../const/internal";

export interface CameraOptions {
  yaw: number;
  pitch: number;
  initialZoom: number;
  fov: number;
}

/** */
class Camera {
  public viewMatrix: mat4;
  public projectionMatrix: mat4;
  public yaw: number;
  public pitch: number;
  public zoom: number;

  private _up: vec3;
  private _aspect: number;
  private _baseFov: number;

  /**
   * @readonly
   */
  public get aspect() { return this._aspect; }
  /**
   *
   */
  public get baseFov() { return this._baseFov; }
  public set baseFov(val: number) { this._baseFov = val; }

  public constructor({
    yaw,
    pitch,
    initialZoom,
    fov
  }: CameraOptions) {
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();

    this.yaw = yaw;
    this.pitch = pitch;
    this.zoom = initialZoom;

    this._up = vec3.fromValues(0, 1, 0);
    this._baseFov = fov;
    this._aspect = 1;
  }

  public resize(width: number, height: number) {
    this._aspect = width / height;
  }

  /** */
  public lookAt(yaw: number, pitch: number, zoom: number) {
    this.yaw = yaw;
    this.pitch = pitch;
    this.zoom = zoom;

    this.updateMatrix();
  }

  /**
   *
   */
  public updateMatrix() {
    const up = this._up;
    const viewMatrix = this.viewMatrix;
    const projMatrix = this.projectionMatrix;
    const yawRad = DEG_TO_RAD * this.yaw;
    const pitchRad = DEG_TO_RAD * this.pitch;
    const viewDir = vec3.create();

    viewDir[1] = Math.sin(pitchRad);
    viewDir[2] = Math.cos(pitchRad);

    viewDir[0] = viewDir[2] * Math.sin(-yawRad);
    viewDir[2] = -viewDir[2] * Math.cos(-yawRad);

    const eye = vec3.create(); // Origin
    const hFov = this._getEffectiveFov();
    const vFov = this._toVerticalFov(hFov);

    mat4.lookAt(viewMatrix, eye, viewDir, up);
    mat4.perspective(projMatrix, vFov, this._aspect, 0.1, 100);
  }

  // TODO: 세로 2배의 경우는? 가이드 작성
  /**
   * @param zoom Current zoom value
   * @returns horizontal fov including zoom, in radian
   */
  private _getEffectiveFov() {
    return Math.atan(Math.tan((DEG_TO_RAD * this._baseFov * 0.5) / this.zoom)) * 2;
  }

  private _toVerticalFov(horizontalFov: number) {
    return Math.atan(Math.tan(horizontalFov * 0.5) / this._aspect) * 2;
  }
}

export default Camera;
