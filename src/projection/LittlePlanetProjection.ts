/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import WebGLContext from "../webgl/WebGLContext";
import Texture from "../texture/Texture";
import ShaderProgram from "../core/ShaderProgram";
import SphereGeometry from "../geometry/SphereGeometry";
import vs from "../shader/little-planet.vert";
import fs from "../shader/little-planet.frag";
import PlaneGeometry from "../geometry/PlaneGeometry";

/**
 *
 */
 class LittlePlanetProjection extends Projection {
  public constructor(ctx: WebGLContext, texture: Texture) {
    const uniforms = {
      uTexture: texture
    };

    const geometry = new PlaneGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default LittlePlanetProjection;
