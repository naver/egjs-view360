/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import VertexArrayObject from "../core/VertexArrayObject";
import WebGLContext from "../webgl/WebGLContext";
import Texture from "../texture/Texture";
import ShaderProgram from "../core/ShaderProgram";
import SphereGeometry from "../geometry/SphereGeometry";
import vs from "../shader/equirect.vert";
import fs from "../shader/equirect.frag";

/**
 *
 */
class EquirectProjection extends Projection {
  public constructor(ctx: WebGLContext, texture: Texture) {
    const uniforms = {
      uTexture: texture
    };

    const geometry = new SphereGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default EquirectProjection;
