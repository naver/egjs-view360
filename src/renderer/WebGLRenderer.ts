/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Renderer, { RendererEvents } from "./Renderer";
import View360Error from "../core/View360Error";
import ERROR from "../const/error";
import * as BROWSER from "../const/browser";
import { DEFAULT_CLASS } from "../const/external";
import Emittable from "../type/Emittable";

class WebGLRenderer extends Renderer {
  protected _rootEl: HTMLCanvasElement;
  protected _gl: WebGLRenderingContext;
  protected _contextLost: boolean;
  protected _program: WebGLProgram | null;

  public constructor(emitter: Emittable<RendererEvents>, canvas: HTMLCanvasElement) {
    super(emitter, canvas);

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_LOST, this._onContextLost);
    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_RESTORED, this._onContextRestore);

    this._contextLost = false;
    this._program = null;
  }

  public init() {
    this._gl = this._getContext();
    this._program = this._createWebGLProgram();
  }

  protected _onRender() {
    // TODO:
  }

  private _getContext() {
    const canvas = this._rootEl;
    const webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context: WebGLRenderingContext | null = null;
    const contextAttributes = {
      preserveDrawingBuffer: false,
      antialias: false
    };

    const onWebglcontextcreationerror = e => e.statusMessage;

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_CREATE_ERROR, onWebglcontextcreationerror);

    for (const identifier of webglIdentifiers) {
      try {
        context = canvas.getContext(identifier, contextAttributes) as WebGLRenderingContext;
      } catch (t) {} // eslint-disable-line no-empty
      if (context) {
        break;
      }
    }

    canvas.removeEventListener(BROWSER.EVENTS.CONTEXT_CREATE_ERROR, onWebglcontextcreationerror);

    if (!context) {
      throw new View360Error(ERROR.MESSAGES.WEBGL_NOT_SUPPORTED, ERROR.CODES.WEBGL_NOT_SUPPORTED);
    }

    return context;
  }

  private _createWebGLProgram() {
    const gl = this._gl;

    const program = gl.createProgram()!;
    const vs = this._compileShader(VS, gl.VERTEX_SHADER);
    const fs = this._compileShader(FS, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter( program, gl.LINK_STATUS)) {
      throw new View360Error(ERROR.MESSAGES.FAILED_COMPILE_PROGRAM(gl.getProgramInfoLog(program)), ERROR.CODES.FAILED_COMPILE_PROGRAM);
    }

    return program;
  }

  private _compileShader(src: string, type: WebGLRenderingContextBase["VERTEX_SHADER"] | WebGLRenderingContextBase["FRAGMENT_SHADER"]) {
    const gl = this._gl;
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

  private _onContextLost = () => {
    const canvas = this._rootEl;
    canvas.classList.add(DEFAULT_CLASS.CTX_LOST);
  };

  private _onContextRestore = () => {
    const canvas = this._rootEl;
    canvas.classList.remove(DEFAULT_CLASS.CTX_LOST);
  };
}

export default WebGLRenderer;
