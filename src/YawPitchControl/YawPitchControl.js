import Component from "@egjs/component";
import Axes from "@egjs/axes";
import {getComputedStyle, SUPPORT_TOUCH, SUPPORT_DEVICEMOTION} from "./browser";
import MoveKeyInput from "./input/MoveKeyInput";
import WheelInput from "./input/WheelInput";
import TiltMotionInput from "./input/TiltMotionInput";
import {
	vec2,
} from "../utils/math-util";
import {
	TOUCH_DIRECTION_ALL,
	MC_DECELERATION,
	MC_MAXIMUM_DURATION,
	MC_BIND_SCALE,
	MAX_FIELD_OF_VIEW,
	PAN_SCALE,
	YAW_RANGE_HALF,
	PITCH_RANGE_HALF,
} from "./consts";

const DEFAULT_YAW_RANGE = [-YAW_RANGE_HALF, YAW_RANGE_HALF];
const DEFAULT_PITCH_RANGE = [-PITCH_RANGE_HALF, PITCH_RANGE_HALF];
/**
 * A module used to provide coordinate based on yaw/pitch orientation. This module receives user touch action, keyboard, mouse and device orientation(if it exists) as input, then combines them and converts it to yaw/pitch coordinates.
 *
 * @alias eg.YawPitchControl
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
const YawPitchControl = class YawPitchControl extends Component {
	/**
	 * @param {Object} options The option object of the eg.YawPitch module
	 * @param {Element}[options.element=null] element A base element for the eg.YawPitch module
	 * @param {Number} [options.yaw=0] initial yaw (degree)
	 * @param {Number} [options.pitch=0] initial pitch (degree)
	 * @param {Number} [options.fov=65] initial field of view (degree)
	 * @param {Boolean} [optiosn.showPolePoint=true] Indicates whether pole is shown
	 * @param {Boolean} [options.useZoom=true] Indicates whether zoom is available
	 * @param {Boolean} [options.useKeyboard=true] Indicates whether keyboard is enabled
	 * @param {Number} [options.touchDirection=TOUCH_DIRECTION_ALL] Direction of the touch movement (TOUCH_DIRECTION_ALL: all,  TOUCH_DIRECTION_YAW: horizontal, TOUCH_DIRECTION_PITCH: vertical, TOUCH_DIRECTION_NONE: no move)
	 * @param {Array} [options.yawRange=[-180, 180] Range of visible yaw
	 * @param {Array} [options.pitchRange=[-90, 90] Range of visible pitch
	 * @param {Array} [options.fovRange=[30, 110] Range of FOV
	 * @param {Number} [options.aspectRatio=1] Aspect Ratio
	 */
	constructor(options) {
		super();

		const opt = Object.assign({
			element: null,
			yaw: 0,
			pitch: 0,
			fov: 65,
			showPolePoint: false,
			useZoom: true,
			useKeyboard: true,
			touchDirection: TOUCH_DIRECTION_ALL,
			yawRange: DEFAULT_YAW_RANGE,
			pitchRange: DEFAULT_PITCH_RANGE,
			fovRange: [30, 110],
			aspectRatio: 1, /* TODO: Need Mandatory? */
		}, options);

		this._element = opt.element;
		this._initialFov = opt.fov;
		this._enabled = false;
		this._isAnimating = false;

		this._initAxes(opt);
		this.option(opt);
	}

	_initAxes(opt) {
		const yRange = YawPitchControl._updateYawRange(opt.yawRange, opt.fov, opt.aspectRatio);
		const pRange = YawPitchControl._updatePitchRange(opt.pitchRange, opt.fov, opt.showPolePoint);
		const circular = yRange[1] - yRange[0] < 360 ?
			[false, false] : [true, true];

		this.axesPanInput = new Axes.PanInput(this._element);
		this.axesWheelInput = new WheelInput(this._element, {scale: 4});
		this.axesTiltMotionInput = SUPPORT_DEVICEMOTION ? new TiltMotionInput(this._element) : null;
		this.axesPinchInput = SUPPORT_TOUCH ? new Axes.PinchInput(this._element, {scale: -1}) : null;
		this.axesMoveKeyInput = new MoveKeyInput(this._element, {scale: [-6, 6]});

		this.axes = new Axes({
			yaw: {
				range: yRange,
				circular,
				bounce: [0, 0]
			},
			pitch: {
				range: pRange,
				circular: [false, false],
				bounce: [0, 0]
			},
			fov: {
				range: opt.fovRange,
				circular: [false, false],
				bounce: [0, 0]
			},
		}, {
			deceleration: MC_DECELERATION,
			maximumDuration: MC_MAXIMUM_DURATION,
		}, {
			yaw: opt.yaw,
			pitch: opt.pitch,
			fov: opt.fov
		})
		.on({
			hold: evt => {
				this.trigger("hold");
			},
			change: evt => {
				if (evt.delta.fov !== 0) {
					this._setPanScale(evt.pos.fov);
					this._updateControlScale(evt);
				}
				this._triggerChange();
			},
			release: evt => {
				this._triggerChange();
			},
			animationStart: evt => {
			},
			animationEnd: evt => {
				this.trigger("animationEnd");
			},
		});
	}

	_setPanScale(fov) {
		const areaHeight = parseInt(getComputedStyle(this._element).height, 10);
		const scale = MC_BIND_SCALE[0] * fov / this._initialFov * PAN_SCALE / areaHeight;

		this.axesPanInput.options.scale = [scale, scale];
		this.axes.options.deceleration = MC_DECELERATION * fov / MAX_FIELD_OF_VIEW;
	}

	/*
	 * Override component's option method
	 * to call method for updating values which is affected by option change.
	 *
	 * @param {*} args
	 */
	option(...args) {
		const argLen = args.length;

		// Getter
		if (argLen === 0) {
			return this._getOptions();
		} else if (argLen === 1 && typeof args[0] === "string") {
			return this._getOptions(args[0]);
		}

		// Setter
		const beforeOptions = Object.assign({}, this.options);
		let newOptions = {};
		let changedKeyList = []; // TODO: if value is not changed, then do not push on changedKeyList.

		if (argLen === 1) {
			changedKeyList = Object.keys(args[0]);
			newOptions = Object.assign({}, args[0]);
		} else if (argLen >= 2) {
			changedKeyList.push(args[0]);
			newOptions[args[0]] = args[1];
		}

		this._setOptions(this._getValidatedOptions(newOptions));
		this._applyOptions(changedKeyList, beforeOptions);
		return this;
	}

	_getValidatedOptions(newOptions) {
		if (newOptions.yawRange) {
			newOptions.yawRange =
				this._getValidYawRange(newOptions.yawRange, newOptions.fov, newOptions.aspectRatio);
		}
		if (newOptions.pitchRange) {
			newOptions.pitchRange = this._getValidPitchRange(newOptions.pitchRange, newOptions.fov);
		}
		return newOptions;
	}

	_getOptions(key) {
		let value;

		if (typeof key === "string") {
			value = this.options[key];
		} else if (arguments.length === 0) {
			value = this.options;
		}
		return value;
	}

	_setOptions(options) {
		for (const key in options) {
			this.options[key] = options[key];
		}
	}

	_applyOptions(keys, prevOptions) {
		// If one of below is changed, call updateControlScale()
		if (keys.some(key =>
				key === "showPolePoint" || key === "fov" || key === "aspectRatio" ||
				key === "yawRange" || key === "pitchRange"
			)) {
			this._updateControlScale();
		}

		if (keys.some(key => key === "fovRange")) {
			const fovRange = this.options.fovRange;
			const prevFov = this.axes.get().fov;
			let nextFov = this.axes.get().fov;

			vec2.copy(this.axes.axis.fov.range, fovRange);

			if (nextFov < fovRange[0]) {
				nextFov = fovRange[0];
			} else if (prevFov > fovRange[1]) {
				nextFov = fovRange[1];
			}

			if (prevFov !== nextFov) {
				this.axes.setTo({
					fov: nextFov
				}, 0);
				this._updateControlScale();
			}
		}

		if (keys.some(key => key === "useKeyboard")) {
			const useKeyboard = this.options.useKeyboard;

			if (useKeyboard) {
				this.axes.connect(["yaw", "pitch"], this.axesMoveKeyInput);
			} else {
				this.axes.disconnect(this.axesMoveKeyInput);
			}
		}

		if (keys.some(key => key === "useZoom")) {
			const useZoom = this.options.useZoom;

			if (useZoom) {
				this.axes.connect(["fov"], this.axesWheelInput);
				this.axesPinchInput && this.axes.connect(["fov"], this.axesPinchInput);
			} else {
				this.axes.disconnect(this.axesWheelInput);
				this.axesPinchInput && this.axes.disconnect(this.axesPinchInput);
			}
		}
	}

	_getValidYawRange(newYawRange, newFov, newAspectRatio) {
		const ratio = YawPitchControl.adjustAspectRatio(newAspectRatio || this.options.aspectRatio || 1);
		const fov = newFov || this.axes.get().fov;
		const horizontalFov = fov * ratio;
		const isValid = newYawRange[1] - newYawRange[0] >= horizontalFov;

		if (isValid) {
			return newYawRange;
		} else {
			return this.options.yawRange || DEFAULT_YAW_RANGE;
		}
	}

	_getValidPitchRange(newPitchRange, newFov) {
		const fov = newFov || this.axes.get().fov;
		const isValid = newPitchRange[1] - newPitchRange[0] >= fov;

		if (isValid) {
			return newPitchRange;
		} else {
			return this.options.pitchRange || DEFAULT_PITCH_RANGE;
		}
	}

	/**
	 * Update yaw/pitch min/max by 5 factor
	 *
	 * 1. showPolePoint
	 * 2. fov
	 * 3. yawRange
	 * 4. pitchRange
	 * 5. aspectRatio
	 *
	 * If one of above is changed, call this function
	 */
	_updateControlScale(changeEvt) {
		const opt = this.options;
		const fov = this.axes.get().fov;

		const pRange = YawPitchControl._updatePitchRange(opt.pitchRange, fov, opt.showPolePoint);
		const yRange = YawPitchControl._updateYawRange(opt.yawRange, fov, opt.aspectRatio);

		// TODO: If not changed!?
		const pos = this.axes.get();
		let y = pos.yaw;
		let p = pos.pitch;

		vec2.copy(this.axes.axis.yaw.range, yRange);
		vec2.copy(this.axes.axis.pitch.range, pRange);
		this.axes.axis.yaw.circular = yRange[1] - yRange[0] < 360 ? [false, false] : [true, true];

		/**
		 * update yaw/pitch by it's range.
		 */
		if (y < yRange[0]) {
			y = yRange[0];
		} else if (y > yRange[1]) {
			y = yRange[1];
		}

		if (p < pRange[0]) {
			p = pRange[0];
		} else if (p > pRange[1]) {
			p = pRange[1];
		}

		if (changeEvt) {
			changeEvt.set({
				yaw: y,
				pitch: p,
			});
		}

		this.axes.setTo({
			yaw: y,
			pitch: p,
		}, 0);

		return this;
	}

	static _updatePitchRange(pitchRange, fov, showPolePoint) {
		const verticalAngle = pitchRange[1] - pitchRange[0];
		const halfFov = fov / 2;
		const isPanorama = verticalAngle < 180;

		if (showPolePoint && !isPanorama) {
			// Use full pinch range
			return pitchRange.map(v => +v.toFixed(5));
		}

		// Round value as movableCood do.
		return [pitchRange[0] + halfFov, pitchRange[1] - halfFov].map(v => +v.toFixed(5));
	}

	static _updateYawRange(yawRange, fov, aspectRatio) {
		const horizontalAngle = yawRange[1] - yawRange[0];

		/**
		 * Full 360 Mode
		 */
		if (horizontalAngle >= 360) {
			// Don't limit yaw range on Full 360 mode.
			return yawRange.map(v => +v.toFixed(5));
		}

		/**
		 * Panorama mode
		 */
		let MAGIC_NUMBER = 1;
		const ratio = YawPitchControl.adjustAspectRatio(aspectRatio);
		const halfHorizontalFov = fov / 2 * ratio;

		// TODO: Magic Number Fix!
		if (horizontalAngle > 290) {
			MAGIC_NUMBER = 0.794;// horizontalAngle = 286;
		} else if (horizontalAngle > 125) {
			MAGIC_NUMBER = 0.98; // horizontalAngle *= 0.98;
		}

		// Round value as movableCood do.
		return [
			(yawRange[0] * MAGIC_NUMBER) + halfHorizontalFov,
			(yawRange[1] * MAGIC_NUMBER) - halfHorizontalFov].map(v => +v.toFixed(5));
	}

	_triggerChange() {
		const pos = this.axes.get();
		const opt = this.options;
		const event = {
			targetElement: opt.element,
		};

		event.yaw = pos.yaw;
		event.pitch = pos.pitch;
		event.fov = pos.fov;

		this.trigger("change", event);
	}

	// TODO: makes constant to be logic
	static adjustAspectRatio(input) {
		const inputRange = [0.520, 0.540, 0.563, 0.570, 0.584, 0.590, 0.609, 0.670,
			0.702, 0.720, 0.760, 0.780, 0.820, 0.920, 0.970, 1.00, 1.07, 1.14, 1.19,
			1.25, 1.32, 1.38, 1.40, 1.43, 1.53, 1.62, 1.76, 1.77, 1.86, 1.96, 2.26,
			2.30, 2.60, 3.00, 5.00, 6.00];
		const outputRange = [0.510, 0.540, 0.606, 0.560, 0.628, 0.630, 0.647, 0.710,
			0.736, 0.757, 0.780, 0.770, 0.800, 0.890, 0.975, 1.00, 1.07, 1.10, 1.15,
			1.18, 1.22, 1.27, 1.30, 1.33, 1.39, 1.45, 1.54, 1.55, 1.58, 1.62, 1.72,
			1.82, 1.92, 2.00, 2.24, 2.30];

		let rangeIdx = -1;

		for (let i = 0; i < inputRange.length - 1; i++) {
			if (inputRange[i] <= input && inputRange[i + 1] >= input) {
				rangeIdx = i;
				break;
			}
		}

		if (rangeIdx === -1) {
			if (inputRange[0] > input) {
				return outputRange[0];
			} else {
				return outputRange[outputRange[0].length - 1];
			}
		}

		const inputA = inputRange[rangeIdx];
		const inputB = inputRange[rangeIdx + 1];
		const outputA = outputRange[rangeIdx];
		const outputB = outputRange[rangeIdx + 1];

		return YawPitchControl.lerp(outputA, outputB, (input - inputA) / (inputB - inputA));
	}

	static lerp(a, b, fraction) {
		return a + fraction * (b - a);
	}

	/**
	 * Enable YawPitch functionality
	 *
	 * @method eg.YawPitch#enable
	 */
	enable() {
		if (this._enabled) {
			return this;
		}
		this.axes.connect(["yaw", "pitch"], this.axesPanInput);
		this.axesTiltMotionInput && this.axes.connect(["yaw", "pitch"], this.axesTiltMotionInput);
		this._applyOptions(Object.keys(this.options), this.options);
		this._setPanScale(this.getFov());

		this._enabled = true;
		return this;
	}

	/**
	 * Disable YawPitch functionality
	 *
	 * @method eg.YawPitch#disable
	 */
	disable(persistOrientation) {
		if (!this._enabled) {
			return this;
		}

		// TODO: Check peristOrientation is needed!
		if (!persistOrientation) {
			this._resetOrientation();
		}
		this.axes.disconnect();
		this._enabled = false;
		return this;
	}

	_resetOrientation() {
		const opt = this.options;

		this.axes.setTo({
			yaw: opt.yaw,
			pitch: opt.pitch,
			fov: opt.fov,
		}, 0);

		return this;
	}


	/**
	 * Set one or more of yaw, pitch, fov
	 *
	 * @param {Object} coordinate yaw, pitch, fov
	 * @param {Number} duration Animation duration. if it is above 0 then it's animated.
	 */
	lookAt({yaw, pitch, fov}, duration) {
		const pos = this.axes.get();

		const y = yaw === undefined ? 0 : yaw - pos.yaw;
		const p = pitch === undefined ? 0 : pitch - pos.pitch;
		const f = fov === undefined ? 0 : fov - pos.fov;

		this.axes.setBy({
			yaw: y,
			pitch: p,
			fov: f
		}, duration);
	}

	get() {
		return this.axes.get();
	}

	getYaw() {
		return this.axes.get().yaw;
	}

	getPitch() {
		return this.axes.get().pitch;
	}

	getFov() {
		return this.axes.get().fov;
	}

	/**
	 * Destroys objects
	 */
	destroy() {
		this.axes && this.axes.destroy();
		this.axisPanInput && this.axisPanInput.destroy();
		this.axesWheelInput && this.axesWheelInput.destroy();
		this.axesTiltMotionInput && this.axesTiltMotionInput.destroy();
		this.axesPinchInput && this.axesPinchInput.destroy();
		this.axesMoveKeyInput && this.axesMoveKeyInput.destroy();
	}
};

YawPitchControl.VERSION = "#__VERSION__#";
export default YawPitchControl;
