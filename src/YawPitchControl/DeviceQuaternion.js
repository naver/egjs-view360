import {RelativeOrientationSensor} from "motion-sensors-polyfill";
import ScreenRotationAngle from "./ScreenRotationAngle";
import {vec3, glMatrix, quat} from "../utils/math-util";
import {getDeltaYaw, getDeltaPitch} from "./utils";

const ORIGIN_VECTOR = vec3.fromValues(0, 0, 0);
const X_AXIS_VECTOR = vec3.fromValues(1, 0, 0);
const Y_AXIS_VECTOR = vec3.fromValues(0, 1, 0);
const Z_AXIS_VECTOR = vec3.fromValues(0, 0, 1);
// Quaternion to rotate from sensor coordinates to WebVR coordinates
const SENSOR_TO_VR = quat.setAxisAngle(quat.create(), X_AXIS_VECTOR, -Math.PI / 2);

quat.multiply(
	SENSOR_TO_VR, SENSOR_TO_VR,
	quat.setAxisAngle(quat.create(), Z_AXIS_VECTOR, Math.PI / 2)
);

export default class DeviceQuaternion {
	constructor() {
		this._enabled = false;
		this._screenRotationAngle = new ScreenRotationAngle();

		this._sensor = new RelativeOrientationSensor({
			frequency: 60,
			referenceFrame: "screen"
		});
		// this._sensor.addEventListener("read", this._onSensorRead);

		this._prevQuaternion = null;
	}

	enable() {
		if (this._enabled) {
			return;
		}

		Promise.all([
			navigator.permissions.query({
				name: "accelerometer"
			}),
			navigator.permissions.query({
				name: "gyroscope"
			})
		]).then(results => {
			if (results.every(result => result.state === "granted")) {
				this._sensor.start();
				this._enabled = true;
			}
		});
	}

	disable() {
		if (!this._enabled) {
			return;
		}

		this._sensor.stop();
	}

	getYawPitchDelta() {
		const prevQuat = this._prevQuaternion;
		const currentQuat = this._getOrientation();
		const defaultYawPitchDelta = {
			yaw: 0,
			pitch: 0,
		};

		if (!currentQuat) {
			return defaultYawPitchDelta;
		} else if (!prevQuat) {
			this._prevQuaternion = currentQuat;
			return defaultYawPitchDelta;
		}

		const result = {
			yaw: getDeltaYaw(prevQuat, currentQuat),
			pitch: getDeltaPitch(prevQuat, currentQuat),
		};

		quat.copy(prevQuat, currentQuat);
		return result;
	}

	getCombinedQuaternion(yaw, pitch) {
		// TODO: 보는 방향 기준으로 위 방향으로 90도 회전
		// 거기에 추가로 yaw pitch 적용
		const currentQuat = this._getOrientation();

		if (!currentQuat) {
			return this._prevQuaternion || quat.create();
		} else if (!this._prevQuaternion) {
			this._prevQuaternion = quat.copy(quat.create(), currentQuat);
			return quat.create();
		}

		const deviceR = this._screenRotationAngle.getRadian();

		// rotate x-axis around z-axis about screen rotation angle.
		const pitchAxis = vec3.rotateZ(vec3.create(), X_AXIS_VECTOR, ORIGIN_VECTOR, deviceR);
		const yawQ = quat.setAxisAngle(quat.create(), Y_AXIS_VECTOR, glMatrix.toRadian(-yaw));
		// rotate quaternion around new x-axis about pitch angle.
		const pitchQ = quat.setAxisAngle(quat.create(), pitchAxis, glMatrix.toRadian(-pitch));
		const conj = quat.conjugate(quat.create(), currentQuat);
		// Multiply pitch quaternion -> device quaternion -> yaw quaternion
		const outQ = quat.multiply(quat.create(), pitchQ, conj);

		quat.multiply(outQ, outQ, yawQ);
		quat.copy(this._prevQuaternion, currentQuat);
		return outQ;
	}

	destroy() {
		this.disable();
		this._sensor.removeEventListener("read", this._onSensorRead);
		if (this._screenRotationAngle) {
			this._screenRotationAngle.unref();
			this._screenRotationAngle = null;
		}
	}

	_getOrientation() {
		if (!this._sensor.quaternion) {
			return quat.create();
		}

		return quat.multiply(quat.create(), SENSOR_TO_VR, this._sensor.quaternion);
	}

	_onSensorRead = () => {}

	_getScreenAngle() {
		let screenOrientationAngle;

		if (window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined) {
			screenOrientationAngle = screen.orientation.angle;
		} else if (window.orientation !== undefined) {
			/* iOS */
			screenOrientationAngle = window.orientation >= 0 ?
				window.orientation : 360 + window.orientation;
		} else {
			screenOrientationAngle = 0;
		}

		return screenOrientationAngle;
	}
}
