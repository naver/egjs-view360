/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as BROWSER from "../const/browser";

/**
 * Automatic resizer that uses both ResizeObserver and window resize event
 */
class AutoResizer {
  private _enabled: boolean;
  private _resizeObserver: ResizeObserver | null;
  private _useResizeObserver: boolean;
  private _onResize: () => any;

  public get useResizeObserver() { return this._useResizeObserver; }

  /**
   * Returns whether AutoResizer is enabled
   */
  public get enabled() { return this._enabled; }

  /** */
  public constructor(useResizeObserver: boolean, onResize: () => any) {
    this._useResizeObserver = useResizeObserver;

    this._enabled = false;
    this._resizeObserver = null;
    this._onResize = onResize;
  }

  /**
   * Enable resizer
   */
  public enable(element: HTMLElement): this {
    if (this._enabled) {
      this.disable();
    }

    if (this._useResizeObserver && !!window.ResizeObserver) {
      const bbox = element.getBoundingClientRect();
      const resizeImmediate = bbox.width !== 0 || bbox.height !== 0;

      const resizeObserver = new ResizeObserver(resizeImmediate ? this._skipFirstResize : this._onResize);

      resizeObserver.observe(element);

      this._resizeObserver = resizeObserver;
    } else {
      window.addEventListener(BROWSER.EVENTS.RESIZE, this._onResize);
    }

    this._enabled = true;

    return this;
  }

  /**
   * Disable resizer
   */
  public disable(): this {
    if (!this._enabled) return this;

    const resizeObserver = this._resizeObserver;
    if (resizeObserver) {
      resizeObserver.disconnect();
      this._resizeObserver = null;
    } else {
      window.removeEventListener(BROWSER.EVENTS.RESIZE, this._onResize);
    }

    this._enabled = false;

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _skipFirstResize = (() => {
    let isFirstResize = true;

    return (() => {
      if (isFirstResize) {
        isFirstResize = false;

        return;
      }
      this._onResize();
    });
  })();
}

export default AutoResizer;
