/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import View3D from "../View3D";
import Pose from "../core/Pose";
import Motion from "../core/Motion";
import * as DEFAULT from "../const/default";
import { lerp, circulate } from "../utils";

import CameraControl from "./CameraControl";

/**
 * Control that animates model without user input
 */
class AnimationControl implements CameraControl {
  // Options
  private _from: Pose;
  private _to: Pose;
  private _disableOnFinish: boolean;

  // Internal values
  private _view3D: View3D;
  private _motion: Motion;
  private _enabled: boolean = false;
  private _finishCallbacks: Array<(...args: any) => any> = [];

  public get element() { return null; }
  /**
   * Whether this control is enabled or not
   * @readonly
   */
  public get enabled() { return this._enabled; }
  /**
   * Duration of the animation
   */
  public get duration() { return this._motion.duration; }
  /**
   * Easing function of the animation
   */
  public get easing() { return this._motion.easing; }
  /**
   * Whether this control is animating the camera
   * @readonly
   * @type {boolean}
   */
  public get animating() { return this._motion.activated; }

  public set duration(val: number) { this._motion.duration = val; }
  public set easing(val: (x: number) => number) { this._motion.easing = val; }

  /**
   * Create new instance of AnimationControl
   * @param from Start pose
   * @param to End pose
   * @param {object} options Options
   * @param {number} [options.duration=500] Animation duration
   * @param {function} [options.easing=(x: number) => 1 - Math.pow(1 - x, 3)] Animation easing function
   */
  public constructor(view3D: View3D, from: Pose, to: Pose, {
    duration = DEFAULT.ANIMATION_DURATION,
    easing = DEFAULT.EASING,
    disableOnFinish = true
  } = {}) {
    this._view3D = view3D;

    this._motion = new Motion({ duration, range: DEFAULT.ANIMATION_RANGE, easing });
    this._disableOnFinish = disableOnFinish;

    this.changeStartEnd(from, to);
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * This also will reset CSS cursor to intial
   * @returns {void}
   */
  public destroy(): void {
    this.disable();
  }

  public changeStartEnd(from: Pose, to: Pose) {
    from = from.clone();
    to = to.clone();

    from.yaw = circulate(from.yaw, 0, 360);
    to.yaw = circulate(to.yaw, 0, 360);

    // Take the smaller degree
    if (Math.abs(to.yaw - from.yaw) > 180) {
      to.yaw = to.yaw < from.yaw
        ? to.yaw + 360
        : to.yaw - 360;
    }

    this._from = from;
    this._to = to;
  }

  /**
   * Update control by given deltaTime
   * @param deltaTime Number of milisec to update
   * @returns {void}
   */
  public update(deltaTime: number): void {
    if (!this._enabled) return;

    const camera = this._view3D.camera;
    const from = this._from;
    const to = this._to;
    const motion = this._motion;
    motion.update(deltaTime);

    // Progress that easing is applied
    const progress = motion.val;

    camera.yaw = lerp(from.yaw, to.yaw, progress);
    camera.pitch = lerp(from.pitch, to.pitch, progress);
    camera.zoom = lerp(from.zoom, to.zoom, progress);
    camera.pivot = from.pivot.clone().lerp(to.pivot, progress);

    if (progress >= 1) {
      if (this._disableOnFinish) {
        this.disable();
      }

      this._finishCallbacks.forEach(callback => callback());
      this.clearFinished();
    }
  }

  /**
   * Enable this input and add event listeners
   * @returns {void}
   */
  public enable(): void {
    if (this._enabled) return;

    this._enabled = true;
    this.reset();
  }

  /**
   * Disable this input and remove all event handlers
   * @returns {void}
   */
  public disable(): void {
    if (!this._enabled) return;

    this._enabled = false;
  }

  public reset() {
    this._motion.reset(0);
    this._motion.setEndDelta(1);
  }

  /**
   * Add callback which is called when animation is finished
   * @param callback Callback that will be called when animation finishes
   * @returns {void}
   */
  public onFinished(callback: (...args: any) => any): void {
    this._finishCallbacks.push(callback);
  }

  /**
   * Remove all onFinished callbacks
   * @returns {void}
   */
  public clearFinished(): void {
    this._finishCallbacks = [];
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public resize(size: { width: number; height: number }) {
    // DO NOTHING
  }

  public sync(): void {
    // Do nothing
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export default AnimationControl;
