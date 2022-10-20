/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import UniformTexture2D from "../uniform/UniformTexture2D";
import WebGLContext from "../webgl/WebGLContext";
import Texture2D from "../texture/Texture2D";
import CylinderGeometry from "../geometry/CylinderGeometry";
import ShaderProgram from "../core/ShaderProgram";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";

export interface PanoramaProjectionOptions {
  texture: Texture2D;
}

class PanoramaProjection extends Projection<{
  uTexture: UniformTexture2D;
}> {
  public constructor(ctx: WebGLContext, {
    texture
  }: PanoramaProjectionOptions) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture)
    };

    const geometry = new CylinderGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default PanoramaProjection;
