import Component from "@egjs/component";
import ImageLoader from "./ImageLoader";
import VideoLoader from "./VideoLoader";
import WebGLUtils from "./WebGLUtils";
import CubeRenderer from "./renderer/CubeRenderer";
import CubeStripRenderer from "./renderer/CubeStripRenderer";
import SphereRenderer from "./renderer/SphereRenderer";
import CylinderRenderer from "./renderer/CylinderRenderer";
import {glMatrix, mat4, quat} from "../utils/math-util.js";
import {devicePixelRatio} from "../utils/browserFeature";
import {PROJECTION_TYPE} from "../PanoViewer/consts";
import Renderer from "./renderer/Renderer";

const ImageType = PROJECTION_TYPE;

let DEVICE_PIXEL_RATIO = devicePixelRatio || 1;

// DEVICE_PIXEL_RATIO 가 2를 초과하는 경우는 리소스 낭비이므로 2로 맞춘다.
if (DEVICE_PIXEL_RATIO > 2) {
	DEVICE_PIXEL_RATIO = 2;
}

// define custom events name
/**
 * TODO: how to manage events/errortype with PanoViewer
 *
 * I think renderer events should be seperated from viewer events although it has same name.
 */
const EVENTS = {
	BIND_TEXTURE: "bindTexture",
	IMAGE_LOADED: "imageLoaded",
	ERROR: "error",
	RENDERING_CONTEXT_LOST: "renderingContextLost",
	RENDERING_CONTEXT_RESTORE: "renderingContextRestore",
};

const ERROR_TYPE = {
	INVALID_DEVICE: 10,
	NO_WEBGL: 11,
	FAIL_IMAGE_LOAD: 12,
	RENDERER_ERROR: 13
};

export default class PanoImageRenderer extends Component {
	static EVENTS = EVENTS;
	static ERROR_TYPE = ERROR_TYPE;
	constructor(image, width, height, isVideo, sphericalConfig, renderingContextAttributes) {
		// Super constructor
		super();

		this.sphericalConfig = sphericalConfig;
		this.fieldOfView = sphericalConfig.fieldOfView;

		this.width = width;
		this.height = height;

		this._lastQuaternion = null;
		this._lastYaw = null;
		this._lastPitch = null;
		this._lastFieldOfView = null;

		this.pMatrix = mat4.create();
		this.mvMatrix = mat4.create();

		// initialzie pMatrix
		mat4.perspective(this.pMatrix, glMatrix.toRadian(this.fieldOfView), width / height, 0.1, 100);

		this.textureCoordBuffer = null;
		this.vertexBuffer = null;
		this.indexBuffer = null;
		this.canvas = this._initCanvas(width, height);
		this._renderingContextAttributes = renderingContextAttributes;
		this._image = null;
		this._imageConfig = null;
		this._imageIsReady = false;
		this._shouldForceDraw = false;
		this._keepUpdate = false; // Flag to specify 'continuous update' on video even when still.

		this._onContentLoad = 	this._onContentLoad.bind(this);
		this._onContentError = 	this._onContentError.bind(this);

		if (image) {
			this.setImage({
				image,
				imageType: sphericalConfig.imageType,
				isVideo,
				cubemapConfig: sphericalConfig.cubemapConfig
			});
		}
	}

	getContent() {
		return this._image;
	}

	setImage({image, imageType, isVideo = false, cubemapConfig}) {
		this._imageIsReady = false;
		this._isVideo = isVideo;
		this._imageConfig = Object.assign(
			{
				/* RLUDBF is abnormal, we use it on CUBEMAP only */
				order: (imageType === ImageType.CUBEMAP) ? "RLUDBF" : "RLUDFB",
				tileConfig: {
					flipHirozontal: false,
					rotation: 0
				}
			},
			cubemapConfig
		);
		this._setImageType(imageType);

		if (this._contentLoader) {
			this._contentLoader.destroy();
		}

		if (isVideo) {
			this._contentLoader = new VideoLoader();
			this._keepUpdate = true;
		} else {
			this._contentLoader = new ImageLoader();
			this._keepUpdate = false;
		}

		// img element or img url
		this._contentLoader.set(image);

		// 이미지의 사이즈를 캐시한다.
		// image is reference for content in contentLoader, so it may be not valid if contentLoader is destroyed.
		this._image = this._contentLoader.getElement();

		return this._contentLoader.get()
			.then(this._onContentLoad, this._onContentError)
			.catch(e => setTimeout(() => { throw e; }));// Prevent exceptions from being isolated in promise chain.
	}

