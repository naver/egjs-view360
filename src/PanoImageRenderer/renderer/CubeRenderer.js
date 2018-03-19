import Agent from "@egjs/agent";
import Renderer from "./Renderer.js";
import {util} from "../../utils/math-util.js";

export default class CubeRenderer extends Renderer {
	static getVertexPositionData() {
		CubeRenderer._VERTEX_POSITION_DATA =
			CubeRenderer._VERTEX_POSITION_DATA !== null ? CubeRenderer._VERTEX_POSITION_DATA : [
				// back
				1, -1, 1,
				-1, -1, 1,
				-1, 1, 1,
				1, 1, 1,

				// front
				-1, -1, -1,
				1, -1, -1,
				1, 1, -1,
				-1, 1, -1,

				// top
				-1, 1, -1,
				1, 1, -1,
				1, 1, 1,
				-1, 1, 1,

				// bottom
				1, -1, -1,
				-1, -1, -1,
				-1, -1, 1,
				1, -1, 1,

				// right
				1, -1, -1,
				1, -1, 1,
				1, 1, 1,
				1, 1, -1,

				// left
				-1, -1, 1,
				-1, -1, -1,
				-1, 1, -1,
				-1, 1, 1
			];

		return CubeRenderer._VERTEX_POSITION_DATA;
	}

	static getIndexData() {
		if (CubeRenderer._INDEX_DATA) {
			return CubeRenderer._INDEX_DATA;
		}

		const indexData = [];
		const vertexPositionData = CubeRenderer.getVertexPositionData();

		for (let i = 0; i < (vertexPositionData.length / 3); i += 4) {
			indexData.push(
				i,
				i + 2,
				i + 1,
				i,
				i + 3,
				i + 2
			);
		}

		CubeRenderer._INDEX_DATA = indexData;
		return indexData;
	}

	static extractTileConfig(imageConfig) {
		let tileConfig =
			Array.isArray(imageConfig.tileConfig) ?
				imageConfig.tileConfig : Array(...Array(6)).map(() => imageConfig.tileConfig);

		tileConfig = tileConfig.map(
			config => Object.assign({
				flipHorizontal: false,
				rotation: 0
			}, config)
		);

		return tileConfig;
	}

	static extractOrder(imageConfig) {
		return imageConfig.order || "RLUDBF";
	}

	static getTextureCoordData(imageConfig) {
		const vertexOrder = "BFUDRL";
		const order = CubeRenderer.extractOrder(imageConfig);
		const base = CubeRenderer.getVertexPositionData();
		const tileConfig = CubeRenderer.extractTileConfig(imageConfig);
		const elemSize = 3;
		const vertexPerTile = 4;
		const textureCoordData =
		vertexOrder.split("")
		.map(face => tileConfig[order.indexOf(face)])
		.map((config, i) => {
			const rotation = parseInt(config.rotation / 90, 10);
			const ordermap_ = config.flipHorizontal ? [0, 1, 2, 3] : [1, 0, 3, 2];

			for (let r = 0; r < Math.abs(rotation); r++) {
				if ((config.flipHorizontal && rotation > 0) ||
					(!config.flipHorizontal && rotation < 0)) {
					ordermap_.push(ordermap_.shift());
				} else {
					ordermap_.unshift(ordermap_.pop());
				}
			}

			const elemPerTile = elemSize * vertexPerTile;
			const tileVertex = base.slice(i * elemPerTile, i * elemPerTile + elemPerTile);
			const tileTemp = [];

			for (let j = 0; j < vertexPerTile; j++) {
				tileTemp[ordermap_[j]] = tileVertex.splice(0, elemSize);
			}
			return tileTemp;
		})
		.join()
		.split(",")
		.map(v => parseInt(v, 10));

		return textureCoordData;
	}

	static getVertexShaderSource() {
		return `
			attribute vec3 aVertexPosition;
			attribute vec3 aTextureCoord;
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			varying highp vec3 vVertexDirectionVector;
			void main(void) {
				gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
				vVertexDirectionVector = aTextureCoord;
			}`;
	}

