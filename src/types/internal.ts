export type ValueOf<T> = T[keyof T];

export interface TileConfig {
  flipHorizontal: boolean;
  rotation: number;
}

export interface CubemapConfig {
  order: string;
  tileConfig: TileConfig | TileConfig[];
  trim: number;
}

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
};

export type ImageCandidate = HTMLImageElement | string | Array<HTMLImageElement | string>;
export type VideoCandidate = HTMLVideoElement | string | { src: string; type: string } | Array<string | { src: string; type: string }>;

export type Unique<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type MergeObject<T, U> = {
  [K in keyof T & keyof U]: T[K] extends Record<string, unknown>
    ? U[K] extends Record<string, unknown>
      ? Merged<T[K], U[K]>
      : T[K]
    : T[K];
};

export type Merged<From, To> =
  Unique<From, To>
  & Unique<To, From>
  & MergeObject<From, To>;
