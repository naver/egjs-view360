/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import WebGLContext from "../webgl/WebGLContext";
import UniformTexture from "../webgl/UniformTexture";
import Texture from "../texture/Texture";
import ShaderProgram from "../core/ShaderProgram";
import SphereGeometry from "../geometry/SphereGeometry";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";

/**
 *
 */
class EquirectProjection extends Projection<{
  uTexture: UniformTexture
}> {
  public constructor(ctx: WebGLContext, texture: Texture) {
    const uniforms = {
      uTexture: new UniformTexture(texture)
    };

    const geometry = new SphereGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default EquirectProjection;
