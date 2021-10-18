import { glMatrix } from "gl-matrix";

import { window } from "../utils/browser";

// Singleton
let screenRotationAngleInst: ScreenRotationAngle | null = null;
let refCount = 0;

export default class ScreenRotationAngle {
  private _spinR: number;
  private _screenOrientationAngle: number;

  public constructor() {
    refCount++;

    if (screenRotationAngleInst) {
      return screenRotationAngleInst;
    }
    /* eslint-disable */
    screenRotationAngleInst = this;
    /* eslint-enable */
    this._onDeviceOrientation = this._onDeviceOrientation.bind(this);
    this._onOrientationChange = this._onOrientationChange.bind(this);

    this._spinR = 0;

    this._screenOrientationAngle = 0;
    window.addEventListener("deviceorientation", this._onDeviceOrientation);
    window.addEventListener("orientationchange", this._onOrientationChange);
  }

  public getRadian() {
    // Join with screen orientation
    // this._testVal = this._spinR + ", " + this._screenOrientationAngle + ", " + window.orientation;
    return this._spinR + glMatrix.toRadian(this._screenOrientationAngle);
  }

  public unref() {
    if (--refCount > 0) {
      return;
    }

    window.removeEventListener("deviceorientation", this._onDeviceOrientation);
    window.removeEventListener("orientationchange", this._onOrientationChange);

    this._spinR = 0;
    this._screenOrientationAngle = 0;
    /* eslint-disable */
    screenRotationAngleInst = null;
    /* eslint-enable */
    refCount = 0;
  }

  private _onDeviceOrientation(e: DeviceOrientationEvent) {
    if (e.beta === null || e.gamma === null) {
      // (Chrome) deviceorientation is fired with invalid information {alpha=null, beta=null, ...} despite of not dispatching it. We skip it.
      return;
    }

    // Radian
    const betaR = glMatrix.toRadian(e.beta);
    const gammaR = glMatrix.toRadian(e.gamma);

    /* spinR range = [-180, 180], left side: 0 ~ -180(deg), right side: 0 ~ 180(deg) */
    this._spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
  }

  private _onOrientationChange() {
    if (window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined) {
      this._screenOrientationAngle = screen.orientation.angle;
    } else if (window.orientation !== undefined) {
      /* iOS */
      this._screenOrientationAngle = window.orientation >= 0 ?
        window.orientation : 360 + (window.orientation as number);
    }
  }
}
