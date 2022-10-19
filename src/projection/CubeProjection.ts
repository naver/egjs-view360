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
}

class CubeProjection extends Projection<{
  uTexture: UniformTextureCube | UniformCanvasCube;
}> {
  public constructor(ctx: WebGLContext, {
    texture,
    cubemapOrder
  }: CubeProjectionOptions) {
    const uniforms = {
      uTexture: texture.isCube
        ? new UniformTextureCube(ctx, texture as TextureCube)
        : new UniformCanvasCube(ctx, texture as Texture2D)
    };

    const geometry = new CubeGeometry(cubemapOrder);
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default CubeProjection;
