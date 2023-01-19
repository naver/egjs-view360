/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import CameraControl from "./CameraControl";
import RotateControl, { RotateControlEvents, RotateControlOptions } from "./RotateControl";
import ZoomControl, { ZoomControlOptions } from "./ZoomControl";
import GyroControl, { GyroControlOptions } from "./GyroControl";
import Camera from "../core/Camera";
import CameraAnimation from "../core/CameraAnimation";
import * as BROWSER from "../const/browser";
import { CAMERA_EVENTS, CONTROL_EVENTS } from "../const/internal";
import { ValueOf } from "../type/utils";
import { getObjectOption, hfovToZoom } from "../utils";

/**
 * Options for {@link PanoControl}
 * @ko {@link PanoControl}용 옵션들
 * @since 4.0.0
 */
export interface PanoControlOptions {
  /**
   * @copy View360#useGrabCursor
   */
  useGrabCursor: boolean;
  /**
   * @copy View360#scrollable
   */
  scrollable: boolean;
  /**
   * @copy View360#wheelScrollable
   */
  wheelScrollable: boolean;
  /**
   * @copy View360#disableContextMenu
   */
  disableContextMenu: boolean;
  /**
   * Options for {@link RotateControl}.
   * `false` to disable rotation.
   * @ko {@link RotateControl}용 옵션들.
   * `false`일 경우 회전이 비활성화됩니다.
   * @since 4.0.0
   */
  rotate: boolean | Partial<RotateControlOptions>;
  /**
   * Options for {@link ZoomControl}.
   * `false` to disable zoom.
   * @ko {@link ZoomControl}용 옵션들.
   * `false`일 경우 줌이 비활성화됩니다.
   * @since 4.0.0
   */
  zoom: boolean | Partial<ZoomControlOptions>;
  /**
   * Options for {@link GyroControl}.
   * `false` to disable gyroscope control.
   * @ko {@link GyroControl}용 옵션들.
   * `false`일 경우 자이로스코프를 통한 컨트롤이 비활성화됩니다.
   * @since 4.0.0
   */
  gyro: boolean | Partial<GyroControlOptions>;
}

/**
 * Panorama control for View360
 * @ko View360용 파노라마 컨트롤
 * @since 4.0.0
 */
class PanoControl {
  // Options
  private _useGrabCursor: PanoControlOptions["useGrabCursor"];
  private _disableContextMenu: PanoControlOptions["disableContextMenu"];

  // Internal Values
  private _camera: Camera;
  private _controlEl: HTMLElement;
  private _rotateControl: RotateControl;
  private _zoomControl: ZoomControl;
  private _gyroControl: GyroControl;
  private _ignoreZoomScale: boolean;
  private _enabled: boolean;

  /**
   * @copy View360#useGrabCursor
   */
  public get useGrabCursor() { return this._useGrabCursor; }
  public set useGrabCursor(val: PanoControlOptions["useGrabCursor"]) {
    if (val === this._useGrabCursor) return;

    this._useGrabCursor = val;

    if (val && this._enabled) {
      this._setCursor(BROWSER.CURSOR.GRAB);
    } else if (!val) {
      this._setCursor(BROWSER.CURSOR.NONE);
    }
  }

  /**
   * @copy View360#disableContextMenu
   */
  public get disableContextMenu() { return this._disableContextMenu; }
  public set disableContextMenu(val: PanoControlOptions["disableContextMenu"]) {
    if (val === this._disableContextMenu) return;

    this._disableContextMenu = val;

    if (val && this._enabled) {
      this._blockContextMenu();
    } else if (!val) {
      this._restoreContextMenu();
    }
  }

  /**
   * @copy View360#disableContextMenu
   */
  public get scrollable() { return this._rotateControl.scrollable; }
  public set scrollable(val: PanoControlOptions["scrollable"]) { this._rotateControl.scrollable = val; }
  /**
   * @copy View360#disableContextMenu
   */
  public get wheelScrollable() { return this._zoomControl.scrollable; }
  public set wheelScrollable(val: PanoControlOptions["wheelScrollable"]) { this._zoomControl.scrollable = val; }
  /**
   * When `true`, disables rotation slow-down by zoom-value.
   * @ko `true`일 경우 줌 된 정도에 따라 회전속도를 늦추는 동작을 비활성화합니다.
   * @since 4.0.0
   */
  public get ignoreZoomScale() { return this._ignoreZoomScale; }
  public set ignoreZoomScale(val: boolean) { this._ignoreZoomScale = val; }

