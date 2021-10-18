
import WebGLUtils from "../WebGLUtils";
import { CubemapConfig, TileConfig } from "../../types/internal";

import Renderer from "./Renderer";

export default class CubeStripRenderer extends Renderer {
  private _vertices: number[];

  public getVertexShaderSource() {
    return `
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying highp vec2 vTextureCoord;
void main(void) {
  vTextureCoord = aTextureCoord;
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}`;
  }

  public getFragmentShaderSource() {
    return `
#define PI 3.14159265359
precision highp float;
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform bool uIsEAC;
const vec2 OPERATE_COORDS_RANGE = vec2(-1.0, 1.0);
const vec2 TEXTURE_COORDS_RANGE = vec2(0.0, 1.0);
// vector type is used for initializing values instead of array.
const vec4 TEXTURE_DIVISION_X = vec4(0.0, 1.0 / 3.0, 2.0 / 3.0, 1.0);
const vec3 TEXTURE_DIVISION_Y = vec3(0.0, 1.0 / 2.0, 1.0);
const float EAC_CONST = 2.0 / PI;
float scale(vec2 domainRange, vec2 targetRange, float val) {
  float unit = 1.0 / (domainRange[1] - domainRange[0]);
  return targetRange[0] + (targetRange[1] - targetRange[0]) * (val - domainRange[0]) * unit;
}
void main(void) {
  float transformedCoordX;
  float transformedCoordY;

  if (uIsEAC) {
    vec2 orgTextureRangeX;
    vec2 orgTextureRangeY;

    // Apply EAC transform
    if (vTextureCoord.s >= TEXTURE_DIVISION_X[2]) {
      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[2], TEXTURE_DIVISION_X[3]);
    } else if (vTextureCoord.s >= TEXTURE_DIVISION_X[1]) {
      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[1], TEXTURE_DIVISION_X[2]);
    } else {
      orgTextureRangeX = vec2(TEXTURE_DIVISION_X[0], TEXTURE_DIVISION_X[1]);
    }

    if (vTextureCoord.t >= TEXTURE_DIVISION_Y[1]) {
      orgTextureRangeY = vec2(TEXTURE_DIVISION_Y[1], TEXTURE_DIVISION_Y[2]);
    } else {
      orgTextureRangeY = vec2(TEXTURE_DIVISION_Y[0], TEXTURE_DIVISION_Y[1]);
    }

    // scaling coors by the coordinates following the range from -1.0 to 1.0.
    float px = scale(orgTextureRangeX, OPERATE_COORDS_RANGE, vTextureCoord.s);
    float py = scale(orgTextureRangeY, OPERATE_COORDS_RANGE, vTextureCoord.t);

    float qu = EAC_CONST * atan(px) + 0.5;
    float qv = EAC_CONST * atan(py) + 0.5;

    // re-scaling coors by original coordinates ranges
    transformedCoordX = scale(TEXTURE_COORDS_RANGE, orgTextureRangeX, qu);
    transformedCoordY = scale(TEXTURE_COORDS_RANGE, orgTextureRangeY, qv);
  } else {
    // normal cubemap
    transformedCoordX = vTextureCoord.s;
    transformedCoordY = vTextureCoord.t;
  }

  gl_FragColor = texture2D(uSampler, vec2(transformedCoordX, transformedCoordY));
}`;
  }

  public getVertexPositionData() {
    if (!this._vertices) {
      this._vertices = [
        // back
        1, -1, 1,
        -1, -1, 1,
        -1, 1, 1,
        1, 1, 1,

        // front
        -1, -1, -1,
        1, -1, -1,
        1, 1, -1,
        -1, 1, -1,

        // up
        -1, 1, -1,
        1, 1, -1,
        1, 1, 1,
        -1, 1, 1,

        // down
        -1, -1, 1,
        1, -1, 1,
        1, -1, -1,
        -1, -1, -1,

        // right
        1, -1, -1,
        1, -1, 1,
        1, 1, 1,
        1, 1, -1,

        // left
        -1, -1, 1,
        -1, -1, -1,
        -1, 1, -1,
        -1, 1, 1
      ];
    }

    return this._vertices;
  }

