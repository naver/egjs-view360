/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { TypedArray } from "../type/utils";

/**
 *
 */
class BufferAttribute<T extends TypedArray> {
  private _data: T;
  private _itemSize: number;
  private _count: number;

  public get data() { return this._data; }
  public get itemSize() { return this._itemSize; }
  public get count() { return this._count; }

  /** */
  public constructor(data: T, itemSize: number) {
    this._data = data;
    this._itemSize = itemSize;
    this._count = data.length / itemSize;
  }
}

export default BufferAttribute;
