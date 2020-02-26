import Component from "@egjs/component";
import {quat} from "gl-matrix";
import {toAxis} from "../utils";
import FusionPoseSensor from "./FusionPoseSensor";
import {util, ROTATE_CONSTANT} from "../../utils/math-util";

function getDeltaYaw(prvQ, curQ) {
	const yawDeltaByYaw = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
	const yawDeltaByRoll = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) *
		Math.sin(util.extractPitchFromQuat(curQ));

	return yawDeltaByRoll + yawDeltaByYaw;
}

function getDeltaPitch(prvQ, curQ) {
	const pitchDelta = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);

	return pitchDelta;
}

export default class TiltMotionInput extends Component {
	constructor(el, options) {
		super();
		this.element = el;

		this._prevQuaternion = null;
		this._quaternion = null;

		this.fusionPoseSensor = null;

		this.options = Object.assign({
			scale: 1,
			threshold: 0,
		}, options);

		this._onPoseChange = this._onPoseChange.bind(this);
	}
	mapAxes(axes) {
		this.axes = axes;
	}
	connect(observer) {
		if (this.observer) {
			return this;
		}
		this.observer = observer;
		this.fusionPoseSensor = new FusionPoseSensor();
		this.fusionPoseSensor.enable();
		this._attachEvent();
		return this;
	}
	disconnect() {
		if (!this.observer) {
			return this;
		}

		this._dettachEvent();
		this.fusionPoseSensor.disable();
		this.fusionPoseSensor.destroy();
		this.fusionPoseSensor = null;
		this.observer = null;
		return this;
	}
	destroy() {
		this.disconnect();
		this.element = null;
		this.options = null;
		this.axes = null;
		this._prevQuaternion = null;
		this._quaternion = null;
	}
	_onPoseChange(event) {
		if (!this._prevQuaternion) {
			this._prevQuaternion = quat.clone(event.quaternion);
			this._quaternion = quat.clone(event.quaternion);
			return;
		}

		quat.copy(this._prevQuaternion, this._quaternion);
		quat.copy(this._quaternion, event.quaternion);

		this.observer.change(this, event, toAxis(this.axes, [
			getDeltaYaw(this._prevQuaternion, this._quaternion),
			getDeltaPitch(this._prevQuaternion, this._quaternion)
		]));
	}
	_attachEvent() {
		this.fusionPoseSensor.on("change", this._onPoseChange);
	}
	_dettachEvent() {
		this.fusionPoseSensor.off("change", this._onPoseChange);
	}
}
