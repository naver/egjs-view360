import Component from "@egjs/component";
import ImageLoader from "./ImageLoader";
import VideoLoader from "./VideoLoader";
import WebGLUtils from "./WebGLUtils";
import CubeRenderer from "./renderer/CubeRenderer";
import SphereRenderer from "./renderer/SphereRenderer";
import {glMatrix, quat, mat4} from "../utils/math-util.js";

const ImageType = {
	EQUIRECTANGULAR: "equirectangular",
	VERTICAL_CUBESTRIP: "vertical_cubestrip"
};

let DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

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
	FAIL_IMAGE_LOAD: 12
};

export default class PanoImageRenderer extends Component {
	constructor(image, width, height, isVideo, sphericalConfig) {
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

		this._image = null;

		this._onContentLoad = 	this._onContentLoad.bind(this);
		this._onContentError = 	this._onContentError.bind(this);

		if (image) {
			this.setImage({image, imageType: sphericalConfig.imageType, isVideo});
		}
	}

	getContent() {
		if (!this.isImageLoaded()) {
			return null;
		}

		return this._image;
	}

	setImage({image, imageType, isVideo = false}) {
		this._isVideo = isVideo;
		this._setImageType(imageType);

		if (this._contentLoader) {
			this._contentLoader.destroy();
		}

		if (isVideo) {
			this._contentLoader = new VideoLoader();
		} else {
			this._contentLoader = new ImageLoader();
		}

		// img element or img url
		this._contentLoader.set(image);

		return this._contentLoader.get()
			.then(this._onContentLoad)
			.catch(this._onContentError);
	}

	_setImageType(imageType) {
		if (!imageType || this._imageType === imageType) {
			return;
		}

		this._imageType = imageType;
		this._isCubeStrip = imageType === ImageType.VERTICAL_CUBESTRIP;
		this._renderer = this._isCubeStrip ? CubeRenderer : SphereRenderer;
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

		// webgl context lost & restore 관련 이벤트 핸들링
		// TODO : 어떤 상황에서 발생하는 지 더 알아보자
		this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
		this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);

		canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
		canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);

		return canvas;
	}

	_onContentError(error) {
		this._image = null;

		this.trigger(EVENTS.ERROR, {
			type: ERROR_TYPE.FAIL_IMAGE_LOAD,
			message: "failed to load image"
		});

		return false;
	}

	_onContentLoad(image) {
		// 이미지의 사이즈를 캐시한다.
		// image is reference for content in contentLoader, so it may be not valid if contentLoader is destroyed.
		this._image = image;

		// 이벤트 발생. 여기에 핸들러로 render 하는 걸 넣어준다.
		this.trigger(EVENTS.IMAGE_LOADED, {
			content: this._image,
			isVideo: this._isVideo,
			projectionType: this._imageType
		});
		return true;
	}

	isImageLoaded() {
		return !!this._image;
	}

	cancelLoadImage() {
		this._contentLoader.destroy();
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

	isAttached() {
		return this._image && this.canvas && this.canvas.parentNode;
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
		if (!this.context) {
			return false;
		} else if (!this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS) &&
		!this.context.isContextLost()) {
			return false;
		}
		return true;
	}

	_onWebglcontextlost(e) {
		e.preventDefault();
		this.trigger("renderingContextLost");
	}

	_onWebglcontextrestored(e) {
		this._initWebGL();
		this.trigger("renderingContextRestore");
	}

	updateFieldOfView(fieldOfView) {
		if (this.fieldOfView === fieldOfView) {
			return;
		}

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
		// TODO: Following code does need to be executed only if width/height, cubicStrip property is changed.
		try {
			this._initRenderingContext();
			this.updateViewportDimensions(this.width, this.height);

			if (this.shaderProgram) {
				this.context.deleteProgram(this.shaderProgram);
			}

			this.shaderProgram = this._initShaderProgram(this.context);
			if (!this.shaderProgram) {
				throw new Error(`Failed to intialize shaders: ${WebGLUtils.getErrorNameFromWebGLErrorCode(this.context.getError())}`);
			}
		} catch (e) {
			this.trigger(EVENTS.ERROR, {
				type: ERROR_TYPE.NO_WEBGL,
				message: "no webgl support"
			});
			this.destroy();
			return;
		}
		// 캔버스를 투명으로 채운다.
		this.context.clearColor(0, 0, 0, 0);
		const textureTarget = this._isCubeStrip ? this.context.TEXTURE_CUBE_MAP : this.context.TEXTURE_2D;

		if (this.texture) {
			this.context.deleteTexture(this.texture);
		}

		this.texture = WebGLUtils.createTexture(this.context, textureTarget);
	}

	_initRenderingContext() {
		if (this.hasRenderingContext()) {
			return;
		}

		if (!window.WebGLRenderingContext) {
			throw new Error("WebGLRenderingContext not available.");
		}

		this.context = WebGLUtils.getWebglContext(this.canvas);

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
		if (!this._isCubeStrip) {
			shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
			gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
		}

		return shaderProgram;
	}

	_initBuffers() {
		const vertexPositionData = this._renderer.getVertexPositionData();
		const indexData = this._renderer.getIndexData();
		const textureCoordData = this._renderer.getTextureCoordData();
		const gl = this.context;

		this.vertexBuffer = WebGLUtils.initBuffer(
			gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3);

		this.indexBuffer = WebGLUtils.initBuffer(
			gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);

		if (textureCoordData !== null) {
			this.textureCoordBuffer = WebGLUtils.initBuffer(
				gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), 2);
		}
	}

	_bindTexture() {
		this._renderer.bindTexture(this.context, this.texture, this._image);
		this._shouldForceDraw = true;

		this.trigger(EVENTS.BIND_TEXTURE);
	}

	renderWithQuaternion(quaternion, fieldOfView) {
		if (!this.isImageLoaded() || !this.hasRenderingContext()) {
			return;
		}

		// 항상 그려줄려고 강제로 플래그 올림... 원래 이러면 안됨
		this._shouldForceDraw = true;

		if (this._lastQuaternion && quat.exactEquals(this._lastQuaternion, quaternion) &&
		this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
			return;
		}

		// fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출
		if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
			this.updateFieldOfView(fieldOfView);
		}

		let adgustedQ;

		// equirectangular 의 경우 이미지의 중심을 0,0 으로 맞추기 위해 렌더링 시 yaw 축을 조정한다.
		if (!this._isCubeStrip) {
			const adjustYaw = quat.rotateY(quat.create(), quat.create(), glMatrix.toRadian(-90));

			adgustedQ = quat.multiply(quat.create(), adjustYaw, quaternion);
		} else {
			adgustedQ = quaternion;
		}

		this.mvMatrix = mat4.fromQuat(mat4.create(), quat.conjugate(quat.create(), adgustedQ));

		this._draw();

		this._lastQuaternion = quat.clone(quaternion);

		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	}

	render(yaw, pitch, fieldOfView) {
		if (!this.isImageLoaded() || !this.hasRenderingContext()) {
			return;
		}

		if (this._isVideo) { /* TODO: && Check if isPlaying */
			this._bindTexture();
		}

		if (this._lastYaw !== null && this._lastYaw === yaw &&
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
		mat4.rotateY(this.mvMatrix, this.mvMatrix,
		-glMatrix.toRadian(yaw - (this._isCubeStrip ? 0 : 90)));

		this._draw();

		this._lastYaw = yaw;
		this._lastPitch = pitch;
		if (this._shouldForceDraw) {
			this._shouldForceDraw = false;
		}
	}

	_draw() {
		const gl = this.context;

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.activeTexture(gl.TEXTURE0);
		if (this._isCubeStrip) {
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
		} else {
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
		}

		if (this.vertexBuffer === null || this.indexBuffer === null) {
			this._initBuffers();
		}

		// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.uniform1i(this.shaderProgram.samplerUniform, 0);
		gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);

		// textureCoordBuffer is used in sphere
		if (this.textureCoordBuffer) {
			WebGLUtils.bindBufferToAttribute(
				gl, this.textureCoordBuffer, this.shaderProgram.textureCoordAttribute);
		}

		if (this.vertexBuffer) {
			WebGLUtils.bindBufferToAttribute(
				gl, this.vertexBuffer, this.shaderProgram.vertexPositionAttribute);
		}

		if (this.indexBuffer) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
			gl.drawElements(
				gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		}

		if (this._isCubeStrip) {
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		} else {
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}
}

PanoImageRenderer.EVENTS = EVENTS;
PanoImageRenderer.ERROR_TYPE = ERROR_TYPE;
PanoImageRenderer.ImageType = ImageType;
