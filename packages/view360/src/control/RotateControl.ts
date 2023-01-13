/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import CameraControl from "./CameraControl";
import MouseInput from "./input/MouseInput";
import TouchInput from "./input/TouchInput";
import KeyboardInput from "./input/KeyboardInput";
import Camera from "../core/Camera";
import Motion from "../core/Motion";
import { CONTROL_EVENTS, INFINITE_RANGE, DEFAULT_PITCH_RANGE, DEFAULT_ANIMATION_DURATION, DEFAULT_EASING, DEG_TO_RAD, RAD_TO_DEG } from "../const/internal";
import { toVerticalFov } from "../utils";
import { ControlEvents, InputEvents } from "../type/internal";

/**
 * Options for {@link RotateControl}
 * @ko {@link RotateControl}용 옵션들
 * @since 4.0.0
 */
export interface RotateControlOptions {
  /**
   * @copy RotateControl#pointerScale
   */
  pointerScale: [number, number];
  /**
   * @copy RotateControl#keyboardScale
   */
  keyboardScale: [number, number];
  /**
   * @copy RotateControl#duration
   */
  duration: number;
  /**
   * @copy RotateControl#easing
   */
  easing: (x: number) => number;
  /**
   * @copy RotateControl#disablePitch
   */
  disablePitch: boolean;
  /**
   * @copy RotateControl#disableYaw
   */
  disableYaw: boolean;
  /**
   * @copy RotateControl#disableKeyboard
   */
  disableKeyboard: boolean;
}

type RotateDeltaType = { x: number; y: number; };
export type RotateControlEvents = ControlEvents<RotateDeltaType>;

/**
 * Camera's rotation control
 * @ko 카메라의 회전을 담당하는 컨트롤
 * @since 4.0.0
 */
class RotateControl extends Component<RotateControlEvents> implements CameraControl {
  // Options
  private _pointerScale: RotateControlOptions["pointerScale"];
  private _keyboardScale: RotateControlOptions["keyboardScale"];
  private _duration: RotateControlOptions["duration"];
  private _easing: RotateControlOptions["easing"];
  private _disablePitch: RotateControlOptions["disablePitch"];
  private _disableYaw: RotateControlOptions["disableYaw"];
  private _disableKeyboard: RotateControlOptions["disableKeyboard"];

  // Internal values
  private _controlEl: HTMLElement;
  private _enableBlocked: boolean;
  private _mouseInput: MouseInput;
  private _touchInput: TouchInput;
  private _keyboardInput: KeyboardInput;
  private _xMotion: Motion;
  private _yMotion: Motion;
  private _screenScale: [number, number];
  private _zoomScale: number;
  private _enabled: boolean;
  private _changedWhileDragging: boolean;

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
  public get animating() {
    return this._keyboardInput.active
      || this._xMotion.activated
      || this._yMotion.activated;
  }
  /**
   * Current yaw value
   * @ko 현재 yaw 값
   * @readonly
   * @since 4.0.0
   */
  public get yaw() { return this._xMotion; }
  /**
   * Current pitch value
   * @ko 현재 pitch 값
   * @readonly
   * @since 4.0.0
   */
  public get pitch() { return this._yMotion; }
  /**
   * @copy View360#scrollable
   */
  public get scrollable() { return this._touchInput.scrollable; }
  public set scrollable(val: boolean) {
    this._touchInput.scrollable = val;
  }

  /**
   * Scale factor for mouse/touch rotation
   * @ko 마우스/터치를 통한 회전 배율
   * @default [1, 1]
   * @since 4.0.0
   */
  public get pointerScale() { return this._pointerScale; }
  public set pointerScale(val: RotateControlOptions["pointerScale"]) {
    this._pointerScale = val;
  }

  /**
   * Scale factor for keyboard rotation
   * @ko 키보드를 통한 회전 배율
   * @default [1, 1]
   * @since 4.0.0
   */
  public get keyboardScale() { return this._keyboardScale; }
  public set keyboardScale(val: RotateControlOptions["keyboardScale"]) {
    this._keyboardScale = val;
  }

