import Component from "@egjs/component";
import {vec3, glMatrix, quat} from "gl-matrix";
import FusionPoseSensor from "./input/FusionPoseSensor";

const Y_AXIS_VECTOR = vec3.fromValues(0, 1, 0);

export default class DeviceQuaternion extends Component {
	constructor() {
		super();

		this._fusionPoseSensor = new FusionPoseSensor();
		this._quaternion = quat.create();

		this._fusionPoseSensor.enable();
		this._fusionPoseSensor.on("change", e => {
			this._quaternion = e.quaternion;

			this.trigger("change", {isTrusted: true});
		});
	}

	getCombinedQuaternion(yaw) {
		const yawQ = quat.setAxisAngle(quat.create(), Y_AXIS_VECTOR, glMatrix.toRadian(-yaw));
		const conj = quat.conjugate(quat.create(), this._quaternion);
		// Multiply pitch quaternion -> device quaternion -> yaw quaternion
		const outQ = quat.multiply(quat.create(), conj, yawQ);

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
	}
}
