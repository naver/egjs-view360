/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import WebGLContext from "../webgl/WebGLContext";
import UniformTexture2D from "../uniform/UniformTexture2D";
import Texture2D from "../texture/Texture2D";
import ShaderProgram from "../core/ShaderProgram";
import SphereGeometry from "../geometry/SphereGeometry";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";

export interface EquirectProjectionOptions {
  texture: Texture2D;
}

/**
 *
 */
class EquirectProjection extends Projection<{
  uTexture: UniformTexture2D
}> {
  public constructor(ctx: WebGLContext, {
    texture
  }: EquirectProjectionOptions) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture)
    };

    const geometry = new SphereGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default EquirectProjection;
