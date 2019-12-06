import Distortion from "../Distortion";
import {util, glMatrix, mat4} from "../../utils/math-util";
import {EYES} from "../consts";
import WebGLUtils from "../WebGLUtils";

const DEFAULT_LEFT_BOUNDS = [0, 0, 0.5, 1];
const DEFAULT_RIGHT_BOUNDS = [0.5, 0, 0.5, 1];
const NO_DISTORTION = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// Default distortion values from Google Cardboard V1
const DEFAULT_DISTORTION = [
	-0.4410035, 0.42756155, -0.4804439, 0.5460139,
	-0.58821183, 0.5733938, -0.48303202, 0.33299083,
	-0.17573841, 0.0651772, -0.01488963, 0.001559834
];
const RAD_45 = Math.PI * 0.25;

/**
 * Vertex displacement based VR effect that can be applied to whole renderers
 */
export default class VRManager {
	static DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";

	constructor(renderer) {
		this._renderer = renderer;
		this._vrDisplay = null;
		this._predistorted = false;
		this._frameData = null;
		if ("VRFrameData" in window) {
			this._frameData = new window.VRFrameData();
		}

		this._leftBounds = DEFAULT_LEFT_BOUNDS;
		this._rightBounds = DEFAULT_RIGHT_BOUNDS;

		this._originalRender = renderer.render.bind(renderer);
	}

	enable(vrDisplay, vrProps) {
		this._vrDisplay = vrDisplay;

		const layers = vrDisplay.getLayers();

		if (layers.length) {
			const layer = layers[0];

			this._leftBounds = layer.leftBounds;
			this._rightBounds = layer.rightBounds;
		}

		this._renderer.render = this._renderStereo.bind(this);
		this._predistorted = vrProps.predistorted;

		if (vrProps.predistorted) {
			this._injectDistortion(vrProps.panoImageRenderer);
		}

		window.addEventListener(VRManager.DISPLAY_PRESENT_CHANGE, this.destroy, false);
	}

	destroy = () => {
		this._vrDisplay = null;
		this._renderer.render = this._originalRender;
		this._leftBounds = DEFAULT_LEFT_BOUNDS;
		this._rightBounds = DEFAULT_RIGHT_BOUNDS;
		this._predistorted = false;
		window.removeEventListener(VRManager.DISPLAY_PRESENT_CHANGE, this.destroy, false);
	}

	isPresenting() {
		return this._vrDisplay && this._vrDisplay.isPresenting;
	}

