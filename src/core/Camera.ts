/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4, vec3 } from "gl-matrix";
import { toRadian } from "../utils";

/** */
class Camera {
  public viewMatrix: mat4;
  public projectionMatrix: mat4;

  private _up: vec3;
  private _aspect: number;
  private _fov: number;

  public get aspect() { return this._aspect; }

  public constructor() {
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();

    this._up = vec3.fromValues(0, 1, 0);
    this._fov = 50; // FIXME:
    this._aspect = 1;
  }

  public setAspect(width: number, height: number) {
    this._aspect = width / height;
  }

  /** */
  public lookAt(yaw: number, pitch: number, zoom: number) {

  }

  /** */
  public lookAtPos(pos: vec3) {
    const dir = vec3.clone(pos);
    vec3.normalize(dir, dir);

    const up = this._up;
    const viewMatrix = this.viewMatrix;
    const projMatrix = this.projectionMatrix;
    const eye = mat4.getTranslation(vec3.create(), viewMatrix);

    mat4.lookAt(viewMatrix, eye, dir, up);
    mat4.invert(viewMatrix, viewMatrix);

    mat4.perspective(projMatrix, toRadian(this._fov), this._aspect, 0.1, 10);
  }
}

export default Camera;
