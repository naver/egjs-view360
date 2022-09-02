/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import WebGLContext from "../webgl/WebGLContext";

class ShaderProgram {
  public readonly program: WebGLProgram;
  public readonly uniforms: Record<string, any>;

  public constructor(ctx: WebGLContext, vertexShader: string, fragmentShader: string, uniforms: Record<string, any>) {
    this.program = ctx.createProgram(vertexShader, fragmentShader);
    this.uniforms = uniforms;
  }
}

export default ShaderProgram;
