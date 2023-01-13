/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import CameraControl from "./CameraControl";
import GyroInput from "./input/GyroInput";
import Motion from "../core/Motion";
import Camera from "../core/Camera";
import * as BROWSER from "../const/browser";
import { CONTROL_EVENTS } from "../const/internal";
import { ControlEvents } from "../type/internal";
import { sensorCanBeEnabledIOS } from "../utils";

/**
 * Options for {@link GyroControl}
 * @ko {@link GyroControl}용 옵션들
 * @since 4.0.0
 */
export interface GyroControlOptions {
  /**
   * @copy GyroControl#ignoreRoll
   */
  ignoreRoll: boolean;
}

export type GyroControlEvents = ControlEvents<void>;

/**
 * Camera's rotation control by gyroscope
 * @ko 자이로스코프를 이용한 회전 컨트롤
 * @since 4.0.0
 */
class GyroControl extends Component<GyroControlEvents> implements CameraControl {
  // Options
  private _ignoreRoll: GyroControlOptions["ignoreRoll"];

  // Internal values
  private _enableBlocked: boolean;
  private _input: GyroInput;

  /**
   * @copy CameraControl#enabled
   */
  public get enabled() { return this._input.enabled; }
  /**
   * @hidden
   */
  public get enableBlocked() { return this._enableBlocked; }
  /**
   * @copy CameraControl#animating
   */
  public get animating() {
    return this._input.enabled && this._input.orientationUpdated;
  }

  /**
   * When `true`, ignore gyroscope's roll(z-axis rotation) value.
   * :::caution
   * Setting `false` will ignore camera's range limit.
   * Options like {@link View360Options#yawRange}, {@link View360Options#pitchRange} are ignored, and {@link CylinderProjection} also can't force it's camera range limit.
   * :::
   * @ko `true`일 경우 자이로스코프 입력의 roll(z축 회전)값을 무시합니다.
   * :::caution
   * 이 값을 `false`로 설정할 경우 카메라 범위 제약을 무시합니다.
   * {@link View360Options#yawRange}, {@link View360Options#pitchRange}와 같은 값은 무시되며, {@link CylinderProjection} 사용시에도 범위를 벗어날 수 있습니다.
   * :::
   * @default true
   * @since 4.0.0
   */
  public get ignoreRoll() { return this._ignoreRoll; }
  public set ignoreRoll(val: GyroControlOptions["ignoreRoll"]) { this._ignoreRoll = val; }

  /**
   * Return availability of the gyroscope.
   * :::caution
   * This will always return false until user permission under environments like iOS which requires user permission when using gyroscope.
   * :::
   * @ko 자이로스코프 사용 가능 여부를 반환합니다.
   * :::caution
   * iOS와 같이 GyroScope 사용시 사용자 Permission을 요구하는 환경에서는 사용자 Permission을 받기 전까지 항상 `false`입니다.
   * :::
   * @example
   * ```ts
   * const gyroAvailable = await GyroControl.isAvailable();
   * ```
   */
  public static async isAvailable(): Promise<boolean> {
    if (!DeviceMotionEvent) {
      return false;
    }

    let onDeviceMotionChange: (evt: DeviceMotionEvent) => void;

    const listenDeviceMotion = () => new Promise(res => {
      onDeviceMotionChange = (evt: DeviceMotionEvent) => {
        res(evt.rotationRate && evt.rotationRate.alpha != null);
      };

      window.addEventListener(BROWSER.EVENTS.DEVICE_MOTION, onDeviceMotionChange);
    });

    const timeout = () => new Promise(res => {
      setTimeout(() => res(false), 1000);
    });

    return Promise.race([listenDeviceMotion(), timeout()])
      .then((available: boolean) => {
        window.removeEventListener(BROWSER.EVENTS.DEVICE_MOTION, onDeviceMotionChange);

        return available;
      });
  }

  /**
   * Request user permission for gyroscope sensor.
   * This can be used in environments like iOS which requires user permission when using gyroscope sensors.
   * @ko 사용자의 sensor permission 취득을 요청합니다.
   * iOS와 같이 gyroscope 사용시 사용자 Permission을 요구하는 환경에서 사용 가능합니다.
   * @returns Whether the permission is granted {@ko 사용자 permission 취득 여부}
   */
  public static async requestSensorPermission(): Promise<boolean> {
    // Request sensor permission, on iOS13+
    if (sensorCanBeEnabledIOS()) {
      return (DeviceMotionEvent as typeof DeviceMotionEvent & {
        requestPermission: () => Promise<string>;
      }).requestPermission().then(permissionState => {
        return permissionState === "granted";
      }).catch(() => false);
    }

    return true;
  }

  /**
   * Create new GyroControl instance
   * @ko GyroControl의 인스턴스를 생성합니다.
   * @param enableBlocked - Whether to disable control on init {@ko 초기화 과정에서 컨트롤 활성화 여부}
   * @param options - Options for control {@ko 컨트롤 옵션들}
   */
  public constructor(enableBlocked: boolean, {
    ignoreRoll = true
  }: Partial<GyroControlOptions> = {}) {
    super();

    this._enableBlocked = enableBlocked;
    this._ignoreRoll = ignoreRoll;
    this._input = new GyroInput();
  }

  /**
   * @copy CameraControl#destroy
   */
  public destroy(): void {
    this.disable();
    this._input.off();
    this.off();
  }

  /**
   * @hidden
   */
  public update(camera: Camera, yaw: Motion, pitch: Motion, zoom: number) {
    if (!this._ignoreRoll) {
      this._updateQuaternion(camera, zoom);
    } else {
      this._updateYawPitch(camera, yaw, pitch, zoom);
    }
  }

  /**
   * @copy CameraControl#enable
   */
  public enable(): void {
    if (this._input.enabled) return;

    this._input.enable();
    this._enableBlocked = false;
    this.trigger(CONTROL_EVENTS.ENABLE, { control: this, updateCursor: false });
  }

  /**
   * @copy CameraControl#disable
   */
  public disable(): void {
    if (!this._input.enabled) return;

    this._input.disable();
    this.trigger(CONTROL_EVENTS.DISABLE, { updateCursor: false });
  }

  /**
   * @copy CameraControl#sync
   */
  public sync(): void {} // eslint-disable-line @typescript-eslint/no-empty-function

  private _updateYawPitch(camera: Camera, yaw: Motion, pitch: Motion, zoom: number) {
    const input = this._input;
    if (!input.enabled) return;

    const {
      yaw: yawDelta,
      pitch: pitchDelta
    } = input.collectDelta();

    yaw.add(yawDelta);
    pitch.add(pitchDelta);

    camera.lookAt({
      yaw: yaw.val,
      pitch: pitch.val,
      zoom
    });
  }

  private _updateQuaternion(camera: Camera, zoom: number) {
    const input = this._input;
    if (!input.enabled) return;

    input.update();
    camera.rotate(input.quaternion, zoom);
  }
}

export default GyroControl;
