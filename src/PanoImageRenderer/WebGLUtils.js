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

let webglAvailability = null;
let MAX_TEXTURE_SIZE_FOR_TEST = null;

export default class WebGLUtils {
	static createShader(gl, type, source) {
		const shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

		if (success) {
			return shader;
		} else {
			// eslint-disable-next-line
			console.error(gl.getShaderInfoLog(shader));
		}
		return null;
	}

	static createProgram(gl, vertexShader, fragmentShader) {
		const program = gl.createProgram();

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		gl.detachShader(program, vertexShader);
		gl.detachShader(program, fragmentShader);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);

		const success = gl.getProgramParameter(program, gl.LINK_STATUS);

		if (success) {
			return program;
		}

		gl.deleteProgram(program);
		return null;
	}

	static initBuffer(gl, target /* bind point */, data, itemSize, attr) {
		const buffer = gl.createBuffer();

		gl.bindBuffer(target, buffer);
		gl.bufferData(target, data, gl.STATIC_DRAW);

		if (buffer) {
			buffer.itemSize = itemSize;
			buffer.numItems = data.length / itemSize;
		}

		if (attr !== undefined) {
			gl.enableVertexAttribArray(attr);
			gl.vertexAttribPointer(attr, buffer.itemSize, gl.FLOAT, false, 0, 0);
		}

		return buffer;
	}

	static getWebglContext(canvas, userContextAttributes) {
		const webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
		let context = null;
		const contextAttributes = Object.assign({
			preserveDrawingBuffer: false,
			antialias: false,
			xrCompatible: true
		}, userContextAttributes);

		function onWebglcontextcreationerror(e) {
			return e.statusMessage;
		}

		canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

		for (let i = 0; i < webglIdentifiers.length; i++) {
			try {
				context = canvas.getContext(webglIdentifiers[i], contextAttributes);
			} catch (t) {}
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
	 * Returns the webgl availability of the current browser.
	 * @method WebGLUtils#isWebGLAvailable
	 * @retuen {Boolean} isWebGLAvailable
	 */
	static isWebGLAvailable() {
		if (webglAvailability === null) {
			const canvas = document.createElement("canvas");
			const webglContext = WebGLUtils.getWebglContext(canvas);

			webglAvailability = !!webglContext;

			// webglContext Resource forced collection
			if (webglContext) {
				const loseContextExtension = webglContext.getExtension("WEBGL_lose_context");

				loseContextExtension && loseContextExtension.loseContext();
			}
		}
		return webglAvailability;
	}

	/**
	 * Returns whether webgl is stable in the current browser.
	 * @method WebGLUtils#isStableWebGL
	 * @retuen {Boolean} isStableWebGL
	 */
	static isStableWebGL() {
		const agentInfo = agent();
		let isStableWebgl = true;

		if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) <= 4.3) {
			isStableWebgl = false;
		} else if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) === 4.4) {
			if (agentInfo.browser.name !== "chrome") {
				isStableWebgl = false;
			}
		}
		return isStableWebgl;
	}

	static getErrorNameFromWebGLErrorCode(code) {
		if (!(code in WEBGL_ERROR_CODE)) {
			return "UNKNOWN_ERROR";
		}

		return WEBGL_ERROR_CODE[code];
	}


	/**
	 * This function is wrapper for texImage2D to handle exceptions on texImage2D.
	 * Purpose is to prevent service from being stopped by script error.
	 *
	 * @param {*} gl
	 * @param {*} target
	 * @param {*} pixels
	 */
	static texImage2D(gl, target, pixels) {
		try {
			gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
		} catch (error) {
			/* eslint-disable no-console */
			console.error("WebGLUtils.texImage2D error:", error);
			/* eslint-enable no-console */
		}
	}

	static getMaxTextureSize(gl) {
		// WARN: MAX_TEXTURE_SIZE_FOR_TEST is used for test
		return MAX_TEXTURE_SIZE_FOR_TEST || gl.getParameter(gl.MAX_TEXTURE_SIZE);
	}
}

/**
 * This function should not be used in service code. It's provided only for test purpose.
 * It should be set to null or 0 when test is done.
 *
 * @param {Number} size
 */
function setMaxTextureSizeForTestOnlyPurpose(size) {
	MAX_TEXTURE_SIZE_FOR_TEST = size;
}

export {
	setMaxTextureSizeForTestOnlyPurpose
};
