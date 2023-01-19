/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Uniform from "./Uniform";

class UniformVector4Array extends Uniform {
  public val: number[][];

  public constructor(val: number[][]) {
    super();

    this.val = val;
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    gl.uniform4fv(location, this.val.reduce((arr, vector) => [...arr, ...vector], []));

    this.needsUpdate = false;
  }
}

export default UniformVector4Array;
