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
import {
  CONTROL_EVENTS,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_EASING,
  INFINITE_RANGE
} from "../const/internal";
import { ControlEvents, InputEvents } from "../type/internal";

/**
 * Options for {@link ZoomControl}
 * @ko {@link ZoomControl}용 옵션들
 * @since 4.0.0
 */
export interface ZoomControlOptions {
  /**
   * @copy ZoomControl#scale
   */
  scale: number;
  /**
   * @copy ZoomControl#duration
   */
  duration: number;
  /**
   * @copy ZoomControl#easing
   */
  easing: (x: number) => number;
}

type ZoomControlEvents = ControlEvents<number>;

/**
 * Camera's zoom control
 * @ko 카메라의 줌 값을 담당하는 컨트롤
 * @since 4.0.0
 */
class ZoomControl extends Component<ZoomControlEvents> implements CameraControl {
  // Options
  private _scale: ZoomControlOptions["scale"];

  // Internal values
  private _controlEl: HTMLElement;
  private _enableBlocked: boolean;
  private _wheelInput: WheelInput;
  private _pinchInput: PinchInput;
  private _motion: Motion;
  private _enabled: boolean;

  /**
   * @copy CameraControl#enabled
   */
  public get enabled() { return this._enabled; }
  /**
   * @hidden
   */
  public get enableBlocked() { return this._enableBlocked; }
  /**
   * @copy CameraControl#animating
   */
  public get animating() { return this._motion.activated; }
  /**
   * Current zoom value
   * @ko 현재 줌 값
   * @since 4.0.0
   * @readonly
   */
  public get zoom() { return this._motion.val; }
  /**
   * @copy View360#wheelScrollable
   */
  public get scrollable() { return this._wheelInput.scrollable; }
  public set scrollable(val: boolean) {
    this._wheelInput.scrollable = val;
  }
  /**
   * @hidden
   */
  public get range() { return this._motion.range; }

  /**
   * Scale factor of the zoom
   * @ko 입력에 의한 줌 배율
   * @default 1
   * @since 4.0.0
   */
  public get scale() { return this._scale; }
  public set scale(val: ZoomControlOptions["scale"]) { this._scale = val; }

  /**
   * Duration of the input animation (ms)
   * @ko 회전 애니메이션의 시간 (ms)
   * @default 300
   * @since 4.0.0
   */
  public get duration() { return this._motion.duration; }

  /**
   * Easing function of the animation
   * @ko 회전 애니메이션에 적용할 easing 함수
   * @default EASING.EASE_OUT_CUBIC
   * @see EASING
   * @since 4.0.0
   */
  public get easing() { return this._motion.easing; }

  /**
   * Create new ZoomControl instance
   * @ko ZoomControl의 인스턴스를 생성합니다.
   * @param controlEl - Element to attach handlers {@ko 입력을 받을 엘리먼트}
   * @param enableBlocked - Whether to disable control on init {@ko 초기화 과정에서 컨트롤 활성화 여부}
   * @param options - Options for control {@ko 컨트롤 옵션들}
   */
  public constructor(controlEl: HTMLElement, enableBlocked: boolean, {
    scale = 1,
    duration = DEFAULT_ANIMATION_DURATION,
    easing = DEFAULT_EASING
  }: Partial<ZoomControlOptions> = {}) {
    super();

    this._scale = scale;

    this._controlEl = controlEl;
    this._enableBlocked = enableBlocked;
    this._wheelInput = new WheelInput();
    this._pinchInput = new PinchInput();
    this._motion = new Motion({
      duration,
      easing,
      range: INFINITE_RANGE
    });
    this._enabled = false;

    this._bindInputs();
  }

  public destroy(): void {
    this.disable();
    this._wheelInput.off();
    this._pinchInput.off();
    this.off();
  }

  /**
   * @hidden
   */
  public update(delta: number): void {
    if (!this._enabled) return;

    const motion = this._motion;
    motion.update(delta);
  }

  public enable(): void {
    if (this._enabled) return;

    const element = this._controlEl;
    this._wheelInput.enable(element);
    this._pinchInput.enable(element);

    this._enabled = true;
    this._enableBlocked = false;

    this.trigger(CONTROL_EVENTS.ENABLE, { control: this, updateCursor: false });
  }

  public disable(): void {
    if (!this._enabled) return;

    this._wheelInput.disable();
    this._pinchInput.disable();

    this._enabled = false;

    this.trigger(CONTROL_EVENTS.DISABLE, { updateCursor: false });
  }

  public sync(camera: Camera): void {
    const motion = this._motion;
    const range = camera.getZoomRange();

    motion.setRange(range.min, range.max);
    motion.reset(range.current);
  }

  private _bindInputs() {
    const wheelInput = this._wheelInput;
    const pinchInput = this._pinchInput;

    wheelInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    wheelInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    wheelInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);

    pinchInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    pinchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    pinchInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
  }

  private _onInputStart = (evt: InputEvents<number>[typeof CONTROL_EVENTS.INPUT_START]) => {
    this.trigger(CONTROL_EVENTS.INPUT_START, {
      ...evt,
      inputType: "zoom"
    });
  };

  private _onChange = ({ delta }: InputEvents<number>[typeof CONTROL_EVENTS.CHANGE]) => {
    const scale = this._scale;
    const scaledDelta = delta * scale;

    this._motion.setNewEndByDelta(scaledDelta);
  };

  private _onInputEnd = (evt: InputEvents<number>[typeof CONTROL_EVENTS.INPUT_END]) => {
    this.trigger(CONTROL_EVENTS.INPUT_END, {
      ...evt,
      inputType: "zoom"
    });
  };
}

export default ZoomControl;
