import Renderer from "./Renderer";
import WebGLUtils from "../WebGLUtils";
import {glMatrix} from "../../utils/math-util.js";

// const latitudeBands = 60;
const MIN_ASPECT_RATIO_FOR_FULL_PANORAMA = 6;
const longitudeBands = 60;

const textureCoordData = [];
const vertexPositionData = [];
const indexData = [];

export default class CylinderRenderer extends Renderer {
	static _VERTEX_POSITION_DATA = vertexPositionData;
	static _TEXTURE_COORD_DATA = textureCoordData;
	static _INDEX_DATA = indexData;

	getVertexPositionData() {
		return CylinderRenderer._VERTEX_POSITION_DATA;
	}

	getIndexData() {
		return CylinderRenderer._INDEX_DATA;
	}

	getTextureCoordData() {
		return CylinderRenderer._TEXTURE_COORD_DATA;
	}

	getVertexShaderSource(attach) {
		return `
${attach.preprocessor}
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying highp vec2 vTextureCoord;
${attach.variable}
${attach.function}
void main(void) {
	vTextureCoord = aTextureCoord;
	vec4 pos = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	${attach.main}
	gl_Position = pos;
}`;
	}

	getFragmentShaderSource(attach) {
		return `
precision highp float;
${attach.preprocessor}
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
${attach.variable}
${attach.function}
void main(void) {
	vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
	${attach.main}
	gl_FragColor = col;
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
		let resizeDimension;

		if (size > maxSize) {
			this._triggerError(`Image width(${width}) exceeds device texture limit(${maxSize}))`);

			// Request resizing texture.
			/**
			 * TODO: Is it need to apply on another projection type?
			 */
			resizeDimension = width > height ?
				{width: maxSize, height: maxSize * height / width} :
				{width: maxSize * width / height, height: maxSize};
		}

		// Pixel Source for IE11 & Video or resizing needed
		this._initPixelSource(image, resizeDimension);

		gl.activeTexture(gl.TEXTURE0);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_2D, texture);

		this.updateTexture(gl, image);
	}

	updateShaderData({imageAspectRatio = MIN_ASPECT_RATIO_FOR_FULL_PANORAMA}) {
		let lngIdx;
		let cylinderMaxRadian;
		let halfCylinderY;
		let rotated;
		let aspectRatio;

		// Exception case: orientation is rotated.
		if (imageAspectRatio < 1) {
			/**
			 * If rotated is true, we assume that image is rotated counter clockwise.
			 * TODO: If there's other rotation, it is need to implement by each rotation.
			 */
			rotated = true;
			aspectRatio = 1 / imageAspectRatio;
		} else {
			rotated = false;
			aspectRatio = imageAspectRatio;
		}

		if (aspectRatio >= MIN_ASPECT_RATIO_FOR_FULL_PANORAMA) {
			const fov = 360 / aspectRatio;

			cylinderMaxRadian = 2 * Math.PI; // 360 deg
			halfCylinderY = Math.tan(glMatrix.toRadian(fov / 2));
		} else {
			cylinderMaxRadian = aspectRatio;
			halfCylinderY = 0.5;// Range of cylinder is [-0.5, 0.5] to make height to 1.
		}

		// intialize shader data before update
		textureCoordData.length = 0;
		vertexPositionData.length = 0;
		indexData.length = 0;

		const CYLIDER_Y = [-halfCylinderY, halfCylinderY];
		const startAngleForCenterAlign = Math.PI / 2 + (2 * Math.PI - cylinderMaxRadian) / 2; // Math.PI / 2 start point when cylinderMaxRadian is 2 phi(360)

		// console.log("cylinderMaxRadian:", glMatrix.toDegree(cylinderMaxRadian), "CYLIDER_Y", CYLIDER_Y, "start angle", glMatrix.toDegree(startAngleForCenterAlign));
		for (let yIdx = 0, yLength = CYLIDER_Y.length; yIdx < yLength/* bottom & top */; yIdx++) {
			for (lngIdx = 0; lngIdx <= longitudeBands; lngIdx++) {
				const angle = startAngleForCenterAlign + (lngIdx / longitudeBands * cylinderMaxRadian);
				const x = Math.cos(angle);
				const y = CYLIDER_Y[yIdx];
				const z = Math.sin(angle);
				let u;
				let v;

				if (rotated) {
					// Rotated 90 degree (counter clock wise)
					u = 1 - yIdx; // yLength - yIdx;
					v = lngIdx / longitudeBands;
				} else {
				// 	// Normal case (Not rotated)
					u = lngIdx / longitudeBands;
					v = yIdx;
				}

				textureCoordData.push(u, v);
				vertexPositionData.push(x, y, z);

				if (yIdx === 0 && lngIdx < longitudeBands) {
					const a = lngIdx;
					const b = a + longitudeBands + 1;

					indexData.push(a, b, a + 1, b, b + 1, a + 1);
				}
			}
		}
	}
}
