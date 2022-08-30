/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 *
 */
interface Texture {
  update(): void;
  createWebGLTexture(gl: WebGLRenderingContext): WebGLTexture;
}

export default Texture;
