/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection, { ProjectionOptions } from "./Projection";
import TriangleMesh from "../core/TriangleMesh";
import ShaderProgram from "../core/ShaderProgram";
import UniformTexture2D from "../uniform/UniformTexture2D";
import WebGLContext from "../core/WebGLContext";
import Texture2D from "../texture/Texture2D";
import CubeGeometry from "../geometry/CubeGeometry";
import vs from "../shader/common.vert";
import fs from "../shader/eac.frag";
import { ROTATE } from "../const/internal";

/**
 * Options for {@link EquiangularProjection}
 * @ko {@link EquiangularProjection}의 옵션들
 * @since 4.0.0
 * @category Projection
 */
export interface EquiangularProjectionOptions extends ProjectionOptions {}

/**
 * Equi-Angular Cubemap Projection.
 * This format is used by Youtube's 360 videos.
 * @ko Equi-Angular Cubemap 프로젝션.
 * 이 포맷은 주로 Youtube의 360 비디오에 사용됩니다.
 * @since 4.0.0
 * @category Projection
 */
class EquiangularProjection extends Projection<{
  uTexture: UniformTexture2D;
}> {
  public applyTexture(ctx: WebGLContext, texture: Texture2D) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture)
    };
    const geometry = new CubeGeometry({
      order: "LFRDBU",
      rotateUV: [
        ROTATE.ZERO, ROTATE.ZERO, ROTATE.ZERO,
        ROTATE.CW_90, ROTATE.CCW_90, ROTATE.CW_90
      ]
    });
    const program = new ShaderProgram(ctx, vs, fs, uniforms);
    const vao = ctx.createVAO(geometry, program);
    const mesh = new TriangleMesh(vao, program);

    this.mesh = mesh;
  }
}

export default EquiangularProjection;
