import Component from "@egjs/component";
import Agent from "@egjs/agent";
import {vec3} from "../../utils/math-util";
import {window} from "../browser";

const STILLNESS_THRESHOLD = 200; // millisecond

export default class DeviceMotion extends Component {
	constructor() {
		super();
		this._onDeviceMotion = this._onDeviceMotion.bind(this);
		this._onDeviceOrientation = this._onDeviceOrientation.bind(this);

		this.isAndroid = Agent().os.name === "android";

		this.stillGyroVec = vec3.create();
		this.rawGyroVec = vec3.create();
		this.adjustedGyroVec = vec3.create();

		this._timer = null;

		this.lastDevicemotionTimestamp = 0;
		this._isEnabled = false;
		this.enable();
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
		// TODO: 브라우저에서는 이벤트 등록 시점에도 이벤트가 발생한다. 이렇게 체크하는 게 맞나??? @happyhj
		if (e.interval === 0) {
			return;
		}

		if (this.isAndroid) {
			vec3.set(
				this.rawGyroVec,
				e.rotationRate.alpha || 0,
				e.rotationRate.beta || 0,
				e.rotationRate.gamma || 0);
			vec3.subtract(this.adjustedGyroVec, this.rawGyroVec, this.stillGyroVec);
			this.lastDevicemotionTimestamp = new Date().getTime();

			e.adjustedRotationRate = {
				alpha: this.adjustedGyroVec[0],
				beta: this.adjustedGyroVec[1],
				gamma: this.adjustedGyroVec[2]};
		}

		this.trigger("devicemotion", {
			inputEvent: e
		});
	}
	enable() {
		if (this.isAndroid) {
			window.addEventListener("deviceorientation", this._onDeviceOrientation);
		}
		window.addEventListener("devicemotion", this._onDeviceMotion);
		this._isEnabled = true;
	}
	disable() {
		if (this.isAndroid) {
			window.removeEventListener("deviceorientation", this._onDeviceOrientation);
		}
		window.removeEventListener("devicemotion", this._onDeviceMotion);
		this._isEnabled = false;
	}
}
