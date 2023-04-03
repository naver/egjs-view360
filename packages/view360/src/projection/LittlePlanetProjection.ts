/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection, { ProjectionOptions } from "./Projection";
import WebGLContext from "../core/WebGLContext";
import UniformTexture2D from "../uniform/UniformTexture2D";
import UniformFloat from "../uniform/UniformFloat";
import PanoControl from "../control/PanoControl";
import ShaderProgram from "../core/ShaderProgram";
import Texture2D from "../texture/Texture2D";
import PlaneGeometry from "../geometry/PlaneGeometry";
import vs from "../shader/little-planet.vert";
import fs from "../shader/little-planet.frag";
import TriangleMesh from "../core/TriangleMesh";
import { OBJECT_3D_EVENTS } from "../const/internal";

/**
 * Options for {@link LittlePlanetProjection}
 * @ko {@link LittlePlanetProjection}의 옵션들
 * @since 4.0.0
 * @category Projection
 */
export interface LittlePlanetProjectionOptions extends ProjectionOptions {
  src: string | HTMLElement;
}

/**
 * Projection based on so-called "Little planet" or "Tiny planet" effect.
 * @ko "Little planet" 혹은 "Tiny planet"로 불리는 이펙트 기반의 프로젝션
 * @since 4.0.0
 * @category Projection
 */
class LittlePlanetProjection extends Projection {
  /**
   * Create new instance
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options - Options {@ko 옵션들}
   */
  public constructor(options: LittlePlanetProjectionOptions) {
    super(options);
  }

  public createMesh(ctx: WebGLContext, texture: Texture2D) {
    texture.wrapS = WebGLRenderingContext.REPEAT;
    texture.wrapT = WebGLRenderingContext.REPEAT;

    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture),
      uYaw: new UniformFloat(0),
      uPitch: new UniformFloat(0.5),
      uZoom: new UniformFloat(1)
    };

    const geometry = new PlaneGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);
    const mesh = new TriangleMesh(vao, program);

    mesh.on(OBJECT_3D_EVENTS.UPDATE, ({ camera }) => {
      const uniforms = mesh.program.uniforms;

      uniforms.uYaw.val = camera.yaw / 360;
      // Range from 0 ~ 1
      uniforms.uPitch.val = (camera.pitch / 180) + 0.5;
      uniforms.uZoom.val = camera.zoom;

      uniforms.uYaw.needsUpdate = true;
      uniforms.uPitch.needsUpdate = true;
      uniforms.uZoom.needsUpdate = true;
    });

    return mesh;
  }

  public updateControl(control: PanoControl) {
    control.ignoreZoomScale = true;
  }
}

export default LittlePlanetProjection;
