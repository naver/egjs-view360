/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import VertexArrayObject from "../core/VAO";
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
  public constructor(texture: Texture, ctx: WebGLContext) {
    const uniforms = {
      uTexture: texture
    };

    const geometry = new SphereGeometry(ctx);
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.processGeometry(geometry, program);

    super(new VertexArrayObject(vao, geometry.indicies.count), program);
  }
}

export default EquirectProjection;
