/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture2D from "../texture/Texture2D";
import WebGLContext from "../core/WebGLContext";
import Uniform from "./Uniform";

class UniformTexture2D extends Uniform {
  public readonly texture: Texture2D;
  private _webglTexture: WebGLTexture;

  public constructor(ctx: WebGLContext, texture: Texture2D) {
    super();

    this.texture = texture;
    this._webglTexture = ctx.createWebGLTexture(texture);
  }

  public destroy(gl: WebGLRenderingContext | WebGL2RenderingContext): void {
    this.texture.destroy();
    gl.deleteTexture(this._webglTexture);
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation, isWebGL2: boolean) {
    const texture = this.texture;
    const isVideo = texture.isVideo();

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._webglTexture);

    if (!isVideo && isWebGL2) {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
    }

    if (!isVideo) {
      this.needsUpdate = false;
    }
  }
}

export default UniformTexture2D;
