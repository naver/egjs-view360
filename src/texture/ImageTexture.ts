/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class ImageTexture extends Texture {
  public constructor(image: HTMLImageElement) {
    super(image);
  }
}

export default ImageTexture;
