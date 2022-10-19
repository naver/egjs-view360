/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import WebGLContext from "../webgl/WebGLContext";
import UniformTexture2D from "../uniform/UniformTexture2D";
import UniformFloat from "../uniform/UniformFloat";
import Camera from "../core/Camera";
import ShaderProgram from "../core/ShaderProgram";
import Texture2D from "../texture/Texture2D";
import PlaneGeometry from "../geometry/PlaneGeometry";
import WebGLRenderer from "../renderer/WebGLRenderer";
import { DEG_TO_RAD } from "../const/internal";
import vs from "../shader/little-planet.vert";
import fs from "../shader/little-planet.frag";

export interface LittlePlanetProjectionOptions {
  texture: Texture2D;
}

/**
 *
 */
 class LittlePlanetProjection extends Projection<{
  uTexture: UniformTexture2D;
  uYaw: UniformFloat;
  uPitch: UniformFloat;
  uZoom: UniformFloat;
 }> {
  public constructor(ctx: WebGLContext, {
    texture
  }: LittlePlanetProjectionOptions) {
    const uniforms = {
      uTexture: new UniformTexture2D(ctx, texture),
      uYaw: new UniformFloat(0),
      uPitch: new UniformFloat(0),
      uZoom: new UniformFloat(0)
    };

    const geometry = new PlaneGeometry();
    const program = new ShaderProgram(ctx, vs, fs, uniforms);

    const vao = ctx.createVAO(geometry, program);

    super(vao, program);
  }

  public render(renderer: WebGLRenderer, camera: Camera) {
    const uniforms = this._program.uniforms;

    uniforms.uYaw.val = camera.yaw * DEG_TO_RAD;
    uniforms.uPitch.val = camera.pitch * DEG_TO_RAD;
    uniforms.uZoom.val = camera.zoom;

    uniforms.uYaw.needsUpdate = true;
    uniforms.uPitch.needsUpdate = true;
    uniforms.uZoom.needsUpdate = true;

    super.render(renderer, camera);
  }
}

export default LittlePlanetProjection;
