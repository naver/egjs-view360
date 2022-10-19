/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 *
 */
interface Texture {
  width: number;
  height: number;
  isCube: boolean;
  isVideo: boolean;
  flipY: boolean;
}

export default Texture;
