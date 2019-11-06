import SphereRenderer from "./SphereRenderer";
import {STEREO_FORMAT} from "../../PanoViewer/consts";

export default class VRRenderer extends SphereRenderer {
	constructor({config}) {
		super();
		this._config = config;
	}

	getVertexShaderSource() {
		return `
			attribute vec3 aVertexPosition;
			attribute vec2 aTextureCoord;
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			varying highp vec2 vTextureCoord;
			void main(void) {
				gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
				vTextureCoord = aTextureCoord;
			}`;
	}

	getFragmentShaderSource() {
		return `
			precision mediump float;
			varying highp vec2 vTextureCoord;
			uniform sampler2D uSampler;
			uniform vec4 uTexScaleOffset;
			void main(void) {
				gl_FragColor = texture2D(
					uSampler,
					vTextureCoord.st * uTexScaleOffset.xy + uTexScaleOffset.zw
				);
			}`;
	}

	render(context) {
		const {gl, shaderProgram, indexBuffer, mvMatrix, pMatrix, isVR} = context;
		// Texcoord scale & offset
		// xy: Scale factor, zw: Offset factor
		const uTexScaleOffset = gl.getUniformLocation(shaderProgram, "uTexScaleOffset");
		const config = this._config;

		const leftEyeScaleOffset = config.format === STEREO_FORMAT.TOP_BOTTOM ?
			[1, 0.5, 0, 0] :
			[0.5, 1, 0, 0];
		const rightEyeScaleOffset = config.format === STEREO_FORMAT.TOP_BOTTOM ?
			[1, 0.5, 0, 0.5] :
			[0.5, 1, 0.5, 0];

		if (isVR) {
			// Common
			gl.enable(gl.SCISSOR_TEST);
			gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
			gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);


			// Render left eye
			gl.scissor(0, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.viewport(0, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.uniform4fv(uTexScaleOffset, leftEyeScaleOffset);

			if (indexBuffer) {
				gl.drawElements(
					gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
			}

			// Render right eye
			gl.scissor(gl.drawingBufferWidth / 2, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.viewport(gl.drawingBufferWidth / 2, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
			gl.uniform4fv(uTexScaleOffset, rightEyeScaleOffset);
			gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);

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
}
