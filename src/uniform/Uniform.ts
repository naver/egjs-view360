/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
abstract class Uniform {
  public needsUpdate: boolean;

  public constructor() {
    this.needsUpdate = true;
  }

  public abstract update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation): void;
}

export default Uniform;
