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
    this._fov = 90; // FIXME:
    this._aspect = 1;
  }

  public setAspect(width: number, height: number) {
    this._aspect = width / height;
  }

  /** */
  public lookAt(yaw: number, pitch: number, zoom: number) {
    const yawRad = toRadian(yaw);
    const pitchRad = toRadian(pitch);
    const newPos = vec3.create();

    newPos[1] = Math.sin(pitchRad);
    newPos[2] = Math.cos(pitchRad);

    newPos[0] = newPos[2] * Math.sin(-yawRad);
    newPos[2] = -newPos[2] * Math.cos(-yawRad);

    this.lookAtPos(newPos, zoom);
  }

  /** */
  public lookAtPos(pos: vec3, dist: number) {
    const dir = vec3.clone(pos);
    vec3.normalize(dir, dir);

    const up = this._up;
    const viewMatrix = this.viewMatrix;
    const projMatrix = this.projectionMatrix;

    const negDir = vec3.negate(vec3.create(), dir);
    const eye = vec3.scale(negDir, negDir, dist);
    const vfov = Math.atan(Math.tan(toRadian(this._fov / 2)) / this._aspect) * 2;

    mat4.lookAt(viewMatrix, eye, dir, up);
    mat4.perspective(projMatrix, vfov, this._aspect, 0.1, 100);
  }
}

export default Camera;
