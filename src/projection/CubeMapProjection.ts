/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import UniformTextureCube from "../uniform/UniformTextureCube";
import UniformCanvasCube from "../uniform/UniformCanvasCube";
import WebGLContext from "../webgl/WebGLContext";
import Texture from "../texture/Texture";
import Texture2D from "../texture/Texture2D";
import TextureCube from "../texture/TextureCube";
import CubeGeometry from "../geometry/CubeGeometry";
import ShaderProgram from "../core/ShaderProgram";
import vs from "../shader/cube.vert";
import fs from "../shader/cube.frag";

export interface CubeProjectionOptions {
  texture: Texture;
  cubemapOrder: string;
  cubemapFlipX: boolean;
}

class CubeMapProjection extends Projection<{
  uTexture: UniformTextureCube | UniformCanvasCube;
}> {
  public constructor(ctx: WebGLContext, {
    texture,
    cubemapOrder,
    cubemapFlipX
  }: CubeProjectionOptions) {
    const uniforms = {
      uTexture: texture.isCube
        ? new UniformTextureCube(ctx, texture as TextureCube)
        : new UniformCanvasCube(ctx, texture as Texture2D, cubemapOrder)
    };

    if (texture.isCube) {
      (texture as TextureCube).reorder(cubemapOrder);
    }

    const geometry = new CubeGeometry({
      order: cubemapOrder
    });
    const program = new ShaderProgram(ctx, vs, fs, uniforms);
    const vao = ctx.createVAO(geometry, program);

    super(vao, program);

    if (cubemapFlipX) {
      this.scale[0] = -1;
      this.updateWorldMatrix();
    }
  }
}

export default CubeMapProjection;
