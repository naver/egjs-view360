import View360Error from "./View360Error";
import ERROR from "../const/error";

class ShaderProgram {
  private _program: WebGLProgram;

  public get program() { return this._program; }

  public constructor(ctx: WebGLRenderingContext, vs: string, fs: string) {
    this._program = this._createProgram(
      ctx,
      this._compileShader(ctx, ctx.VERTEX_SHADER, vs),
      this._compileShader(ctx, ctx.FRAGMENT_SHADER, fs)
    );
  }

  private _compileShader(gl: WebGLRenderingContext, type: number, src: string) {
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

  private _createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
    const program = gl.createProgram()!;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new View360Error(ERROR.MESSAGES.FAILED_COMPILE_PROGRAM(gl.getProgramInfoLog(program)), ERROR.CODES.FAILED_COMPILE_PROGRAM);
    }

    return program;
  }
}

export default ShaderProgram;