	_renderStereo(context) {
		if (this.isPresenting()) {
			// Setup common
			const {gl, shaderProgram, mvMatrix} = context;
			const vrDisplay = this._vrDisplay;
			const width = gl.drawingBufferWidth;
			const height = gl.drawingBufferHeight;

			let leftPMatrix;
			let rightPMatrix;
			const leftMVMatrix = mat4.copy(mat4.create(), mvMatrix);
			const rightMVMatrix = mat4.copy(mat4.create(), mvMatrix);

			if (vrDisplay.getFrameData) {
				const frameData = this._frameData;

				vrDisplay.getFrameData(frameData);
				leftPMatrix = frameData.leftProjectionMatrix;
				rightPMatrix = frameData.rightProjectionMatrix;
				// Adopt x, y offset from the matrix
				leftMVMatrix[12] += frameData.leftViewMatrix[12];
				leftMVMatrix[13] += frameData.leftViewMatrix[13];
				rightMVMatrix[12] += frameData.rightViewMatrix[12];
				rightMVMatrix[13] += frameData.rightViewMatrix[13];
			} else {
				const eyeParamsL = vrDisplay.getEyeParameters(EYES.LEFT);
				const eyeParamsR = vrDisplay.getEyeParameters(EYES.RIGHT);
				const fovL = eyeParamsL.fieldOfView;
				const fovR = eyeParamsR.fieldOfView;
				const offsetL = eyeParamsL.offset;
				const offsetR = eyeParamsR.offset;

				leftPMatrix = this._perspectiveFromFov(fovL, vrDisplay.depthNear, vrDisplay.depthFar);
				rightPMatrix = this._perspectiveFromFov(fovR, vrDisplay.depthNear, vrDisplay.depthFar);
				leftMVMatrix[12] += offsetL[0];
				leftMVMatrix[13] += offsetL[1];
				rightMVMatrix[12] += offsetR[0];
				rightMVMatrix[13] += offsetR[1];
			}

			// Eye index, can be used for stereoscopic renderer
			const uEye = gl.getUniformLocation(shaderProgram, "uEye");

			if (this._predistorted) {
				const uDistortionCoefficients = gl.getUniformLocation(shaderProgram, "uDistortionCoefficients");
				const uDistortionMaxFovSquared = gl.getUniformLocation(shaderProgram, "uDistortionMaxFovSquared");
				const uDistortionFovOffset = gl.getUniformLocation(shaderProgram, "uDistortionFovOffset");
				const uDistortionFovScale = gl.getUniformLocation(shaderProgram, "uDistortionFovScale");

				gl.uniform1fv(uDistortionCoefficients, this._getDistortionCoefficients());
				gl.uniform1f(uDistortionMaxFovSquared, this._getDistortionMaxFovSquared());
				gl.uniform2fv(uDistortionFovOffset, this._getDistortionFovOffset(EYES.LEFT));
				gl.uniform2fv(uDistortionFovScale, this._getDistortionFovScale());
			}

			// Setup left eye
			const leftBounds = this._leftBounds;
			const leftRect = [
				Math.round(leftBounds[0] * width),
				Math.round(leftBounds[1] * height),
				Math.round(leftBounds[2] * width),
				Math.round(leftBounds[3] * height)
			];

			gl.viewport(...leftRect);
			gl.uniform1f(uEye, 0);

			// Draw left eye
			this._originalRender(
				Object.assign({...context}, {
					pMatrix: leftPMatrix,
					mvMatrix: leftMVMatrix
				})
			);

			// Setup right eye
			const rightBounds = this._rightBounds;
			const rightRect = [
				Math.round(rightBounds[0] * width),
				Math.round(rightBounds[1] * height),
				Math.round(rightBounds[2] * width),
				Math.round(rightBounds[3] * height)
			];

			gl.viewport(...rightRect);
			gl.uniform1f(uEye, 1);

			// Draw right eye
			this._originalRender(
				Object.assign({...context}, {
					pMatrix: rightPMatrix,
					mvMatrix: rightMVMatrix
				})
			);

			vrDisplay.submitFrame();
		} else {
			this._originalRender(context);
		}
	}

	// Adopted from googlearchive/vrview (Apache-2.0)
	// https://github.com/googlearchive/vrview/blob/fc8a05bf0d855869e2cdd2c96ee37313a6f1a73f/src/embed/vertex-distorter.js#L112
	_includeDistortVariable() {
		return `uniform float uDistortionCoefficients[12];
uniform float uDistortionMaxFovSquared;
uniform vec2 uDistortionFovOffset;
uniform vec2 uDistortionFovScale;`;
	}

