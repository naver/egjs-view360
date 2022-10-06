/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ImReady from "@egjs/imready";
import ImageTexture from "../texture/ImageTexture";
import CubeTexture from "../texture/CubeTexture";
import VideoTexture from "../texture/VideoTexture";
import { isString } from "../utils";
import Texture from "../texture/Texture";
import WebGLContext from "../webgl/WebGLContext";

/**
 *
 */
class TextureLoader {
  private _loadChecker: ImReady;
  private _ctx: WebGLContext;

  constructor(ctx: WebGLContext) {
    this._loadChecker = new ImReady();
    this._ctx = ctx;
  }

  public async load(src: string | string[], isVideo: boolean): Promise<Texture> {
    if (isVideo) {
      return this.loadVideo(src);
    } else {
      if (Array.isArray(src) && src.length > 1) {
        return this.loadCubeImage(src);
      } else {
        const imgSrc = Array.isArray(src) ? src[0] : src;
        return this.loadImage(imgSrc);
      }
    }
  }

  public async loadImage(src: string): Promise<ImageTexture> {
    const images = this._toImageArray(src);

    return this._load(images, resolve => {
      const image = images[0];
      const webglTexture = this._ctx.createWebGLTexture(image);

      resolve(new ImageTexture(image, webglTexture));
    });
  }

  public async loadCubeImage(src: string[]): Promise<CubeTexture> {
    const images = this._toImageArray(src);

    return this._load(images, resolve => {
      // FIXME:
      const webglTexture = this._ctx.createWebGLTexture(images[0]);

      resolve(new CubeTexture(images, webglTexture));
    });
  }

  public async loadVideo(src: string | string[]): Promise<VideoTexture> {
    const video = this._toVideoElement(src);

    return this._load([video], resolve => {
      const webglTexture = this._ctx.createWebGLTexture(video);

      video.play();
      resolve(new VideoTexture(video, webglTexture));
    });
  }

  private _load<T>(content: HTMLElement[], onLoad: (resolve: (value: T) => void) => void): Promise<T> {
    const loader = this._loadChecker;

    return new Promise((resolve, reject) => {
      loader.once("ready", evt => {
        if (evt.errorCount > 0) return;

        onLoad(resolve);
      });

      loader.once("error", reject);
      loader.check(content);
    });
  }

  private _toImageArray(src: string | string[]): HTMLImageElement[] {
    const srcs = Array.isArray(src) ? src : [src];

    return srcs.map(source => {
      if (isString(source)) {
        const imgEl = new Image();

        imgEl.crossOrigin = "anonymous";
        imgEl.src = source;

        return imgEl;
      } else {
        return source;
      }
    });
  }

  private _toVideoElement(src: string | string[]): HTMLVideoElement {
    const video = document.createElement("video");

    video.crossOrigin = "anonymous";
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute("webkit-playsinline", "");

    if (Array.isArray(src)) {
      src.forEach(source => this._appendSourceElement(video, source));
    } else {
      this._appendSourceElement(video, src);
    }

    const sourceCount = video.querySelectorAll("source").length;
    if (sourceCount > 0) {
      if (video.readyState < 1) {
        video.load();
      }
    }

    return video;
  }

  private _appendSourceElement(video: HTMLMediaElement, src: string) {
    const sourceEl = document.createElement("source");

    sourceEl.src = src;
    video.appendChild(sourceEl);
  }
}

export default TextureLoader;
