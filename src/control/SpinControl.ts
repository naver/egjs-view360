/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import RotateControl, { RotateControlOptions } from "./RotateControl";
import ZoomControl, { ZoomControlOptions } from "./ZoomControl";
import { CURSOR } from "../const/browser";
import { CONTROL_EVENTS } from "../const/internal";
import { ValueOf } from "../type/utils";
import { getObjectOption } from "../utils";

/**
 * @interface
 */
export interface SpinControlOptions {
  useGrabCursor: boolean;
  scrollable: boolean;
  wheelScrollable: boolean;
  rotate: boolean | Partial<RotateControlOptions>;
  zoom: boolean | Partial<ZoomControlOptions>;
}

/**
 * Control for SpinViewer
 */
class SpinControl {
  // Options
  private _useGrabCursor: SpinControlOptions["useGrabCursor"];

  // Internal Values
  private _controlEl: HTMLElement;
  private _rotateControl: RotateControl;
  private _zoomControl: ZoomControl;
  private _enabled: boolean;

  public get useGrabCursor() { return this._useGrabCursor; }
  public set useGrabCursor(val: SpinControlOptions["useGrabCursor"]) {
    this._useGrabCursor = val;
  }

  public get enabled() { return this._enabled; }
  public get rotate() { return this._rotateControl; }
  public get zoom() { return this._zoomControl; }
  public get animating() {
    return this._rotateControl.animating
      || this._zoomControl.animating;
      // TODO:
      // || this._extraControls.some(control => control.animating);
  }

  /**
   * Create new PanoControl instance
   */
  public constructor(element: HTMLElement, {
    useGrabCursor,
    rotate,
    zoom,
    scrollable,
    wheelScrollable
  }: SpinControlOptions) {
    // Bind Options
    this._useGrabCursor = useGrabCursor;

    // Set internal values
    this._controlEl = element;
    this._enabled = false;

    this._rotateControl = new RotateControl(getObjectOption(rotate));
    this._zoomControl = new ZoomControl(getObjectOption(zoom));

    this._rotateControl.scrollable = scrollable;
    this._zoomControl.scrollable = wheelScrollable;

    this._bindEvents();
  }

  /**
   * Destroy the instance and remove all event listeners attached
   * This also will reset CSS cursor to intial
   * @returns {void}
   */
  public destroy(): void {
    this.disable();
  }

  /**
   * Resize control to match target size
   * @param {number} width New width
   * @param {number} height New height
   * @returns {void}
   */
  public resize(width: number, height: number): void {
    this._rotateControl.resizeByDegree(360, 0, width, height);
  }

  /**
   * Enable this control and add event listeners
   * @returns {void}
   */
  public enable(): void {
    if (this._enabled) return;

    const controlEl = this._controlEl;

    this._rotateControl.enable(controlEl);
    this._zoomControl.enable(controlEl);

    this._enabled = true;
  }

  /**
   * Disable this control and remove all event handlers
   * @returns {void}
   */
  public disable(): void {
    if (!this._enabled) return;

    this._rotateControl.disable();
    this._zoomControl.disable();

    this._enabled = false;
  }

  /**
   * Update control by given deltaTime
   * @param {number} delta Number of milisec to update
   * @returns {void}
   */
  public update(delta: number): void {
    const rotateControl = this._rotateControl;
    const zoomControl = this._zoomControl;

    zoomControl.update(delta);
    rotateControl.update(delta);
  }

  private _setCursor(newCursor: ValueOf<typeof CURSOR>) {
    if (!this._useGrabCursor && newCursor !== CURSOR.NONE) return;

    const targetEl = this._controlEl;
    targetEl.style.cursor = newCursor;
  }

  private _bindEvents() {
    const rotateControl = this._rotateControl;
    const zoomControl = this._zoomControl;

    rotateControl.on(CONTROL_EVENTS.HOLD, this._onHold);
    rotateControl.on(CONTROL_EVENTS.RELEASE, this._onRelease);
    rotateControl.on(CONTROL_EVENTS.ENABLE, this._onEnable);
    rotateControl.on(CONTROL_EVENTS.DISABLE, this._onDisable);
    zoomControl.on(CONTROL_EVENTS.ENABLE, this._onEnable);
    zoomControl.on(CONTROL_EVENTS.DISABLE, this._onDisable);
  }

  private _onHold = () => {
    if (this._useGrabCursor) {
      this._setCursor(CURSOR.GRABBING);
    }
  };

  private _onRelease = () => {
    if (this._useGrabCursor) {
      this._setCursor(CURSOR.GRAB);
    }
  };

  private _onEnable = ({
    updateCursor
  }: {
    updateCursor: boolean;
  }) => {
    if (updateCursor && this._useGrabCursor) {
      this._setCursor(CURSOR.GRAB);
    }
  };

  private _onDisable = ({
    updateCursor
  }: {
    updateCursor: boolean
  }) => {
    if (updateCursor) {
      this._setCursor(CURSOR.NONE);
    }
  };
}

export default SpinControl;
