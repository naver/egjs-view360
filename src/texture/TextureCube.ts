/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class TextureCube implements Texture {
  public sources: TexImageSource[];
  public width: number;
  public height: number;
  public readonly isVideo: boolean;
  public readonly isCube: boolean;
  public readonly flipY: boolean;

  public constructor({
    sources,
    width,
    height,
    isVideo,
    flipY
  }: {
    sources: TexImageSource[];
    width: number;
    height: number;
    isVideo: boolean;
    flipY: boolean;
  }) {
    this.sources = sources;
    this.width = width;
    this.height = height;
    this.isVideo = isVideo;
    this.flipY = flipY;
    this.isCube = true;
  }
}

export default TextureCube;
