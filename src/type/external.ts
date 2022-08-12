export interface TileConfig {
  flipHorizontal: boolean;
  rotation: number;
}

export interface CubemapConfig {
  order: string;
  tileConfig: TileConfig | TileConfig[];
  trim: number;
}