  /**
   * Whether the control is enabled or not
   * @ko 컨트롤 활성화 여부를 가리키는 값
   * @readonly
   * @since 4.0.0
   */
  public get enabled() { return this._enabled; }
  /**
   * @copy View360#rotate
   */
  public get rotate() { return this._rotateControl; }
  /**
   * @copy View360#zoom
   */
  public get zoom() { return this._zoomControl; }
  /**
   * @copy View360#gyro
   */
  public get gyro() { return this._gyroControl; }

  /**
   * Whether one of the controls is animating at the moment
   * @ko 현재 컨트롤 중 하나라도 동작중인지 여부를 나타내는 값
   * @readonly
   * @since 4.0.0
   */
  public get animating() {
    return this._rotateControl.animating
      || this._zoomControl.animating
      || this._gyroControl.animating;
  }

  /**
   * Create new instance.
   * @ko 새 인스턴스를 생성합니다.
   * @param element - Canvas element {@ko 캔버스 엘리먼트}
   * @param camera - Camera instance {@ko Camera 인스턴스}
   * @param options - Options for PanoControl {@ko PanoControl 옵션들}
   */
  public constructor(element: HTMLElement, camera: Camera, {
    useGrabCursor,
    scrollable,
    wheelScrollable,
    disableContextMenu,
    rotate,
    zoom,
    gyro
  }: PanoControlOptions) {
    // Bind Options
    this._useGrabCursor = useGrabCursor;
    this._disableContextMenu = disableContextMenu;

    // Set internal values
    this._camera = camera;
    this._controlEl = element;
    this._ignoreZoomScale = false;
    this._enabled = false;

    this._rotateControl = new RotateControl(element, !rotate, getObjectOption(rotate));
    this._zoomControl = new ZoomControl(element, !zoom, getObjectOption(zoom));
    this._gyroControl = new GyroControl(!gyro, getObjectOption(gyro));

    this._rotateControl.scrollable = scrollable;
    this._zoomControl.scrollable = wheelScrollable;

    this._bindEvents();
  }

  /**
   * Destroy the instance and remove all event listeners attached.
   * This also will reset CSS cursor to initial.
   * @ko 인스턴스를 삭제하고 부착된 모든 이벤트 리스너를 제거합니다.
   * 또한, 캔버스에 적용된 CSS cursor도 제거합니다.
   * @since 4.0.0
   */
  public destroy(): void {
    this.disable();
    this._rotateControl.destroy();
    this._zoomControl.destroy();
    this._setCursor(BROWSER.CURSOR.NONE);
  }

  /**
   * Resize control to match target size.
   * @ko 컨트롤이 내부에 캐시하고 있는 크기값을 갱신합니다.
   * @param width New width {@ko 변경된 너비}
   * @param height New height {@ko 변경된 높이}
   * @since 4.0.0
   */
  public resize(width: number, height: number): void {
    const camera = this._camera;

    this._rotateControl.resize(camera.fov, camera.aspect, width, height);
  }

  /**
   * Enable this control and add event listeners.
   * @ko 컨트롤을 활성화하고 이벤트 리스너들을 추가합니다.
   * @since 4.0.0
   */
  public async enable(): Promise<void> {
    if (this._enabled) return;

    if (!this._rotateControl.enableBlocked) {
      this._rotateControl.enable();
    }

    if (!this._zoomControl.enableBlocked) {
      this._zoomControl.enable();
    }

    if (!this._gyroControl.enableBlocked) {
      if (await GyroControl.isAvailable()) {
        this._gyroControl.enable();
      }
    }

    this.sync();

    if (this._disableContextMenu) {
      this._blockContextMenu();
    }

    this._enabled = true;
  }

  /**
   * Disable this control and remove all event listeners
   * @ko 컨트롤을 비활성화하고 모든 이벤트 리스너들을 제거합니다.
   * @since 4.0.0
   */
  public disable(): void {
    if (!this._enabled) return;

    this._rotateControl.disable();
    this._zoomControl.disable();
    this._gyroControl.disable();

    this._restoreContextMenu();

    this._enabled = false;
  }

