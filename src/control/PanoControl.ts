/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import Axes, { OnChange, OnHold, OnRelease, PanInput, PinchInput, WheelInput } from "@egjs/axes";

import Camera from "../core/Camera";
import { CURSOR } from "../const/browser";
import { DEFAULT_ANIMATION_DURATION, DEFAULT_EASING, EVENTS } from "../const/external";
import { ValueOf } from "../type/utils";

/**
 * @interface
 */
export interface PanoControlEvents {
  change: {
    yaw: number;
    pitch: number;
    zoom: number;
  }
}

/**
 * @interface
 */
export interface PanoControlOptions {
  useGrabCursor: boolean;
}

/**
 * Control for PanoViewer
 */
class PanoControl extends Component<PanoControlEvents> {
  // Options
  private _useGrabCursor: PanoControlOptions["useGrabCursor"];

  // Internal Values
  private _controlEl: HTMLElement;
  private _axes: Axes;
  private _panInput: PanInput;
  private _wheelInput: WheelInput;
  private _pinchInput: PinchInput;
  private _screenScale: [number, number];
  private _enabled: boolean;

  public get useGrabCursor() { return this._useGrabCursor; }
  public set useGrabCursor(val: PanoControlOptions["useGrabCursor"]) {
    this._useGrabCursor = val;
  }

  public get enabled() { return this._enabled; }

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
    super();

    // Bind Options
    this._useGrabCursor = useGrabCursor;

    // Set internal values
    this._controlEl = element;
    this._enabled = false;

    // Setup Axes
    const axes = new Axes({
      yaw: {
        range: [0, 360],
        circular: true
      },
      pitch: {
        range: [-89.9, 89.9],
        circular: false
      },
      zoom: {
        range: [0, 90],
        bounce: 0
      }
    }, {
      minimumDuration: DEFAULT_ANIMATION_DURATION,
      maximumDuration: DEFAULT_ANIMATION_DURATION,
      easing: DEFAULT_EASING,
      deceleration: 0.03
    }, {
      yaw: 0,
      pitch: 0,
      zoom: 0
    });

    const panInput = new PanInput(element, {
      scale: [-1, -1],
      releaseOnScroll: true
    });
    const wheelInput = new WheelInput(element, {

    });
    const pinchInput = new PinchInput(element, {

    });

    axes.connect(["yaw", "pitch"], panInput);
    axes.connect(["zoom"], wheelInput);
    axes.connect(["zoom"], pinchInput);

    panInput.disable();
    wheelInput.disable();
    pinchInput.disable();

    axes.on("hold", this._onHold);
    axes.on("release", this._onRelease);
    axes.on("change", this._onChange);

    this._axes = axes;
    this._panInput = panInput;
    this._wheelInput = wheelInput;
    this._pinchInput = pinchInput;
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * This also will reset CSS cursor to intial
   * @returns {void}
   */
  public destroy(): void {
    this.disable();
    this._axes.destroy();
    this._panInput.destroy();
    this._wheelInput.destroy();
    this._pinchInput.destroy();
    this._enabled = false;
  }

  /**
   * Resize control to match target size
   * @param {number} width New width
   * @param {number} height New height
   * @returns {void}
   */
  public resize(width: number, height: number): void {
    this._panInput.options.scale = [-180 / width, -180 / height];
  }

  /**
   * Enable this control and add event listeners
   * @returns {void}
   */
  public enable(): void {
    if (this._enabled) return;

    this._panInput.enable();
    this._wheelInput.enable();
    this._pinchInput.enable();

    if (this._useGrabCursor) {
      this._setCursor(CURSOR.GRAB);
    }

    this._enabled = true;
  }

  /**
   * Disable this control and remove all event handlers
   * @returns {void}
   */
  public disable(): void {
    if (!this._enabled) return;

    this._panInput.disable();
    this._wheelInput.disable();
    this._pinchInput.disable();

    this._setCursor(CURSOR.NONE);

    this._enabled = false;
  }

  /**
   * Synchronize this control's state to current camera position
   * @returns {void}
   */
  public sync(camera: Camera): void {
    // this._axes.setTo({
    //   yaw: camera.yaw,
    //   pitch: camera.pitch,
    //   zoom: camera.zoom
    // }, 0);
  }

  private _setCursor(newCursor: ValueOf<typeof CURSOR>) {
    if (!this._useGrabCursor && newCursor !== CURSOR.NONE) return;

    const targetEl = this._controlEl;
    targetEl.style.cursor = newCursor;
  }

  private _onHold = (evt: OnHold) => {
    const isPanInput = evt.input === this._panInput;
    if (!isPanInput) return;

    const grabCursorEnabled = this._useGrabCursor && this._panInput.isEnabled();

    if (grabCursorEnabled) {
      this._setCursor(CURSOR.GRABBING);
    }
  };

  private _onRelease = (evt: OnRelease) => {
    const isPanInput = evt.input === this._panInput;
    if (!isPanInput) return;

    const grabCursorEnabled = this._useGrabCursor && this._panInput.isEnabled();

    if (grabCursorEnabled) {
      this._setCursor(CURSOR.GRAB);
    }
  };

  private _onChange = (evt: OnChange) => {
    this.trigger("change", {
      yaw: evt.pos.yaw,
      pitch: evt.pos.pitch,
      zoom: evt.pos.zoom
    });
  };
}

export default PanoControl;
