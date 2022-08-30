/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4, vec3 } from "gl-matrix";

/** */
class Camera {
  private _localMatrix: mat4;
  private _up: vec3;

  public constructor() {
    this._localMatrix = mat4.create();
    this._up = vec3.fromValues(0, 1, 0);
  }

  /** */
  public lookAt(pos: vec3) {
    const dir = vec3.clone(pos);
    vec3.normalize(dir, dir);

    const up = this._up;
    const localMatrix = this._localMatrix;
    const center = mat4.getTranslation(vec3.create(), localMatrix);

    mat4.lookAt(localMatrix, dir, center, up);
  }
}

export default Camera;
