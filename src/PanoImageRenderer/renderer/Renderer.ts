import Component, { ComponentEvent } from "@egjs/component";
import agent from "@egjs/agent";
import { mat4 } from "gl-matrix";

import { CubemapConfig, TileConfig } from "../../types/internal";

const agentInfo = agent();
const isIE11 = agentInfo.browser.name === "ie" && agentInfo.browser.majorVersion === 11;

const EVENTS: {
  ERROR: "error";
} = {
  ERROR: "error"
};

/**
 *
 * Extends Component for firing errors occurs internally.
 */
abstract class Renderer extends Component<{
  [EVENTS.ERROR]: {
    message: string;
  };
}> {
  public static EVENTS = EVENTS;

  private _forceDimension: { width: number; height: number } | null;
  private _pixelCanvas: HTMLCanvasElement | null;
  private _pixelContext: CanvasRenderingContext2D | null;

  public constructor() {
    super();

    this._forceDimension = null;
    this._pixelCanvas = null;
    this._pixelContext = null;
  }

  public abstract getVertexPositionData(): number[];
  public abstract getIndexData(): number[];
  public abstract getTextureCoordData(textureData: {
    image: HTMLImageElement | HTMLVideoElement;
    imageConfig: CubemapConfig;
  }): number[];

  public abstract getVertexShaderSource(): string;
  public abstract getFragmentShaderSource(): string;
  public abstract bindTexture(gl: WebGLRenderingContext, texture: WebGLTexture, image: HTMLImageElement | HTMLVideoElement, imageConfig?: CubemapConfig): void;
  public abstract updateTexture(gl: WebGLRenderingContext, image: HTMLImageElement | HTMLVideoElement, imageConfig?: CubemapConfig): void;

  public render({ gl, shaderProgram, indexBuffer, mvMatrix, pMatrix }: {
    gl: WebGLRenderingContext;
    shaderProgram: WebGLProgram;
    indexBuffer: WebGLBuffer;
    mvMatrix: mat4;
    pMatrix: mat4;
  }) {
    gl.uniformMatrix4fv((shaderProgram as any).pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv((shaderProgram as any).mvMatrixUniform, false, mvMatrix);

    if (indexBuffer) {
      gl.drawElements(gl.TRIANGLES, (indexBuffer as any).numItems, gl.UNSIGNED_SHORT, 0);
    }
  }

  // Define interface for Renderers
  /**
   * Following MUST BE DEFINED on Child of Renderer
   *
   * DATA
   *
   *  - getVertexPositionData
   *  - getIndexData
   *  - getTextureCoordData
   *
   * SOURCE
   *
   *  - getVertexShaderSource
   *  - getFragmentShaderSource
   *
   * TEXTURE
   *
   *  - bindTexture
   */
  public getDimension(pixelSource: HTMLImageElement | HTMLVideoElement) {
    const width = (pixelSource as HTMLImageElement).naturalWidth
      || (pixelSource as HTMLVideoElement).videoWidth;
    const height = (pixelSource as HTMLImageElement).naturalHeight
      || (pixelSource as HTMLVideoElement).videoHeight;

    return { width, height };
  }

  /**
   * Update data used by shader
   */
  public updateShaderData(param) { // eslint-disable-line @typescript-eslint/no-unused-vars
    /*
    * Update following data in implementation layer.
    * If the data is not changed, it does not need to implement this function.
    *
    * - _VERTEX_POSITION_DATA
    * - _TEXTURE_COORD_DATA
    * - _INDEX_DATA
    */
  }

  /**
   *
   * @param {HTMLImageElement | HTMLVideoElement} image
   * @param {Object = {width, height}} forceDimension Forced dimension to resize
   */
  protected _initPixelSource(image: HTMLImageElement | HTMLVideoElement, forceDimension: Renderer["_forceDimension"] = null) {
    const isIE11Video = isIE11 && (image instanceof HTMLVideoElement);

    if (isIE11Video || forceDimension) {
      const {width, height} = forceDimension || this.getDimension(image);

      this._pixelCanvas = document.createElement("canvas");
      this._pixelCanvas.width = width;
      this._pixelCanvas.height = height;
      this._pixelContext = this._pixelCanvas.getContext("2d");
    }
    this._forceDimension = forceDimension;
  }

  protected _getPixelSource(image: HTMLImageElement | HTMLVideoElement) {
    if (!this._pixelCanvas) {
      return image;
    }

    /**
     * IE11 && Video
     * or
     * Dimension is forced (Image is larger than texture size.)
     */
    const contentDimension = this.getDimension(image);
    const textureDimension = this._forceDimension || contentDimension;

    if (this._pixelCanvas.width !== textureDimension.width) {
      this._pixelCanvas.width = textureDimension.width;
    }

    if (this._pixelCanvas.height !== textureDimension.height) {
      this._pixelCanvas.height = textureDimension.height;
    }

    if (this._forceDimension) {
      this._pixelContext!.drawImage(image,
        0, 0, contentDimension.width, contentDimension.height,
        0, 0, textureDimension.width, textureDimension.height);
    } else {
      this._pixelContext!.drawImage(image, 0, 0);
    }

    return this._pixelCanvas;
  }

  protected _extractTileConfig(imageConfig: CubemapConfig) {
    let tileConfig: TileConfig[] =
      Array.isArray(imageConfig.tileConfig) ?
        imageConfig.tileConfig : Array(...Array(6)).map(() => imageConfig.tileConfig) as TileConfig[];

    tileConfig = tileConfig.map(
      config => ({
        ...{
          flipHorizontal: false,
          rotation: 0
        }, ...config
      })
    );

    return tileConfig;
  }

  protected _triggerError(error) {
    /* eslint-disable no-console */
    console.error("Renderer Error:", error);
    /* eslint-enable no-console */

    this.trigger(new ComponentEvent(EVENTS.ERROR, {
      message: typeof error === "string" ? error : error.message
    }));
  }
}

export default Renderer;
