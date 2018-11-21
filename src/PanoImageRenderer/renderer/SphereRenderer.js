import Renderer from "./Renderer";
import WebGLUtils from "../WebGLUtils";

const latitudeBands = 60;
const longitudeBands = 60;
const radius = 2;
const ANGLE_CORRECTION_FOR_CENTER_ALIGN = -0.5 * Math.PI;

const textureCoordData = [];
const vertexPositionData = [];
const indexData = [];
let latIdx;
let lngIdx;

for (latIdx = 0; latIdx <= latitudeBands; latIdx++) {
	const theta = (latIdx / latitudeBands - 0.5) * Math.PI;
	const sinTheta = Math.sin(theta);
	const cosTheta = Math.cos(theta);

	for (lngIdx = 0; lngIdx <= longitudeBands; lngIdx++) {
		const phi = (lngIdx / longitudeBands - 0.5) * 2 * Math.PI + ANGLE_CORRECTION_FOR_CENTER_ALIGN;
		const sinPhi = Math.sin(phi);
		const cosPhi = Math.cos(phi);
		const x = cosPhi * cosTheta;
		const y = sinTheta;
		const z = sinPhi * cosTheta;
		const u = lngIdx / longitudeBands;
		const v = latIdx / latitudeBands;

		textureCoordData.push(u, v);
		vertexPositionData.push(radius * x, radius * y, radius * z);

		if (lngIdx !== longitudeBands && latIdx !== latitudeBands) {
			const a = latIdx * (longitudeBands + 1) + lngIdx;
			const b = a + longitudeBands + 1;

			indexData.push(a, b, a + 1, b, b + 1, a + 1);
		}
	}
}

export default class SphereRenderer extends Renderer {
	static _VERTEX_POSITION_DATA = vertexPositionData;
	static _TEXTURE_COORD_DATA = textureCoordData;
	static _INDEX_DATA = indexData;

	constructor(config) {
		super();

		this._isStereoscopic = (config && config.isStereoscopic) || false;
	}

	getVertexPositionData() {
		return SphereRenderer._VERTEX_POSITION_DATA;
	}

	getIndexData() {
		return SphereRenderer._INDEX_DATA;
	}

	getTextureCoordData() {
		if (this._isStereoscopic) {
			// Use vertical half size of image.
			return SphereRenderer._TEXTURE_COORD_DATA.map(
				(value, index) => (index % 2 === 1 ? value / 2 : value)
			);
		}

		return SphereRenderer._TEXTURE_COORD_DATA;
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
			void main(void) {
				gl_FragColor = texture2D(
					uSampler,
					vec2(vTextureCoord.s, vTextureCoord.t)
				);
			}`;
	}

	updateTexture(gl, image) {
		WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
	}

	bindTexture(gl, texture, image) {
		// Make sure image isn't too big
		const {width, height} = this.getDimension(image);
		const size = Math.max(width, height);
		const maxSize = WebGLUtils.getMaxTextureSize(gl);

		if (size > maxSize) {
			this._triggerError(`Image width(${width}) exceeds device limit(${maxSize}))`);
			return;
		}

		// Pixel Source for IE11 & Video
		this._initPixelSource(image);

		gl.activeTexture(gl.TEXTURE0);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_2D, texture);

		this.updateTexture(gl, image);
	}
}
