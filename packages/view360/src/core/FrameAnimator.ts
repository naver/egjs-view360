/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * @internal
 */
class FrameAnimator {
  public maxDeltaTime: number;

  private _context: Window | XRSession;
  private _rafId: number;
  private _rafTimer: number;
  private _lastUpdateTime: number;

  /** */
  public constructor(maxDeltaTime: number, context: Window | XRSession = window) {
    this.maxDeltaTime = maxDeltaTime;

    this._context = context;
    this._rafId = -1;
    this._rafTimer = -1;
    this._lastUpdateTime = -1;
  }

  public start(callback: (delta: number, ...args: any[]) => any) {
    const context = this._context;

    // No context / callback set
    if (!context || !callback) return;

    // Animation already started
    if (this._rafId >= 0 || this._rafTimer >= 0) return;

    const loop = (_time: number, frame?: XRFrame) => {
      const time = Date.now();
      const delta = Math.min(time - this._lastUpdateTime, this.maxDeltaTime * 1000);

      callback(delta, frame);

      this._lastUpdateTime = time;
      this._rafId = context.requestAnimationFrame(loop);
    };

    this._lastUpdateTime = Date.now();
    this._rafId = context.requestAnimationFrame(loop);
  }

  public stop() {
    if (this._rafId >= 0) {
      this._context.cancelAnimationFrame(this._rafId);
    }

    if (this._rafTimer >= 0) {
      clearTimeout(this._rafTimer);
    }

    this._rafId = -1;
    this._rafTimer = -1;
  }

  public changeContext(context: Window | XRSession) {
    this.stop();
    this._context = context;
  }
}

export default FrameAnimator;
