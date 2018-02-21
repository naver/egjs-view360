import {window, screen, orientation as winOrientation} from "./browser";

// Singleton
let screenRotationAngleInst = null;
let refCount = 0;

export default class ScreenRotationAngle {
	constructor() {
		refCount++;

		if (screenRotationAngleInst) {
			return screenRotationAngleInst;
		}
		/* eslint-disable */
		screenRotationAngleInst = this;
		/* eslint-enable */
		this._onDeviceOrientation = this._onDeviceOrientation.bind(this);
		this._onOrientationChange = this._onOrientationChange.bind(this);
		// this._onDeviceMotionChange = this._onDeviceMotionChange.bind(this);

		this._spinR = 0;

		this._screenOrientationAngle = 0;
		window.addEventListener("deviceorientation", this._onDeviceOrientation);
		window.addEventListener("orientationchange", this._onOrientationChange);
	}

	_onDeviceOrientation(e) {
		if (e.beta === null || e.gamma === null) {
			// (Chrome) deviceorientation is fired with invalid information {alpha=null, beta=null, ...} despite of not dispatching it. We skip it.
			return;
		}

		// Radian
		const betaR = ScreenRotationAngle._toRadian(e.beta);
		const gammaR = ScreenRotationAngle._toRadian(e.gamma);

		/* spinR range = [-180, 180], left side: 0 ~ -180(deg), right side: 0 ~ 180(deg) */
		this._spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
	}

	_onOrientationChange(e) {
		if (screen && screen.orientation && screen.orientation.angle !== undefined) {
			this._screenOrientationAngle = screen.orientation.angle;
		} else if (winOrientation !== undefined) {
			this._screenOrientationAngle = winOrientation >= 0 ? winOrientation : 360 + winOrientation;
		}
	}

	static _toRadian(degree) {
		return degree / 180 * Math.PI;
	}

	getRadian() {
		// Join with screen orientation
		// this._testVal = this._spinR + ", " + this._screenOrientationAngle + ", " + window.orientation;
		return this._spinR + this._toRadian(this._screenOrientationAngle);
	}

	unref() {
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
}

