/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export type ValueOf<T> = T[keyof T];
export type LiteralUnion<T extends U, U = string> = T | (Pick<U, never> & {_?: never});
export type NoBoolean<T> = T extends boolean ? never : T;
export type EventMap = Record<string, any>;
export type EventKey<T extends EventMap> = string & keyof T;

export type OptionGetters<T> = {
  [key in keyof T]: T[key]
};

export interface Range {
  min: number;
  max: number;
}
