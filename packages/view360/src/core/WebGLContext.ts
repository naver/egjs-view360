/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { mat4 } from "gl-matrix";
import Uniform from "../uniform/Uniform";
import Camera from "./Camera";
import Object3D from "./Object3D";
import ShaderProgram from "./ShaderProgram";
import View360Error from "./View360Error";
import VertexArrayObject from "./VertexArrayObject";
import VertexData from "./VertexData";
import Texture from "../texture/Texture";
import Geometry from "../geometry/Geometry";
import * as BROWSER from "../const/browser";
import ERROR from "../const/error";
import { DEFAULT_CLASS } from "../const/external";
import { UniformLocations } from "../type/internal";

/**
 * @hidden
 */
class WebGLContext {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext | WebGL2RenderingContext;
  private _contextLost: boolean;
  private _maxTextureSize: number;
  private _isWebGL2: boolean;
  private _debug: boolean;
  private _extensions: {
    vao: OES_vertex_array_object | null;
    loseContext: WEBGL_lose_context | null;
  };

  public get canvas() { return this._canvas; }
  public get maxTextureSize() { return this._maxTextureSize; }
  public get isWebGL2() { return this._isWebGL2; }
  public get supportVAO() { return this._isWebGL2 || !!this._extensions.vao; }
  public get lost() { return this._contextLost; }
  public get debug() { return this._debug; }

  public constructor(canvas: HTMLCanvasElement, debug: boolean) {
    this._canvas = canvas;
    this._contextLost = false;
    this._debug = debug;
    this._extensions = {
      vao: null,
      loseContext: null
    };
  }

