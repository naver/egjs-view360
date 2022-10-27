/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ImReady from "@egjs/imready";
import Texture2D from "../texture/Texture2D";
import TextureCube from "../texture/TextureCube";
import { isString } from "../utils";
import Texture from "../texture/Texture";

/**
 *
 */
class TextureLoader {
  private _loadChecker: ImReady;

  constructor() {
    this._loadChecker = new ImReady();
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

  public async loadImage(src: string): Promise<Texture2D> {
    const images = this._toImageArray(src);

    return this._load(images, resolve => {
      const image = images[0];

      resolve(new Texture2D({
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        isVideo: false,
        flipY: true
      }));
    });
  }

  public async loadMultipleImages(src: string[]): Promise<Texture2D[]> {
    const images = this._toImageArray(src);

    return this._load(images, resolve => {
      const textures = images.map(image => new Texture2D({
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        isVideo: false,
        flipY: true
      }));

      resolve(textures);
    });
  }

  public async loadCubeImage(src: string[]): Promise<TextureCube> {
    const images = this._toImageArray(src);

    return this._load(images, resolve => {
      resolve(new TextureCube({
        sources: images,
        width: images[0].naturalWidth,
        height: images[0].naturalHeight,
        flipY: false,
        isVideo: false
      }));
    });
  }

  public async loadVideo(src: string | string[]): Promise<Texture2D> {
    const video = this._toVideoElement(src);

    return this._load([video], resolve => {
      video.play();

      resolve(new Texture2D({
        source: video,
        width: video.videoWidth,
        height: video.videoHeight,
        isVideo: true,
        flipY: true
      }));
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
