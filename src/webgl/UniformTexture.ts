/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "../texture/Texture";
import Uniform from "./Uniform";

class UniformTexture extends Uniform {
  public readonly texture: Texture;

  public constructor(texture: Texture) {
    super();

    this.texture = texture;
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    const texture = this.texture;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture.webglTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
    console.log(texture.flipY);

    if (!texture.isVideo) {
      this.needsUpdate = false;
    }
  }
}

export default UniformTexture;
