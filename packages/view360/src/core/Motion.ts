/*
 * Copyright (c) 2020 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { clamp, lerp, circulate } from "../utils";
import { Range } from "../type/utils";
import { DEFAULT_ANIMATION_DURATION, DEFAULT_EASING } from "../const/internal";

/**
 * Interpolator between two values with duration
 * @ko 특정 시간동안 두 값을 보간해주는 보간기
 * @since 4.0.0
 */
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

  /**
   * Current interpolated value
   * @ko 현재 보간된 값
   * @since 4.0.0
   */
  public get val() { return this._val; }
  /**
   * Start(from) value of interpolation
   * @ko 보간 시작 값
   * @since 4.0.0
   */
  public get start() { return this._start; }
  /**
   * End(to) value of interpolation
   * @ko 보간 끝 값
   * @since 4.0.0
   */
  public get end() { return this._end; }
  /**
   * Interpolation progress value (0 ~ 1)
   * @ko 현재 보간 진행정도 (0 ~ 1)
   * @since 4.0.0
   */
  public get progress() { return this._progress; }
  /**
   * Whether the interpolation is in active state.
   * @ko 보간 진행중인지 여부. `true`일 경우 보간이 진행중입니다.
   * @since 4.0.0
   */
  public get activated() { return this._activated; }

  /**
   * Duration of the interpolation
   * @ko 보간할 시간
   * @since 4.0.0
   */
  public get duration() { return this._duration; }
  public set duration(val: number) { this._duration = val; }

  /**
   * Whether to loop interpolation on finish
   * @ko 보간이 끝난 이후에 다시 시작할지 여부
   * @since 4.0.0
   */
  public get loop() { return this._loop; }
  public set loop(val: boolean) { this._loop = val; }

  /**
   * Range of the interpolation
   * @ko 보간 범위
   * @since 4.0.0
   */
  public get range() { return this._range; }

  /**
   * Easing function of the interpolation
   * @ko 보간에 사용되는 easing function
   * @since 4.0.0
   */
  public get easing() { return this._easing; }
  public set easing(val: (x: number) => number) { this._easing = val; }

  /**
   * Create new instance.
   * @ko 새로운 인스턴스를 생성합니다.
   * @param options Options {@ko 옵션들}
   * @param options.duration Duration of the interpolation {@ko 보간할 시간}
   * @param options.loop Whether to loop interpolation on finish {@ko 보간이 끝난 이후에 다시 시작할지 여부}
   * @param options.range Range of the interpolation {@ko 보간 범위}
   * @param options.loop Easing function of the interpolation {@ko 보간에 사용되는 easing function}
   */
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
   * @ko 주어진 deltaTime만큼 보간을 진행합니다.
   * @param deltaTime - number of milisec to update motion {@ko 보간을 진행할 시간, 밀리초 단위}
   * @returns Difference(delta) of the value from the last update. {@ko 지난 업데이트 이후의 값 변화량}
   * @since 4.0.0
   */
  public update(deltaTime: number): number {
    if (!this._activated) {
      this._val = this._end;
      return 0;
    }

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

  /**
   * Set `start`, `end` to the given value and set `progress` to 0.
   * @ko 주어진 값으로 시작 지점, 끝 지점을 초기화하고 progress를 0으로 세팅합니다.
   * @param defaultVal - Value to reset {@ko 초기화할 값}
   * @since 4.0.0
   */
  public reset(defaultVal: number): void {
    const range = this._range;
    const val = clamp(defaultVal, range.min, range.max);
    this._start = val;
    this._end = val;
    this._val = val;
    this._progress = 0;
    this._activated = false;
  }

  /**
   * Add delta to start & end and current value.
   * @ko 현재 & 끝 및 현재 값에 주어진 값을 더합니다.
   * @param delta - Delta value to add {@ko 추가할 값}
   */
  public add(delta: number) {
    const range = this._range;

    this._start = clamp(this._start + delta, range.min, range.max);
    this._end = clamp(this._end + delta, range.min, range.max);
    this._val = clamp(this._val + delta, range.min, range.max);
  }

  /**
   * Set current value to start, and end to current value + delta, then reset progress to 0.
   * @ko 현재 값을 시작 지점으로, 그에서 delta만큼 추가된 값을 끝점으로 하고 progress를 0으로 갱신합니다.
   * @param delta - Delta value to add {@ko 추가할 값}
   */
  public setNewEndByDelta(delta: number): void {
    const range = this._range;

    this._start = this._val;
    this._end = clamp(this._end + delta, range.min, range.max);
    this._progress = 0;
    this._activated = true;
  }

  /**
   * Set new range of the interpolation.
   * @ko 보간의 범위를 변경합니다.
   * @param min - New minimum range {@ko 변경할 범위의 최소값}
   * @param max - New maximum range {@ko 변경할 범위의 최대값}
   */
  public setRange(min: number, max: number) {
    this._start = clamp(this._start, min, max);
    this._end = clamp(this._end, min, max);
    this._range = { min, max };
  }
}

export default Motion;
