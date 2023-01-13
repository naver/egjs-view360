/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import CubeTexturePainter from "../core/CubeTexturePainter";
import Texture2D from "../texture/Texture2D";
import WebGLContext from "../core/WebGLContext";
import Uniform from "./Uniform";

class UniformCanvasCube extends Uniform {
  private _webglTexture: WebGLTexture;
  private _painter: CubeTexturePainter;

  public get texture() { return this._painter.texture; }

  public constructor(ctx: WebGLContext, texture: Texture2D, cubemapOrder: string) {
    super();

    this._painter = new CubeTexturePainter(texture as Texture2D, cubemapOrder);
    this._webglTexture = ctx.createWebGLCubeTexture(texture, this._painter.size);
  }

  public destroy(gl: WebGLRenderingContext | WebGL2RenderingContext) {
    gl.deleteTexture(this._webglTexture);
    this._painter.destroy();
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation, isWebGL2: boolean) {
    const texture = this.texture;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._webglTexture);

    this._painter.draw(gl, isWebGL2);

    if (!texture.isVideo()) {
      this.needsUpdate = false;
    }
  }
}

export default UniformCanvasCube;
