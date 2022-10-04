/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Uniform from "../webgl/Uniform";
import WebGLContext from "../webgl/WebGLContext";
import { UniformLocations } from "../type/internal";

class ShaderProgram<T extends Record<string, Uniform> = Record<string, Uniform>> {
  public readonly program: WebGLProgram;
  public readonly uniforms: T;
  public readonly uniformLocations: UniformLocations<T>;

  public constructor(ctx: WebGLContext, vertexShader: string, fragmentShader: string, uniforms: T) {
    this.program = ctx.createProgram(vertexShader, fragmentShader);
    this.uniforms = uniforms;
    this.uniformLocations = ctx.getUniformLocations(this.program, uniforms);
  }
}

export default ShaderProgram;
