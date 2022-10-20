/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import CubeTexturePainter from "../core/CubeTexturePainter";
import Texture2D from "../texture/Texture2D";
import WebGLContext from "../webgl/WebGLContext";
import Uniform from "./Uniform";

class UniformCanvasCube extends Uniform {
  private _webglTexture: WebGLTexture;
  private _painter: CubeTexturePainter;

  public get texture() { return this._painter.texture; }

  public constructor(ctx: WebGLContext, texture: Texture2D, cubemapOrder: string) {
    super();

    this._webglTexture = ctx.createWebGLCubeTexture();
    this._painter = new CubeTexturePainter(texture as Texture2D, cubemapOrder);
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    const texture = this.texture;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._webglTexture);

    this._painter.draw(gl);

    if (!texture.isVideo) {
      this.needsUpdate = false;
    }
  }
}

export default UniformCanvasCube;