  /**
   * Duration of the input animation (ms)
   * @ko 회전 애니메이션의 시간 (ms)
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
   * @ko 회전 애니메이션에 적용할 easing 함수
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
   * Disable X-axis(pitch) rotation.
   * @ko x축 회전(pitch)을 비활성화합니다.
   * @default false
   */
  public get disablePitch() { return this._disablePitch; }
  public set disablePitch(val: RotateControlOptions["disablePitch"]) { this._disablePitch = val; }

  /**
   * Disable Y-axis(yaw) rotation.
   * @ko y축 회전(yaw)을 비활성화합니다.
   * @default false
   */
  public get disableYaw() { return this._disableYaw; }
  public set disableYaw(val: RotateControlOptions["disableYaw"]) { this._disableYaw = val; }

  /**
   * Disable rotation by keyboard.
   * @ko 키보드를 이용한 회전을 비활성화합니다.
   * @default false
   */
  public get disableKeyboard() { return this._disableKeyboard; }
  public set disableKeyboard(val: RotateControlOptions["disableKeyboard"]) { this._disableKeyboard = val; }

  /**
   * Create new RotateControl instance
   * @ko RotateControl의 인스턴스를 생성합니다.
   * @param controlEl - Element to attach handlers {@ko 입력을 받을 엘리먼트}
   * @param enableBlocked - Whether to disable control on init {@ko 초기화 과정에서 컨트롤 활성화 여부}
   * @param options - Options for control {@ko 컨트롤 옵션들}
   */
  public constructor(controlEl: HTMLElement, enableBlocked: boolean, {
    duration = DEFAULT_ANIMATION_DURATION,
    easing = DEFAULT_EASING,
    pointerScale = [1, 1],
    keyboardScale = [1, 1],
    disablePitch = false,
    disableYaw = false,
    disableKeyboard = false
  }: Partial<RotateControlOptions> = {}) {
    super();

    this._controlEl = controlEl;
    this._pointerScale = pointerScale;
    this._keyboardScale = keyboardScale;
    this._duration = duration;
    this._easing = easing;
    this._disablePitch = disablePitch;
    this._disableYaw = disableYaw;
    this._disableKeyboard = disableKeyboard;

    this._enableBlocked = enableBlocked;
    this._mouseInput = new MouseInput();
    this._touchInput = new TouchInput();
    this._keyboardInput = new KeyboardInput();
    this._xMotion = new Motion({ duration, range: INFINITE_RANGE, easing });
    this._yMotion = new Motion({ duration, range: DEFAULT_PITCH_RANGE, easing });
    this._screenScale = [1, 1];
    this._zoomScale = 1;
    this._enabled = false;
    this._changedWhileDragging = false;
    this._bindInputs();
  }

  public destroy(): void {
    this.disable();
    this._mouseInput.off();
    this._touchInput.off();
    this._keyboardInput.off();
    this.off();
    this._changedWhileDragging = false;
  }

  /**
   * @hidden
   */
  public update(delta: number): void {
    if (!this._enabled) return;

    const xMotion = this._xMotion;
    const yMotion = this._yMotion;
    const keyboardInput = this._keyboardInput;

    if (!this._disableKeyboard) {
      keyboardInput.update();
    }

    if (!this._disablePitch) {
      yMotion.update(delta);
    }

    if (!this._disableYaw) {
      xMotion.update(delta);
    }
  }

  /**
   * @hidden
   */
  public updateRange(camera: Camera, zoom: number) {
    const yawRange = camera.getYawRange(zoom);
    const pitchRange = camera.getPitchRange(zoom);

    this._xMotion.setRange(yawRange.min, yawRange.max);
    this._yMotion.setRange(pitchRange.min, pitchRange.max);
  }

