/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Motion from "../core/Motion";
import { DEFAULT_ANIMATION_DURATION, DEFAULT_EASING } from "../const/external";
import { OptionGetters } from "../type/utils";

import CameraControl from "./CameraControl";
import MouseInput from "./input/MouseInput";
import TouchInput from "./input/TouchInput";
import Camera from "../core/Camera";

/**
 * @interface
 * @param {number} [scale=1] Scale factor for rotation
 * @param {number} [duration=300] Duration of the input animation (ms)
 * @param {function} [easing=EASING.EASE_OUT_CUBIC] Easing function of the animation
 * @param {boolean} [disablePitch=false] Disable X-axis(pitch) rotation
 * @param {boolean} [disableYaw=false] Disable Y-axis(yaw) rotation
 */
export interface RotateControlOptions {
  scale: number;
  duration: number;
  easing: (x: number) => number;
  disablePitch: boolean;
  disableYaw: boolean;
}

/**
 * Model's rotation control that supports both mouse & touch
 */
class RotateControl implements CameraControl, OptionGetters<RotateControlOptions> {
  // Options
  private _scale: RotateControlOptions["scale"];
  private _duration: RotateControlOptions["duration"];
  private _easing: RotateControlOptions["easing"];
  private _disablePitch: RotateControlOptions["disablePitch"];
  private _disableYaw: RotateControlOptions["disableYaw"];

  // Internal values
  private _xMotion: Motion;
  private _yMotion: Motion;
  private _mouseInput: MouseInput;
  private _touchInput: TouchInput;
  private _screenScale: [number, number];
  private _enabled: boolean = false;

  /**
   * Whether this control is enabled or not
   * @readonly
   * @type {boolean}
   */
  public get enabled() { return this._enabled; }
  /**
   * Whether this control is animating the camera
   * @readonly
   * @type {boolean}
   */
  public get animating() { return this._xMotion.activated || this._yMotion.activated; }

  /**
   * Scale factor for rotation
   * @type {number}
   * @default 1
   */
  public get scale() { return this._scale; }
  public set scale(val: RotateControlOptions["scale"]) {
    this._scale = val;
  }

  /**
   * Duration of the input animation (ms)
   * @type {number}
   * @default 300
   */
  public get duration() { return this._duration; }
  public set duration(val: RotateControlOptions["duration"]) {
    this._duration = val;
    this._xMotion.duration = val;
    this._yMotion.duration = val;
  }

  /**
   * Easing function of the animation
   * @type {function}
   * @default EASING.EASE_OUT_CUBIC
   * @see EASING
   */
  public get easing() { return this._easing; }
  public set easing(val: RotateControlOptions["easing"]) {
    this._easing = val;
    this._xMotion.easing = val;
    this._yMotion.easing = val;
  }

  /**
   * Disable X-axis(pitch) rotation
   * @type {boolean}
   * @default false
   */
  public get disablePitch() { return this._disablePitch; }
  /**
   * Disable Y-axis(yaw) rotation
   * @type {boolean}
   * @default false
   */
  public get disableYaw() { return this._disableYaw; }

  /**
   * Create new RotateControl instance
   * @param {RotateControlOptions} options Options
   */
  public constructor({
    duration = DEFAULT_ANIMATION_DURATION,
    easing = DEFAULT_EASING,
    scale = 1,
    disablePitch = false,
    disableYaw = false
  }: Partial<RotateControlOptions> = {}) {
    this._scale = scale;
    this._duration = duration;
    this._easing = easing;
    this._disablePitch = disablePitch;
    this._disableYaw = disableYaw;

    this._screenScale = [0, 0];
    this._xMotion = new Motion({ duration, range: DEFAULT.INFINITE_RANGE, easing });
    this._yMotion = new Motion({ duration, range: DEFAULT.PITCH_RANGE, easing });
    this._mouseInput = new MouseInput();
    this._touchInput = new TouchInput();

    this._mouseInput.on("change", this._onInput);
    this._touchInput.on("change", this._onInput);
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * @returns {void}
   */
  public destroy(): void {
    this.disable();
  }

  /**
   * Update control by given deltaTime
   * @param {number} deltaTime Number of milisec to update
   * @returns {void}
   */
  public update(camera: Camera, deltaTime: number): void {
    const xMotion = this._xMotion;
    const yMotion = this._yMotion;
    const newPose = camera.newPose;
    const yawEnabled = !this._disableYaw;
    const pitchEnabled = !this._disablePitch;

    const deltaX = xMotion.update(deltaTime);
    const deltaY = yMotion.update(deltaTime);

    if (yawEnabled) {
      newPose.yaw += deltaX;
    }

    if (pitchEnabled) {
      newPose.pitch += deltaY;
    }
  }

  /**
   * Resize control to match target size
   * @param {object} size New size to apply
   * @param {number} [size.width] New width
   * @param {number} [size.height] New height
   */
  public resize(size: { width: number; height: number }) {
    this._screenScale[0] = 360 / size.width;
    this._screenScale[1] = 180 / size.height;
  }

  /**
   * Enable this input and add event listeners
   * @returns {void}
   */
  public enable(element: HTMLElement): void {
    if (this._enabled) return;

    this._mouseInput.enable(element);
    this._touchInput.enable(element);

    this._enabled = true;
  }

  /**
   * Disable this input and remove all event handlers
   * @returns {void}
   */
  public disable(): void {
    if (!this._enabled) return;

    this._mouseInput.disable();
    this._touchInput.disable();

    this._enabled = false;
  }

  public sync(camera: Camera) {
    this._xMotion.reset(camera.yaw);
    this._yMotion.reset(camera.pitch);
  }

  private _onInput = (deltaX: number, deltaY: number) => {
    const scale = this._scale;
    const screenScale = this._screenScale;

    this._xMotion.setEndDelta(deltaX * scale * screenScale[0]);
    this._yMotion.setEndDelta(deltaY * scale * screenScale[1]);
  }
}

export default RotateControl;
