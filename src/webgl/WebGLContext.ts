/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4 } from "gl-matrix";
import Camera from "../core/Camera";
import Entity from "../core/Entity";
import ShaderProgram from "../core/ShaderProgram";
import View360Error from "../core/View360Error";
import Geometry from "../geometry/Geometry";
import * as BROWSER from "../const/browser";
import ERROR from "../const/error";
import { DEFAULT_CLASS } from "../const/external";
import VertexArrayObject from "../core/VertexArrayObject";
import BufferAttribute from "../core/BufferAttribute";

class WebGLContext {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext | WebGL2RenderingContext;
  private _contextLost: boolean;
  private _maxTextureSize: number;
  private _isWebGL2: boolean;
  private _extensions: {
    vao: OES_vertex_array_object | null
  };

  public get maxTextureSize() { return this._maxTextureSize; }
  public get isWebGL2() { return this._isWebGL2; }
  public get supportVAO() { return this._isWebGL2 || !!this._extensions.vao; }
  public get lost() { return this._contextLost; }

  public constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._contextLost = false;
    this._extensions = {
      vao: null
    };
  }

  public init() {
    const canvas = this._canvas;

    this._gl = this._getContext(canvas);

    const gl = this._gl;
    this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._isWebGL2 = gl instanceof WebGL2RenderingContext;

    if (!this._isWebGL2) {
      this._extensions.vao = gl.getExtension("OES_vertex_array_object");
    }

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_LOST, this._onContextLost);
    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_RESTORED, this._onContextRestore);

    // gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
  }

  public clear() {
    const gl = this._gl;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  public createVAO(geometry: Geometry, shaderProgram: ShaderProgram) {
    const nativeVAO = this._createNativeVAO();

    if (nativeVAO) {
      this._bindNativeVAO(nativeVAO);

      this._supplyIndiciesData(geometry.indicies, this.createBuffer());
      this._supplyAttributeData(geometry.vertices, shaderProgram.program, "position", this.createBuffer());
      this._supplyAttributeData(geometry.uvs, shaderProgram.program, "uv", this.createBuffer());

      this._bindNativeVAO(null);

      return new VertexArrayObject(nativeVAO, geometry.indicies.count, true);
    } else {
      return new VertexArrayObject(geometry, geometry.indicies.count, false);
    }
  }

  public drawVAO(vao: VertexArrayObject) {
    const gl = this._gl;

    if (vao.isNative) {
      this._bindNativeVAO(vao.obj);
    }

    gl.drawElements(gl.TRIANGLES, vao.count, gl.UNSIGNED_SHORT, 0);
  }

  public getUniformLocations(program: WebGLProgram, uniforms: Record<string, any>) {
    const gl = this._gl;

    const uniformLocations = Object.keys(uniforms).reduce((locations, key) => {
      locations[key] = gl.getUniformLocation(program, key);

      return locations;
    }, {});

    return {
      ...this._getCommonUniformLocations(program),
      ...uniformLocations
    };
  }

  public updateUniforms(entity: Entity, camera: Camera, shaderProgram: ShaderProgram) {
    const gl = this._gl;

    const uniforms = shaderProgram.uniforms;
    const uniformLocations = shaderProgram.uniformLocations;
    const worldMatrix = entity.worldMatrix;

    const mvMatrix = mat4.create();
    mat4.multiply(mvMatrix, camera.viewMatrix, worldMatrix);

    gl.uniformMatrix4fv(uniformLocations.uMVMatrix, false, mvMatrix);
    gl.uniformMatrix4fv(uniformLocations.uPMatrix, false, camera.projectionMatrix);

    // gl.uniform1i(uniformLocations.uTexture, 0);
    // gl.activeTexture(gl.TEXTURE0);
    // gl.bindTexture(gl.TEXTURE_2D, uniforms.uTexture.webglTexture);
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

  public createWebGLTexture(source: TexImageSource): WebGLTexture {
    const gl = this._gl;
    const texture = gl.createTexture()!;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

    return texture;
  }

  private _createNativeVAO() {
    const gl = this._gl;

    if (this._isWebGL2) {
      return (gl as WebGL2RenderingContext).createVertexArray()!;
    } else {
      const ext = this._extensions.vao;

      return ext?.createVertexArrayOES() || null;
    }
  }

  private _bindNativeVAO(vao: WebGLVertexArrayObject | null) {
    const gl = this._gl;

    if (this._isWebGL2) {
      (gl as WebGL2RenderingContext).bindVertexArray(vao);
    } else {
      const ext = this._extensions.vao;

      ext?.bindVertexArrayOES(vao);
    }
  }

  private _supplyIndiciesData(indicies: BufferAttribute<Uint16Array>, buffer: WebGLBuffer) {
    const gl = this._gl;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicies.data, gl.STATIC_DRAW);
  }

  private _supplyAttributeData(attribute: BufferAttribute<Float32Array>, program: WebGLProgram, name: string, buffer: WebGLBuffer) {
    const gl = this._gl;
    const attribLocation = gl.getAttribLocation(program, name);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, attribute.data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(attribLocation, attribute.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribLocation);
  }

  private _compileShader(type: number, src: string) {
    const gl = this._gl;
    const shader = gl.createShader(type)!;

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    return shader;
  }

  private _getCommonUniformLocations(program: WebGLProgram) {
    const gl = this._gl;

    return {
      uMVMatrix: gl.getUniformLocation(program, "uMVMatrix"),
      uPMatrix: gl.getUniformLocation(program, "uPMatrix"),
    };
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