  public init() {
    const canvas = this._canvas;

    const { gl, isWebGL2 } = this._getContext(canvas);

    this._gl = gl;
    this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._isWebGL2 = isWebGL2;

    if (!this._isWebGL2) {
      this._extensions.vao = gl.getExtension("OES_vertex_array_object");
    }

    this._extensions.loseContext = gl.getExtension("WEBGL_lose_context");

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_LOST, this._onContextLost);
    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_RESTORED, this._onContextRestore);

    // gl.enable(gl.DEPTH_TEST);
  }

  public destroy() {
    const gl = this._gl;
    const canvas = this._canvas;

    if (gl) {
      // gl is not defined when destroy called before init
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    canvas.removeEventListener(BROWSER.EVENTS.CONTEXT_LOST, this._onContextLost);
    canvas.removeEventListener(BROWSER.EVENTS.CONTEXT_RESTORED, this._onContextRestore);
  }

  public forceLoseContext() {
    const extension = this._extensions.loseContext;

    if (!extension) return;

    extension.loseContext();
  }

  public forceRestoreContext() {
    const extension = this._extensions.loseContext;

    if (!extension) return;

    extension.restoreContext();
  }

  public clear() {
    const gl = this._gl;

    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  public resize() {
    const gl = this._gl;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }

  public viewport(x: number, y: number, width: number, height: number) {
    const gl = this._gl;

    gl.viewport(x, y, width, height);
  }

  public createVAO(geometry: Geometry, shaderProgram: ShaderProgram) {
    const nativeVAO = this._createNativeVAO();

    const vao = new VertexArrayObject(nativeVAO, geometry, {
      indicies: this._createBuffer(),
      position: this._createBuffer(),
      uv: this._createBuffer()
    });

    if (nativeVAO) {
      this._bindNativeVAO(nativeVAO);
      this._supplyGeometryData(vao, shaderProgram);
      this._bindNativeVAO(null);
      this._unbindBuffers();
    }

    return vao;
  }

  public draw(vao: VertexArrayObject, shaderProgram: ShaderProgram) {
    const gl = this._gl;

    if (vao.obj) {
      this._bindNativeVAO(vao.obj);
    } else {
      this._supplyGeometryData(vao, shaderProgram);
    }

    gl.drawElements(gl.TRIANGLES, vao.count, gl.UNSIGNED_SHORT, 0);

    if (vao.obj) {
      this._bindNativeVAO(null);
    } else {
      this._unbindBuffers();
    }
  }

  public releaseVAO(vao: VertexArrayObject) {
    if (vao.obj) {
      this._deleteNativeVAO(vao.obj);
    }

    this._deleteBuffer(vao.buffers.indicies);
    this._deleteBuffer(vao.buffers.position);
    this._deleteBuffer(vao.buffers.uv);
  }

  public getUniformLocations<T extends Record<string, Uniform>>(program: WebGLProgram, uniforms: T): UniformLocations<T> {
    const gl = this._gl;

    const uniformLocations = Object.keys(uniforms).reduce((locations, key) => {
      locations[key as keyof T] = gl.getUniformLocation(program, key)!;

      return locations;
    }, {} as UniformLocations<T>);

    return {
      ...this._getCommonUniformLocations(program),
      ...uniformLocations
    };
  }

  public updateCommonUniforms(entity: Object3D, camera: Camera, shaderProgram: ShaderProgram) {
    const gl = this._gl;

    const uniformLocations = shaderProgram.uniformLocations;

    // We're using "matrix"(=local matrix) here for efficiency
    // As projection doesn't require world matrix, as it doesn't have any parent or child
    const matrix = entity.matrix;
    const mvMatrix = mat4.create();
    mat4.multiply(mvMatrix, camera.viewMatrix, matrix);

    gl.uniformMatrix4fv(uniformLocations.uMVMatrix, false, mvMatrix);
    gl.uniformMatrix4fv(uniformLocations.uPMatrix, false, camera.projectionMatrix);
  }

  public updateVRUniforms(shaderProgram: ShaderProgram, mvMatrix: mat4, pMatrix: mat4, eyeIndex: number) {
    const gl = this._gl;

    const uniformLocations = shaderProgram.uniformLocations;

    gl.uniformMatrix4fv(uniformLocations.uMVMatrix, false, mvMatrix);
    gl.uniformMatrix4fv(uniformLocations.uPMatrix, false, pMatrix);

    if (uniformLocations.uEye) {
      gl.uniform1f(uniformLocations.uEye, eyeIndex);
    }
  }

  public updateUniforms(shaderProgram: ShaderProgram) {
    const gl = this._gl;

    const uniforms = shaderProgram.uniforms;
    const uniformLocations = shaderProgram.uniformLocations;

    for (const key in uniforms) {
      const uniform = uniforms[key];
      const location = uniformLocations[key];

      if (!uniform) continue;

      if (uniform.needsUpdate) {
        uniform.update(gl, location, this._isWebGL2);
      }
    }
  }

  public releaseShaderResources(shaderProgram: ShaderProgram) {
    const gl = this._gl;

    const uniforms = shaderProgram.uniforms;

    for (const key in uniforms) {
      const uniform = uniforms[key];

      if (!uniform) continue;

      if (uniform.needsUpdate) {
        uniform.destroy(gl);
      }
    }

    gl.deleteProgram(shaderProgram.program);
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

    if (this._debug && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
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

  public createWebGLTexture(texData: Texture): WebGLTexture {
    const gl = this._gl;
    const texture = gl.createTexture()!;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, texData.wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, texData.wrapT);

    if (!texData.isVideo() && this._isWebGL2) {
      const gl2 = gl as WebGL2RenderingContext;

      gl2.texStorage2D(gl2.TEXTURE_2D, 1, gl2.RGBA8, texData.width, texData.height);
    }

    return texture;
  }

  public createWebGLCubeTexture(texData: Texture, size: number): WebGLTexture {
    const gl = this._gl;
    const texture = gl.createTexture()!;

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, texData.wrapS);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, texData.wrapT);

    if (this._isWebGL2) {
      const gl2 = gl as WebGL2RenderingContext;

      gl2.texStorage2D(gl2.TEXTURE_CUBE_MAP, 1, gl2.RGBA8, size, size);
    }

    return texture;
  }

  public async makeXRCompatible() {
    const gl = this._gl;
    const attributes = gl.getContextAttributes();

    if (attributes && attributes.xrCompatible !== true) {
      await gl.makeXRCompatible();
    }
  }

  public bindXRLayer(session: XRSession) {
    const gl = this._gl;
    const xrLayer = new XRWebGLLayer(session, gl);
    session.updateRenderState({ baseLayer: xrLayer });
  }

  public bindXRFrame(frame: XRFrame) {
    const gl = this._gl;
    const session = frame.session;
    const baseLayer = session.renderState.baseLayer!;

    gl.bindFramebuffer(gl.FRAMEBUFFER, baseLayer.framebuffer);
  }

  public useDefaultFrameBuffer() {
    const gl = this._gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private _createBuffer(): WebGLBuffer {
    return this._gl.createBuffer()!;
  }

  private _deleteBuffer(buffer: WebGLBuffer) {
    return this._gl.deleteBuffer(buffer);
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

  private _deleteNativeVAO(vao: WebGLVertexArrayObject | null) {
    const gl = this._gl;

    if (this._isWebGL2) {
      (gl as WebGL2RenderingContext).deleteVertexArray(vao);
    } else {
      const ext = this._extensions.vao;

      ext?.deleteVertexArrayOES(vao);
    }
  }

  private _supplyGeometryData(vao: VertexArrayObject, shaderProgram: ShaderProgram) {
    const geometry = vao.geometry;

    this._supplyIndiciesData(geometry.indicies, vao.buffers.indicies);
    this._supplyAttributeData(geometry.vertices, shaderProgram.program, "position", vao.buffers.position);
    this._supplyAttributeData(geometry.uvs, shaderProgram.program, "uv", vao.buffers.uv);
  }

  private _unbindBuffers() {
    const gl = this._gl;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  private _supplyIndiciesData(indicies: VertexData<Uint16Array>, buffer: WebGLBuffer) {
    const gl = this._gl;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicies.data, gl.STATIC_DRAW);
  }

  private _supplyAttributeData(attribute: VertexData<Float32Array>, program: WebGLProgram, name: string, buffer: WebGLBuffer) {
    const gl = this._gl;
    const attribLocation = gl.getAttribLocation(program, name);

    // Attribute not used
    if (attribLocation < 0) return;

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
      uMVMatrix: gl.getUniformLocation(program, "uMVMatrix")!,
      uPMatrix: gl.getUniformLocation(program, "uPMatrix")!
    };
  }

  private _getContext(canvas: HTMLCanvasElement): {
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    isWebGL2: boolean;
  } {
    const webglIdentifiers = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context: WebGLRenderingContext | null = null;
    let isWebGL2 = false;
    const contextAttributes = {
      preserveDrawingBuffer: false,
      antialias: false
    };

    const onWebglContextCreationError = e => e.statusMessage;

    canvas.addEventListener(BROWSER.EVENTS.CONTEXT_CREATE_ERROR, onWebglContextCreationError);

    for (const identifier of webglIdentifiers) {
      try {
        context = canvas.getContext(identifier, contextAttributes) as WebGLRenderingContext;
        isWebGL2 = identifier === "webgl2";
      } catch (t) {} // eslint-disable-line no-empty
      if (context) {
        break;
      }
    }

    canvas.removeEventListener(BROWSER.EVENTS.CONTEXT_CREATE_ERROR, onWebglContextCreationError);

    if (!context) {
      throw new View360Error(ERROR.MESSAGES.WEBGL_NOT_SUPPORTED, ERROR.CODES.WEBGL_NOT_SUPPORTED);
    }

    return {
      gl: context,
      isWebGL2
    };
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
