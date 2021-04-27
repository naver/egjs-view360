export type ValueOf<T> = T[keyof T];

export type TileConfig = {
  flipHorizontal: boolean;
  rotation: number;
};

export interface CubemapConfig {
  order: string;
  tileConfig: TileConfig | TileConfig[];
  trim: number;
}

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;

export type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}

export type ImageCandidate = HTMLImageElement | string | (HTMLImageElement | string)[];
export type VideoCandidate = HTMLVideoElement | string | { src: string; type: string } | (string | { src: string; type: string })[];
