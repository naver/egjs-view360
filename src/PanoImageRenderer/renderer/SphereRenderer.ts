import WebGLUtils from "../WebGLUtils";
import { STEREO_FORMAT } from "../../PanoViewer/consts";
import { ValueOf } from "../../types/internal";

import Renderer from "./Renderer";

const latitudeBands = 60;
const longitudeBands = 60;
const radius = 2;
const ANGLE_CORRECTION_FOR_CENTER_ALIGN = -0.5 * Math.PI;

const textureCoordData: number[] = [];
const vertexPositionData: number[] = [];
const indexData: number[] = [];
let latIdx: number;
let lngIdx: number;

for (latIdx = 0; latIdx <= latitudeBands; latIdx++) {
  const theta = (latIdx / latitudeBands - 0.5) * Math.PI;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  for (lngIdx = 0; lngIdx <= longitudeBands; lngIdx++) {
    const phi = (lngIdx / longitudeBands - 0.5) * 2 * Math.PI + ANGLE_CORRECTION_FOR_CENTER_ALIGN;
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);
    const x = cosPhi * cosTheta;
    const y = sinTheta;
    const z = sinPhi * cosTheta;
    const u = lngIdx / longitudeBands;
    const v = latIdx / latitudeBands;

    textureCoordData.push(u, v);
    vertexPositionData.push(radius * x, radius * y, radius * z);

    if (lngIdx !== longitudeBands && latIdx !== latitudeBands) {
      const a = latIdx * (longitudeBands + 1) + lngIdx;
      const b = a + longitudeBands + 1;

      indexData.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
}

class SphereRenderer extends Renderer {
  private static _VERTEX_POSITION_DATA = vertexPositionData;
  private static _TEXTURE_COORD_DATA = textureCoordData;
  private static _INDEX_DATA = indexData;

  private _stereoFormat: ValueOf<typeof STEREO_FORMAT>;

  public constructor(format: SphereRenderer["_stereoFormat"]) {
    super();

    this._stereoFormat = format;
  }

  public render(ctx: Parameters<Renderer["render"]>[0]) {
    const {gl, shaderProgram} = ctx;

    let leftEyeScaleOffset: number[];
    let rightEyeScaleOffset: number[];

    switch (this._stereoFormat) {
      case STEREO_FORMAT.TOP_BOTTOM:
        leftEyeScaleOffset = [1, 0.5, 0, 0];
        rightEyeScaleOffset = [1, 0.5, 0, 0.5];
        break;
      case STEREO_FORMAT.LEFT_RIGHT:
        leftEyeScaleOffset = [0.5, 1, 0, 0];
        rightEyeScaleOffset = [0.5, 1, 0.5, 0];
        break;
      default:
        leftEyeScaleOffset = [1, 1, 0, 0];
        rightEyeScaleOffset = [1, 1, 0, 0];
    }

    const uTexScaleOffset = gl.getUniformLocation(shaderProgram, "uTexScaleOffset");

    gl.uniform4fv(uTexScaleOffset, [...leftEyeScaleOffset, ...rightEyeScaleOffset]);

    super.render(ctx);
  }

  public getVertexPositionData() {
    return SphereRenderer._VERTEX_POSITION_DATA;
  }

  public getIndexData() {
    return SphereRenderer._INDEX_DATA;
  }

  public getTextureCoordData() {
    return SphereRenderer._TEXTURE_COORD_DATA;
  }

  public getVertexShaderSource() {
    return `
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uEye;
uniform vec4 uTexScaleOffset[2];
varying highp vec2 vTextureCoord;
void main(void) {
  vec4 scaleOffset = uTexScaleOffset[int(uEye)];
  vTextureCoord = aTextureCoord.xy * scaleOffset.xy + scaleOffset.zw;
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}`;
  }

  public getFragmentShaderSource() {
    return `
precision highp float;
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
void main(void) {
  gl_FragColor = texture2D(uSampler, vTextureCoord.st);
}`;
  }

  public updateTexture(gl: WebGLRenderingContext, image: HTMLImageElement | HTMLVideoElement) {
    WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
  }

  public bindTexture(gl: WebGLRenderingContext, texture: WebGLTexture, image: HTMLImageElement | HTMLVideoElement) {
    // Make sure image isn't too big
    const { width, height } = this.getDimension(image);
    const size = Math.max(width, height);
    const maxSize = WebGLUtils.getMaxTextureSize(gl);

    if (size > maxSize) {
      this._triggerError(`Image width(${width}) exceeds device limit(${maxSize}))`);
      return;
    }

    // Pixel Source for IE11 & Video
    this._initPixelSource(image);

    gl.activeTexture(gl.TEXTURE0);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    this.updateTexture(gl, image);
  }
}

export default SphereRenderer;
