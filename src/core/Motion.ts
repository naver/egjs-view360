/*
 * Copyright (c) 2020 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { clamp, lerp, circulate } from "../utils";
import { Range } from "../type/utils";
import { DEFAULT_ANIMATION_DURATION, DEFAULT_EASING } from "../const/external";

class Motion {
  // Options
  private _duration: number;
  private _loop: boolean;
  private _range: Range;
  private _easing: (x: number) => number;

  // Internal states
  private _progress: number;
  private _val: number;
  private _start: number;
  private _end: number;
  private _activated: boolean;

  public get val() { return this._val; }
  public get start() { return this._start; }
  public get end() { return this._end; }
  public get progress() { return this._progress; }
  public get activated() { return this._activated; }

  public get duration() { return this._duration; }
  public set duration(val: number) { this._duration = val; }

  public get loop() { return this._loop; }
  public set loop(val: boolean) { this._loop = val; }

  public get range() { return this._range; }
  public set range(val: Range) { this._range = val; }

  public get easing() { return this._easing; }
  public set easing(val: (x: number) => number) { this._easing = val; }

  public constructor({
    duration = DEFAULT_ANIMATION_DURATION,
    loop = false,
    range = { min: 0, max: 1 },
    easing = DEFAULT_EASING
  } = {}) {
    this._duration = duration;
    this._loop = loop;
    this._range = range;
    this._easing = easing;
    this._activated = false;
    this.reset(0);
  }

  /**
   * Update motion and progress it by given deltaTime
   * @param deltaTime number of milisec to update motion
   * @returns Difference(delta) of the value from the last update.
   */
  public update(deltaTime: number): number {
    if (!this._activated) return 0;

    const start = this._start;
    const end = this._end;
    const duration = this._duration;
    const prev = this._val;
    const loop = this._loop;

    const nextProgress = this._progress + deltaTime / duration;

    this._progress = loop
      ? circulate(nextProgress, 0, 1)
      : clamp(nextProgress, 0, 1);

    const easedProgress = this._easing(this._progress);
    this._val = lerp(start, end, easedProgress);

    if (!loop && this._progress >= 1) {
      this._activated = false;
    }

    return this._val - prev;
  }

  public reset(defaultVal: number): void {
    const range = this._range;
    const val = clamp(defaultVal, range.min, range.max);
    this._start = val;
    this._end = val;
    this._val = val;
    this._progress = 0;
    this._activated = false;
  }

  public setEndDelta(delta: number): void {
    const range = this._range;

    this._start = this._val;
    this._end = clamp(this._end + delta, range.min, range.max);
    this._progress = 0;
    this._activated = true;
  }
}

export default Motion;
