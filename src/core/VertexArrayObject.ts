/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "../geometry/Geometry";
import { VAO } from "../type/external";

/**
 *
 */
class VertexArrayObject {
  public readonly obj: VAO;
  public readonly count: number;
  public readonly isNative: boolean;

  constructor(obj: VAO | Geometry, count: number, isNative: boolean) {
    this.obj = obj;
    this.count = count;
    this.isNative = isNative;
  }
}

export default VertexArrayObject;
