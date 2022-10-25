/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4, vec3 } from "gl-matrix";
import { DEG_TO_RAD, RAD_TO_DEG } from "../const/internal";
import { toVerticalFov } from "../utils";

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
  /**
   * Current camera's zoom
   */
  public zoom: number;
  public position: vec3;

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
    this.position = vec3.create();

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
  }

  public moveTo(x: number, y: number, z: number) {
    const position = this.position;

    position[0] = x;
    position[1] = y;
    position[2] = z;
  }

  /**
   *
   * @returns Zoomed horizontal FOV, in degress
   */
  public getHorizontalFov(zoom = this.zoom) {
    return this._getZoomedHorizontalFov(zoom) * RAD_TO_DEG;
  }

  /**
   *
   * @returns Zoomed vertical FOV, in degress
   */
  public getVerticalFov(zoom = this.zoom) {
    const aspect = this._aspect;
    const hFov = this._getZoomedHorizontalFov(zoom); // In radians
    const vFov = toVerticalFov(hFov, aspect);

    return vFov * RAD_TO_DEG;
  }

  /**
   *
   */
  public updateMatrix() {
    const up = this._up;
    const aspect = this._aspect;
    const viewMatrix = this.viewMatrix;
    const projMatrix = this.projectionMatrix;
    const yawRad = DEG_TO_RAD * this.yaw;
    const pitchRad = DEG_TO_RAD * this.pitch;
    const position = this.position;
    const viewDir = vec3.create();

    viewDir[1] = Math.sin(pitchRad);
    viewDir[2] = Math.cos(pitchRad);

    viewDir[0] = viewDir[2] * Math.sin(-yawRad);
    viewDir[2] = -viewDir[2] * Math.cos(-yawRad);

    vec3.add(viewDir, viewDir, position);

    const hFov = this._getZoomedHorizontalFov(); // In radians
    const vFov = toVerticalFov(hFov, aspect);

    mat4.lookAt(viewMatrix, position, viewDir, up);
    mat4.perspective(projMatrix, vFov, aspect, 0.1, 100);
  }

  /**
   * @param zoom Current zoom value
   * @returns horizontal fov including zoom, in radian
   */
  private _getZoomedHorizontalFov(zoom = this.zoom) {
    return 2 * Math.atan(Math.tan((DEG_TO_RAD * this._baseFov * 0.5)) / zoom);
  }
}

export default Camera;
