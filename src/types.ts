export type ValueOf<T> = T[keyof T];

export interface CubemapConfig {
  order: string;
  tileConfig: {
    flipHorizontal: boolean;
    rotation: number;
  }
}
