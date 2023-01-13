/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "../geometry/Geometry";
import { VAO } from "../type/internal";

/**
 * @hidden
 */
class VertexArrayObject {
  public readonly obj: VAO | null;
  public readonly geometry: Geometry;
  public readonly buffers: {
    indicies: WebGLBuffer;
    position: WebGLBuffer;
    uv: WebGLBuffer;
  }

  public get count() { return this.geometry.indicies.count; }

  constructor(obj: VAO | null, geometry: Geometry, buffers: VertexArrayObject["buffers"]) {
    this.obj = obj;
    this.geometry = geometry;
    this.buffers = buffers;
  }
}

export default VertexArrayObject;
