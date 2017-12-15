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
				1, 1, -1,
				1, 1, 1,
				-1, 1, 1,
				-1, 1, -1,

				// bottom
				-1, -1, -1,
				-1, -1, 1,
				1, -1, 1,
				1, -1, -1,

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

	static getTextureCoordData() {
		return null;
	}

	static getVertexShaderSource() {
		return `
			attribute vec3 aVertexPosition;
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			varying highp vec3 vVertexDirectionVector;
			void main(void) {
				gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
				vVertexDirectionVector = aVertexPosition;
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

	static bindTexture(gl, texture, image) {
		if (!image) {
			return;
		}

		const agent = Agent();
		const width = image.naturalWidth || image.videoWidth;
		const hasDrawImageBug = CubeRenderer.hasDrawImageBug(agent);
		const maxCubeMapTextureSize = CubeRenderer.getMaxCubeMapTextureSize(gl, image, agent);
		const heightScale = CubeRenderer.getHightScale(width, agent);

		try {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

			if (!hasDrawImageBug) {
				const canvas = document.createElement("canvas");

				canvas.width = maxCubeMapTextureSize;
				canvas.height = maxCubeMapTextureSize;
				const context = canvas.getContext("2d");

				for (let surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
					context.drawImage(
						image, 0, surfaceIdx * (width * heightScale),
						width, width * heightScale, 0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize);
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
						image, 0, width * 3 * i * heightScale,
						image.naturalWidth || image.videoWidth,
						(image.naturalHeight || image.videoHeight) / 2 * heightScale,
						0, 0, halfCanvas.width, halfCanvas.height);
					context.restore();
					for (let j = 0; j < 3; j++) {
						tileContext.save();
						tileContext.translate(maxCubeMapTextureSize, 0);
						tileContext.rotate(Math.PI / 2);
						tileContext.drawImage(
							halfCanvas, j * width, 0, width, width, 0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize);
						tileContext.restore();
						const texImageData = new Uint8Array(
							tileContext.getImageData(0, 0, maxCubeMapTextureSize, maxCubeMapTextureSize).data);

						gl.texImage2D(
							gl.TEXTURE_CUBE_MAP_POSITIVE_X + i * 3 + j, 0,
							gl.RGBA, maxCubeMapTextureSize, maxCubeMapTextureSize, 0,
							gl.RGBA, gl.UNSIGNED_BYTE, texImageData);
					}
				}
			}
		} catch (e) {

		}

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}

	static getMaxCubeMapTextureSize(gl, image, agent) {
		const maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		let _imageWidth = image.naturalWidth || image.videoWidth;

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
				(agent.os.version === "5.0.2" && agent.browser.name === "sbrowser") ||
				(agent.os.version === "5.1.1" && agent.browser.name === "sbrowser" &&
					window.navigator.userAgent.indexOf("SM-N920") !== -1 &&
					// 삼성인터넷 버전 4 미만
					parseFloat(window.navigator.userAgent.split("SamsungBrowser/")[1].split(" ")[0]) < 4)
			) {
				heightScale = 768 / width;
			} else if (agent.os.version === "5.0" && agent.browser.name === "sbrowser" &&
								window.navigator.userAgent.indexOf("SM-G900") !== -1
			) {
				heightScale = 1344 / width;
			}
		}

		return heightScale;
	}

	static hasDrawImageBug(agent) {
		let hasBug = false;

		if ((agent.browser.name === "sbrowser" &&
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
