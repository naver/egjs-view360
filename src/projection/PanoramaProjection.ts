/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
*/
import { quat } from "gl-matrix";
import Projection from "./Projection";
import UniformTexture2D from "../uniform/UniformTexture2D";
import WebGLContext from "../webgl/WebGLContext";
import Texture2D from "../texture/Texture2D";
import CylinderGeometry from "../geometry/CylinderGeometry";
import Camera from "../core/Camera";
import ShaderProgram from "../core/ShaderProgram";
import PanoControl from "../control/PanoControl";
import { DEG_TO_RAD, RAD_TO_DEG } from "../const/internal";
import vs from "../shader/common.vert";
import fs from "../shader/common.frag";

export interface PanoramaProjectionOptions {
  texture: Texture2D;
  is360Panorama: boolean;
}

class PanoramaProjection extends Projection<{
  uTexture: UniformTexture2D;
}> {
  private _isFullPanorama: boolean;

  public constructor(ctx: WebGLContext, {
    texture,
    is360Panorama
  }: PanoramaProjectionOptions) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture)
    };

    const { width, height } = texture;
    const aspect = width / height;
    const halfVFov = 180 / aspect;
    const isFullPanorama = is360Panorama || aspect >= 6;

    const cylinderTheta = isFullPanorama
      ? 2 * Math.PI
      : aspect;
    const cylinderHeight = isFullPanorama
      ? 2 * Math.tan(halfVFov * DEG_TO_RAD)
      : 1;

    const geometry = new CylinderGeometry(cylinderTheta);
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);

    this._isFullPanorama = isFullPanorama;
    this.scale[1] = cylinderHeight;
    quat.rotateY(this.rotation, this.rotation, -Math.PI / 2);
    this.updateWorldMatrix();
  }

  public updateControlMode(control: PanoControl, camera: Camera) {
    const texture = this._program.uniforms.uTexture.texture;
    const halfHeight = this.scale[1] * 0.5;
    const { width, height } = texture;
    const aspect = width / height;

    if (!this._isFullPanorama) {
      const restrictedYaw = 0.5 * aspect * RAD_TO_DEG;
      control.rotate.restrictYawRange(-restrictedYaw, restrictedYaw, halfHeight * 2);
    }

    const restrictedPitch = Math.atan2(halfHeight, 1) * RAD_TO_DEG;
    const minZoom = Math.tan(camera.baseFov * DEG_TO_RAD * 0.5) / (halfHeight * camera.aspect);

    control.rotate.restrictPitchRange(-restrictedPitch, restrictedPitch);
    control.zoom.restrictZoomRange(minZoom, Infinity);
  }
}

export default PanoramaProjection;
