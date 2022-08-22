/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ShaderProgram from "../core/ShaderProgram";

/** */
class Projection {
  protected _uniforms: Record<string, any>;

  private _vs: string;
  private _fs: string;

  public constructor(vertexShader: string, fragmentShader: string, uniforms: Record<string, any>) {
    this._vs = vertexShader;
    this._fs = fragmentShader;
    this._uniforms = uniforms;
  }

  public createProgram(gl: WebGLRenderingContext): ShaderProgram {
    const program = new ShaderProgram(gl, this._vs, this._fs);

    return program;
  }
}

export default Projection;
