/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import TextureCube from "../texture/TextureCube";
import WebGLContext from "../webgl/WebGLContext";
import Uniform from "./Uniform";

class UniformTextureCube extends Uniform {
  public readonly texture: TextureCube;
  private _webglTexture: WebGLTexture;

  public constructor(ctx: WebGLContext, texture: TextureCube) {
    super();

    this.texture = texture;
    this._webglTexture = ctx.createWebGLCubeTexture();
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    const texture = this.texture;
    const sources = texture.sources;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._webglTexture);

    sources.forEach((src, idx) => {
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + idx, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    });

    if (!texture.isVideo) {
      this.needsUpdate = false;
    }
  }
}

export default UniformTextureCube;
