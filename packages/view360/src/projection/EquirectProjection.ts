/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection, { ProjectionOptions } from "./Projection";
import WebGLContext from "../core/WebGLContext";
import UniformTexture2D from "../uniform/UniformTexture2D";
import Texture2D from "../texture/Texture2D";
import ShaderProgram from "../core/ShaderProgram";
import SphereGeometry from "../geometry/SphereGeometry";
import TriangleMesh from "../core/TriangleMesh";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";

/**
 * Options for {@link EquirectProjection}
 * @ko {@link EquirectProjection}의 옵션들
 * @since 4.0.0
 * @category Projection
 */
export interface EquirectProjectionOptions extends ProjectionOptions {
  src: string | HTMLElement;
}

/**
 * Projection based on equirectangular projection.
 * @ko 등 장방형 도법(Equirectangular projection) 기반의 프로젝션
 * @since 4.0.0
 * @category Projection
 */
class EquirectProjection extends Projection<{
  uTexture: UniformTexture2D
}> {
  /**
   * Create new instance
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor(options: EquirectProjectionOptions) {
    super(options);
  }

  public applyTexture(ctx: WebGLContext, texture: Texture2D) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture)
    };

    const geometry = new SphereGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);
    const mesh = new TriangleMesh(vao, program);

    this.mesh = mesh;
  }
}

export default EquirectProjection;
