/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import UniformTexture2D from "../uniform/UniformTexture2D";
import WebGLContext from "../webgl/WebGLContext";
import Texture2D from "../texture/Texture2D";
import CubeGeometry from "../geometry/CubeGeometry";
import ShaderProgram from "../core/ShaderProgram";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";

export interface CubeStripProjectionOptions {
  texture: Texture2D;
  cubemapOrder: string;
}

class CubeStripProjection extends Projection<{
  uTexture: UniformTexture2D;
}> {
  public constructor(ctx: WebGLContext, {
    texture,
    cubemapOrder
  }: CubeStripProjectionOptions) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture)
    };

    const geometry = new CubeGeometry(cubemapOrder);
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default CubeStripProjection;
