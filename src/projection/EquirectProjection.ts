/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Projection from "./Projection";
import vs from "../shader/equirect.vert";
import fs from "../shader/equirect.frag";
import Texture from "../texture/Texture";
import Material from "../core/Material";
import SphereGeometry from "../geometry/SphereGeometry";

/**
 *
 */
class EquirectProjection extends Projection {
  public constructor(texture: Texture) {
    const uniforms = {
      uTexture: texture
    };

    const geometry = new SphereGeometry();
    const material = new Material(vs, fs, uniforms);

    super(geometry, material);
  }
}

export default EquirectProjection;
