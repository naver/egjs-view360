import Component from "@egjs/component";
import Axes, { PinchInput, MoveKeyInput, WheelInput } from "@egjs/axes";
import { vec2, quat, glMatrix } from "gl-matrix";
import { getComputedStyle, SUPPORT_TOUCH, SUPPORT_DEVICEMOTION } from "../utils/browserFeature";
import TiltMotionInput from "./input/TiltMotionInput";
import RotationPanInput from "./input/RotationPanInput";
import DeviceQuaternion from "./DeviceQuaternion";
import { util as mathUtil } from "../utils/math-util";
import {
	GYRO_MODE,
	TOUCH_DIRECTION_YAW,
	TOUCH_DIRECTION_PITCH,
	TOUCH_DIRECTION_ALL,
	MC_DECELERATION,
	MC_MAXIMUM_DURATION,
	MC_BIND_SCALE,
	MAX_FIELD_OF_VIEW,
	PAN_SCALE,
	YAW_RANGE_HALF,
	PITCH_RANGE_HALF,
	CIRCULAR_PITCH_RANGE_HALF,
	CONTROL_MODE_VR,
	CONTROL_MODE_YAWPITCH,
	TOUCH_DIRECTION_NONE,
} from "./consts";
import { VERSION } from "../version";
import { ValueOf } from "src/types";

const DEFAULT_YAW_RANGE = [-YAW_RANGE_HALF, YAW_RANGE_HALF];
const DEFAULT_PITCH_RANGE = [-PITCH_RANGE_HALF, PITCH_RANGE_HALF];
const CIRCULAR_PITCH_RANGE = [-CIRCULAR_PITCH_RANGE_HALF, CIRCULAR_PITCH_RANGE_HALF];

export type YawPitchControlOptions = {
  element: HTMLElement | null;
  yaw: number;
  pitch: number;
  fov: number;
  showPolePoint: boolean;
  useZoom: boolean;
  useKeyboard: boolean;
  gyroMode: ValueOf<typeof GYRO_MODE>;
  touchDirection: number;
  yawRange: number[];
  pitchRange: number[];
  fovRange: number[];
  aspectRatio: number;
};
type YawPitchControlEvents = {
  change: {
    yaw: number;
    pitch: number;
    fov: number;
    quaternion: typeof quat | null;
    targetElement: HTMLElement;
    isTrusted: boolean
  };
  hold: {
    isTrusted: boolean;
  };
  animationEnd: {
    isTrusted: boolean;
  };
};

