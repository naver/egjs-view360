/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export type ValueOf<T> = T[keyof T];
export type LiteralUnion<T extends U, U = string> = T | (Pick<U, never> & {_?: never});
export type NoBoolean<T> = T extends boolean ? never : T;

export interface Range {
  min: number;
  max: number;
}

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

export type EventParams<T extends Record<string, any>, K extends keyof T> = Omit<T[K], "type" | "target"> extends Record<string, never>
  ? never
  : [Omit<T[K], "type" | "target">];
