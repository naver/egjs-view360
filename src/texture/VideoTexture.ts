/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Texture from "./Texture";

/**
 *
 */
class VideoTexture extends Texture {
  public constructor(video: HTMLVideoElement) {
    super(video);
  }

  public update() {
    // TODO:
  }
}

export default VideoTexture;