/**
 * A module used to provide coordinate based on yaw/pitch orientation. This module receives user touch action, keyboard, mouse and device orientation(if it exists) as input, then combines them and converts it to yaw/pitch coordinates.
 *
 * @alias eg.YawPitchControl
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
class YawPitchControl extends Component<YawPitchControlEvents> {
	public static VERSION = VERSION;
	// Expose DeviceOrientationControls sub module for test purpose
	public static CONTROL_MODE_VR = CONTROL_MODE_VR;
	public static CONTROL_MODE_YAWPITCH = CONTROL_MODE_YAWPITCH;
	public static TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_ALL;
	public static TOUCH_DIRECTION_YAW = TOUCH_DIRECTION_YAW;
	public static TOUCH_DIRECTION_PITCH = TOUCH_DIRECTION_PITCH;
  public static TOUCH_DIRECTION_NONE = TOUCH_DIRECTION_NONE;

  private _element: HTMLElement | null;
  private _initialFov: number;
  private _enabled: boolean;
  private _isAnimating: boolean;
  private _deviceQuaternion: DeviceQuaternion;

  private axes: Axes;
  private axesPanInput: RotationPanInput;
  private axesWheelInput: WheelInput;
  private axesTiltMotionInput: TiltMotionInput | null;
  private axesPinchInput: PinchInput | null;
  private axesMoveKeyInput: MoveKeyInput;

	/**
	 * @param {object} options The option object of the eg.YawPitch module
	 * @param {HTMLElement|null}[options.element=null] element A base element for the eg.YawPitch module
	 * @param {number} [options.yaw=0] initial yaw (degree)
	 * @param {number} [options.pitch=0] initial pitch (degree)
	 * @param {number} [options.fov=65] initial field of view (degree)
	 * @param {boolean} [optiosn.showPolePoint=true] Indicates whether pole is shown
	 * @param {boolean} [options.useZoom=true] Indicates whether zoom is available
	 * @param {boolean} [options.useKeyboard=true] Indicates whether keyboard is enabled
	 * @param {string} [config.gyroMode=yawPitch] Enables control through device motion.
	 * @param {number} [options.touchDirection=TOUCH_DIRECTION_ALL] Direction of the touch movement (TOUCH_DIRECTION_ALL: all,  TOUCH_DIRECTION_YAW: horizontal, TOUCH_DIRECTION_PITCH: vertical, TOUCH_DIRECTION_NONE: no move)
	 * @param {number[]} [options.yawRange=[-180, 180] Range of visible yaw
	 * @param {number[]} [options.pitchRange=[-90, 90] Range of visible pitch
	 * @param {number[]} [options.fovRange=[30, 110] Range of FOV
	 * @param {number} [options.aspectRatio=1] Aspect Ratio
	 */
	constructor(options: Partial<YawPitchControlOptions>) {
		super();

		const opt = Object.assign({
			element: null,
			yaw: 0,
			pitch: 0,
			fov: 65,
			showPolePoint: false,
			useZoom: true,
			useKeyboard: true,
			gyroMode: GYRO_MODE.YAWPITCH,
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
		this._deviceQuaternion = null;

		this._initAxes(opt);
		this.option(opt);
  }

	/**
	 * Update Pan Scale
	 *
	 * Scale(Sensitivity) values of panning is related with fov and height.
	 * If at least one of them is changed, this function need to be called.
	 * @param {*} param
	 */
	public updatePanScale(param: Partial<{
    height: number;
  }> = {}) {
		const fov = this.axes.get().fov;
		const areaHeight = param.height || parseInt(getComputedStyle(this._element).height, 10);
		const scale = MC_BIND_SCALE[0] * fov / this._initialFov * PAN_SCALE / areaHeight;

		this.axesPanInput.options.scale = [scale, scale];
		this.axes.options.deceleration = MC_DECELERATION * fov / MAX_FIELD_OF_VIEW;

		return this;
	}

  public option(): YawPitchControlOptions;
  public option<K extends keyof YawPitchControlOptions>(key: K): YawPitchControlOptions[K];
  public option<K extends keyof YawPitchControlOptions>(key: K, newValue: YawPitchControlOptions[K]): YawPitchControl;
  public option(newOptions: Partial<YawPitchControlOptions>): YawPitchControl;
	/*
	 * Override component's option method
	 * to call method for updating values which is affected by option change.
	 *
	 * @param {*} args
	 */
	public option<K extends keyof YawPitchControlOptions>(key?: K | Partial<YawPitchControlOptions>, newValue?: YawPitchControlOptions[K]) {
		// Getter
		if (!key) {
			return this._getOptions();
		} else if (key && typeof key === "string" && typeof newValue === "undefined") {
			return this._getOptions(key);
		}

		// Setter
		let newOptions: Partial<YawPitchControlOptions> = {};
		let changedKeyList: string[] = []; // TODO: if value is not changed, then do not push on changedKeyList.

		if (typeof key === "string") {
      changedKeyList.push(key);
			newOptions[key] = newValue;
		} else {
      const options = key; // Retrieving object here
			changedKeyList = Object.keys(options);
			newOptions = Object.assign({}, options);
		}

		this._setOptions(this._getValidatedOptions(newOptions));
		this._applyOptions(changedKeyList);
		return this;
  }

  /**
   * Enable YawPitch functionality
   *
   * @method eg.YawPitch#enable
   */
	public enable() {
		if (this._enabled) {
			return this;
		}

		this._enabled = true;

		// touchDirection is decided by parameter is valid string (Ref. Axes.connect)
		this._applyOptions(Object.keys(this.options));

		// TODO: Is this code is needed? Check later.
		this.updatePanScale();

		return this;
	}

	/**
	 * Disable YawPitch functionality
	 *
	 * @method eg.YawPitch#disable
	 */
	public disable(persistOrientation: boolean = false) {
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

	/**
	 * Set one or more of yaw, pitch, fov
	 *
	 * @param {Object} coordinate yaw, pitch, fov
	 * @param {Number} duration Animation duration. if it is above 0 then it's animated.
	 */
	public lookAt({yaw, pitch, fov}, duration) {
		const pos = this.axes.get();

		const y = yaw === undefined ? 0 : yaw - pos.yaw;
		const p = pitch === undefined ? 0 : pitch - pos.pitch;
		const f = fov === undefined ? 0 : fov - pos.fov;

		// Allow duration of animation to have more than MC_MAXIMUM_DURATION.
		this.axes.options.maximumDuration = Infinity;

		this.axes.setBy({
			yaw: y,
			pitch: p,
			fov: f
		}, duration);
	}

	public getYawPitch() {
		const yawPitch = this.axes.get();

		return {
			yaw: yawPitch.yaw,
			pitch: yawPitch.pitch,
		};
	}

	public getFov() {
		return this.axes.get().fov;
	}

	public getQuaternion() {
		const pos = this.axes.get();

		return this._deviceQuaternion.getCombinedQuaternion(pos.yaw);
	}

	public shouldRenderWithQuaternion() {
		return this.options.gyroMode === GYRO_MODE.VR;
	}

	/**
	 * Destroys objects
	 */
	public destroy() {
    /* tslint:disable no-unused-expression */
		this.axes && this.axes.destroy();
		this.axesPanInput && this.axesPanInput.destroy();
		this.axesWheelInput && this.axesWheelInput.destroy();
		this.axesTiltMotionInput && this.axesTiltMotionInput.destroy();
		this.axesPinchInput && this.axesPinchInput.destroy();
		this.axesMoveKeyInput && this.axesMoveKeyInput.destroy();
		this._deviceQuaternion && this._deviceQuaternion.destroy();
	}

  private _initAxes(opt: YawPitchControlOptions) {
		const yRange = this._updateYawRange(opt.yawRange, opt.fov, opt.aspectRatio);
		const pRange = this._updatePitchRange(opt.pitchRange, opt.fov, opt.showPolePoint);
		const useRotation = opt.gyroMode === GYRO_MODE.VR;

		this.axesPanInput = new RotationPanInput(this._element, {useRotation});
		this.axesWheelInput = new WheelInput(this._element, {scale: -4});
		this.axesTiltMotionInput = null;
		this.axesPinchInput = SUPPORT_TOUCH ? new PinchInput(this._element, {scale: -1}) : null;
		this.axesMoveKeyInput = new MoveKeyInput(this._element, {scale: [-6, 6]});

		this.axes = new Axes({
			yaw: {
				range: yRange,
				circular: this._isCircular(yRange),
				bounce: [0, 0]
			},
			pitch: {
				range: pRange,
				circular: this._isCircular(pRange),
				bounce: [0, 0]
			},
			fov: {
				range: opt.fovRange,
				circular: [false, false],
				bounce: [0, 0]
			},
		}, {
			deceleration: MC_DECELERATION,
			maximumDuration: MC_MAXIMUM_DURATION
		}, {
			yaw: opt.yaw,
			pitch: opt.pitch,
			fov: opt.fov
		}).on({
      // TODO: change event type after Axes event type inference update
			hold: (evt: any) => {
				// Restore maximumDuration not to be spin too mush.
				this.axes.options.maximumDuration = MC_MAXIMUM_DURATION;

				this.trigger("hold", { isTrusted: evt.isTrusted });
			},
			change: (evt: any) => {
				if (evt.delta.fov !== 0) {
					this._updateControlScale(evt);
					this.updatePanScale();
				}
				this._triggerChange(evt);
			},
			release: evt => {
				this._triggerChange(evt);
			},
			animationEnd: (evt: any) => {
				this.trigger("animationEnd", { isTrusted: evt.isTrusted });
			},
		});
	}

	private _getValidatedOptions(newOptions: Partial<YawPitchControlOptions>) {
		if (newOptions.yawRange) {
			newOptions.yawRange =
				this._getValidYawRange(newOptions.yawRange, newOptions.fov, newOptions.aspectRatio);
		}
		if (newOptions.pitchRange) {
			newOptions.pitchRange = this._getValidPitchRange(newOptions.pitchRange, newOptions.fov);
		}
		return newOptions;
	}

  private _getOptions(): YawPitchControlOptions;
  private _getOptions<K extends keyof YawPitchControlOptions>(key: K): YawPitchControlOptions[K];
	private _getOptions<K extends keyof YawPitchControlOptions>(key?: K) {
		let value;

		if (typeof key === "string") {
			value = this.options[key];
		} else if (arguments.length === 0) {
			value = this.options;
		}
		return value;
	}

	private _setOptions(options: Partial<YawPitchControlOptions>): void {
		for (const key in options) {
			this.options[key] = options[key];
		}
	}

	private _applyOptions(keys: string[]) {
		const options = this.options;
		const axes = this.axes;
		const isVR = options.gyroMode === GYRO_MODE.VR;
		const isYawPitch = options.gyroMode === GYRO_MODE.YAWPITCH;
		// If it's VR mode, restrict user interaction to yaw direction only
		const touchDirection = isVR ?
			(TOUCH_DIRECTION_YAW & options.touchDirection) :
			options.touchDirection;

		// If one of below is changed, call updateControlScale()
		if (keys.some(key =>
			key === "showPolePoint" || key === "fov" || key === "aspectRatio" ||
			key === "yawRange" || key === "pitchRange"
		)) {
			// If fov is changed, update pan scale
			if (keys.indexOf("fov") >= 0) {
				axes.setTo({"fov": options.fov});
				this.updatePanScale();
			}

			this._updateControlScale();
		}

		if (keys.some(key => key === "fovRange")) {
			const fovRange = options.fovRange;
			const prevFov = axes.get().fov;
			let nextFov = axes.get().fov;

			vec2.copy(axes.axis.fov.range as any, fovRange);

			if (nextFov < fovRange[0]) {
				nextFov = fovRange[0];
			} else if (prevFov > fovRange[1]) {
				nextFov = fovRange[1];
			}

			if (prevFov !== nextFov) {
				axes.setTo({
					fov: nextFov
				}, 0);
				this._updateControlScale();
				this.updatePanScale();
			}
		}

		if (keys.some(key => key === "gyroMode") && SUPPORT_DEVICEMOTION) {
			// Disconnect first
			if (this.axesTiltMotionInput) {
				this.axes.disconnect(this.axesTiltMotionInput);
				this.axesTiltMotionInput.destroy();
				this.axesTiltMotionInput = null;
			}

			if (this._deviceQuaternion) {
				this._deviceQuaternion.destroy();
				this._deviceQuaternion = null;
			}

			if (isVR) {
				this._initDeviceQuaternion();
			} else if (isYawPitch) {
				this.axesTiltMotionInput = new TiltMotionInput(this._element);
				this.axes.connect(["yaw", "pitch"], this.axesTiltMotionInput);
			}

			this.axesPanInput.setUseRotation(isVR);
		}

		if (keys.some(key => key === "useKeyboard")) {
			const useKeyboard = options.useKeyboard;

			if (useKeyboard) {
				axes.connect(["yaw", "pitch"], this.axesMoveKeyInput);
			} else {
				axes.disconnect(this.axesMoveKeyInput);
			}
		}

		if (keys.some(key => key === "useZoom")) {
			const useZoom = options.useZoom;

			// Disconnect first
			axes.disconnect(this.axesWheelInput);
			if (useZoom) {
				axes.connect(["fov"], this.axesWheelInput);
			}
		}

		this._togglePinchInputByOption(options.touchDirection, options.useZoom);

		if (keys.some(key => key === "touchDirection") && this._enabled) {
			this._enableTouch(touchDirection);
		}
	}

	private _togglePinchInputByOption(touchDirection: YawPitchControlOptions["touchDirection"], useZoom: boolean) {
		if (this.axesPinchInput) {
			// disconnect first
			this.axes.disconnect(this.axesPinchInput);

			// If the touchDirection option is not ALL, pinchInput should be disconnected to make use of a native scroll.
			if (
				useZoom &&
				touchDirection === TOUCH_DIRECTION_ALL &&
				// TODO: Get rid of using private property of axes instance.
				(this.axes as any)._inputs.indexOf(this.axesPinchInput) === -1
			) {
				this.axes.connect(["fov"], this.axesPinchInput);
			}
		}
	}

	private _enableTouch(direction: YawPitchControlOptions["touchDirection"]) {
    // Disconnect first
    if (this.axesPanInput) {
      this.axes.disconnect(this.axesPanInput);
    }

		const yawEnabled = direction & TOUCH_DIRECTION_YAW ? "yaw" : null;
		const pitchEnabled = direction & TOUCH_DIRECTION_PITCH ? "pitch" : null;

		this.axes.connect([yawEnabled, pitchEnabled] as string[], this.axesPanInput);
	}

	private _initDeviceQuaternion() {
		this._deviceQuaternion = new DeviceQuaternion();
		this._deviceQuaternion.on("change", e => {
			this._triggerChange(e);
		});
	}

	private _getValidYawRange(newYawRange: number[], newFov?: number, newAspectRatio?: number) {
		const ratio = this._adjustAspectRatio(newAspectRatio || this.options.aspectRatio || 1);
		const fov = newFov || this.axes.get().fov;
		const horizontalFov = fov * ratio;
		const isValid = newYawRange[1] - newYawRange[0] >= horizontalFov;

		if (isValid) {
			return newYawRange;
		} else {
			return this.options.yawRange || DEFAULT_YAW_RANGE;
		}
	}

	private _getValidPitchRange(newPitchRange: number[], newFov?: number) {
		const fov = newFov || this.axes.get().fov;
		const isValid = newPitchRange[1] - newPitchRange[0] >= fov;

		if (isValid) {
			return newPitchRange;
		} else {
			return this.options.pitchRange || DEFAULT_PITCH_RANGE;
		}
  }

  private _isCircular(range: number[]) {
		return range[1] - range[0] < 360 ? [false, false] : [true, true];
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
	private _updateControlScale(changeEvt?: any) { // TODO: Change type after Axes type inference update
		const opt = this.options;
		const fov = this.axes.get().fov;

		const pRange = this._updatePitchRange(opt.pitchRange, fov, opt.showPolePoint);
		const yRange = this._updateYawRange(opt.yawRange, fov, opt.aspectRatio);

		// TODO: If not changed!?
		const pos = this.axes.get();
		let y = pos.yaw;
		let p = pos.pitch;

		vec2.copy(this.axes.axis.yaw.range as any, yRange as any);
		vec2.copy(this.axes.axis.pitch.range as any, pRange as any);
		this.axes.axis.yaw.circular = this._isCircular(yRange);
		this.axes.axis.pitch.circular = this._isCircular(pRange);

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

	private _updatePitchRange(pitchRange: number[], fov: number, showPolePoint: boolean) {
		if (this.options.gyroMode === GYRO_MODE.VR) {
			// Circular pitch on VR
			return CIRCULAR_PITCH_RANGE;
		}

		const verticalAngle = pitchRange[1] - pitchRange[0];
		const halfFov = fov / 2;
		const isPanorama = verticalAngle < 180;

		if (showPolePoint && !isPanorama) {
			// Use full pinch range
			return pitchRange.concat();
		}

		// Round value as movableCood do.
		return [pitchRange[0] + halfFov, pitchRange[1] - halfFov];
	}

	private _updateYawRange(yawRange: number[], fov: number, aspectRatio: number) {
		if (this.options.gyroMode === GYRO_MODE.VR) {
			return DEFAULT_YAW_RANGE;
		}

		const horizontalAngle = yawRange[1] - yawRange[0];

		/**
		 * Full 360 Mode
		 */
		if (horizontalAngle >= 360) {
			// Don't limit yaw range on Full 360 mode.
			return yawRange.concat();
		}

		/**
		 * Panorama mode
		 */
		// Ref : https://github.com/naver/egjs-view360/issues/290
		const halfHorizontalFov =
			mathUtil.toDegree(Math.atan2(aspectRatio, 1 / Math.tan(glMatrix.toRadian(fov / 2))));

		// Round value as movableCood do.
		return [
			yawRange[0] + halfHorizontalFov,
			yawRange[1] - halfHorizontalFov
		];
	}

  // TODO: update param type after Axes event type inference update
	private _triggerChange(evt: any) {
		const pos = this.axes.get();
		const opt = this.options;
		const event: YawPitchControlEvents["change"] = {
      targetElement: opt.element,
			isTrusted: evt.isTrusted,
      yaw: pos.yaw,
      pitch: pos.pitch,
      fov: pos.fov,
      quaternion: null,
		};

		if (opt.gyroMode === GYRO_MODE.VR && this._deviceQuaternion) {
			event.quaternion = this._deviceQuaternion.getCombinedQuaternion(pos.yaw);
		}
		this.trigger("change", event);
	}

	// TODO: makes constant to be logic
  private _adjustAspectRatio(input: number) {
		const inputRange = [
			0.520, 0.540, 0.563, 0.570, 0.584, 0.590, 0.609, 0.670,
			0.702, 0.720, 0.760, 0.780, 0.820, 0.920, 0.970, 1.00, 1.07, 1.14, 1.19,
			1.25, 1.32, 1.38, 1.40, 1.43, 1.53, 1.62, 1.76, 1.77, 1.86, 1.96, 2.26,
			2.30, 2.60, 3.00, 5.00, 6.00
		];
		const outputRange = [
			0.510, 0.540, 0.606, 0.560, 0.628, 0.630, 0.647, 0.710,
			0.736, 0.757, 0.780, 0.770, 0.800, 0.890, 0.975, 1.00, 1.07, 1.10, 1.15,
			1.18, 1.22, 1.27, 1.30, 1.33, 1.39, 1.45, 1.54, 1.55, 1.58, 1.62, 1.72,
			1.82, 1.92, 2.00, 2.24, 2.30
		];

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
        // FIXME: this looks definitely wrong
				return outputRange[(outputRange[0] as any).length - 1];
			}
		}

		const inputA = inputRange[rangeIdx];
		const inputB = inputRange[rangeIdx + 1];
		const outputA = outputRange[rangeIdx];
		const outputB = outputRange[rangeIdx + 1];

		return this._lerp(outputA, outputB, (input - inputA) / (inputB - inputA));
	}

	private _lerp(a, b, fraction) {
		return a + fraction * (b - a);
	}

	private _resetOrientation() {
		const opt = this.options;

		this.axes.setTo({
			yaw: opt.yaw,
			pitch: opt.pitch,
			fov: opt.fov,
		}, 0);

		return this;
	}
}

export default YawPitchControl;
