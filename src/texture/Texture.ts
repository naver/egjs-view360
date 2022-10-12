/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 *
 */
interface Texture {
  webglTexture: WebGLTexture;
  source: TexImageSource;
  isVideo: boolean;
  flipY: boolean;
}

export default Texture;
