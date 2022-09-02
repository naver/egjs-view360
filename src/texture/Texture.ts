/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 *
 */
interface Texture {
  webglTexture: WebGLTexture;
  width: number;
  height: number;
  source: TexImageSource;
  update(): void;
}

export default Texture;
