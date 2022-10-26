/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";

import CameraControl from "./CameraControl";
import MouseInput from "./input/MouseInput";
import TouchInput from "./input/TouchInput";
import Camera from "../core/Camera";
import Motion from "../core/Motion";
import { CONTROL_EVENTS, INFINITE_RANGE, PITCH_RANGE, DEFAULT_ANIMATION_DURATION, DEFAULT_EASING, DEG_TO_RAD, RAD_TO_DEG } from "../const/internal";
import { Range } from "../type/utils";
import { toVerticalFov } from "../utils";

/**
 * @interface
 * @param {number} [scale=[1,1]] Scale factor for rotation
 * @param {number} [duration=300] Duration of the input animation (ms)
 * @param {function} [easing=EASING.EASE_OUT_CUBIC] Easing function of the animation
 * @param {boolean} [disablePitch=false] Disable X-axis(pitch) rotation
 * @param {boolean} [disableYaw=false] Disable Y-axis(yaw) rotation
 */
export interface RotateControlOptions {
  scale: [number, number];
  duration: number;
  easing: (x: number) => number;
  disablePitch: boolean;
  disableYaw: boolean;
}

/**
 * Model's rotation control that supports both mouse & touch
 */
class RotateControl extends Component<{
  [CONTROL_EVENTS.HOLD]: void;
  [CONTROL_EVENTS.RELEASE]: void;
  [CONTROL_EVENTS.ENABLE]: { control: CameraControl; updateCursor: boolean };
  [CONTROL_EVENTS.DISABLE]: { updateCursor: boolean };
}> implements CameraControl {
  // Options
  private _scale: RotateControlOptions["scale"];
  private _duration: RotateControlOptions["duration"];
  private _easing: RotateControlOptions["easing"];
  private _disablePitch: RotateControlOptions["disablePitch"];
  private _disableYaw: RotateControlOptions["disableYaw"];

  // Internal values
  private _mouseInput: MouseInput;
  private _touchInput: TouchInput;
  private _xMotion: Motion;
  private _yMotion: Motion;
  private _screenScale: [number, number];
  private _zoomScale: number;
  private _enabled: boolean;
  private _yawLimit: (Range & { cylinderHeight?: number }) | null;
  private _pitchLimit: Range | null;

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
  /** */
  public get yaw() { return this._xMotion.val; }
  /**
   *
   */
  public get pitch() { return this._yMotion.val; }
  /**
   * Whether the page is scrollable by this control
   * @type {boolean}
   */
  public get scrollable() { return this._touchInput.scrollable; }
  public set scrollable(val: boolean) {
    this._touchInput.scrollable = val;
  }

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
  public set disablePitch(val: RotateControlOptions["disablePitch"]) { this._disablePitch = val; }

  /**
   * Disable Y-axis(yaw) rotation
   * @type {boolean}
   * @default false
   */
  public get disableYaw() { return this._disableYaw; }
  public set disableYaw(val: RotateControlOptions["disableYaw"]) { this._disableYaw = val; }

  /**
   * Create new RotateControl instance
   * @param {RotateControlOptions} options Options
   */
  public constructor({
    duration = DEFAULT_ANIMATION_DURATION,
    easing = DEFAULT_EASING,
    scale = [1, 1],
    disablePitch = false,
    disableYaw = false,
  }: Partial<RotateControlOptions> = {}) {
    super();

    this._scale = scale;
    this._duration = duration;
    this._easing = easing;
    this._disablePitch = disablePitch;
    this._disableYaw = disableYaw;

    this._mouseInput = new MouseInput();
    this._touchInput = new TouchInput();
    this._xMotion = new Motion({ duration, range: INFINITE_RANGE, easing });
    this._yMotion = new Motion({ duration, range: PITCH_RANGE, easing });
    this._screenScale = [1, 1];
    this._zoomScale = 1;
    this._enabled = false;
    this._yawLimit = null;
    this._pitchLimit = null;

    this._bindInputs();
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * @returns {void}
   */
  public destroy(): void {
    this.disable();
    this._mouseInput.off();
    this._touchInput.off();
    this.off();
  }

  /**
   * Update control by given deltaTime
   * @param {number} delta Number of milisec to update
   * @returns {void}
   */
  public update(delta: number): void {
    const xMotion = this._xMotion;
    const yMotion = this._yMotion;

    xMotion.update(delta);
    yMotion.update(delta);
  }

  public restrictYawRange(min: number, max: number, cylinderHeight?: number) {
    this._yawLimit = { min, max, cylinderHeight };
  }

  public freeYawRange() {
    this._yawLimit = null;
  }

  /**
   * Set new pitch range
   * @param min Minimum pitch value
   * @param max Maximum pitch value
   */
  public restrictPitchRange(min: number, max: number) {
    this._pitchLimit = { min, max };
  }

  public freePitchRange() {
    this._yMotion.setRange(PITCH_RANGE.min, PITCH_RANGE.max);
    this._pitchLimit = null;
  }

  public updateRange(camera: Camera, zoom: number) {
    const yawLimit = this._yawLimit;
    const pitchLimit = this._pitchLimit;

    if (yawLimit) {
      const halfHFov = camera.getHorizontalFov(zoom) * 0.5;
      let minYaw = yawLimit.min + halfHFov;
      let maxYaw = yawLimit.max - halfHFov;

      if (yawLimit.cylinderHeight) {
        const halfVFovRad = toVerticalFov(halfHFov * DEG_TO_RAD, camera.aspect);
        const h = yawLimit.cylinderHeight * 0.5;
        const t = Math.tan(halfVFovRad);
        const d = Math.sqrt((1 + h * h) / (1 + t * t));
        const theta = Math.atan(Math.tan(halfHFov * DEG_TO_RAD) * d) * RAD_TO_DEG;

        minYaw = yawLimit.min + theta;
        maxYaw = yawLimit.max - theta;
      }

      if (minYaw > maxYaw) {
        minYaw = 0;
        maxYaw = 0;
      }

      this._xMotion.setRange(minYaw, maxYaw);
    }

    if (pitchLimit) {
      const halfVFov = camera.getVerticalFov(zoom) * 0.5;

      let minPitch = pitchLimit.min + halfVFov;
      let maxPitch = pitchLimit.max - halfVFov;

      if (minPitch > maxPitch) {
        minPitch = 0;
        maxPitch = 0;
      }

      this._yMotion.setRange(minPitch, maxPitch);
    }
  }

  public setZoomScale(val: number) {
    this._zoomScale = val;
  }

  /**
   * Resize control to match target size
   * @param width New width
   * @param height New height
   */
  public resizeByFov(camera: Camera, width: number, height: number) {
    const hfov = camera.baseFov;
    const vfov = toVerticalFov(hfov * DEG_TO_RAD, camera.aspect) * RAD_TO_DEG;

    this._screenScale[0] = hfov / width;
    this._screenScale[1] = vfov / height;
  }


  /**
   * Resize control to match target size
   * @param width New width
   * @param height New height
   */
  public resizeByDegree(xDegree: number, yDegree: number, width: number, height: number) {
    this._screenScale[0] = xDegree / width;
    this._screenScale[1] = yDegree / height;
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

    this.trigger(CONTROL_EVENTS.ENABLE, { control: this, updateCursor: true });
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

    this.trigger(CONTROL_EVENTS.DISABLE, { updateCursor: true });
  }

  /**
   * Synchronize this control's state to given camera position
   * @returns {void}
   */
  public sync(camera: Camera): void {
    this.updateRange(camera, camera.zoom);
    this._xMotion.reset(camera.yaw);
    this._yMotion.reset(camera.pitch);
  }

  private _bindInputs() {
    const mouseInput = this._mouseInput;
    const touchInput = this._touchInput;

    mouseInput.on(CONTROL_EVENTS.HOLD, this._onHold);
    mouseInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    mouseInput.on(CONTROL_EVENTS.RELEASE, this._onRelease);

    touchInput.on(CONTROL_EVENTS.HOLD, this._onHold);
    touchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    touchInput.on(CONTROL_EVENTS.RELEASE, this._onRelease);
  }

  private _onHold = () => {
    this.trigger(CONTROL_EVENTS.HOLD);
  };

  private _onChange = ({ x, y }: { x: number, y: number }) => {
    const scale = this._scale;
    const invZoomScale = 1 / this._zoomScale; // Reduce speed on zoom
    const screenScale = this._screenScale;

    const scaledX = x * scale[0] * screenScale[0] * invZoomScale;
    const scaledY = y * scale[1] * screenScale[1] * invZoomScale;

    this._xMotion.addDelta(scaledX);
    this._yMotion.addDelta(scaledY);
  }

  private _onRelease = () => {
    this.trigger(CONTROL_EVENTS.RELEASE);
  };
}

export default RotateControl;
