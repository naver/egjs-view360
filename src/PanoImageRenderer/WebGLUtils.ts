import agent from "@egjs/agent";

import { TypedArray } from "../types/internal";

const WEBGL_ERROR_CODE = {
  "0": "NO_ERROR",
  "1280": "INVALID_ENUM",
  "1281": "INVALID_VALUE",
  "1282": "INVALID_OPERATION",
  "1285": "OUT_OF_MEMORY",
  "1286": "INVALID_FRAMEBUFFER_OPERATION",
  "37442": "CONTEXT_LOST_WEBGL"
};

let webglAvailability: boolean | null = null;
// eslint-disable-next-line @typescript-eslint/naming-convention
let MAX_TEXTURE_SIZE_FOR_TEST: number | null = null;

export default class WebGLUtils {
  public static createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type)!;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
      return shader;
    }

    // eslint-disable-next-line
    console.error(gl.getShaderInfoLog(shader));

    return null;
  }

  public static createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram()!;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
      return program;
    }

    gl.deleteProgram(program);
    return null;
  }

  public static initBuffer(gl: WebGLRenderingContext, target: number /* bind point */, data: TypedArray, itemSize: number, attr?: number) {
    const buffer = gl.createBuffer()!;

    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, gl.STATIC_DRAW);

    if (buffer) {
      (buffer as any).itemSize = itemSize;
      (buffer as any).numItems = data.length / itemSize;
    }

    if (attr !== undefined) {
      gl.enableVertexAttribArray(attr);
      gl.vertexAttribPointer(attr, (buffer as any).itemSize, gl.FLOAT, false, 0, 0);
    }

    return buffer;
  }

  public static getWebglContext(canvas: HTMLCanvasElement, userContextAttributes?: WebGLContextAttributes) {
    const webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context: WebGLRenderingContext | null = null;
    const contextAttributes = {
      ...{
        preserveDrawingBuffer: false,
        antialias: false
      }, ...userContextAttributes
    };

    const onWebglcontextcreationerror = e => e.statusMessage;

    canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

    for (const identifier of webglIdentifiers) {
      try {
        context = canvas.getContext(identifier, contextAttributes) as WebGLRenderingContext;
      } catch (t) {} // eslint-disable-line no-empty
      if (context) {
        break;
      }
    }

    canvas.removeEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

    return context;
  }

  public static createTexture(gl: WebGLRenderingContext, textureTarget: number) {
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
  public static isWebGLAvailable(): boolean {
    if (webglAvailability === null) {
      const canvas = document.createElement("canvas");
      const webglContext = WebGLUtils.getWebglContext(canvas);

      webglAvailability = !!webglContext;

      // webglContext Resource forced collection
      if (webglContext) {
        const loseContextExtension = webglContext.getExtension("WEBGL_lose_context");

        if (loseContextExtension) {
          loseContextExtension.loseContext();
        }
      }
    }
    return !!webglAvailability;
  }

  /**
   * Returns whether webgl is stable in the current browser.
   * @method WebGLUtils#isStableWebGL
   * @retuen {Boolean} isStableWebGL
   */
  public static isStableWebGL() {
    const agentInfo = agent();
    let isStableWebgl = true;

    if (agentInfo.os.name === "android") {
      const version = parseFloat(agentInfo.os.version);

      if (version <= 4.3 && version >= 1) {
        isStableWebgl = false;
      } else if (version === 4.4) {
        if (agentInfo.browser.name !== "chrome") {
          isStableWebgl = false;
        }
      }
    }
    return isStableWebgl;
  }

  public static getErrorNameFromWebGLErrorCode(code: number | string) {
    if (!(code in WEBGL_ERROR_CODE)) {
      return "UNKNOWN_ERROR";
    }

    return WEBGL_ERROR_CODE[code];
  }


  /**
   * This function is wrapper for texImage2D to handle exceptions on texImage2D.
   * Purpose is to prevent service from being stopped by script error.
   */
  public static texImage2D(gl: WebGLRenderingContext, target: number, pixels: TexImageSource) {
    try {
      gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    } catch (error) {
      /* eslint-disable no-console */
      console.error("WebGLUtils.texImage2D error:", error);
      /* eslint-enable no-console */
    }
  }

  public static getMaxTextureSize(gl: WebGLRenderingContext) {
    // WARN: MAX_TEXTURE_SIZE_FOR_TEST is used for test
    return MAX_TEXTURE_SIZE_FOR_TEST || gl.getParameter(gl.MAX_TEXTURE_SIZE);
  }
}

/**
 * This function should not be used in service code. It's provided only for test purpose.
 * It should be set to null or 0 when test is done.
 * @param {Number} size
 */
const setMaxTextureSizeForTestOnlyPurpose = (size: number) => {
  MAX_TEXTURE_SIZE_FOR_TEST = size;
};

export {
  setMaxTextureSizeForTestOnlyPurpose
};
