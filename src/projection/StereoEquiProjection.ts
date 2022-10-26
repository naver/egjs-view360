/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import UniformTexture2D from "../uniform/UniformTexture2D";
import WebGLContext from "../webgl/WebGLContext";
import Texture2D from "../texture/Texture2D";
import SphereGeometry from "../geometry/SphereGeometry";
import ShaderProgram from "../core/ShaderProgram";
import vs from "../shader/stereoequi.vert";
import fs from "../shader/common.frag";
import { UniformFloat } from "../uniform";
import UniformVector4Array from "../uniform/UniformVector4Array";

export interface StereoEquiProjectionOptions {
  texture: Texture2D;
}

class StereoEquiProjection extends Projection<{
  uTexture: UniformTexture2D;
  uEye: UniformFloat;
  uTexScaleOffset: UniformVector4Array;
}> {
  public constructor(ctx: WebGLContext, {
    texture
  }: StereoEquiProjectionOptions) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture),
      uEye: new UniformFloat(0),
      uTexScaleOffset: new UniformVector4Array([
        [1, 0.5, 0, 0],
        [1, 0.5, 0, 0.5]
      ]),
    };

    const geometry = new SphereGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }
}

export default StereoEquiProjection;