  /**
   * Update control by given deltaTime
   * @ko 컨트롤을 주어진 시간만큼 업데이트합니다.
   * @param delta Number of milisec to update {@ko 업데이트할 시간, 밀리초 단위}
   * @since 4.0.0
   * @internal
   */
  public update(delta: number): void {
    const camera = this._camera;
    const rotateControl = this._rotateControl;
    const zoomControl = this._zoomControl;
    const gyroControl = this._gyroControl;

    zoomControl.update(delta);
    const zoom = hfovToZoom(camera.fov, zoomControl.zoom);

    // Slow down rotation on zoom-in
    const zoomScale = this._ignoreZoomScale ? 1 : Math.max(zoom, 1);
    rotateControl.setZoomScale(zoomScale);
    rotateControl.updateRange(camera, zoom);
    rotateControl.update(delta);

    const yaw = rotateControl.yaw;
    const pitch = rotateControl.pitch;

    if (gyroControl.enabled) {
      gyroControl.update(camera, yaw, pitch, zoom);
    } else {
      camera.lookAt({
        yaw: yaw.val,
        pitch: pitch.val,
        zoom
      });
    }
  }

  /**
   * Synchronize this control's state to current camera state
   * @ko 컨트롤을 카메라의 현재 상태와 동기화합니다.
   * @since 4.0.0
   */
  public sync(): void {
    const camera = this._camera;

    this._zoomControl.sync(camera);
    this._rotateControl.sync(camera);
  }

  private _blockContextMenu() {
    const el = this._controlEl;

    el.addEventListener(BROWSER.EVENTS.CONTEXT_MENU, this._preventContextMenu);
  }

  private _restoreContextMenu() {
    const el = this._controlEl;

    el.removeEventListener(BROWSER.EVENTS.CONTEXT_MENU, this._preventContextMenu);
  }

  private _preventContextMenu = (evt: MouseEvent) => {
    evt.preventDefault();
  };

  private _setCursor(newCursor: ValueOf<typeof BROWSER.CURSOR>) {
    if (!this._useGrabCursor && newCursor !== BROWSER.CURSOR.NONE) return;

    const targetEl = this._controlEl;
    targetEl.style.cursor = newCursor;
  }

  private _bindEvents() {
    const rotateControl = this._rotateControl;
    const zoomControl = this._zoomControl;

    rotateControl.on(CONTROL_EVENTS.INPUT_START, this._onInputStart);
    rotateControl.on(CONTROL_EVENTS.INPUT_END, this._onInputEnd);
    rotateControl.on(CONTROL_EVENTS.ENABLE, this._onEnable);
    rotateControl.on(CONTROL_EVENTS.DISABLE, this._onDisable);
    zoomControl.on(CONTROL_EVENTS.ENABLE, this._onEnable);
    zoomControl.on(CONTROL_EVENTS.DISABLE, this._onDisable);
    this._camera.on(CAMERA_EVENTS.ANIMATION_END, this._onCameraAnimationEnd);
  }

  private _onInputStart = (evt: RotateControlEvents[typeof CONTROL_EVENTS.INPUT_START]) => {
    if (this._useGrabCursor && !evt.isKeyboard) {
      this._setCursor(BROWSER.CURSOR.GRABBING);
    }
  };

  private _onInputEnd = (evt: RotateControlEvents[typeof CONTROL_EVENTS.INPUT_END]) => {
    if (this._useGrabCursor && !evt.isKeyboard) {
      this._setCursor(BROWSER.CURSOR.GRAB);
    }
  };

  private _onEnable = ({
    control,
    updateCursor
  }: {
    control: CameraControl;
    updateCursor: boolean;
  }) => {
    if (updateCursor && this._useGrabCursor) {
      this._setCursor(BROWSER.CURSOR.GRAB);
    }

    control.sync(this._camera);
  };

  private _onDisable = ({
    updateCursor
  }: {
    updateCursor: boolean
  }) => {
    if (updateCursor) {
      this._setCursor(BROWSER.CURSOR.NONE);
    }
  };

  private _onCameraAnimationEnd = ({ animation }: { animation: CameraAnimation }) => {
    animation.getFinishPromise().then(() => {
      this.sync();
    });
  };
}

export default PanoControl;
