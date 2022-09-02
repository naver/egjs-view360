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
  public constructor(ctx: WebGLContext, vertices: number[], indicies: number[], uvs: number[]) {
    this.vertices = new BufferAttribute(new Float32Array(vertices), 3, ctx.createBuffer());
    this.indicies = new BufferAttribute(new Uint16Array(indicies), 1, ctx.createBuffer());
    this.uvs = new BufferAttribute(new Float32Array(uvs), 2, ctx.createBuffer());
  }
}

export default Geometry;
