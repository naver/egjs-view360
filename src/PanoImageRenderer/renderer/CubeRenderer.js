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

	static bindTexture(gl, texture, image, imageConfig) {
		const baseOrder = "RLUDBF";
		const order = CubeRenderer.extractOrder(imageConfig);
		const orderMap = {};

		order.split("").forEach((v, i) => {
			orderMap[v] = i;
		});

		if (!image) {
			return;
		}

		try {
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

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

	static getSourceTileSize(image) {
		const width = image.naturalWidth || image.videoWidth;
		const height = image.naturalHeight || image.videoHeight;
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
		const width = image.naturalWidth || image.videoWidth;
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

	static texImage2D(gl, image) {
		const agent = Agent();
		const width = image.naturalWidth || image.videoWidth;
		const height = image.naturalHeight || image.videoHeight;
		const hasDrawImageBug = CubeRenderer.hasDrawImageBug(agent);
		const maxCubeMapTextureSize = CubeRenderer.getMaxCubeMapTextureSize(gl, image, agent);
		const heightScale = CubeRenderer.getHightScale(width, agent);
		const aspectRatio = width / height;
		let tileSize;

		if (aspectRatio === 1 / 6) {
			tileSize = width;
		} else if (aspectRatio === 6) {
			tileSize = height;
		} else if (aspectRatio === 2 / 3) {
			tileSize = width / 2;
		} else {
			tileSize = width / 3;
		}

		if (!hasDrawImageBug) {
			const canvas = document.createElement("canvas");

			canvas.width = maxCubeMapTextureSize;
			canvas.height = maxCubeMapTextureSize;
			const context = canvas.getContext("2d");
			const tilePerRow = width / tileSize;

			for (let surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
				const x = (tileSize * surfaceIdx) % tileSize;
				const y = parseInt(surfaceIdx / tilePerRow, 10) * (tileSize * heightScale);

				context.drawImage(
					image, x, y,
					tileSize, tileSize * heightScale, 0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize);

				gl.texImage2D(
					gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, 0, gl.RGBA,
					gl.RGBA, gl.UNSIGNED_BYTE, canvas);
			}
		} else {
			// #288, drawImage bug
			const halfCanvas = document.createElement("canvas");
			const context = halfCanvas.getContext("2d");

			halfCanvas.width = maxCubeMapTextureSize * 3;
			halfCanvas.height = maxCubeMapTextureSize;

			const tileCanvas = document.createElement("canvas");
			const tileContext = tileCanvas.getContext("2d");

			tileCanvas.width = maxCubeMapTextureSize;
			tileCanvas.height = maxCubeMapTextureSize;

			for (let i = 0; i < 2; i++) {
				context.save();
				context.translate(0, maxCubeMapTextureSize);
				context.rotate(-Math.PI / 2);
				context.scale(1 / 3, 3);
				context.drawImage(
					image, 0, width * 3 * i * heightScale, width, height / 2 * heightScale,
					0, 0, halfCanvas.width, halfCanvas.height);
				context.restore();
				for (let j = 0; j < 3; j++) {
					tileContext.save();
					tileContext.translate(maxCubeMapTextureSize, 0);
					tileContext.rotate(Math.PI / 2);
					tileContext.drawImage(
						halfCanvas, j * width, 0, width, width, 0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize);
					tileContext.restore();
					gl.texImage2D(
						gl.TEXTURE_CUBE_MAP_POSITIVE_X + i * 3 + j, 0,
						gl.RGBA, maxCubeMapTextureSize, maxCubeMapTextureSize, 0,
						gl.RGBA, gl.UNSIGNED_BYTE, tileCanvas);
				}
			}
		}
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

	static getHightScale(width, agent) {
		// 안드로이드 4.3 이하 크롬과 안드로이드 5.0.2 삼성브라우저 버그해결을 위해 세로크기에 스케일값 적용
		// 참고 : https://code.google.com/p/android/issues/detail?id=5141
		let heightScale = 1;

		// TODO : 갤럭시 S브라우저에서 drawImage 메서드의 이미지, height 값이 일정 비율로 뻥튀기 되는 버그가 있다.
		// 추후 drawImage 메서드를 사용하지 않는 방식으로 개선하여 해당 버그를 접할 일이 없도록 해야 함.
		if (agent.os.name === "android") {
			if ((parseFloat(agent.os.version) <= 4.3 && agent.browser.name === "chrome") ||
				(agent.os.version === "5.0.2" && agent.browser.name === "samsung internet") ||
				(agent.os.version === "5.1.1" && agent.browser.name === "samsung internet" &&
					window.navigator.userAgent.indexOf("SM-N920") !== -1 &&
					// 삼성인터넷 버전 4 미만
					parseFloat(window.navigator.userAgent.split("SamsungBrowser/")[1].split(" ")[0]) < 4)
			) {
				heightScale = 768 / width;
			} else if (agent.os.version === "5.0" && agent.browser.name === "samsung internet" &&
				window.navigator.userAgent.indexOf("SM-G900") !== -1
			) {
				heightScale = 1344 / width;
			}
		}

		return heightScale;
	}

	static hasDrawImageBug(agent) {
		let hasBug = false;

		if ((agent.browser.name === "samsung internet" &&
				// 삼성인터넷 버전 5 미만
				parseFloat(window.navigator.userAgent.split("SamsungBrowser/")[1].split(" ")[0]) < 5) ||
				(agent.os.name === "ios" && (parseInt(agent.os.version, 10) <= 9))) {
			hasBug = true;
		}

		return hasBug;
	}
}

CubeRenderer._VERTEX_POSITION_DATA = null;
CubeRenderer._INDEX_DATA = null;
