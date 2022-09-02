/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "../core/Camera";
import ShaderProgram from "../core/ShaderProgram";
import View360Error from "../core/View360Error";
import Geometry from "../geometry/Geometry";
import * as BROWSER from "../const/browser";
import ERROR from "../const/error";
import { DEFAULT_CLASS } from "../const/external";
import VertexArrayObject from "../core/VAO";

class WebGLContext {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext | WebGL2RenderingContext;
  private _contextLost: boolean;
  private _maxTextureSize: number;
  private _isWebGL2: boolean;
  private _supportVAO: boolean;

  public get maxTextureSize() { return this._maxTextureSize; }
  public get isWebGL2() { return this._isWebGL2; }
  public get supportVAO() { return this._supportVAO; }
  public get lost() { return this._contextLost; }

  public constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._contextLost = false;
  }

  public init() {
    const canvas = this._canvas;

    this._gl = this._getContext(canvas);

    const gl = this._gl;
    this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._isWebGL2 = gl instanceof WebGL2RenderingContext;
    this._supportVAO = this._isWebGL2 || !!gl.getExtension("OES_vertex_array_object");

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_LOST, this._onContextLost);
    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_RESTORED, this._onContextRestore);
  }

  public clear() {
    const gl = this._gl;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  public processGeometry(geometry: Geometry, shaderProgram: ShaderProgram) {
    const gl = this._gl;
    const vao = this.createVAO();

    if (this._isWebGL2) {
      (gl as WebGL2RenderingContext).bindVertexArray(vao);
    } else {
      const ext = gl.getExtension("OES_vertex_array_object")!;

      ext.bindVertexArrayOES(vao);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indicies.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indicies.data, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(shaderProgram.program, "position");
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertices.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices.data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLoc, geometry.vertices.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    const uvLoc = gl.getAttribLocation(shaderProgram.program, "uv");
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.uvs.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.uvs.data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(uvLoc, geometry.uvs.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(uvLoc);

    if (this._isWebGL2) {
      (gl as WebGL2RenderingContext).bindVertexArray(null);
    } else {
      const ext = gl.getExtension("OES_vertex_array_object")!;

      ext.bindVertexArrayOES(null);
    }

    return vao;
  }

  public drawVAO(vao: VertexArrayObject) {
    const gl = this._gl;

    if (this._isWebGL2) {
      (gl as WebGL2RenderingContext).bindVertexArray(vao.obj);
    } else {
      const ext = gl.getExtension("OES_vertex_array_object")!;

      ext.bindVertexArrayOES(vao.obj);
    }

    gl.drawElements(gl.TRIANGLES, vao.indicesCount, gl.UNSIGNED_SHORT, 0);
  }

  public updateUniforms(camera: Camera) {
    const gl = this._gl;


  }

  public useProgram(shaderProgram: ShaderProgram) {
    const gl = this._gl;

    gl.useProgram(shaderProgram.program);
  }

  public createProgram(vertexShader: string, fragmentShader: string) {
    const gl = this._gl;
    const program = gl.createProgram()!;

    const vs = this._compileShader(gl.VERTEX_SHADER, vertexShader);
    const fs = this._compileShader(gl.FRAGMENT_SHADER, fragmentShader);

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "position");
    gl.bindAttribLocation(program, 1, "uv");
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      let shaderLog: string | null = null;

      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        shaderLog = gl.getShaderInfoLog(vs);
      } else if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        shaderLog = gl.getShaderInfoLog(fs);
      }

      throw new View360Error(ERROR.MESSAGES.FAILED_LINKING_PROGRAM(gl.getProgramInfoLog(program), shaderLog), ERROR.CODES.FAILED_LINKING_PROGRAM);
    }

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return program;
  }

  public createBuffer(): WebGLBuffer {
    return this._gl.createBuffer()!;
  }

  public createVAO() {
    const gl = this._gl;

    if (this._isWebGL2) {
      return (gl as WebGL2RenderingContext).createVertexArray()!;
    } else {
      const ext = gl.getExtension("OES_vertex_array_object");

      // FIXME: extension 존재하지 않을 경우
      return ext!.createVertexArrayOES()!;
    }
  }

  private _compileShader(type: number, src: string) {
    const gl = this._gl;
    const shader = gl.createShader(type)!;

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    return shader;
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

  private _onContextLost = () => {
    const canvas = this._canvas;
    canvas.classList.add(DEFAULT_CLASS.CTX_LOST);
    this._contextLost = true;
  };

  private _onContextRestore = () => {
    const canvas = this._canvas;
    canvas.classList.remove(DEFAULT_CLASS.CTX_LOST);
    this._contextLost = false;
  };
}

export default WebGLContext;
