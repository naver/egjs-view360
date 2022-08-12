/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import BufferAttribute from "../core/BufferAttribute";

/** */
abstract class Geometry {
  protected _vertices: BufferAttribute<Float32Array>;
  protected _indicies: BufferAttribute<Uint16Array>;
  protected _uvs: BufferAttribute<Float32Array>;

  public get vertices() { return this._vertices; }
  public get indicies() { return this._indicies; }
  public get uvs() { return this._uvs; }

  /** */
  public constructor(vertices: number[], indicies: number[], uvs: number[]) {
    this._vertices = new BufferAttribute(new Float32Array(vertices), 3);
    this._indicies = new BufferAttribute(new Uint16Array(indicies), 1);
    this._uvs = new BufferAttribute(new Float32Array(uvs), 2);
  }
}

export default Geometry;
