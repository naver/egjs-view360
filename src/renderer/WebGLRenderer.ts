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
  protected _gl: WebGLRenderingContext;
  protected _contextLost: boolean;

  public constructor(emitter: Emittable<RendererEvents>, canvas: HTMLCanvasElement) {
    super(emitter, canvas);

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_LOST, this._onContextLost);
    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_RESTORED, this._onContextRestore);

    this._contextLost = false;
  }

  public init() {
    const gl = this._getContext();

    this._gl = gl;
  }

  protected _onRender() {
    const gl = this._gl;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // TODO:
  }

  private _getContext() {
    const canvas = this._canvas;
    const webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context: WebGLRenderingContext | null = null;
    const contextAttributes = {
      preserveDrawingBuffer: false,
      antialias: false
    };

    const onWebglContextCreationError = e => e.statusMessage;

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_CREATE_ERROR, onWebglContextCreationError);

    for (const identifier of webglIdentifiers) {
      try {
        context = canvas.getContext(identifier, contextAttributes) as WebGLRenderingContext;
      } catch (t) {} // eslint-disable-line no-empty
      if (context) {
        break;
      }
    }

    canvas.removeEventListener(BROWSER.EVENTS.CONTEXT_CREATE_ERROR, onWebglContextCreationError);

    if (!context) {
      throw new View360Error(ERROR.MESSAGES.WEBGL_NOT_SUPPORTED, ERROR.CODES.WEBGL_NOT_SUPPORTED);
    }

    return context;
  }

  private _onContextLost = () => {
    const canvas = this._canvas;
    canvas.classList.add(DEFAULT_CLASS.CTX_LOST);
  };

  private _onContextRestore = () => {
    const canvas = this._canvas;
    canvas.classList.remove(DEFAULT_CLASS.CTX_LOST);
  };
}

export default WebGLRenderer;
