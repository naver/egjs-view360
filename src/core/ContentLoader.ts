/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ImReady from "@egjs/imready";
import ImageTexture from "../texture/ImageTexture";
import VideoTexture from "../texture/VideoTexture";
import { isString } from "../utils";

/**
 *
 */
class ContentLoader {
  private _loadChecker: ImReady;

  constructor() {
    this._loadChecker = new ImReady();
  }

  public async loadImage(src: string | string[]) {
    const checker = this._loadChecker;
    const images = this._toImageArray(src);

    return new Promise((resolve, reject) => {
      checker.once("ready", evt => {
        if (evt.errorCount > 0) return;
        resolve(images.map(img => new ImageTexture(img)));
      });
      checker.once("error", reject);

      checker.check(images);
    });
  }

  public async loadVideo(src: string | string[]) {
    const loader = this._loadChecker;
    const video = this._toVideoElement(src);

    return new Promise((resolve, reject) => {
      loader.once("ready", evt => {
        if (evt.errorCount > 0) return;
        resolve(new VideoTexture(video));
      });
      loader.once("error", reject);

      loader.check([video]);
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

    video.setAttribute("crossorigin", "anonymous");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("playsinline", "");

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

export default ContentLoader;
