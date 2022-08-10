/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360Error from "./core/View360Error";
import ERROR from "./const/error";
import { merge } from "./utils";

/**
 * @interface
 * @see [Options](/docs/options/source/src) page for detailed information
 */
export interface PanoViewerOptions {
  src: string | HTMLElement | null;
}

/**
 *
 */
class PanoViewerBase {
  protected _rootEl: HTMLElement;
  protected _src: PanoViewerOptions["src"];

  public get root() { return this._rootEl; }
  public get src() { return this._src; }

  /**
   *
   * @param {PanoViewerOptions} options
   */
  public constructor(root: HTMLElement, {
    src = null
  }: Partial<PanoViewerOptions> = {}) {
    this._rootEl = root;
    this._src = src;

    console.log(src);
  }

  public destroy() {

  }

  /**
   * Initialize View360
   */
  public async init() {
    if (!this._src) {
      throw new View360Error(ERROR.MESSAGES.PROVIDE_SRC_FIRST, ERROR.CODES.PROVIDE_SRC_FIRST);
    }
  }

  /**
   */
  public resize() {

  }
}

export default PanoViewerBase;