  public getIndexData() {
    // TODO: 한번만 계산하도록 수정하기
    const indices = (() => {
      const indexData: number[] = [];

      for (let i = 0; i < (this._vertices.length / 3); i += 4) {
        indexData.push(
          i,
          i + 1,
          i + 2,
          i,
          i + 2,
          i + 3
        );
      }
      return indexData;
    })();

    return indices;
  }

  public getTextureCoordData({ image, imageConfig }: {
    image: HTMLImageElement | HTMLVideoElement;
    imageConfig: CubemapConfig;
  }) {
    // TODO: make it cols, rows as config.
    const cols = 3;
    const rows = 2;

    const textureSize = this.getDimension(image);
    const { trim } = imageConfig;

    const order = imageConfig.order || "RLUDFB";
    let coords: number[][] = [];

    // 텍스쳐의 좌표는 윗쪽이 큰 값을 가지므로 row 는 역순으로 넣는다.
    for (let r = rows - 1; r >= 0; r--) {
      for (let c = 0; c < cols; c++) {
        const coord = [
          c / cols, r / rows,
          (c + 1) / cols, r / rows,
          (c + 1) / cols, (r + 1) / rows,
          c / cols, (r + 1) / rows
        ];

        coords.push(coord);
      }
    }

    const tileConfigs = this._extractTileConfig(imageConfig);

    // Transform Coord By Flip & Rotation
    coords = coords
    // shrink coord to avoid pixel bleeding
      .map(coord => this._shrinkCoord(coord, textureSize, trim))
      .map((coord, i) => this._transformCoord(coord, tileConfigs[i]));

    // vertices 에서 지정된 순서대로 그대로 그리기 위해 vertex 의 순서를 BFUDRL 로 재배치
    return "BFUDRL".split("")
      .map(face => order.indexOf(face))
      .map(index => coords[index])
      .reduce((acc, val) => acc.concat(val), []);
  }

  public updateTexture(gl: WebGLRenderingContext, image: HTMLImageElement | HTMLVideoElement) {
    WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
  }

  public bindTexture(gl: WebGLRenderingContext, texture: WebGLTexture, image: HTMLImageElement | HTMLVideoElement) {
    // Make sure image isn't too big
    const {width, height} = this.getDimension(image);
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

  private _transformCoord(coord: number[], tileConfig: TileConfig) {
    let newCoord = coord.slice();

    if (tileConfig.flipHorizontal) {
      newCoord = this._flipHorizontalCoord(newCoord);
    }

    if (tileConfig.rotation) {
      newCoord = this._rotateCoord(newCoord, tileConfig.rotation);
    }

    return newCoord;
  }

  private _shrinkCoord(coord: number[], textureSize: { width: number; height: number }, trim: number) {
    const { width, height } = textureSize;

    // Shrink by "trim" px
    const SHRINK_Y = trim * (1 / height);
    const SHRINK_X = trim * (1 / width);

    return [
      coord[0] + SHRINK_X, coord[1] + SHRINK_Y,
      coord[2] - SHRINK_X, coord[3] + SHRINK_Y,
      coord[4] - SHRINK_X, coord[5] - SHRINK_Y,
      coord[6] + SHRINK_X, coord[7] - SHRINK_Y
    ];
  }

  private _rotateCoord(coord: number[], rotationAngle: number) {
    const SIZE = 2; // coord means x,y coordinates. Two values(x, y) makes a one coord.
    const shiftCount = Math.floor(rotationAngle / 90) % 4;

    if (shiftCount === 0) {
      return coord;
    }

    let moved;
    let rotatedCoord: number[] = [];

    if (shiftCount > 0) {
      moved = coord.splice(0, shiftCount * SIZE);
      rotatedCoord = coord.concat(moved);
    } else {
      moved = coord.splice((4 + shiftCount) * SIZE, -shiftCount * SIZE);
      rotatedCoord = moved.concat(coord);
    }

    return rotatedCoord;
  }

  private _flipHorizontalCoord(coord: number[]) {
    return [
      coord[2], coord[3],
      coord[0], coord[1],
      coord[6], coord[7],
      coord[4], coord[5]
    ];
  }
}
