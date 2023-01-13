/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { TypedArray } from "../type/utils";

/**
 * @hidden
 */
class VertexData<T extends TypedArray> {
  public readonly data: T;
  public itemSize: number;
  public count: number;

  /** */
  public constructor(data: T, itemSize: number) {
    this.data = data;
    this.itemSize = itemSize;
    this.count = data.length / itemSize;
  }
}

export default VertexData;
