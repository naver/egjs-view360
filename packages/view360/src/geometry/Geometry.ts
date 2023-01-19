/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import VertexData from "../core/VertexData";

/**
 * @hidden
 */
abstract class Geometry {
  public readonly vertices: VertexData<Float32Array>;
  public readonly indicies: VertexData<Uint16Array>;
  public readonly uvs: VertexData<Float32Array>;

  /** */
  public constructor(vertices: number[], indicies: number[], uvs: number[]) {
    this.vertices = new VertexData(new Float32Array(vertices), 3);
    this.indicies = new VertexData(new Uint16Array(indicies), 1);
    this.uvs = new VertexData(new Float32Array(uvs), 2);
  }
}

export default Geometry;
