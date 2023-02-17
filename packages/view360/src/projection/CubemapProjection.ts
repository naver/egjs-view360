/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection, { ProjectionOptions } from "./Projection";
import UniformTextureCube from "../uniform/UniformTextureCube";
import UniformCanvasCube from "../uniform/UniformCanvasCube";
import TriangleMesh from "../core/TriangleMesh";
import ShaderProgram from "../core/ShaderProgram";
import WebGLContext from "../core/WebGLContext";
import Texture2D from "../texture/Texture2D";
import TextureCube from "../texture/TextureCube";
import CubeGeometry from "../geometry/CubeGeometry";
import vs from "../shader/cube.vert";
import fs from "../shader/cube.frag";

/**
 * Options for {@link CubemapProjection}
 * @ko {@link CubemapProjection}의 옵션들
 * @since 4.0.0
 * @category Projection
 */
export interface CubemapProjectionOptions extends ProjectionOptions {
  /**
   * Order of the cubemap images.
   * @ko 큐브맵 이미지의 순서.
   * @since 4.0.0
   * @default "RLUDFB" (Right - Left - Up - Down - Front - Back)
   */
  cubemapOrder?: string;
  /**
   * Whether to flip cubemap image horizontally.
   * @ko 큐브맵 이미지를 좌우대칭할지 여부.
   * @since 4.0.0
   * @default false
   */
  cubemapFlipX?: boolean;
}

/**
 * Projection based on cubemap images, accepts both multiple or single images.
 * @ko 큐브맵 이미지 기반의 프로젝션, 단일 혹은 여러 장의 이미지를 모두 사용 가능합니다.
 * @since 4.0.0
 * @category Projection
 */
class CubemapProjection extends Projection<{
  uTexture: UniformTextureCube | UniformCanvasCube;
}> {
  private _cubemapOrder: NonNullable<CubemapProjectionOptions["cubemapOrder"]>;
  private _cubemapFlipX: NonNullable<CubemapProjectionOptions["cubemapFlipX"]>;

  /**
   * Create new instance.
   * @ko 새 인스턴스를 생성합니다.
   * @param options Options {@ko Options}
   */
  public constructor(options: CubemapProjectionOptions) {
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
      uTexture: texture.isCube()
        ? new UniformTextureCube(ctx, texture as TextureCube, cubemapOrder)
        : new UniformCanvasCube(ctx, texture as Texture2D, cubemapOrder)
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

    this._mesh = mesh;
  }
}

export default CubemapProjection;
