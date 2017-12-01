import Renderer from "./Renderer.js";

export default class SphereRenderer extends Renderer {
	static getVertexPositionData() {
		if (SphereRenderer._VERTEX_POSITION_DATA === null) {
			SphereRenderer._initData();
		}

		return SphereRenderer._VERTEX_POSITION_DATA;
	}

	static getIndexData() {
		if (SphereRenderer._INDEX_DATA === null) {
			SphereRenderer._initData();
		}

		return SphereRenderer._INDEX_DATA;
	}

	static getTextureCoordData() {
		if (SphereRenderer._TEXTURE_COORD_DATA === null) {
			SphereRenderer._initData();
		}

		return SphereRenderer._TEXTURE_COORD_DATA;
	}

	static getVertexShaderSource() {
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

	static getFragmentShaderSource() {
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

	static bindTexture(gl, texture, image) {
		if (!image) {
			return;
		}

		const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
		const width = image.naturalWidth || image.videoWidth;// imageWidth;
		const height = image.naturalHeight || image.videoHeight;// imageHeight;
		const aspectRatio = height / width;
		const canvas = document.createElement("canvas");

		if (aspectRatio <= 1) {
			canvas.width = Math.min(width, maxTextureSize);
			canvas.height = canvas.width * aspectRatio;
		} else {
			canvas.height = Math.min(height, maxTextureSize);
			canvas.width = canvas.height / aspectRatio;
		}
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		const context = canvas.getContext("2d");

		context.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
		const data = new Uint8Array(context.getImageData(0, 0, canvas.width, canvas.height).data);

		gl.texImage2D(
			gl.TEXTURE_2D, 0, gl.RGBA,
			canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
		// this.trigger(EVENTS.BIND_TEXTURE);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	static _initData() {
		const latitudeBands = 60;
		const longitudeBands = 60;
		const radius = 2;

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
				const phi = (lngIdx / longitudeBands - 0.5) * 2 * Math.PI;
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

		SphereRenderer._VERTEX_POSITION_DATA = vertexPositionData;
		SphereRenderer._TEXTURE_COORD_DATA = textureCoordData;
		SphereRenderer._INDEX_DATA = indexData;
	}
}

SphereRenderer._VERTEX_POSITION_DATA = null;
SphereRenderer._TEXTURE_COORD_DATA = null;
SphereRenderer._INDEX_DATA = null;
