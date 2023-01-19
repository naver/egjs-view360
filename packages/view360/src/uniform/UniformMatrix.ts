/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4 } from "gl-matrix";
import Uniform from "./Uniform";

class UniformMatrix extends Uniform {
  public readonly matrix: mat4;

  public constructor(mat: mat4) {
    super();

    this.matrix = mat;
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    gl.uniformMatrix4fv(location, false, this.matrix);

    this.needsUpdate = false;
  }
}

export default UniformMatrix;
