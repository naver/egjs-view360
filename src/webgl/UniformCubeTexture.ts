/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import CubeTexture from "../texture/CubeTexture";
import Uniform from "./Uniform";

class UniformCubeTexture extends Uniform {
  public readonly texture: CubeTexture;

  public constructor(texture: CubeTexture) {
    super();

    this.texture = texture;
  }

  public update(gl: WebGLRenderingContext | WebGL2RenderingContext, location: WebGLUniformLocation) {
    const texture = this.texture;
    const srcs = texture.images;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    gl.uniform1i(location, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture.webglTexture);

    const target = [
      gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ];

    srcs.forEach((src, idx) => {
      gl.texImage2D(target[idx], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    });

    if (!texture.isVideo) {
      this.needsUpdate = false;
    }
  }
}

export default UniformCubeTexture;
