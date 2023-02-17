/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection, { ProjectionOptions } from "./Projection";
import UniformTexture2D from "../uniform/UniformTexture2D";
import WebGLContext from "../core/WebGLContext";
import Texture2D from "../texture/Texture2D";
import SphereGeometry from "../geometry/SphereGeometry";
import ShaderProgram from "../core/ShaderProgram";
import TriangleMesh from "../core/TriangleMesh";
import UniformVector4Array from "../uniform/UniformVector4Array";
import UniformFloat from "../uniform/UniformFloat";
import vs from "../shader/stereoequi.vert";
import fs from "../shader/common.frag";

/**
 * Options for {@link StereoEquiProjection}
 * @ko {@link StereoEquiProjection}의 옵션들
 * @since 4.0.0
 * @category Projection
 */
export interface StereoEquiProjectionOptions extends ProjectionOptions {
  src: string | HTMLElement;
  /**
   * Stereoscopic mode of the image
   * @ko 이미지의 스테레오스코픽 모드
   * @since 4.0.0
   * @default "top_bottom"
   */
  mode: typeof StereoEquiProjection.MODE[keyof typeof StereoEquiProjection.MODE]
}

/**
 * Projection based on stereo equirectangular images.
 * @ko Stereo equirectangular 이미지 기반의 프로젝션
 * @since 4.0.0
 * @category Projection
 */
class StereoEquiProjection extends Projection<{
  uTexture: UniformTexture2D;
  uEye: UniformFloat;
  uTexScaleOffset: UniformVector4Array;
}> {
  /**
   * Available stereoscopic modes
   * @ko 사용가능한 스테레오스코픽 모드들
   * @since 4.0.0
   */
  public static MODE = {
    /**
     * @ko 이미지가 왼쪽/오른쪽으로 구성되어있을 경우
     * @since 4.0.0
     */
    LEFT_RIGHT: "left_right",
    /**
     * @ko 이미지가 위/아래로 구성되어있을 경우
     * @since 4.0.0
     */
    TOP_BOTTOM: "top_bottom",
  } as const;

  private _mode: StereoEquiProjectionOptions["mode"];

  /**
   * Create new instance
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor(options: StereoEquiProjectionOptions) {
    super(options);

    this._mode = options.mode;
  }

  public applyTexture(ctx: WebGLContext, texture: Texture2D) {
    let leftEye: number[];
    let rightEye: number[];

    switch (this._mode) {
      case StereoEquiProjection.MODE.LEFT_RIGHT:
        leftEye = [0.5, 1, 0, 0];
        rightEye = [0.5, 1, 0.5, 0];
        break;
      default:
        // Default, uses "top_bottom"
        leftEye = [1, 0.5, 0, 0];
        rightEye = [1, 0.5, 0, 0.5];
    }


    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture),
      uEye: new UniformFloat(0),
      uTexScaleOffset: new UniformVector4Array([leftEye, rightEye])
    };

    const geometry = new SphereGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);
    const mesh = new TriangleMesh(vao, program);

    this._mesh = mesh;
  }
}

export default StereoEquiProjection;
