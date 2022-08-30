/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ShaderProgram from "../core/ShaderProgram";

/** */
class Material {
  private _vs: string;
  private _fs: string;
  private _uniforms: Record<string, any>;

  public constructor(vertexShader: string, fragmentShader: string, uniforms: Record<string, any>) {
    this._vs = vertexShader;
    this._fs = fragmentShader;
    this._uniforms = uniforms;
  }

  /** */
  public createProgram(gl: WebGLRenderingContext): ShaderProgram {
    const program = new ShaderProgram(gl, this._vs, this._fs);

    return program;
  }
}

export default Material;
