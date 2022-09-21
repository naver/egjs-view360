/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import BufferAttribute from "../core/BufferAttribute";
import WebGLContext from "../webgl/WebGLContext";

/** */
abstract class Geometry {
  public readonly vertices: BufferAttribute<Float32Array>;
  public readonly indicies: BufferAttribute<Uint16Array>;
  public readonly uvs: BufferAttribute<Float32Array>;

  /** */
  public constructor(vertices: number[], indicies: number[], uvs: number[]) {
    this.vertices = new BufferAttribute(new Float32Array(vertices), 3);
    this.indicies = new BufferAttribute(new Uint16Array(indicies), 1);
    this.uvs = new BufferAttribute(new Float32Array(uvs), 2);
  }
}

export default Geometry;
