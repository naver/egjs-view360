/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { VAO } from "../type/external";

/**
 *
 */
class VertexArrayObject {
  public readonly obj: VAO;
  public readonly indicesCount: number;

  constructor(obj: VAO, indicesCount: number) {
    this.obj = obj;
    this.indicesCount = indicesCount;
  }
}

export default VertexArrayObject;
