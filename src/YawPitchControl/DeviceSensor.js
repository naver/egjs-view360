import Component from "@egjs/component";
import {RelativeOrientationSensor} from "motion-sensors-polyfill";
import {vec3, glMatrix, quat} from "gl-matrix";
import {getDeltaYaw, getDeltaPitch} from "./utils";
import {util as mathUtil} from "../utils/math-util";

const X_AXIS_VECTOR = vec3.fromValues(1, 0, 0);
const Y_AXIS_VECTOR = vec3.fromValues(0, 1, 0);
// Quaternion to rotate from sensor coordinates to WebVR coordinates
const SENSOR_TO_VR = quat.setAxisAngle(quat.create(), X_AXIS_VECTOR, -Math.PI / 2);

export default class DeviceSensor extends Component {
	constructor() {
		super();

		this._enabled = false;
		this._calibrated = false;

		this._sensor = new RelativeOrientationSensor({
			frequency: 60,
			coordinateSystem: "screen", // for polyfill
			referenceFrame: "screen"
		});

		this._prevQuaternion = null;
	}

	enable() {
		if (this._enabled) {
			return Promise.resolve("Sensor already enabled");
		}
		if (!navigator || !navigator.permissions) {
			// iOS
			this._startSensor();
			return Promise.resolve();
		}

		return Promise.all([
			navigator.permissions.query({name: "accelerometer"}),
			navigator.permissions.query({name: "gyroscope"})
		]).then(results => {
			if (results.every(result => result.state === "granted")) {
				this._startSensor();
			}
		}).catch(() => {
			// Start it anyway, workaround for Firefox
			this._startSensor();
		});
	}

	disable() {
		if (!this._enabled) {
			return;
		}

		this._prevQuaternion = null;
		this._sensor.removeEventListener("read", this._onSensorRead);
		this._sensor.stop();
	}

	isEnabled() {
		return this._enabled;
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

	getCombinedQuaternion(yaw) {
		const currentQuat = this._getOrientation();

		if (!this._prevQuaternion) {
			this._prevQuaternion = quat.copy(quat.create(), currentQuat);
		}

		const yawQ = quat.setAxisAngle(quat.create(), Y_AXIS_VECTOR, glMatrix.toRadian(yaw));
		const outQ = quat.multiply(quat.create(), yawQ, currentQuat);

		quat.conjugate(outQ, outQ);
		quat.copy(this._prevQuaternion, currentQuat);
		return outQ;
	}

	getDeviceHorizontalRight(quaternion) {
		const currentQuat = quaternion || this._getOrientation();
		const unrotateQuat = quat.conjugate(quat.create(), currentQuat);

		// Assume that unrotated device center pos is at (0, 0, -1)
		const origViewDir = vec3.fromValues(0, 0, -1);
		const viewDir = vec3.transformQuat(vec3.create(), origViewDir, currentQuat);

		// Where is the right, in current view direction
		const viewXAxis = vec3.cross(vec3.create(), viewDir, Y_AXIS_VECTOR);
		const deviceHorizontalDir = vec3.add(vec3.create(), viewDir, viewXAxis);
		const unrotatedHorizontalDir = vec3.create();

		vec3.transformQuat(unrotatedHorizontalDir, deviceHorizontalDir, unrotateQuat);
		vec3.sub(unrotatedHorizontalDir, unrotatedHorizontalDir, origViewDir);
		unrotatedHorizontalDir[2] = 0; // Remove z element
		vec3.normalize(unrotatedHorizontalDir, unrotatedHorizontalDir);

		return unrotatedHorizontalDir;
	}

	destroy() {
		this.disable();
	}

	_getOrientation() {
		if (!this._sensor.quaternion) {
			return quat.create();
		}

		return quat.multiply(quat.create(), SENSOR_TO_VR, this._sensor.quaternion);
	}

	_startSensor() {
		this._sensor.start();
		if (!this._calibrated) {
			this._sensor.addEventListener("reading", this._onFirstRead);
		}
		this._sensor.addEventListener("reading", this._onSensorRead);
		this._enabled = true;
	}

	_onFirstRead = () => {
		const quaternion = this._getOrientation();
		const minusZDir = vec3.fromValues(0, 0, -1);
		const firstViewDir = vec3.transformQuat(vec3.create(), minusZDir, quaternion);

		const yawOffset = mathUtil.yawOffsetBetween(firstViewDir, minusZDir);

		if (yawOffset === 0) {
			// If the yawOffset is exactly 0, then device sensor is not ready
			// So read it again until it has any value in it
			return;
		}

		const modifyQuat = quat.setAxisAngle(quat.create(), Y_AXIS_VECTOR, -yawOffset);

		quat.mul(
			SENSOR_TO_VR,
			modifyQuat,
			SENSOR_TO_VR
		);

		this._calibrated = true;
		this._sensor.removeEventListener("reading", this._onFirstRead);
	}

	_onSensorRead = () => {
		this.trigger("change", {isTrusted: true});
	}
}
