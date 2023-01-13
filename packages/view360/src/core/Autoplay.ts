/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "./Camera";
import PanoControl from "../control/PanoControl";
import View360 from "../View360";
import * as BROWSER from "../const/browser";
import { CONTROL_EVENTS } from "../const/internal";
import { circulate, getObjectOption } from "../utils";

/**
 * Options for {@link Autoplay}
 * @ko {@link Autoplay}용 옵션들
 * @since 4.0.0
 */
export interface AutoplayOptions {
  /**
   * @copy Autoplay#delay
   */
  delay: number;
  /**
   * @copy Autoplay#delayOnMouseLeave
   */
  delayOnMouseLeave: number;
  /**
   * @copy Autoplay#speed
   */
  speed: number;
  /**
   * @copy Autoplay#pauseOnHover
   */
  pauseOnHover: boolean;
  /**
   * @copy Autoplay#canInterrupt
   */
  canInterrupt: boolean;
  /**
   * @copy Autoplay#disableOnInterrupt
   */
  disableOnInterrupt: boolean;
}

/**
 * A manager class for autoplay feature.
 * @ko Autoplay 기능의 매니저 클래스.
 * @since 4.0.0
 */
class Autoplay {
  // Options
  private _delay: number;
  private _delayOnMouseLeave: number;
  private _speed: number;
  private _pauseOnHover: boolean;
  private _canInterrupt: boolean;
  private _disableOnInterrupt: boolean;

  // Internal values
  private _enableBlocked: boolean;
  private _camera: Camera;
  private _control: PanoControl;
  private _element: HTMLElement;
  private _enabled: boolean;
  private _interrupted: boolean;
  private _interruptionTimer: number;
  private _hovering: boolean;

  /**
   * Whether autoplay is enabled or not
   * @ko 자동재생 활성화 여부를 나타내는 값
   * @readonly
   * @since 4.0.0
   */
  public get enabled() { return this._enabled; }
  /**
   * @hidden
   */
  public get enableBlocked() { return this._enableBlocked; }
  /**
   * Whether autoplay is updating the camera at the moment
   * @ko 현재 자동재생이 동작중인지 여부를 나타내는 값
   * @readonly
   * @since 4.0.0
   */
  public get playing() {
    return this._enabled && !this._interrupted;
  }

  /**
   * Reactivation delay after mouse input in milisecond.
   * @ko 재활성화되기까지의 시간 (밀리초 단위)
   * @default 2000
   * @since 4.0.0
   */
  public get delay() { return this._delay; }
  public set delay(val: number) { this._delay = val; }

  /**
   * Reactivation delay after mouse leave when using {@link AutoplayOptions#pauseOnHover}
   * @ko {@link AutoplayOptions#pauseOnHover} 사용시 마우스가 캔버스 영역을 떠난 뒤 자동재생이 다시 활성화되기까지의 시간
   * @default 0
   * @since 4.0.0
   */
  public get delayOnMouseLeave() { return this._delayOnMouseLeave; }
  public set delayOnMouseLeave(val: number) { this._delayOnMouseLeave = val; }

  /**
   * Y-axis(yaw) rotation speed
   * @ko Y-축 회전(yaw)의 속도
   * @default 1
   * @since 4.0.0
   */
  public get speed() { return this._speed; }
  public set speed(val: number) { this._speed = val; }

  /**
   * Whether to pause rotation on mouse hover
   * @ko 마우스가 캔버스 영역에 들어왔을 때 자동재생을 정지할지 여부
   * @default false
   * @since 4.0.0
   */
  public get pauseOnHover() { return this._pauseOnHover; }
  public set pauseOnHover(val: boolean) { this._pauseOnHover = val; }

  /**
   * Whether user can interrupt the rotation with click/wheel input
   * @ko 클릭이나 휠같은 사용자 인터랙션시 자동재생을 멈출지 여부
   * @default true
   * @since 4.0.0
   */
  public get canInterrupt() { return this._canInterrupt; }
  public set canInterrupt(val: boolean) { this._canInterrupt = val; }

  /**
   * Whether to disable autoplay on user interrupt
   * @ko 사용자 동작에 의해 자동재생이 정지할 때, {@link Autoplay#disable}을 호출하여 자동재생을 영구히 정지할지 여부
   * @default false
   * @since 4.0.0
   */
  public get disableOnInterrupt() { return this._disableOnInterrupt; }
  public set disableOnInterrupt(val: boolean) { this._disableOnInterrupt = val; }

