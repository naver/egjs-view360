import Distortion from "../Distortion";
import {util, glMatrix} from "../../utils/math-util";
import {EYES} from "../consts";

const DEFAULT_LEFT_BOUNDS = [0, 0, 0.5, 1];
const DEFAULT_RIGHT_BOUNDS = [0.5, 0, 0.5, 1];
const NO_DISTORTION = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const EVENT_DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";

/**
 * Vertex displacement based VR effect that can be applied to whole renderers
 */
export default class VRManager {
	constructor(renderer) {
		this._renderer = renderer;
		this._vrDisplay = null;
		this._predistorted = false;

		this._leftBounds = DEFAULT_LEFT_BOUNDS;
		this._rightBounds = DEFAULT_RIGHT_BOUNDS;

		this._originalRender = renderer.render.bind(renderer);
	}

	enable(vrDisplay, options) {
		this._vrDisplay = vrDisplay;

		const layers = vrDisplay.getLayers();

		if (layers.length) {
			const layer = layers[0];

			this._leftBounds = layer.leftBounds;
			this._rightBounds = layer.rightBounds;
		}

		this._renderer.render = this._renderStereo.bind(this);
		this._predistorted = options._predistorted;

		window.addEventListener(EVENT_DISPLAY_PRESENT_CHANGE, this.destroy, false);
	}

	destroy = () => {
		this._vrDisplay = null;
		this._renderer.render = this._originalRender;
		this._leftBounds = DEFAULT_LEFT_BOUNDS;
		this._rightBounds = DEFAULT_RIGHT_BOUNDS;
		window.removeEventListener(EVENT_DISPLAY_PRESENT_CHANGE, this.destroy, false);
	}

	isPresenting() {
		return this._vrDisplay && this._vrDisplay.isPresenting();
	}

	_renderStereo(context) {
		if (this.isPresenting()) {
			// Setup common

			// Setup left eye

			// Draw left eye
			this._originalRender(Object.assign(
				{...context}
			));

			// Setup right eye

			// Draw right eye
			this._originalRender(context);
		} else {
			this._originalRender(context);
		}
	}

	// Adopted from googlearchive/vrview (Apache-2.0)
	// https://github.com/googlearchive/vrview/blob/fc8a05bf0d855869e2cdd2c96ee37313a6f1a73f/src/embed/vertex-distorter.js#L112
	_includeDistort() {
		/* eslint-disable */
		return [
			'uniform float uDistortionCoefficients[12];',
			'uniform float uDistortionMaxFovSquared;',
			'uniform vec2 uDistortionFovOffset;',
			'uniform vec2 uDistortionFovScale;',

			// Returns a scalar to distort a point; computed in reverse via the polynomial approximation:
			//   r' = 1 + Σ_i (uDistortionCoefficients[i] rSquared^(i+1))  i=[0..11]
			// where rSquared is the squared radius of an undistorted point in tan-angle space.
			// See {@link Distortion} for more information.
			'float DistortionFactor(float rSquared) {',
				'float ret = 0.0;',
				'rSquared = min(uDistortionMaxFovSquared, rSquared);',
				'ret = rSquared * (ret + uDistortionCoefficients[11]);',
				'ret = rSquared * (ret + uDistortionCoefficients[10]);',
				'ret = rSquared * (ret + uDistortionCoefficients[9]);',
				'ret = rSquared * (ret + uDistortionCoefficients[8]);',
				'ret = rSquared * (ret + uDistortionCoefficients[7]);',
				'ret = rSquared * (ret + uDistortionCoefficients[6]);',
				'ret = rSquared * (ret + uDistortionCoefficients[5]);',
				'ret = rSquared * (ret + uDistortionCoefficients[4]);',
				'ret = rSquared * (ret + uDistortionCoefficients[3]);',
				'ret = rSquared * (ret + uDistortionCoefficients[2]);',
				'ret = rSquared * (ret + uDistortionCoefficients[1]);',
				'ret = rSquared * (ret + uDistortionCoefficients[0]);',
				'return ret + 1.0;',
			'}',

			// Given a point in clip space, distort the point according to the coefficients stored in
			// uDistortionCoefficients and the field of view (FOV) specified in uDistortionFovOffset and
			// uDistortionFovScale.
			// Returns the distorted point in clip space, with its Z untouched.
			'vec4 Distort(vec4 point) {',
				// Put point into normalized device coordinates (NDC), [(-1, -1, -1) to (1, 1, 1)].
				'vec3 pointNdc = point.xyz / point.w;',
				// Throw away the Z coordinate and map the point to the unit square, [(0, 0) to (1, 1)].
				'vec2 pointUnitSquare = (pointNdc.xy + vec2(1.0)) / 2.0;',
				// Map the point into FOV tan-angle space.
				'vec2 pointTanAngle = pointUnitSquare * uDistortionFovScale - uDistortionFovOffset;',
				'float radiusSquared = dot(pointTanAngle, pointTanAngle);',
				'float distortionFactor = DistortionFactor(radiusSquared);',
				//'float distortionFactor = 2.0;',
				'vec2 distortedPointTanAngle = pointTanAngle * distortionFactor;',
				// Reverse the mappings above to bring the distorted point back into NDC space.
				'vec2 distortedPointUnitSquare = (distortedPointTanAngle + uDistortionFovOffset)',
					'/ uDistortionFovScale;',
				'vec3 distortedPointNdc = vec3(distortedPointUnitSquare * 2.0 - vec2(1.0), pointNdc.z);',
				// Convert the point into clip space before returning in case any operations are done after.
				'return vec4(distortedPointNdc, 1.0) * point.w;',
			'}',
		].join('\n');
		/* eslint-enable */
	}

	_getDistortionMaxFovSquared() {
		const fov = this._getFov(EYES.LEFT);
		const maxFov = util.hypot(
			Math.tan(glMatrix.toRadian(Math.max(fov.leftDegrees, fov.rightDegrees))),
			Math.tan(glMatrix.toRadian(Math.max(fov.downDegrees, fov.upDegrees)))
		);

		return maxFov * maxFov;
	}

	_getDistortionCoefficients() {
		const display = this._vrDisplay;

		if (this._hasPolyfilledDisplay()) {
			// Polyfilled display by webvr-polyfill
			const viewer = display.deviceInfo_.viewer;

			if (viewer.inverseCoefficients) {
				return viewer.inverseCoefficients;
			} else if (viewer.distortionCoefficients) {
				return Distortion.approximateInverse(viewer.distortionCoefficients);
			} else {
				return NO_DISTORTION;
			}
		}

		return NO_DISTORTION;
	}

	_getDistortionFovOffset(eye) {
		const fov = this._getFov(eye);
		const left = Math.tan(glMatrix.toRadian(fov.leftDegrees));
		const down = Math.tan(glMatrix.toRadian(fov.downDegrees));

		return [left, down];
	}

	_getDistortionFovScale() {
		const fov = this._getFov(EYES.LEFT);

		const left = Math.tan(glMatrix.toRadian(fov.leftDegrees));
		const right = Math.tan(glMatrix.toRadian(fov.rightDegrees));
		const up = Math.tan(glMatrix.toRadian(fov.upDegrees));
		const down = Math.tan(glMatrix.toRadian(fov.downDegrees));

		return [left + right, up + down];
	}

	_getFov(eye) {
		const display = this._vrDisplay;

		if (!display) {
			return {
				leftDegrees: -1,
				rightDegrees: -1,
				downDegrees: -1,
				upDegrees: -1
			};
		}

		const eyeParams = display.getEyeParameters(eye);

		return eyeParams.fieldOfView;
	}
}
