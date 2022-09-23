/*
* Copyright (c) 2022 NAVER Corp.
* egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";
import CameraControl from "./CameraControl";
import WheelInput from "./input/WheelInput";
import PinchInput from "./input/PinchInput";
import Camera from "../core/Camera";
import Motion from "../core/Motion";
import { CONTROL_EVENTS, DEFAULT_ANIMATION_DURATION, DEFAULT_EASING } from "../const/internal";

/**
 * @interface
 * @param {number} [scale=1] Scale factor for panning.
 * @param {number} [duration=300] Duration of the input animation (ms)
 * @param {number} [min=1] Minimum zoom factor
 * @param {number} [max=2] Maximum zoom factor
 * @param {function} [easing=EASING.EASE_OUT_CUBIC] Easing function of the animation.
 */
export interface ZoomControlOptions {
  scale: number;
  duration: number;
  min: number;
  max: number;
  easing: (x: number) => number;
}

/**
 * Distance controller handling both mouse wheel and pinch zoom(fov)
 */
class ZoomControl extends Component<{
  [CONTROL_EVENTS.ENABLE]: { control: CameraControl; updateCursor: boolean };
  [CONTROL_EVENTS.DISABLE]: { updateCursor: boolean };
}> implements CameraControl {
  // Options
  private _scale: ZoomControlOptions["scale"];
  private _duration: ZoomControlOptions["duration"];
  private _easing: ZoomControlOptions["easing"];

  // Internal values
  private _wheelInput: WheelInput;
  private _pinchInput: PinchInput;
  private _motion: Motion;
  private _enabled: boolean;
  private _scaleModifier: number = 1;

  /**
   * Whether this control is enabled or not
   * @readonly
   */
  public get enabled() { return this._enabled; }
  /**
   * Whether this control is animating the camera
   * @readonly
   * @type {boolean}
   */
  public get animating() { return this._motion.activated; }
  /**
   *
   */
  public get zoom() { return this._motion.val; }
  /**
   * Whether the page is scrollable by this control
   * @type {boolean}
   */
  public get scrollable() { return this._wheelInput.scrollable; }
  public set scrollable(val: boolean) {
    this._wheelInput.scrollable = val;
  }
  /**
   * Currenet fov/distance range
   * @readonly
   * @type {Range}
   */
  public get range() { return this._motion.range; }

  /**
   * Scale factor of the zoom
   * @type number
   * @default 1
   */
  public get scale() { return this._scale; }
  public set scale(val: ZoomControlOptions["scale"]) { this._scale = val; }

  /**
   * Duration of the input animation (ms)
   * @type {number}
   * @default 300
   */
  public get duration() { return this._duration; }
  /**
   * Easing function of the animation
   * @type {function}
   * @default EASING.EASE_OUT_CUBIC
   * @see EASING
   */
  public get easing() { return this._easing; }

  /**
   * Create new ZoomControl instance
   * @param {View3D} view3D An instance of View3D
   * @param {ZoomControlOptions} [options={}] Options
   */
  public constructor({
    scale = 1,
    duration = DEFAULT_ANIMATION_DURATION,
    min = 1,
    max = 5,
    easing = DEFAULT_EASING
  }: Partial<ZoomControlOptions> = {}) {
    super();

    this._scale = scale;
    this._duration = duration;
    this._easing = easing;

    this._wheelInput = new WheelInput();
    this._pinchInput = new PinchInput();
    this._motion = new Motion({
      duration,
      easing,
      range: {
        min,
        max
      }
    });
    this._enabled = false;

    this._bindInputs();
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * @returns {void}
   */
  public destroy(): void {
    this.disable();
    this._wheelInput.off();
    this._pinchInput.off();
    this.off();
  }

  /**
   * Update control by given deltaTime
   * @param delta Number of milisec to update
   * @returns {void}
   */
  public update(delta: number): void {
    const motion = this._motion;
    motion.update(delta);
  }

  /**
   * Enable this input and add event listeners
   * @returns {void}
   */
  public enable(element: HTMLElement): void {
    if (this._enabled) return;

    this._wheelInput.enable(element);
    this._pinchInput.enable(element);

    this._enabled = true;

    this.trigger(CONTROL_EVENTS.ENABLE, { control: this, updateCursor: false });
  }

  /**
   * Disable this input and remove all event handlers
   * @returns {void}
   */
  public disable(): void {
    if (!this._enabled) return;

    this._wheelInput.disable();
    this._pinchInput.disable();

    this._enabled = false;

    this.trigger(CONTROL_EVENTS.DISABLE, { updateCursor: false });
  }

  /**
   * Synchronize this control's state to given camera position
   * @returns {void}
   */
  public sync(camera: Camera): void {
    const motion = this._motion;

    motion.reset(camera.zoom);
  }

  private _bindInputs() {
    const wheelInput = this._wheelInput;
    const pinchInput = this._pinchInput;

    wheelInput.on(CONTROL_EVENTS.CHANGE, this._onChange);

    pinchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
  }

  private _onChange = (val: number) => {
    const scale = this._scale;
    const scaledVal = val * scale;

    this._motion.addDelta(scaledVal);
  };
}

export default ZoomControl;
