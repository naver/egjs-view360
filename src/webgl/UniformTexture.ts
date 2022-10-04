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
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture.webglTexture);

    this.needsUpdate = false;
  }
}

export default UniformTexture;