	// Adopted from googlearchive/vrview (Apache-2.0)
	// https://github.com/googlearchive/vrview/blob/fc8a05bf0d855869e2cdd2c96ee37313a6f1a73f/src/embed/vertex-distorter.js#L112
	_includeDistortFunction() {
		// Returns a scalar to distort a point; computed in reverse via the polynomial approximation:
		//   r' = 1 + Σ_i (uDistortionCoefficients[i] rSquared^(i+1))  i=[0..11]
		// where rSquared is the squared radius of an undistorted point in tan-angle space.
		// See {@link Distortion} for more information.
		return `float DistortionFactor(float rSquared) {
	float ret = 0.0;
	rSquared = min(uDistortionMaxFovSquared, rSquared);
	ret = rSquared * (ret + uDistortionCoefficients[11]);
	ret = rSquared * (ret + uDistortionCoefficients[10]);
	ret = rSquared * (ret + uDistortionCoefficients[9]);
	ret = rSquared * (ret + uDistortionCoefficients[8]);
	ret = rSquared * (ret + uDistortionCoefficients[7]);
	ret = rSquared * (ret + uDistortionCoefficients[6]);
	ret = rSquared * (ret + uDistortionCoefficients[5]);
	ret = rSquared * (ret + uDistortionCoefficients[4]);
	ret = rSquared * (ret + uDistortionCoefficients[3]);
	ret = rSquared * (ret + uDistortionCoefficients[2]);
	ret = rSquared * (ret + uDistortionCoefficients[1]);
	ret = rSquared * (ret + uDistortionCoefficients[0]);
	return ret + 1.0;
}
vec4 Distort(vec4 point) {
	vec3 pointNdc = point.xyz / point.w;

	vec2 pointUnitSquare = (pointNdc.xy + vec2(1.0)) / 2.0;
	vec2 pointTanAngle = pointUnitSquare * uDistortionFovScale - uDistortionFovOffset;
	float radiusSquared = dot(pointTanAngle, pointTanAngle);
	float distortionFactor = DistortionFactor(radiusSquared);
	vec2 distortedPointTanAngle = pointTanAngle * distortionFactor;
	vec2 distortedPointUnitSquare = (distortedPointTanAngle + uDistortionFovOffset) / uDistortionFovScale;
	vec3 distortedPointNdc = vec3(distortedPointUnitSquare * 2.0 - vec2(1.0), pointNdc.z);
	return vec4(distortedPointNdc, 1.0) * point.w;
}`;
	}

	_includeDistortMain() {
		return "pos = Distort(pos);";
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
		const vrDisplay = this._vrDisplay;

		if (vrDisplay.isPolyfilled) {
			// Polyfilled display by webvr-polyfill
			const viewer = vrDisplay.deviceInfo_.viewer;

			if (viewer.inverseCoefficients) {
				return viewer.inverseCoefficients;
			} else if (viewer.distortionCoefficients) {
				return Distortion.approximateInverse(viewer.distortionCoefficients);
			} else {
				return NO_DISTORTION;
			}
		}

		return DEFAULT_DISTORTION;
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
				leftDegrees: 45,
				rightDegrees: 45,
				downDegrees: 45,
				upDegrees: 45
			};
		}

		const eyeParams = display.getEyeParameters(eye);

		return eyeParams.fieldOfView;
	}

	// Inject vertex displacement based
	_injectDistortion(panoImageRenderer) {
		const vertexAttachment = WebGLUtils.createShaderAttachment({
			variable: this._includeDistortVariable(),
			function: this._includeDistortFunction(),
			main: this._includeDistortMain()
		});

		panoImageRenderer.swapShaderProgram(vertexAttachment);
	}

	// Adopted from immersive-web/cardboard-vr-display(Apache-2.0)
	// https://github.com/immersive-web/cardboard-vr-display/blob/master/src/util.js#L278
	_perspectiveFromFov(fov, near, far) {
		const upTan = Math.tan(fov ? glMatrix.toRadian(fov.upDegrees) : RAD_45);
		const downTan = Math.tan(fov ? glMatrix.toRadian(fov.downDegrees) : RAD_45);
		const leftTan = Math.tan(fov ? glMatrix.toRadian(fov.leftDegrees) : RAD_45);
		const rightTan = Math.tan(fov ? glMatrix.toRadian(fov.rightDegrees) : RAD_45);
		const xScale = 2.0 / (leftTan + rightTan);
		const yScale = 2.0 / (upTan + downTan);

		const out = mat4.create();

		out[0] = xScale;
		out[1] = 0.0;
		out[2] = 0.0;
		out[3] = 0.0;
		out[4] = 0.0;
		out[5] = yScale;
		out[6] = 0.0;
		out[7] = 0.0;
		out[8] = -((leftTan - rightTan) * xScale * 0.5);
		out[9] = (upTan - downTan) * yScale * 0.5;
		out[10] = far / (near - far);
		out[11] = -1.0;
		out[12] = 0.0;
		out[13] = 0.0;
		out[14] = far * near / (near - far);
		out[15] = 0.0;
		return out;
	}
}
