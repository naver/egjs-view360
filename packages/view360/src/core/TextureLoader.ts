/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ImReady from "@egjs/imready";
import Texture from "../texture/Texture";
import Texture2D from "../texture/Texture2D";
import TextureVideo from "../texture/TextureVideo";
import TextureCube from "../texture/TextureCube";
import { getObjectOption, isString } from "../utils";
import { VideoConfig } from "../type/external";
import { ProjectionOptions } from "../projection/Projection";

/**
 * @hidden
 */
class TextureLoader {
  private _loadChecker: ImReady;

  constructor() {
    this._loadChecker = new ImReady();
  }

  public async load(src: ProjectionOptions["src"], video: ProjectionOptions["video"]): Promise<Texture> {
    if (video) {
      return this.loadVideo(src, getObjectOption(video));
    } else {
      if (Array.isArray(src) && src.length > 1) {
        return this.loadCubeImage(src);
      } else {
        const imgSrc = Array.isArray(src) ? src[0] : src;
        return this.loadImage(imgSrc);
      }
    }
  }

  public async loadImage(src: string | HTMLElement): Promise<Texture2D> {
    const images = this._toImageArray(src);

    return this._load(images, resolve => {
      const image = images[0];

      resolve(new Texture2D({
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        flipY: true
      }));
    });
  }

  public async loadCubeImage(src: Array<string | HTMLElement>): Promise<TextureCube> {
    const images = this._toImageArray(src);

    return this._load(images, resolve => {
      resolve(new TextureCube({
        sources: images,
        width: images[0].naturalWidth,
        height: images[0].naturalHeight,
        flipY: false
      }));
    });
  }

  public async loadVideo(src: ProjectionOptions["src"], videoConfig: Partial<VideoConfig>): Promise<TextureVideo> {
    const config: VideoConfig = {
      autoplay: true,
      muted: true,
      loop: false,
      volume: 1,
      ...videoConfig,
    };
    const video = this._toVideoElement(src, config);

    return this._load([video], resolve => {
      const { autoplay, muted } = config;

      video.currentTime = 0;
      if (autoplay && muted) {
        video.play().catch(() => void 0);
      }

      resolve(new TextureVideo({
        source: video,
        width: video.videoWidth,
        height: video.videoHeight,
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

  private _toImageArray(src: ProjectionOptions["src"]): HTMLImageElement[] {
    const srcs = Array.isArray(src) ? src : [src];

    return srcs.map(source => {
      if (isString(source)) {
        const imgEl = new Image();

        imgEl.crossOrigin = "anonymous";
        imgEl.src = source;

        return imgEl;
      } else {
        return source as HTMLImageElement;
      }
    });
  }

  private _toVideoElement(src: ProjectionOptions["src"], {
    muted,
    loop,
    volume
  }: VideoConfig): HTMLVideoElement {
    if (src instanceof HTMLVideoElement) {
      return src;
    }

    const video = document.createElement("video");

    video.crossOrigin = "anonymous";
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "");
    video.muted = muted;
    video.volume = volume;
    video.loop = loop;

    if (Array.isArray(src)) {
      src.forEach(source => this._appendSourceElement(video, source));
    } else {
      this._appendSourceElement(video, src);
    }

    const sourceCount = video.querySelectorAll("source").length;
    if (sourceCount > 0 && video.readyState < 1) {
      video.load();
    }

    return video;
  }

  private _appendSourceElement(video: HTMLMediaElement, src: string | HTMLElement) {
    if (src instanceof HTMLSourceElement) {
      return src;
    }

    const sourceEl = document.createElement("source");
    sourceEl.src = src as string;
    video.appendChild(sourceEl);
  }
}

export default TextureLoader;
