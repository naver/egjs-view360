import Component from "@egjs/component";
import {RelativeOrientationSensor} from "motion-sensors-polyfill";
import {vec3, glMatrix, quat} from "gl-matrix";
import {getDeltaYaw, getDeltaPitch} from "./utils";
import {IS_SAFARI_ON_DESKTOP, IS_IOS} from "../utils/browser";

const X_AXIS_VECTOR = vec3.fromValues(1, 0, 0);
const Y_AXIS_VECTOR = vec3.fromValues(0, 1, 0);
const Z_AXIS_VECTOR = vec3.fromValues(0, 0, 1);
// Quaternion to rotate from sensor coordinates to WebVR coordinates
const SENSOR_TO_VR = quat.setAxisAngle(quat.create(), X_AXIS_VECTOR, -Math.PI / 2);

let zRotation = -Math.PI / 2;

if (IS_SAFARI_ON_DESKTOP) {
	zRotation = Math.PI / 2;
} else if (IS_IOS) {
	zRotation = 0;
}

quat.multiply(
	SENSOR_TO_VR, SENSOR_TO_VR,
	quat.setAxisAngle(quat.create(), Z_AXIS_VECTOR, zRotation)
);

export default class DeviceQuaternion extends Component {
	constructor() {
		super();

		this._enabled = false;

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
			try {
				this._startSensor();
			} catch {
				return Promise.reject("Sensor can't be enabled");
			}
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
			this._startSensor(); // TODO: TEST
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

	getCombinedQuaternion(yaw, pitch) {
		const currentQuat = this._getOrientation();

		if (!this._prevQuaternion) {
			this._prevQuaternion = quat.copy(quat.create(), currentQuat);
		}

		const pitchAxis = this.getDeviceHorizontalRight(currentQuat);

		const yawQ = quat.setAxisAngle(quat.create(), Y_AXIS_VECTOR, glMatrix.toRadian(yaw));
		// rotate quaternion around new x-axis about pitch angle.
		const pitchQ = quat.setAxisAngle(quat.create(), pitchAxis, glMatrix.toRadian(pitch));
		// Multiply pitch quaternion -> device quaternion -> yaw quaternion
		const outQ = quat.multiply(quat.create(), yawQ, currentQuat);

		quat.multiply(outQ, outQ, pitchQ);
		quat.conjugate(outQ, outQ);
		quat.copy(this._prevQuaternion, currentQuat);
		return outQ;
	}

	getDeviceHorizontalRight(quaternion) {
		const currentQuat = quaternion || this._getOrientation();
		const unrotateQuat = quat.conjugate(quat.create(), currentQuat);

		// Assume that unrotated device center pos is at (0, 0, -1)
		const origDevicePos = vec3.fromValues(0, 0, -1);
		const rotatedDevicePos = vec3.transformQuat(vec3.create(), origDevicePos, currentQuat);

		// Device coordinate system
		const deviceZAxis = vec3.transformQuat(vec3.create(), Z_AXIS_VECTOR, currentQuat);

		// Because view direction is same with -deviceZAxis
		const viewXAxis = vec3.cross(vec3.create(), Y_AXIS_VECTOR, deviceZAxis);

		const deviceHorizontalDir = vec3.add(vec3.create(), rotatedDevicePos, viewXAxis);
		const unrotatedHorizontalDir = vec3.transformQuat(
			vec3.create(), deviceHorizontalDir, unrotateQuat
		);

		vec3.sub(unrotatedHorizontalDir, unrotatedHorizontalDir, origDevicePos);
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
		this._sensor.addEventListener("read", this._onSensorRead);
		this._enabled = true;
	}

	_onSensorRead() {
		this.trigger("change", {isTrusted: true});
	}
}
