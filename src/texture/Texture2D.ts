/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class Texture2D implements Texture {
  public source: Exclude<TexImageSource, ImageData>;
  public width: number;
  public height: number;
  public readonly isCube: boolean;
  public readonly isVideo: boolean;
  public readonly flipY: boolean;

  public constructor({
    source,
    width,
    height,
    isVideo,
    flipY
  }: {
    source: Exclude<TexImageSource, ImageData>;
    width: number;
    height: number;
    isVideo: boolean;
    flipY: boolean;
  }) {
    this.source = source;
    this.width = width;
    this.height = height;
    this.isVideo = isVideo;
    this.flipY = flipY;
    this.isCube = false;
  }
}

export default Texture2D;
