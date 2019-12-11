import Component from "@egjs/component";
import {vec3} from "gl-matrix";
import {window} from "../../utils/browser";
import {IS_CHROME_WITHOUT_DEVICE_MOTION, IS_ANDROID} from "../consts";

const STILLNESS_THRESHOLD = 200; // millisecond

export default class DeviceMotion extends Component {
	constructor() {
		super();
		this._onDeviceMotion = this._onDeviceMotion.bind(this);
		this._onDeviceOrientation = this._onDeviceOrientation.bind(this);
		this._onChromeWithoutDeviceMotion = this._onChromeWithoutDeviceMotion.bind(this);

		this.isWithoutDeviceMotion = IS_CHROME_WITHOUT_DEVICE_MOTION;
		this.isAndroid = IS_ANDROID;

		this.stillGyroVec = vec3.create();
		this.rawGyroVec = vec3.create();
		this.adjustedGyroVec = vec3.create();

		this._timer = null;

		this.lastDevicemotionTimestamp = 0;
		this._isEnabled = false;
		this.enable();
	}
	_onChromeWithoutDeviceMotion(e) {
		let {alpha, beta, gamma} = e;

		// There is deviceorientation event trigged with empty values
		// on Headless Chrome.
		if (alpha === null) {
			return;
		}

		// convert to radian
		alpha = (alpha || 0) * Math.PI / 180;
		beta = (beta || 0) * Math.PI / 180;
		gamma = (gamma || 0) * Math.PI / 180;

		this.trigger("devicemotion", {
			inputEvent: {
				deviceorientation: {
					alpha,
					beta,
					gamma: -gamma
				}
			}
		});
	}
	_onDeviceOrientation() {
		this._timer && clearTimeout(this._timer);
		this._timer = setTimeout(() => {
			if ((new Date().getTime() - this.lastDevicemotionTimestamp) < STILLNESS_THRESHOLD) {
				vec3.copy(this.stillGyroVec, this.rawGyroVec);
			}
		}, STILLNESS_THRESHOLD);
	}
	_onDeviceMotion(e) {
		// desktop chrome triggers devicemotion event with empthy sensor values.
		// Those events should ignored.
		const isGyroSensorAvailable = !(e.rotationRate.alpha == null);
		const isGravitySensorAvailable = !(e.accelerationIncludingGravity.x == null);

		if (e.interval === 0 || !(isGyroSensorAvailable && isGravitySensorAvailable)) {
			return;
		}

		const devicemotionEvent = Object.assign({}, e);

		devicemotionEvent.interval = e.interval;
		devicemotionEvent.timeStamp = e.timeStamp;
		devicemotionEvent.type = e.type;
		devicemotionEvent.rotationRate = {
			alpha: e.rotationRate.alpha,
			beta: e.rotationRate.beta,
			gamma: e.rotationRate.gamma,
		};
		devicemotionEvent.accelerationIncludingGravity = {
			x: e.accelerationIncludingGravity.x,
			y: e.accelerationIncludingGravity.y,
			z: e.accelerationIncludingGravity.z,
		};
		devicemotionEvent.acceleration = {
			x: e.acceleration.x,
			y: e.acceleration.y,
			z: e.acceleration.z,
		};

		if (this.isAndroid) {
			vec3.set(
				this.rawGyroVec,
				e.rotationRate.alpha || 0,
				e.rotationRate.beta || 0,
				e.rotationRate.gamma || 0);
			vec3.subtract(this.adjustedGyroVec, this.rawGyroVec, this.stillGyroVec);
			this.lastDevicemotionTimestamp = new Date().getTime();

			devicemotionEvent.adjustedRotationRate = {
				alpha: this.adjustedGyroVec[0],
				beta: this.adjustedGyroVec[1],
				gamma: this.adjustedGyroVec[2]};
		}

		this.trigger("devicemotion", {
			inputEvent: devicemotionEvent
		});
	}
	enable() {
		if (this.isAndroid) {
			window.addEventListener("deviceorientation", this._onDeviceOrientation);
		}
		if (this.isWithoutDeviceMotion) {
			window.addEventListener("deviceorientation", this._onChromeWithoutDeviceMotion);
		} else {
			window.addEventListener("devicemotion", this._onDeviceMotion);
		}
		this._isEnabled = true;
	}
	disable() {
		window.removeEventListener("deviceorientation", this._onDeviceOrientation);
		window.removeEventListener("deviceorientation", this._onChromeWithoutDeviceMotion);
		window.removeEventListener("devicemotion", this._onDeviceMotion);
		this._isEnabled = false;
	}
}
