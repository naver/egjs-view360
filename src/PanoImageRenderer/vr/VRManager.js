import {mat4} from "gl-matrix";
import {EYES} from "../consts";

const DEFAULT_LEFT_BOUNDS = [0, 0, 0.5, 1];
const DEFAULT_RIGHT_BOUNDS = [0.5, 0, 0.5, 1];

/**
 * Vertex displacement based VR effect that can be applied to whole renderers
 */
export default class VRManager {
	static DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";

	constructor() {
		this._vrSession = null;
		this._vrDisplay = null;

		this._frameData = null;
		if ("VRFrameData" in window) {
			this._frameData = new window.VRFrameData();
		}

		this._leftBounds = DEFAULT_LEFT_BOUNDS;
		this._rightBounds = DEFAULT_RIGHT_BOUNDS;
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
}
