/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360Error from "../core/View360Error";
import ERROR from "../const/error";

/** */
class Material {
  protected _uniforms: Record<string, any>;

  private _vs: string;
  private _fs: string;

  public constructor(vertexShader: string, fragmentShader: string, uniforms: Record<string, any>) {
    this._vs = vertexShader;
    this._fs = fragmentShader;
    this._uniforms = uniforms;
  }

  public createProgram(gl: WebGLRenderingContext): WebGLProgram {
    const program = gl.createProgram()!;
    const vs = this._compileShader(gl, this._vs, gl.VERTEX_SHADER);
    const fs = this._compileShader(gl, this._fs, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new View360Error(ERROR.MESSAGES.FAILED_COMPILE_PROGRAM(gl.getProgramInfoLog(program)), ERROR.CODES.FAILED_COMPILE_PROGRAM);
    }

    return program;
  }

  private _compileShader(gl: WebGLRenderingContext, src: string, type: WebGLRenderingContextBase["VERTEX_SHADER"] | WebGLRenderingContextBase["FRAGMENT_SHADER"]) {
    const shader = gl.createShader(type);

    if (!shader) {
      throw new View360Error(ERROR.MESSAGES.FAILED_COMPILE_SHADER(`Unexpected Error: ${gl.getError()}`), ERROR.CODES.FAILED_COMPILE_SHADER);
    }

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new View360Error(ERROR.MESSAGES.FAILED_COMPILE_SHADER(gl.getShaderInfoLog(shader)), ERROR.CODES.FAILED_COMPILE_SHADER);
    }

    return shader;
  }
}

export default Material;
