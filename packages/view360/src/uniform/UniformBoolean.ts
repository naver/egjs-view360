/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Uniform from "./Uniform";

class UniformBoolean extends Uniform {
  public val: boolean;

  public constructor(val: boolean) {
    super();

    this.val = val;
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    gl.uniform1f(location, this.val ? 1 : 0);

    this.needsUpdate = false;
  }
}

export default UniformBoolean;
