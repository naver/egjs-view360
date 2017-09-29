import agent from "@egjs/agent";

const WEBGL_ERROR_CODE = {
	"0": "NO_ERROR",
	"1280": "INVALID_ENUM",
	"1281": "INVALID_VALUE",
	"1282": "INVALID_OPERATION",
	"1285": "OUT_OF_MEMORY",
	"1286": "INVALID_FRAMEBUFFER_OPERATION",
	"37442": "CONTEXT_LOST_WEBGL"
};

export default class WebGLUtils {
	static createShader(gl, type, source) {
		const shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

		if (success) {
			return shader;
		}

		gl.deleteShader(shader);
		return null;
	}

	static createProgram(gl, vertexShader, fragmentShader) {
		const program = gl.createProgram();

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		const success = gl.getProgramParameter(program, gl.LINK_STATUS);

		if (success) {
			return program;
		}

		gl.deleteProgram(program);
		return null;
	}

	static initBuffer(gl, target /* bind point */, data, itemSize) {
		const buffer = gl.createBuffer();

		gl.bindBuffer(target, buffer);
		gl.bufferData(target, data, gl.STATIC_DRAW);

		if (buffer) {
			buffer.itemSize = itemSize;
			buffer.numItems = data.length / itemSize;
		}

		return buffer;
	}

	static bindBufferToAttribute(gl, buffer, attr) {
		if (buffer === null || attr === null) {
			return;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.vertexAttribPointer(attr, buffer.itemSize, gl.FLOAT, false, 0, 0);
	}

	static getWebglContext(canvas) {
		const webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
		let context = null;

		function onWebglcontextcreationerror(e) {
			return e.statusMessage;
		}

		canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

		for (let i = 0; i < webglIdentifiers.length; i++) {
			try {
				// preserveDrawingBuffer: true 면 갤럭시 s6 네이버앱에서 떨림현상 발생
				context = canvas.getContext(webglIdentifiers[i], {preserveDrawingBuffer: false});
			} catch (t) { }
			if (context) {
				break;
			}
		}

		canvas.removeEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

		return context;
	}

	static createTexture(gl, textureTarget) {
		const texture = gl.createTexture();

		gl.bindTexture(textureTarget, texture);
		gl.texParameteri(textureTarget, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(textureTarget, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.bindTexture(textureTarget, null);

		return texture;
	}

/**
	 * 현재 환경의 webgl 지원여부를 확인한다
	 * @method Photo360Viewer#isWebGLAvailable
	 * @retuen {Boolean} isWebGLAvailable
	 */
	static isWebGLAvailable() {
		const canvas = document.createElement("canvas");
		const webglContext = WebGLUtils.getWebglContext(canvas);
		const webglAvailability = !!webglContext;

		// webglContext 자원 강제 회수
		if (webglContext) {
			const loseContextExtension = webglContext.getExtension("WEBGL_lose_context");

			loseContextExtension && loseContextExtension.loseContext();
		}

		return webglAvailability;
	}

	/**
	 * 현재 환경의 webgl 이 안정화 된 수준인지 확인한다.
	 * @method Photo360Viewer#isStableWebGL
	 * @retuen {Boolean} isStableWebGL
	 */
	static isStableWebGL() {
		let isStableWebgl = true;
		const agentInfo = agent();

		if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) <= 4.3) {
			isStableWebgl = false;
		} else if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) === 4.4) {
			if (agentInfo.browser.name !== "chrome") {
				isStableWebgl = false;
			}
		} else if (agentInfo.os.name === "ios" && parseInt(agentInfo.os.version, 10) <= 7) {
			isStableWebgl = false;
		}

		return isStableWebgl;
	}

	static getErrorNameFromWebGLErrorCode(code) {
		if (!(code in WEBGL_ERROR_CODE)) {
			return "UNKNOWN_ERROR";
		}

		return WEBGL_ERROR_CODE[code];
	}
}
