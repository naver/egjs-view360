import Component from "@egjs/component";
import {quat} from "gl-matrix";
import PosePredictor from "webvr-polyfill/src/sensor-fusion/pose-predictor";
import MathUtil from "webvr-polyfill/src/math-util";
import Util from "webvr-polyfill/src/util";
import {window} from "../../utils/browser";
import DeviceMotion from "./DeviceMotion";
import ComplementaryFilter from "./ComplementaryFilter";
import {CHROME_VERSION} from "../consts";

const K_FILTER = 0.98;
const PREDICTION_TIME_S = 0.040;

export default class FusionPoseSensor extends Component {
	constructor() {
		super();

		this.deviceMotion = new DeviceMotion();

		this.accelerometer = new MathUtil.Vector3();
		this.gyroscope = new MathUtil.Vector3();

		this._onDeviceMotionChange = this._onDeviceMotionChange.bind(this);
		this._onScreenOrientationChange = this._onScreenOrientationChange.bind(this);

		this.filter = new ComplementaryFilter(K_FILTER);
		this.posePredictor = new PosePredictor(PREDICTION_TIME_S);

		this.filterToWorldQ = new MathUtil.Quaternion();

		this.isFirefoxAndroid = Util.isFirefoxAndroid();
		this.isIOS = Util.isIOS();

		// Ref https://github.com/immersive-web/cardboard-vr-display/issues/18
		this.isChromeUsingDegrees = CHROME_VERSION >= 66;

		this._isEnabled = false;

		// Set the filter to world transform, depending on OS.
		if (this.isIOS) {
			this.filterToWorldQ.setFromAxisAngle(new MathUtil.Vector3(1, 0, 0), Math.PI / 2);
		} else {
			this.filterToWorldQ.setFromAxisAngle(new MathUtil.Vector3(1, 0, 0), -Math.PI / 2);
		}

		this.inverseWorldToScreenQ = new MathUtil.Quaternion();
		this.worldToScreenQ = new MathUtil.Quaternion();
		this.originalPoseAdjustQ = new MathUtil.Quaternion();
		this.originalPoseAdjustQ.setFromAxisAngle(new MathUtil.Vector3(0, 0, 1),
			-window.orientation * Math.PI / 180);

		this._setScreenTransform();
		// Adjust this filter for being in landscape mode.
		if (Util.isLandscapeMode()) {
			this.filterToWorldQ.multiply(this.inverseWorldToScreenQ);
		}

		// Keep track of a reset transform for resetSensor.
		this.resetQ = new MathUtil.Quaternion();

		this.deviceMotion.on("devicemotion", this._onDeviceMotionChange);
		this.enable();
	}
	enable() {
		if (this.isEnabled()) {
			return;
		}
		this.deviceMotion.enable();
		this._isEnabled = true;
		window.addEventListener("orientationchange", this._onScreenOrientationChange);
	}
	disable() {
		if (!this.isEnabled()) {
			return;
		}
		this.deviceMotion.disable();
		this._isEnabled = false;
		window.removeEventListener("orientationchange", this._onScreenOrientationChange);
	}
	isEnabled() {
		return this._isEnabled;
	}
	destroy() {
		this.disable();
		this.deviceMotion = null;
	}
	_triggerChange() {
		const orientation = this.getOrientation();

		// if orientation is not prepared. don't trigger change event
		if (!orientation) {
			return;
		}

		if (!this._prevOrientation) {
			this._prevOrientation = orientation;
			return;
		}

		if (quat.equals(this._prevOrientation, orientation)) {
			return;
		}

		this.trigger("change", {quaternion: orientation});
	}
	getOrientation() {
		let orientation;

		// Hack around using deviceorientation instead of devicemotion
		if (this.deviceMotion.isWithoutDeviceMotion && this._deviceOrientationQ) {
			this.deviceOrientationFixQ = this.deviceOrientationFixQ || (() => {
				const y = new MathUtil.Quaternion()
					.setFromAxisAngle(new MathUtil.Vector3(0, 1, 0), -this._alpha);

				return y;
			})();

			orientation = this._deviceOrientationQ;
			const out = new MathUtil.Quaternion();

			out.copy(orientation);
			out.multiply(this.filterToWorldQ);
			out.multiply(this.resetQ);
			out.multiply(this.worldToScreenQ);
			out.multiplyQuaternions(this.deviceOrientationFixQ, out);

			// return quaternion as glmatrix quaternion object
			const out_ = quat.fromValues(
				out.x,
				out.y,
				out.z,
				out.w
			);

			return quat.normalize(out_, out_);
		} else {
			// Convert from filter space to the the same system used by the
			// deviceorientation event.
			orientation = this.filter.getOrientation();

			if (!orientation) {
				return null;
			}

			const out = this._convertFusionToPredicted(orientation);

			// return quaternion as glmatrix quaternion object
			const out_ = quat.fromValues(
				out.x,
				out.y,
				out.z,
				out.w
			);

			return quat.normalize(out_, out_);
		}
	}
	_convertFusionToPredicted(orientation) {
		// Predict orientation.
		this.predictedQ =
			this.posePredictor.getPrediction(orientation, this.gyroscope, this.previousTimestampS);

		// Convert to THREE coordinate system: -Z forward, Y up, X right.
		const out = new MathUtil.Quaternion();

		out.copy(this.filterToWorldQ);
		out.multiply(this.resetQ);
		out.multiply(this.predictedQ);
		out.multiply(this.worldToScreenQ);

		return out;
	}
	_onDeviceMotionChange({inputEvent}) {
		const deviceorientation = inputEvent.deviceorientation;
		const deviceMotion = inputEvent;
		const accGravity = deviceMotion.accelerationIncludingGravity;
		const rotRate = deviceMotion.adjustedRotationRate || deviceMotion.rotationRate;
		let timestampS = deviceMotion.timeStamp / 1000;

		if (deviceorientation) {
			if (!this._alpha) {
				this._alpha = deviceorientation.alpha;
			}
			this._deviceOrientationQ = this._deviceOrientationQ || new MathUtil.Quaternion();
			this._deviceOrientationQ.setFromEulerYXZ(
				deviceorientation.beta,
				deviceorientation.alpha,
				deviceorientation.gamma
			);

			this._triggerChange();
		} else {
			// Firefox Android timeStamp returns one thousandth of a millisecond.
			if (this.isFirefoxAndroid) {
				timestampS /= 1000;
			}

			this.accelerometer.set(-accGravity.x, -accGravity.y, -accGravity.z);
			this.gyroscope.set(rotRate.alpha, rotRate.beta, rotRate.gamma);

			// Browsers on iOS, Firefox/Android, and Chrome m66/Android `rotationRate`
			// is reported in degrees, so we first convert to radians.
			if (this.isIOS || this.isFirefoxAndroid || this.isChromeUsingDegrees) {
				this.gyroscope.multiplyScalar(Math.PI / 180);
			}

			this.filter.addAccelMeasurement(this.accelerometer, timestampS);
			this.filter.addGyroMeasurement(this.gyroscope, timestampS);

			this._triggerChange();

			this.previousTimestampS = timestampS;
		}
	}
	_onScreenOrientationChange(screenOrientation) {
		this._setScreenTransform(window.orientation);
	}
	_setScreenTransform() {
		this.worldToScreenQ.set(0, 0, 0, 1);

		const orientation = window.orientation;

		switch (orientation) {
			case 0:
				break;
			case 90:
			case -90:
			case 180:
				this.worldToScreenQ
					.setFromAxisAngle(new MathUtil.Vector3(0, 0, 1), orientation / -180 * Math.PI);
				break;
			default:
				break;
		}
		this.inverseWorldToScreenQ.copy(this.worldToScreenQ);
		this.inverseWorldToScreenQ.inverse();
	}
}