  /**
   * Create new AutoPlayer instance
   * @param camera - Instance of the {@link Camera} {@ko Camera의 인스턴스}
   * @param element - Canvas element {@ko 캔버스 엘리먼트}
   * @param options - Autoplay options {@ko 자동재생 옵션들}
   * @since 4.0.0
   */
  public constructor(viewer: View360, element: HTMLElement, options: boolean | Partial<AutoplayOptions>) {
    this._camera = viewer.camera;
    this._control = viewer.control;
    this._element = element;

    this._enabled = false;
    this._interrupted = false;
    this._interruptionTimer = -1;
    this._hovering = false;

    const {
      delay = 2000,
      delayOnMouseLeave = 0,
      speed = 1,
      pauseOnHover = false,
      canInterrupt = true,
      disableOnInterrupt = false
    } = getObjectOption(options);

    this._enableBlocked = !options;
    this._delay = delay;
    this._delayOnMouseLeave = delayOnMouseLeave;
    this._speed = speed;
    this._pauseOnHover = pauseOnHover;
    this._canInterrupt = canInterrupt;
    this._disableOnInterrupt = disableOnInterrupt;
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * @ko 인스턴스를 제거하고 연결된 모든 이벤트 핸들러를 삭제합니다.
   * @since 4.0.0
   */
  public destroy(): void {
    this.disable();
  }

  /**
   * Rotate camera by given deltaTime
   * @ko 주어진 deltaTime만큼 카메라를 회전시킵니다.
   * @param deltaTime - Number of milisec to update {@ko 업데이트할 시간, 밀리초 단위}
   * @since 4.0.0
   */
  public update(deltaTime: number): void {
    if (!this._enabled) return;
    if (this._interrupted) {
      if (this._disableOnInterrupt) {
        this.disable();
      }

      return;
    }

    const camera = this._camera;
    const delta = -this._speed * deltaTime / 100;

    camera.yaw = circulate(camera.yaw + delta, 0, 360);
  }

  /**
   * Enable autoplay and add event listeners.
   * @ko 자동재생을 활성화하고 이벤트리스너들을 추가합니다.
   * @since 4.0.0
   */
  public enable(): void {
    const control = this._control;
    const element = this._element;

    if (this._enabled || control.gyro.enabled) return;

    control.rotate.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    control.rotate.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);

    control.zoom.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    control.zoom.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);

    control.gyro.on(CONTROL_EVENTS.ENABLE, this._onGyroEnable);

    element.addEventListener(BROWSER.EVENTS.MOUSE_ENTER, this._onMouseEnter, false);
    element.addEventListener(BROWSER.EVENTS.MOUSE_LEAVE, this._onMouseLeave, false);

    this._enabled = true;
    this._enableBlocked = false;
  }

  /**
   * Enable autoplay after current `delay` value.
   * @ko 현재의 `delay`값만큼 시간이 지난 다음에 자동재생을 활성화합니다.
   * @since 4.0.0
   */
  public enableAfterDelay() {
    this.enable();
    this._interrupted = true;
    this._setUninterruptedAfterDelay(this._delay);
  }

  /**
   * Disable autoplay and remove all event handlers.
   * @ko 자동재생을 비활성화하고 모든 이벤트 핸들러를 제거합니다.
   * @since 4.0.0
   */
  public disable(): void {
    if (!this._enabled) return;

    const control = this._control;
    const element = this._element;

    control.rotate.off(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    control.rotate.off(CONTROL_EVENTS.INPUT_END, this._onInputEnd);

    control.zoom.off(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    control.zoom.off(CONTROL_EVENTS.INPUT_END, this._onInputEnd);

    control.gyro.off(CONTROL_EVENTS.ENABLE, this._onGyroEnable);

    element.removeEventListener(BROWSER.EVENTS.MOUSE_ENTER, this._onMouseEnter, false);
    element.removeEventListener(BROWSER.EVENTS.MOUSE_LEAVE, this._onMouseLeave, false);

    this._enabled = false;
    this._interrupted = false;
    this._hovering = false;

    this._clearTimeout();
  }

  private _onInputStart = () => {
    if (!this._canInterrupt) return;

    this._interrupted = true;
    this._clearTimeout();
  };

  private _onInputEnd = () => {
    this._setUninterruptedAfterDelay(this._delay);
  };

  private _onGyroEnable = () => {
    this.disable();
  };

  private _onMouseEnter = () => {
    if (!this._pauseOnHover) return;
    this._interrupted = true;
    this._hovering = true;
  };

  private _onMouseLeave = () => {
    if (!this._pauseOnHover) return;
    this._hovering = false;
    this._setUninterruptedAfterDelay(this._delayOnMouseLeave);
  };

  private _setUninterruptedAfterDelay(delay: number): void {
    if (this._hovering) return;

    this._clearTimeout();

    if (delay > 0) {
      this._interruptionTimer = window.setTimeout(() => {
        this._interrupted = false;
        this._interruptionTimer = -1;
      }, delay);
    } else {
      this._interrupted = false;
      this._interruptionTimer = -1;
    }
  }

  private _clearTimeout(): void {
    if (this._interruptionTimer >= 0) {
      window.clearTimeout(this._interruptionTimer);
      this._interruptionTimer = -1;
    }
  }
}

export default Autoplay;
