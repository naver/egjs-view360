/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
abstract class Uniform {
  public needsUpdate: boolean;

  public constructor() {
    this.needsUpdate = true;
  }

  public abstract update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation, isWebGL2: boolean): void;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public destroy(gl: WebGLRenderingContext | WebGL2RenderingContext) {
    // DO_NOTHING
  }
}

export default Uniform;
