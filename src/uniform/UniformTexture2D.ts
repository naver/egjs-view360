/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture2D from "../texture/Texture2D";
import WebGLContext from "../webgl/WebGLContext";
import Uniform from "./Uniform";

class UniformTexture2D extends Uniform {
  public readonly texture: Texture2D;
  private _webglTexture: WebGLTexture;

  public constructor(ctx: WebGLContext, texture: Texture2D) {
    super();

    this.texture = texture;
    this._webglTexture = ctx.createWebGLTexture();
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    const texture = this.texture;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._webglTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);

    if (!texture.isVideo) {
      this.needsUpdate = false;
    }
  }
}

export default UniformTexture2D;
