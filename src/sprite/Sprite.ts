/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
interface Sprite {
  length: number;
  getImage(index: number): {
    source: Exclude<TexImageSource, ImageData>;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export default Sprite;
