/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360Error from "../core/View360Error";
import * as BROWSER from "../const/browser";
import ERROR from "../const/error";

class WebGLContext {
  private _gl: WebGLRenderingContext;

  public constructor(canvas: HTMLCanvasElement) {
    this._gl = this._getContext(canvas);
  }

  private _getContext(canvas: HTMLCanvasElement) {
    const webglIdentifiers = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
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
}

export default WebGLContext;