  /**
   * @hidden
   */
  public setZoomScale(val: number) {
    this._zoomScale = val;
  }

  /**
   * Resize control to match target size.
   * @ko 컨트롤의 내부 크기를 갱신합니다.
   * @param hfov - Camera horizontal fov in degrees {@ko 카메라의 수평방향 fov값 (도 단위)}
   * @param aspect - Camera aspect {@ko 카메라 가로/세로 비율}
   * @param width - New width {@ko 갱신된 너비}
   * @param height - New height {@ko 갱신된 높이}
   */
  public resize(hfov: number, aspect: number, width: number, height: number) {
    const vfov = toVerticalFov(hfov * DEG_TO_RAD, aspect) * RAD_TO_DEG;

    this._screenScale[0] = hfov / width;
    this._screenScale[1] = vfov / height;
  }

  public enable(): void {
    if (this._enabled) return;

    const element = this._controlEl;

    this._mouseInput.enable(element);
    this._touchInput.enable(element);
    this._keyboardInput.enable(element);

    this._enabled = true;
    this._enableBlocked = false;

    this.trigger(CONTROL_EVENTS.ENABLE, { control: this, updateCursor: true });
  }

  public disable(): void {
    if (!this._enabled) return;

    this._mouseInput.disable();
    this._touchInput.disable();
    this._keyboardInput.disable();

    this._enabled = false;

    this.trigger(CONTROL_EVENTS.DISABLE, { updateCursor: true });
  }

  public sync(camera: Camera): void {
    this.updateRange(camera, camera.zoom);

    this._xMotion.reset(camera.yaw);
    this._yMotion.reset(camera.pitch);
  }

  private _bindInputs() {
    const mouseInput = this._mouseInput;
    const touchInput = this._touchInput;
    const keyboardInput = this._keyboardInput;

    mouseInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    mouseInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    mouseInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);

    touchInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    touchInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    touchInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);

    keyboardInput.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    keyboardInput.on(CONTROL_EVENTS.CHANGE, this._onChange);
    keyboardInput.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
  }

  private _onInputStart = (evt: InputEvents<RotateDeltaType>[typeof CONTROL_EVENTS.INPUT_START]) => {
    this._changedWhileDragging = false;
    this.trigger(CONTROL_EVENTS.INPUT_START, {
      ...evt,
      inputType: "rotate"
    });
  };

  private _onChange = (evt: InputEvents<RotateDeltaType>[typeof CONTROL_EVENTS.CHANGE]) => {
    const delta = evt.delta;
    const invZoomScale = 1 / this._zoomScale; // Reduce speed on zoom
    const screenScale = this._screenScale;
    const keyboardScale = this._keyboardScale;
    const pointerScale = this._pointerScale;

    let scale: [number, number];

    if (evt.isKeyboard) {
      scale = [
        keyboardScale[0] * invZoomScale,
        keyboardScale[1] * invZoomScale
      ];
    } else {
      scale = [
        pointerScale[0] * screenScale[0] * invZoomScale,
        pointerScale[1] * screenScale[1] * invZoomScale
      ];
    }

    const scaledX = delta.x * scale[0];
    const scaledY = delta.y * scale[1];

    this._xMotion.setNewEndByDelta(scaledX);
    this._yMotion.setNewEndByDelta(scaledY);

    this._changedWhileDragging = true;
  }

  private _onInputEnd = (evt: InputEvents<RotateDeltaType>[typeof CONTROL_EVENTS.INPUT_END]) => {
    this.trigger(CONTROL_EVENTS.INPUT_END, {
      ...evt,
      inputType: "rotate"
    });

    if (!this._changedWhileDragging && !evt.isKeyboard && !evt.scrolling) {
      this.trigger(CONTROL_EVENTS.STATIC_CLICK, {
        isTouch: evt.isTouch
      });
    }

    this._changedWhileDragging = false;
  };
}

export default RotateControl;