	_setImageType(imageType) {
		if (!imageType || this._imageType === imageType) {
			return;
		}

		this._imageType = imageType;
		this._isCubeMap = imageType === ImageType.CUBEMAP;

		if (this._renderer) {
			this._renderer.off();
		}

		switch (imageType) {
			case ImageType.CUBEMAP:
				this._renderer = new CubeRenderer();
				break;
			case ImageType.CUBESTRIP:
				this._renderer = new CubeStripRenderer();
				break;
			case ImageType.PANORAMA:
				this._renderer = new CylinderRenderer();
				break;
			case ImageType.STEREOSCOPIC_EQUI:
				this._renderer = new SphereRenderer({isStereoscopic: true});
				break;
			default:
				this._renderer = new SphereRenderer();
				break;
		}

		this._renderer.on(Renderer.EVENTS.ERROR, e => {
			this.trigger(EVENTS.ERROR, {
				type: ERROR_TYPE.RENDERER_ERROR,
				message: e.message
			});
		});

		this._initWebGL();
	}

	_initCanvas(width, height) {
		const canvas = document.createElement("canvas");

		canvas.width = width;
		canvas.height = height;
		canvas.style.bottom = 0;
		canvas.style.left = 0;
		canvas.style.right = 0;
		canvas.style.top = 0;
		canvas.style.margin = "auto";
		canvas.style.maxHeight = "100%";
		canvas.style.maxWidth = "100%";
		canvas.style.outline = "none";
		canvas.style.position = "absolute";

		this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
		this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);

		canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
		canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);

		return canvas;
	}

	_onContentError(error) {
		this._imageIsReady = false;
		this._image = null;
		this.trigger(EVENTS.ERROR, {
			type: ERROR_TYPE.FAIL_IMAGE_LOAD,
			message: "failed to load image"
		});

		return false;
	}

	_triggerContentLoad() {
		this.trigger(EVENTS.IMAGE_LOADED, {
			content: this._image,
			isVideo: this._isVideo,
			projectionType: this._imageType
		});
	}
	_onContentLoad(image) {
		this._imageIsReady = true;

		this._triggerContentLoad();
		return true;
	}

	isImageLoaded() {
		return !!this._image && this._imageIsReady &&
			(!this._isVideo || this._image.readyState >= 2 /* HAVE_CURRENT_DATA */);
	}

	bindTexture() {
		return new Promise((res, rej) => {
			if (!this._contentLoader) {
				rej("ImageLoader is not initialized");
				return;
			}

			this._contentLoader.get()
				.then(() => this._bindTexture(), rej)
				.then(res);
		});
	}

	// 부모 엘리먼트에 canvas 를 붙임
	attachTo(parentElement) {
		this.detach();
		parentElement.appendChild(this.canvas);
	}

	forceContextLoss() {
		if (this.hasRenderingContext()) {
			const loseContextExtension = this.context.getExtension("WEBGL_lose_context");

			if (loseContextExtension) {
				loseContextExtension.loseContext();
			}
		}
	}

	// 부모 엘리먼트에서 canvas 를 제거
	detach() {
		if (this.canvas.parentElement) {
			this.canvas.parentElement.removeChild(this.canvas);
		}
	}

	destroy() {
		if (this._contentLoader) {
			this._contentLoader.destroy();
		}

		this.detach();
		this.forceContextLoss();

		this.off();

		this.canvas.removeEventListener("webglcontextlost", this._onWebglcontextlost);
		this.canvas.removeEventListener("webglcontextrestored", this._onWebglcontextrestored);
	}

	hasRenderingContext() {
		if (!(this.context && !this.context.isContextLost())) {
			return false;
		} else if (
			this.context &&
			!this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS)) {
			return false;
		}
		return true;
	}

	_onWebglcontextlost(e) {
		e.preventDefault();
		this.trigger(EVENTS.RENDERING_CONTEXT_LOST);
	}

	_onWebglcontextrestored(e) {
		this._initWebGL();
		this.trigger(EVENTS.RENDERING_CONTEXT_RESTORE);
	}

	updateFieldOfView(fieldOfView) {
		this.fieldOfView = fieldOfView;
		this._updateViewport();
	}

	updateViewportDimensions(width, height) {
		let viewPortChanged = false;

		this.width = width;
		this.height = height;

		const w = width * DEVICE_PIXEL_RATIO;
		const h = height * DEVICE_PIXEL_RATIO;

		if (w !== this.canvas.width) {
			this.canvas.width = w;
			viewPortChanged = true;
		}

		if (h !== this.canvas.height) {
			this.canvas.height = h;
			viewPortChanged = true;
		}

		if (!viewPortChanged) {
			return;
		}

		this._updateViewport();
		this._shouldForceDraw = true;
	}

	_updateViewport() {
		mat4.perspective(
			this.pMatrix,
			glMatrix.toRadian(this.fieldOfView),
			this.canvas.width / this.canvas.height,
			0.1,
			100);

		this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
	}

	_initWebGL() {
		let gl;

		// TODO: Following code does need to be executed only if width/height, cubicStrip property is changed.
		try {
			this._initRenderingContext();
			gl = this.context;

			this.updateViewportDimensions(this.width, this.height);

			if (this.shaderProgram) {
				gl.deleteProgram(this.shaderProgram);
			}

			this.shaderProgram = this._initShaderProgram(gl);
			if (!this.shaderProgram) {
				throw new Error(`Failed to intialize shaders: ${WebGLUtils.getErrorNameFromWebGLErrorCode(gl.getError())}`);
			}
		} catch (e) {
			this.trigger(EVENTS.ERROR, {
				type: ERROR_TYPE.NO_WEBGL,
				message: "no webgl support"
			});
			this.destroy();
			console.error(e); // eslint-disable-line no-console
			return;
		}
		// 캔버스를 투명으로 채운다.
		gl.clearColor(0, 0, 0, 0);
		const textureTarget = this._isCubeMap ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D;

		if (this.texture) {
			gl.deleteTexture(this.texture);
		}

		this.texture = WebGLUtils.createTexture(gl, textureTarget);

		if (this._imageType === ImageType.CUBESTRIP) {
			// TODO: Apply following options on other projection type.
			gl.enable(gl.CULL_FACE);
			// gl.enable(gl.DEPTH_TEST);
		}
	}

	_initRenderingContext() {
		if (this.hasRenderingContext()) {
			return;
		}

		if (!window.WebGLRenderingContext) {
			throw new Error("WebGLRenderingContext not available.");
		}

		this.context = WebGLUtils.getWebglContext(this.canvas, this._renderingContextAttributes);

		if (!this.context) {
			throw new Error("Failed to acquire 3D rendering context");
		}
	}

	_initShaderProgram(gl) {
		const vertexShaderSource = this._renderer.getVertexShaderSource();
		const vertexShader = WebGLUtils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

		if (!vertexShader) {
			return false;
		}

		const fragmentShaderSource = this._renderer.getFragmentShaderSource();
		const fragmentShader = WebGLUtils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

		if (!fragmentShader) {
			return false;
		}

		const shaderProgram = WebGLUtils.createProgram(gl, vertexShader, fragmentShader);

		if (!shaderProgram) {
			return null;
		}

		gl.useProgram(shaderProgram);
		shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
		shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");

		gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

		// clear buffer
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
		// Use TEXTURE0
		gl.uniform1i(shaderProgram.samplerUniform, 0);

		return shaderProgram;
	}

	_initBuffers() {
		const vertexPositionData = this._renderer.getVertexPositionData();
		const indexData = this._renderer.getIndexData();
		const textureCoordData = this._renderer.getTextureCoordData(this._imageConfig);
		const gl = this.context;

		this.vertexBuffer = WebGLUtils.initBuffer(
			gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3,
			this.shaderProgram.vertexPositionAttribute);

		this.indexBuffer = WebGLUtils.initBuffer(
			gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);

		this.textureCoordBuffer = WebGLUtils.initBuffer(
			gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), this._isCubeMap ? 3 : 2,
			this.shaderProgram.textureCoordAttribute);
	}

	_bindTexture() {
		// Detect if it is EAC Format while CUBESTRIP mode.
		// We assume it is EAC if image is not 3/2 ratio.
		if (this._imageType === ImageType.CUBESTRIP) {
			const {width, height} = this._renderer.getDimension(this._image);
			const isEAC = width && height && width / height !== 1.5;

			this.context.uniform1f(this.context.getUniformLocation(this.shaderProgram, "uIsEAC"), isEAC);
		} else if (this._imageType === ImageType.PANORAMA) {
			const {width, height} = this._renderer.getDimension(this._image);
			const imageAspectRatio = width && height && width / height;

			this._renderer.updateShaderData({imageAspectRatio});
		}

		// intialize shader buffers after image is loaded.(by updateShaderData)
		// because buffer may be differ by image size.(eg. CylinderRenderer)
		this._initBuffers();

		this._renderer.bindTexture(
			this.context,
			this.texture,
			this._image,
			this._imageConfig,
		);
		this._shouldForceDraw = true;

		this.trigger(EVENTS.BIND_TEXTURE);
	}

	_updateTexture() {
		this._renderer.updateTexture(
			this.context,
			this._image,
			this._imageConfig,
		);
	}

	keepUpdate(doUpdate) {
		if (doUpdate && this.isImageLoaded() === false) {
			// Force to draw a frame after image is loaded on render()
			this._shouldForceDraw = true;
		}

		this._keepUpdate = doUpdate;
	}

	renderWithQuaternion(quaternion, fieldOfView) {
		if (!this.isImageLoaded()) {
			return;
		}

		if (this._keepUpdate === false &&
			this._lastQuaternion && quat.exactEquals(this._lastQuaternion, quaternion) &&
			this.fieldOfView && this.fieldOfView === fieldOfView &&
			this._shouldForceDraw === false) {
			return;
		}

		// updatefieldOfView only if fieldOfView is changed.
		if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
			this.updateFieldOfView(fieldOfView);
		}

		this.mvMatrix = mat4.fromQuat(mat4.create(), quaternion);

		this._draw();

		this._lastQuaternion = quat.clone(quaternion);
		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	}

	render(yaw, pitch, fieldOfView) {
		if (!this.isImageLoaded()) {
			return;
		}

		if (this._keepUpdate === false &&
				this._lastYaw !== null && this._lastYaw === yaw &&
				this._lastPitch !== null && this._lastPitch === pitch &&
				this.fieldOfView && this.fieldOfView === fieldOfView &&
				this._shouldForceDraw === false) {
			return;
		}

		// fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출
		if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
			this.updateFieldOfView(fieldOfView);
		}

		mat4.identity(this.mvMatrix);
		mat4.rotateX(this.mvMatrix, this.mvMatrix, -glMatrix.toRadian(pitch));
		mat4.rotateY(this.mvMatrix, this.mvMatrix, -glMatrix.toRadian(yaw));

		this._draw();

		this._lastYaw = yaw;
		this._lastPitch = pitch;
		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	}

	_draw() {
		const gl = this.context;

		gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);

		if (this._isVideo && this._keepUpdate) {
			this._updateTexture();
		}

		if (this.indexBuffer) {
			gl.drawElements(
				gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}
	}

	/**
	 * Returns projection renderer by each type
	 */
	getProjectionRenderer() {
		return this._renderer;
	}
}
