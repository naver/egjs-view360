import SphereRenderer from "./SphereRenderer";
import CardboardDistorter from "../CardboardDistorter";

export default class VRRenderer extends SphereRenderer {
	constructor() {
		super();
		this._distorter = new CardboardDistorter();
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
			varying highp vec2 vTextureCoord;
			uniform sampler2D uSampler;
			uniform highp vec2 uTexOffset;
			void main(void) {
				gl_FragColor = texture2D(
					uSampler,
					vec2(vTextureCoord.s, vTextureCoord.t * .5 + uTexOffset.y)
				);
			}`;
	}

	render(context) {
		const {gl, shaderProgram, indexBuffer, mvMatrix, pMatrix} = context;

		// Common
		gl.enable(gl.SCISSOR_TEST);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
		const uTexOffset = gl.getUniformLocation(shaderProgram, "uTexOffset");

		// Render left eye
		gl.scissor(0, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
		gl.viewport(0, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
		gl.uniform2fv(uTexOffset, [0, 0.5]);

		if (indexBuffer) {
			gl.drawElements(
				gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}

		// Render right eye
		gl.scissor(gl.drawingBufferWidth / 2, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
		gl.viewport(gl.drawingBufferWidth / 2, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
		gl.uniform2fv(uTexOffset, [0, 0]);
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);

		if (indexBuffer) {
			gl.drawElements(
				gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}
		gl.disable(gl.SCISSOR_TEST);
	}
}
