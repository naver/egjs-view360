/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection, { ProjectionOptions } from "./Projection";
import TriangleMesh from "../core/TriangleMesh";
import ShaderProgram from "../core/ShaderProgram";
import WebGLContext from "../core/WebGLContext";
import Texture2D from "../texture/Texture2D";
import UniformTexture2D from "../uniform/UniformTexture2D";
import CubeGeometry from "../geometry/CubeGeometry";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";

/**
 * Options for {@link CubestripProjection}
 * @ko {@link CubestripProjection}의 옵션들
 * @since 4.0.0
 * @category Projection
 */
export interface CubestripProjectionOptions extends ProjectionOptions {
  /**
   * @copy CubemapProjectionOptions#cubemapOrder
   */
  cubemapOrder?: string;
  /**
   * @copy CubemapProjectionOptions#cubemapFlipX
   */
  cubemapFlipX?: boolean;
}

/**
 * Projection based on cubemap strip.
 * Slightly more efficient than {@link CubemapProjection} as it doesn't copy cubemap image to canvas while rendering.
 * Accepts only single image.
 * @ko 큐브맵 스트립 기반의 프로젝션.
 * {@link CubemapProjection}와 달리 렌더링하는 과정에 캔버스에 이미지를 복사하는 과정이 없기 때문에 살짝 더 효율적입니다.
 * 단일 이미지만 사용 가능합니다.
 * @since 4.0.0
 * @category Projection
 */
class CubestripProjection extends Projection<{
  uTexture: UniformTexture2D;
}> {
  private _cubemapOrder: NonNullable<CubestripProjectionOptions["cubemapOrder"]>;
  private _cubemapFlipX: NonNullable<CubestripProjectionOptions["cubemapFlipX"]>;

  /**
   * Create new instance.
   * @ko 새 인스턴스를 생성합니다.
   * @param options Options {@ko Options}
   */
  public constructor(options: CubestripProjectionOptions) {
    super(options);

    const {
      cubemapOrder = "RLUDFB",
      cubemapFlipX = false
    } = options;

    this._cubemapOrder = cubemapOrder;
    this._cubemapFlipX = cubemapFlipX;
  }

  public applyTexture(ctx: WebGLContext, texture: Texture2D) {
    const cubemapOrder = this._cubemapOrder;
    const cubemapFlipX = this._cubemapFlipX;
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture)
    };
    const geometry = new CubeGeometry({
      order: cubemapOrder
    });
    const program = new ShaderProgram(ctx, vs, fs, uniforms);
    const vao = ctx.createVAO(geometry, program);
    const mesh = new TriangleMesh(vao, program);

    if (cubemapFlipX) {
      mesh.scale[0] = -1;
    }
    mesh.updateMatrix();

    this.mesh = mesh;
  }
}

export default CubestripProjection;