	static getFragmentShaderSource() {
		return `
			varying highp vec3 vVertexDirectionVector;
			uniform samplerCube uSampler;
			void main(void) {
				gl_FragColor = textureCube(uSampler, vVertexDirectionVector);
			}`;
	}

	static updateTexture(gl, image, imageConfig) {
		const baseOrder = "RLUDBF";
		const order = CubeRenderer.extractOrder(imageConfig);
		const orderMap = {};

		order.split("").forEach((v, i) => {
			orderMap[v] = i;
		});

		try {
			if (image instanceof Array) {
				for (let surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
					const tileIdx = orderMap[baseOrder[surfaceIdx]];

					gl.texImage2D(
						gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, 0, gl.RGBA,
						gl.RGBA, gl.UNSIGNED_BYTE, image[tileIdx]);
				}
			} else {
				const maxCubeMapTextureSize = CubeRenderer.getMaxCubeMapTextureSize(gl, image);

				for (let surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
					const tileIdx = orderMap[baseOrder[surfaceIdx]];
					const tile = CubeRenderer.extractTileFromImage(
						image, tileIdx, maxCubeMapTextureSize
					);

					gl.texImage2D(
						gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, 0, gl.RGBA,
						gl.RGBA, gl.UNSIGNED_BYTE, tile
					);
				}
			}
		} catch (e) {

		}
	}

	static bindTexture(gl, texture, image, imageConfig) {
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
		CubeRenderer.updateTexture(gl, image, imageConfig);
	}

	static _getDimension(pixelSource) {
		const width = pixelSource.naturalWidth || pixelSource.videoWidth;
		const height = pixelSource.naturalHeight || pixelSource.videoHeight;

		return {width, height};
	}

	static getSourceTileSize(image) {
		const {width, height} = this._getDimension(image);
		const aspectRatio = width / height;
		let inputTextureSize;

		if (aspectRatio === 1 / 6) {
			inputTextureSize = width;
		} else if (aspectRatio === 6) {
			inputTextureSize = height;
		} else if (aspectRatio === 2 / 3) {
			inputTextureSize = width / 2;
		} else {
			inputTextureSize = width / 3;
		}
		return inputTextureSize;
	}

	static extractTileFromImage(image, tileIdx, outputTextureSize) {
		const {width} = this._getDimension(image);
		const inputTextureSize = CubeRenderer.getSourceTileSize(image);

		const canvas = document.createElement("canvas");

		canvas.width = outputTextureSize;
		canvas.height = outputTextureSize;
		const context = canvas.getContext("2d");
		const tilePerRow = width / inputTextureSize;

		const x = inputTextureSize * tileIdx % (inputTextureSize * tilePerRow);
		const y = parseInt(tileIdx / tilePerRow, 10) * (inputTextureSize);

		context.drawImage(
			image, x, y,
			inputTextureSize, inputTextureSize, 0, 0, outputTextureSize, outputTextureSize
		);
		return canvas;
	}

	static getMaxCubeMapTextureSize(gl, image) {
		const agent = Agent();
		const maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		let _imageWidth = CubeRenderer.getSourceTileSize(image);

		if (agent.browser.name === "ie" && parseInt(agent.browser.version, 10) === 11) {
			if (!util.isPowerOfTwo(_imageWidth)) {
				for (let i = 1; i < maxCubeMapTextureSize; i *= 2) {
					if (i < _imageWidth) {
						continue;
					} else {
						_imageWidth = i;
						break;
					}
				}
			}
		}
		// ios 9 의 경우 텍스쳐 최대사이즈는 1024 이다.
		if (agent.os.name === "ios" && parseInt(agent.os.version, 10) === 9) {
			_imageWidth = 1024;
		}
		// ios 8 의 경우 텍스쳐 최대사이즈는 512 이다.
		if (agent.os.name === "ios" && parseInt(agent.os.version, 10) === 8) {
			_imageWidth = 512;
		}
		// maxCubeMapTextureSize 보다는 작고, imageWidth 보다 큰 2의 승수 중 가장 작은 수
		return Math.min(maxCubeMapTextureSize, _imageWidth);
	}
}

CubeRenderer._VERTEX_POSITION_DATA = null;
CubeRenderer._INDEX_DATA = null;
