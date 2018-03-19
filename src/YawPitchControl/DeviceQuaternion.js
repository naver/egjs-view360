import Component from "@egjs/component";
import FusionPoseSensor from "./input/FusionPoseSensor";
import ScreenRotationAngle from "./ScreenRotationAngle";
import {vec3, glMatrix, quat} from "../utils/math-util";

const ORIGIN_VECTOR = vec3.fromValues(0, 0, 0);
const X_AXIS_VECTOR = vec3.fromValues(1, 0, 0);
const Y_AXIS_VECTOR = vec3.fromValues(0, 1, 0);

export default class DeviceQuaternion extends Component {
	constructor() {
		super();

		this._screenRotationAngle = new ScreenRotationAngle();
		this._fusionPoseSensor = new FusionPoseSensor();
		this._quaternion = quat.create();

		this._fusionPoseSensor.enable();
		this._fusionPoseSensor.on("change", e => {
			this._quaternion = e.quaternion;

			this.trigger("change", {isTrusted: true});
		});
	}

	getCombinedQuaternion(yaw, pitch) {
		const deviceR = this._screenRotationAngle.getRadian();

		// rotate x-axis around z-axis about screen rotation angle.
		const pitchAxis = vec3.rotateZ(vec3.create(), X_AXIS_VECTOR, ORIGIN_VECTOR, deviceR);
		const yawQ = quat.setAxisAngle(quat.create(), Y_AXIS_VECTOR, glMatrix.toRadian(-yaw));
		// rotate quaternion around new x-axis about pitch angle.
		const pitchQ = quat.setAxisAngle(quat.create(), pitchAxis, glMatrix.toRadian(-pitch));
		const conj = quat.conjugate(quat.create(), this._quaternion);
		// Multiply pitch quaternion -> device quaternion -> yaw quaternion
		const outQ = quat.multiply(quat.create(), pitchQ, conj);

		quat.multiply(outQ, outQ, yawQ);
		return outQ;
	}

	destroy() {
		// detach all event handler
		this.off();

		if (this._fusionPoseSensor) {
			this._fusionPoseSensor.off();
			this._fusionPoseSensor.destroy();
			this._fusionPoseSensor = null;
		}

		if (this._screenRotationAngle) {
			this._screenRotationAngle.unref();
			this._screenRotationAngle = null;
		}
	}
}
