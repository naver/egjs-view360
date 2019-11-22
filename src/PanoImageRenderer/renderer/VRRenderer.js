import SphereRenderer from "./SphereRenderer";
import Distortion from "../Distortion";
import {STEREO_FORMAT} from "../../PanoViewer/consts";
import {EYES} from "../consts";
import {util, glMatrix, mat4} from "../../utils/math-util";

const NO_DISTORTION = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// Default distortion values from Google Cardboard V2
const DEFAULT_DISTORTION = [
	-0.33836704, -0.18162185, 0.862655, -1.2462051,
	1.0560602, -0.58208317, 0.21609078, -0.05444823,
	0.009177956, -9.904169E-4, 6.183535E-5, -1.6981803E-6
];

// Vertex-based distortion method adopted from googlearchive/vrview (Apache-2.0)
// https://github.com/googlearchive/vrview/blob/fc8a05bf0d855869e2cdd2c96ee37313a6f1a73f/src/embed/vertex-distorter.js#L112
export default class VRRenderer extends SphereRenderer {
	constructor({config}) {
		super();
		this._config = config;
		this._display = null;
		this._offsets = {
			left: 0,
			right: 0
		};
	}

	getVertexShaderSource() {
		return `
			attribute vec3 aVertexPosition;
			attribute vec2 aTextureCoord;
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			varying highp vec2 vTextureCoord;
			${this._includeDistort()}
			void main(void) {
				vTextureCoord = aTextureCoord;
				vec4 pos = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
				gl_Position = Distort(pos);
			}`;
	}

	getFragmentShaderSource() {
		return `
			precision highp float;
			varying highp vec2 vTextureCoord;
			uniform sampler2D uSampler;
			uniform vec4 uTexScaleOffset;
			void main(void) {
				vec4 black = vec4(0, 0, 0, 1);
				vec4 texCol = texture2D(
					uSampler,
					vTextureCoord.st * uTexScaleOffset.xy + uTexScaleOffset.zw
				);

				gl_FragColor = texCol;
			}`;
	}

	render(context) {
		const {gl, canvas, shaderProgram, indexBuffer, mvMatrix, fov, isVR} = context;
		// Texcoord scale & offset
		// xy: Scale factor, zw: Offset factor
		const uTexScaleOffset = gl.getUniformLocation(shaderProgram, "uTexScaleOffset");
		const config = this._config;

		const uDistortionCoefficients = gl.getUniformLocation(shaderProgram, "uDistortionCoefficients");
		const uDistortionMaxFovSquared = gl.getUniformLocation(shaderProgram, "uDistortionMaxFovSquared");
		const uDistortionFovOffset = gl.getUniformLocation(shaderProgram, "uDistortionFovOffset");
		const uDistortionFovScale = gl.getUniformLocation(shaderProgram, "uDistortionFovScale");

		gl.uniform1fv(uDistortionCoefficients, this._getDistortionCoefficients());
		gl.uniform1f(uDistortionMaxFovSquared, this._getDistortionMaxFovSquared());
		gl.uniform2fv(uDistortionFovOffset, this._getDistortionFovOffset(EYES.LEFT));
		gl.uniform2fv(uDistortionFovScale, this._getDistortionFovScale());

		const leftEyeScaleOffset = config.format === STEREO_FORMAT.TOP_BOTTOM ?
			[1, 0.5, 0, 0] :
			[0.5, 1, 0, 0];
		const rightEyeScaleOffset = config.format === STEREO_FORMAT.TOP_BOTTOM ?
			[1, 0.5, 0, 0.5] :
			[0.5, 1, 0.5, 0];

		if (isVR) {
			// Common
			gl.enable(gl.SCISSOR_TEST);
			const pMatrix = mat4.create();

			mat4.perspective(
				pMatrix,
				glMatrix.toRadian(fov),
				canvas.width * 0.5 / canvas.height,
				0.1,
				100);

			const leftPMatrix = mat4.copy(mat4.create(), pMatrix);

			leftPMatrix[12] += this._offsets.left[0];
			leftPMatrix[13] += this._offsets.left[1];

			gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
			gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, leftPMatrix);

			// Render left eye
			gl.scissor(0, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.viewport(0, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.uniform4fv(uTexScaleOffset, leftEyeScaleOffset);

			if (indexBuffer) {
				gl.drawElements(
					gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
			}

			// Update uniforms
			const rightPMatrix = mat4.copy(mat4.create(), pMatrix);

			rightPMatrix[12] += this._offsets.right[0];
			rightPMatrix[13] += this._offsets.right[1];

			gl.uniform2fv(uDistortionFovOffset, this._getDistortionFovOffset(EYES.RIGHT));
			gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, rightPMatrix);

			// Render right eye
			gl.scissor(gl.drawingBufferWidth / 2, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.viewport(gl.drawingBufferWidth / 2, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.uniform4fv(uTexScaleOffset, rightEyeScaleOffset);

			if (indexBuffer) {
				gl.drawElements(
					gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
			}
			gl.disable(gl.SCISSOR_TEST);
		} else {
			// Render normally only with left eye
			gl.uniform4fv(uTexScaleOffset, leftEyeScaleOffset);
			super.render(context);
		}
	}

	setDisplay(vrDisplay) {
		this._display = vrDisplay;

		if (vrDisplay) {
			const leftEye = vrDisplay.getEyeParameters(EYES.LEFT);
			const rightEye = vrDisplay.getEyeParameters(EYES.RIGHT);

			this._offsets.left = leftEye.offset;
			this._offsets.right = rightEye.offset;
		} else {
			this._offsets = {
				left: [0, 0, 0],
				right: [0, 0, 0],
			};
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

	_hasPolyfilledDisplay() {
		return Boolean(this._display && this._display.isPolyfilled);
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
		const display = this._display;

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

		// Default distortion values for devices like Gear VR
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
		const display = this._display;

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
