/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Uniform from "./Uniform";

class UniformFloat extends Uniform {
  public val: number;

  public constructor(val: number) {
    super();

    this.val = val;
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    gl.uniform1f(location, this.val);

    this.needsUpdate = false;
  }
}

export default UniformFloat;
