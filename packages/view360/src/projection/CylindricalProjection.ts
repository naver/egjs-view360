/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
*/
import { quat } from "gl-matrix";
import Projection, { ProjectionOptions } from "./Projection";
import UniformTexture2D from "../uniform/UniformTexture2D";
import WebGLContext from "../core/WebGLContext";
import Texture2D from "../texture/Texture2D";
import CylinderGeometry from "../geometry/CylinderGeometry";
import Camera from "../core/Camera";
import ShaderProgram from "../core/ShaderProgram";
import { DEG_TO_RAD, RAD_TO_DEG } from "../const/internal";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";
import TriangleMesh from "../core/TriangleMesh";

/**
 * Options for {@link CylindricalProjection}
 * @ko {@link CylindricalProjection}의 옵션들
 * @since 4.0.0
 * @category Projection
 */
export interface CylindricalProjectionOptions extends ProjectionOptions {
  src: string | HTMLElement;
  /**
   * Whether the panorama image covers full 360 degrees.
   * @ko 파노라마 이미지가 360도를 전부 커버하는지 여부
   * @since 4.0.0
   * @default false
   */
  partial?: boolean;
}

/**
 * Projection based on cylindrical projection.
 * This can show panorama images taken from smartphones.
 * @ko 원통 투영법 기반의 프로젝션.
 * 일반적인 스마트폰 파노라마 사진을 표시하는데 사용될 수 있습니다.
 * @since 4.0.0
 * @category Projection
 */
class CylindricalProjection extends Projection<{
  uTexture: UniformTexture2D;
}> {
  private _partial: boolean;

  /**
   * Create new instance.
   * @ko 새 인스턴스를 생성합니다.
   * @param options Options {@ko Options}
   */
  public constructor(options: CylindricalProjectionOptions) {
    super(options);

    const {
      partial = false
    } = options;

    this._partial = partial;
  }

  public applyTexture(ctx: WebGLContext, texture: Texture2D) {
    const partial = this._partial;
    const { width, height } = texture;
    const aspect = width / height;
    const halfVFov = 180 / aspect;
    const cylinderHeight = partial
      ? 1
      : 2 * Math.tan(halfVFov * DEG_TO_RAD);
    const cylinderTheta = partial
      ? aspect
      : 2 * Math.PI;

    const geometry = new CylinderGeometry(cylinderTheta);
    const program = new ShaderProgram(ctx, vs, fs, {
      uTexture: new UniformTexture2D(ctx, texture)
    });
    const vao = ctx.createVAO(geometry, program);
    const mesh = new TriangleMesh(vao, program);

    mesh.scale[1] = cylinderHeight;
    quat.identity(mesh.rotation);
    quat.rotateY(mesh.rotation, mesh.rotation, -Math.PI / 2);
    mesh.updateMatrix();

    this.mesh = mesh;
  }

  public updateCamera(camera: Camera) {
    super.updateCamera(camera);

    const mesh = this.mesh;
    if (!mesh) return;

    const uTexture = mesh.program.uniforms.uTexture;
    const texture = uTexture.texture;
    const { width, height } = texture;
    const aspect = width / height;
    const halfHeight = mesh.scale[1] * 0.5;

    if (this._partial) {
      const restrictedYaw = 0.5 * aspect * RAD_TO_DEG;
      camera.restrictYawRange(-restrictedYaw, restrictedYaw);
    }

    const restrictedPitch = Math.atan2(halfHeight, 1) * RAD_TO_DEG;
    const minZoom = Math.tan(camera.fov * DEG_TO_RAD * 0.5) / (halfHeight * camera.aspect);

    camera.restrictPitchRange(-restrictedPitch, restrictedPitch);
    camera.restrictZoomRange(minZoom, Infinity);
    camera.restrictRenderHeight(halfHeight * 2);
  }
}

export default CylindricalProjection;
