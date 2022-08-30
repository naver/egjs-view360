/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "../geometry/Geometry";
import Material from "../core/Material";
import Entity from "../core/Entity";
import WebGLRenderer from "../renderer/WebGLRenderer";

/** */
class Projection extends Entity {
  protected _uniforms: Record<string, any>;
  protected _geometry: Geometry;
  protected _material: Material;

  public constructor(geometry: Geometry, material: Material) {
    super();

    this._geometry = geometry;
    this._material = material;
  }

  public render(renderer: WebGLRenderer) {
    renderer.useMaterial(this._material);
    renderer.drawGeometry(this._geometry);
    super.render(renderer);
  }
}

export default Projection;
