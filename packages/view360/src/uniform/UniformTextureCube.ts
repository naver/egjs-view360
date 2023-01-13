/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import TextureCube from "../texture/TextureCube";
import { reorderCube } from "../utils";
import WebGLContext from "../core/WebGLContext";
import Uniform from "./Uniform";

class UniformTextureCube extends Uniform {
  public readonly texture: TextureCube;
  private _webglTexture: WebGLTexture;
  private _cubemapOrder: string;

  public constructor(ctx: WebGLContext, texture: TextureCube, cubemapOrder: string) {
    super();

    this.texture = texture;
    this._webglTexture = ctx.createWebGLCubeTexture(texture, texture.width);
    this._cubemapOrder = cubemapOrder;
  }

  public destroy(gl: WebGLRenderingContext | WebGL2RenderingContext): void {
    this.texture.destroy();
    gl.deleteTexture(this._webglTexture);
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation, isWebGL2: boolean) {
    const texture = this.texture;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._webglTexture);

    const sources = reorderCube(texture.sources, this._cubemapOrder);
    sources.forEach((src, idx) => {
      if (isWebGL2) {
        gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + idx, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, src);
      } else {
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + idx, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      }
    });

    if (!texture.isVideo()) {
      this.needsUpdate = false;
    }
  }
}

export default UniformTextureCube;
