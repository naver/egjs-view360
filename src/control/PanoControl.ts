/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { PanInput, PinchInput, WheelInput } from "@egjs/axes";

import { CURSOR } from "../const/browser";
import { DEFAULT_ANIMATION_DURATION, DEFAULT_EASING, EVENTS } from "../const/external";
import { ValueOf } from "../type/utils";

import Camera from "../core/Camera";

/**
 * @interface
 */
export interface PanoControlOptions {
  useGrabCursor: boolean;
}

/**
 * Control for PanoViewer
 */
class PanoControl {
  // Internal Values
  private _axes: Axes;
  private _panInput: PanInput;
  private _wheelInput: WheelInput;
  private _pinchInput: PinchInput;
  private _useGrabCursor: boolean;

  /**
   * Whether one of the controls is animating at the moment
   * @type {boolean}
   * @readonly
   */
  public get animating() {
    // TODO:
    return true;
    // return this._rotateControl.animating
    //   || this._zoomControl.animating
    //   || this._extraControls.some(control => control.animating);
  }

  /**
   * Create new PanoControl instance
   */
  public constructor(element: HTMLElement, {
    useGrabCursor
  }: PanoControlOptions) {
    this._axes = new Axes({
      yaw: {
        range: [0, 360],
        circular: true
      },
      pitch: {
        range: [-89.9, 89.9],
        circular: false,
        bounce: 10
      },
      zoom: {
        range: [1, 90],
        bounce: 0
      }
    }, {
      minimumDuration: DEFAULT_ANIMATION_DURATION,
      easing: DEFAULT_EASING
    });

    this._panInput = new PanInput(element, {
      scale: [1, 1],
      releaseOnScroll: true
    });
    this._wheelInput = new WheelInput(element, {

    });
    this._pinchInput = new PinchInput(element, {

    });

    this._axes.connect(["yaw", "pitch"], this._panInput);
    this._axes.connect(["zoom"], this._wheelInput);
    this._axes.connect(["zoom"], this._pinchInput);

    this._useGrabCursor = useGrabCursor;
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * This also will reset CSS cursor to intial
   * @returns {void}
   */
  public destroy(): void {
    this._axes.destroy();
    this._panInput.destroy();
    this._wheelInput.destroy();
    this._pinchInput.destroy();
  }

  /**
   * Update control by given deltaTime
   * @param {number} deltaTime Number of milisec to update
   * @returns {void}
   */
  public update(camera: Camera, deltaTime: number): void {
    this._rotateControl.update(camera, deltaTime);
    this._zoomControl.update(camera, deltaTime);
    this._extraControls.forEach(control => control.update(camera, deltaTime));
  }

  /**
   * Resize control to match target size
   * @param {object} size New size to apply
   * @param {number} [size.width] New width
   * @param {number} [size.height] New height
   * @returns {void}
   */
  public resize(size: { width: number; height: number }): void {
    this._rotateControl.resize(size);
    this._zoomControl.resize(size);
    this._extraControls.forEach(control => control.resize(size));
  }

  /**
   * Enable this control and add event listeners
   * @returns {void}
   */
  public enable(): void {
    this._panInput.enable();
    this._wheelInput.enable();
    this._pinchInput.enable();
  }

  /**
   * Disable this control and remove all event handlers
   * @returns {void}
   */
  public disable(): void {
    this._panInput.disable();
    this._wheelInput.disable();
    this._pinchInput.disable();
  }

  /**
   * Synchronize this control's state to current camera position
   * @returns {void}
   */
  public sync(camera: Camera): void {
    this._axes.setTo({
      yaw: camera.yaw,
      pitch: camera.pitch,
      zoom: camera.zoom
    }, 0);
  }

  /**
   * Update cursor to current option
   * @returns {void}
   */
  public updateCursor(): void {
    const cursor = this._view3D.useGrabCursor ? CURSOR.GRAB : CURSOR.NONE;

    this._setCursor(cursor);
  }

  private _setCursor(newCursor: ValueOf<typeof CURSOR>) {
    const view3D = this._view3D;

    if (!view3D.useGrabCursor && newCursor !== CURSOR.NONE) return;

    const targetEl = view3D.renderer.canvas;
    targetEl.style.cursor = newCursor;
  }

  private _onEnable = ({ inputType }: ControlEvents["enable"]) => {
    if (inputType === INPUT_TYPE.ZOOM) return;

    const view3D = this._view3D;
    const canvas = view3D.renderer.canvas;

    const shouldSetGrabCursor = view3D.useGrabCursor
      && (this._rotateControl.enabled || this._translateControl.enabled)
      && canvas.style.cursor === CURSOR.NONE;

    if (shouldSetGrabCursor) {
      this._setCursor(CURSOR.GRAB);
    }
  };

  private _onDisable = ({ inputType }: ControlEvents["disable"]) => {
    if (inputType === INPUT_TYPE.ZOOM) return;

    const canvas = this._view3D.renderer.canvas;
    const shouldRemoveGrabCursor = canvas.style.cursor !== CURSOR.NONE
      && (!this._rotateControl.enabled && !this._translateControl.enabled);

    if (shouldRemoveGrabCursor) {
      this._setCursor(CURSOR.NONE);
    }
  };

  private _onHold = ({ inputType }: ControlEvents["hold"]) => {
    const view3D = this._view3D;

    if (inputType !== INPUT_TYPE.ZOOM) {
      const grabCursorEnabled = view3D.useGrabCursor
        && (this._rotateControl.enabled || this._translateControl.enabled);

      if (grabCursorEnabled) {
        this._setCursor(CURSOR.GRABBING);
      }
    }

    view3D.trigger(EVENTS.INPUT_START, {
      type: EVENTS.INPUT_START,
      target: view3D,
      inputType
    });
  };

  private _onRelease = ({ inputType }: ControlEvents["release"]) => {
    const view3D = this._view3D;

    if (inputType !== INPUT_TYPE.ZOOM) {
      const grabCursorEnabled = view3D.useGrabCursor
        && (this._rotateControl.enabled || this._translateControl.enabled);

      if (grabCursorEnabled) {
        this._setCursor(CURSOR.GRAB);
      }
    }

    view3D.trigger(EVENTS.INPUT_END, {
      type: EVENTS.INPUT_END,
      target: view3D,
      inputType
    });
  };
}

export default PanoControl;
