import Component, { ComponentEvent } from "@egjs/component";
import { XRFrame } from "webxr";
import Promise from "promise-polyfill";
import { glMatrix, vec3, mat3, mat4, quat } from "gl-matrix";
import ImReady, { OnReady } from "@egjs/imready";

import { util as mathUtil } from "../utils/math-util";
import { devicePixelRatio, WEBXR_SUPPORTED } from "../utils/browserFeature";
import { PROJECTION_TYPE, STEREO_FORMAT } from "../PanoViewer/consts";
import { IS_IOS } from "../utils/browser";
import { CubemapConfig, ImageCandidate, ValueOf, VideoCandidate } from "../types/internal";
import YawPitchControl from "../YawPitchControl/YawPitchControl";
import { toImageElement, toVideoElement } from "../utils/utils";

import WebGLUtils from "./WebGLUtils";
import Renderer from "./renderer/Renderer";
import CubeRenderer from "./renderer/CubeRenderer";
import CubeStripRenderer from "./renderer/CubeStripRenderer";
import SphereRenderer from "./renderer/SphereRenderer";
import CylinderRenderer from "./renderer/CylinderRenderer";
import VRManager from "./vr/VRManager";
import XRManager from "./vr/XRManager";
import WebGLAnimator from "./WebGLAnimator";

// eslint-disable-next-line @typescript-eslint/naming-convention
const ImageType = PROJECTION_TYPE;

// eslint-disable-next-line @typescript-eslint/naming-convention
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
const EVENTS: {
  BIND_TEXTURE: "bindTexture";
  IMAGE_LOADED: "imageLoaded";
  ERROR: "error";
  RENDERING_CONTEXT_LOST: "renderingContextLost";
  RENDERING_CONTEXT_RESTORE: "renderingContextRestore";
} = {
  BIND_TEXTURE: "bindTexture",
  IMAGE_LOADED: "imageLoaded",
  ERROR: "error",
  RENDERING_CONTEXT_LOST: "renderingContextLost",
  RENDERING_CONTEXT_RESTORE: "renderingContextRestore"
};

const ERROR_TYPE = {
  INVALID_DEVICE: 10,
  NO_WEBGL: 11,
  FAIL_IMAGE_LOAD: 12,
  RENDERER_ERROR: 13
};

class PanoImageRenderer extends Component<{
  [EVENTS.ERROR]: {
    type: number;
    message: string;
  };
  [EVENTS.IMAGE_LOADED]: {
    content: HTMLElement;
    isVideo: boolean;
    projectionType: ValueOf<typeof PROJECTION_TYPE>;
  };
  [EVENTS.BIND_TEXTURE]: ComponentEvent;
  [EVENTS.RENDERING_CONTEXT_LOST]: ComponentEvent;
  [EVENTS.RENDERING_CONTEXT_RESTORE]: ComponentEvent;
}> {
  public static EVENTS = EVENTS;
  public static ERROR_TYPE = ERROR_TYPE;

  public sphericalConfig: {
    initialYaw: number;
    initialPitch: number;
    fieldOfView: number;
    imageType: ValueOf<typeof PROJECTION_TYPE>;
    stereoFormat: ValueOf<typeof STEREO_FORMAT>;
    cubemapConfig: Partial<CubemapConfig>;
  };

  public fieldOfView: number;
  public width: number;
  public height: number;

  public canvas: HTMLCanvasElement;
  public context: WebGLRenderingContext;
  public shaderProgram: WebGLProgram | null;
  public texture: WebGLTexture;

  public pMatrix: mat4;
  public mvMatrix: mat4;

  public textureCoordBuffer: WebGLBuffer | null = null;
  public vertexBuffer: WebGLBuffer | null = null;
  public indexBuffer: WebGLBuffer | null = null;

  private _wrapper: HTMLElement | null;
  private _wrapperOrigStyle: string | null;
  private _lastQuaternion: quat | null;
  private _lastYaw: number | null;
  private _lastPitch: number | null;
  private _lastFieldOfView: number | null;
  private _renderingContextAttributes?: WebGLContextAttributes;

  private _renderer: Renderer;
  private _contentLoader: ImReady | null;
  private _image: HTMLImageElement | HTMLImageElement[] | HTMLVideoElement | null;
  private _imageConfig: CubemapConfig | null;
  private _imageType: ValueOf<typeof PROJECTION_TYPE>;
  private _imageIsReady: boolean;
  private _isVideo: boolean;
  private _isCubeMap: boolean;
  private _shouldForceDraw: boolean;
  private _keepUpdate: boolean;
  private _hasExternalCanvas: boolean;

  private _yawPitchControl: YawPitchControl;
  private _animator: WebGLAnimator;
  private _vr: VRManager | XRManager | null;

  public constructor(
    image: ImageCandidate | VideoCandidate,
    width: number,
    height: number,
    isVideo: boolean,
    container: HTMLElement,
    canvasClass: string,
    sphericalConfig: PanoImageRenderer["sphericalConfig"],
    renderingContextAttributes?: WebGLContextAttributes
  ) {
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

    this.canvas = this._initCanvas(container, canvasClass, width, height);

    this._setDefaultCanvasStyle();
    this._wrapper = null; // canvas wrapper
    this._wrapperOrigStyle = null;

    this._renderingContextAttributes = renderingContextAttributes;
    this._image = null;
    this._imageConfig = null;
    this._imageIsReady = false;
    this._shouldForceDraw = false;
    this._keepUpdate = false; // Flag to specify 'continuous update' on video even when still.

    this._onContentLoad = this._onContentLoad.bind(this);
    this._onContentError = 	this._onContentError.bind(this);

    this._animator = new WebGLAnimator();

    // VR/XR manager
    this._vr = null;

    if (image) {
      this.setImage({
        image,
        imageType: sphericalConfig.imageType,
        isVideo,
        cubemapConfig: sphericalConfig.cubemapConfig
      });
    }
  }

  // FIXME: Please refactor me to have more loose connection to yawpitchcontrol
  public setYawPitchControl(yawPitchControl: YawPitchControl) {
    this._yawPitchControl = yawPitchControl;
  }

  public getContent() {
    return this._image;
  }

  public setImage({
    image,
    imageType,
    isVideo = false,
    cubemapConfig
  }: {
    image: ImageCandidate | VideoCandidate;
    imageType: PanoImageRenderer["_imageType"];
    isVideo: boolean;
    cubemapConfig: Partial<CubemapConfig>;
  }) {
    this._imageIsReady = false;
    this._isVideo = isVideo;
    this._imageConfig = {
      ...{
        /* RLUDBF is abnormal, we use it on CUBEMAP only */
        order: (imageType === ImageType.CUBEMAP) ? "RLUDBF" : "RLUDFB",
        tileConfig: {
          flipHorizontal: false,
          rotation: 0
        },
        trim: 0
      },
      ...cubemapConfig
    };
    this._setImageType(imageType);

    if (this._contentLoader) {
      this._contentLoader.destroy();
    }

    this._contentLoader = new ImReady()
      .on("ready", this._onContentLoad)
      .on("error", this._onContentError);

    if (isVideo) {
      this._image = toVideoElement(image as VideoCandidate);
      this._contentLoader.check([this._image]);
      this._keepUpdate = true;
    } else {
      this._image = toImageElement(image as ImageCandidate);
      this._contentLoader.check(Array.isArray(this._image) ? this._image : [this._image]);
      this._keepUpdate = false;
    }
  }

  public isImageLoaded() {
    return !!this._image && this._imageIsReady &&
      (!this._isVideo || (this._image as HTMLVideoElement).readyState >= 2 /* HAVE_CURRENT_DATA */);
  }

  public bindTexture() {
    return new Promise((res, rej) => {
      const contentLoader = this._contentLoader;

      if (!this._image) {
        return rej("Image is not defined");
      }

      if (!contentLoader) {
        return rej("ImageLoader is not initialized");
      }

      if (contentLoader.isReady()) {
        this._bindTexture();
        res();
      } else {
        contentLoader.check(Array.isArray(this._image) ? this._image : [this._image]);
        contentLoader.once("ready", e => {
          if (e.errorCount > 0) {
            rej("Failed to load images.");
          } else {
            this._bindTexture();
            res();
          }
        });
      }
    });
  }

  // 부모 엘리먼트에 canvas 를 붙임
  public attachTo(parentElement) {
    if (!this._hasExternalCanvas) {
      this.detach();
      parentElement.appendChild(this.canvas);
    }
    this._wrapper = parentElement;
  }

  public forceContextLoss() {
    if (this.hasRenderingContext()) {
      const loseContextExtension = this.context.getExtension("WEBGL_lose_context");

      if (loseContextExtension) {
        loseContextExtension.loseContext();
      }
    }
  }

  // 부모 엘리먼트에서 canvas 를 제거
  public detach() {
    if (!this._hasExternalCanvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }

  public destroy() {
    if (this._contentLoader) {
      this._contentLoader.destroy();
    }

    this._animator.stop();
    this.detach();
    this.forceContextLoss();

    this.off();

    this.canvas.removeEventListener("webglcontextlost", this._onWebglcontextlost);
    this.canvas.removeEventListener("webglcontextrestored", this._onWebglcontextrestored);
  }

  public hasRenderingContext() {
    const ctx = this.context;
    if (
      !ctx
      || ctx.isContextLost()
      || !ctx.getProgramParameter(this.shaderProgram!, ctx.LINK_STATUS)) {
      return false;
    }
    return true;
  }

  public updateFieldOfView(fieldOfView) {
    this.fieldOfView = fieldOfView;
    this._updateViewport();
  }

  public updateViewportDimensions(width, height) {
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

  public keepUpdate(doUpdate) {
    if (doUpdate && this.isImageLoaded() === false) {
      // Force to draw a frame after image is loaded on render()
      this._shouldForceDraw = true;
    }

    this._keepUpdate = doUpdate;
  }

  public startRender() {
    this._animator.setCallback(this._render.bind(this));
    this._animator.start();
  }

  public stopRender() {
    this._animator.stop();
  }

  public renderWithQuaternion(quaternion, fieldOfView) {
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

  public renderWithYawPitch(yaw, pitch, fieldOfView) {
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

  /**
   * Returns projection renderer by each type
   */
  public getProjectionRenderer() {
    return this._renderer;
  }

  /**
   * @return Promise
   */
  public enterVR(options) {
    const vr = this._vr;

    if (!WEBXR_SUPPORTED && !(navigator as any).getVRDisplays) {
      return Promise.reject("VR is not available on this browser.");
    }
    if (vr && vr.isPresenting()) {
      return Promise.resolve("VR already enabled.");
    }

    return this._requestPresent(options);
  }

  public exitVR = () => {
    const vr = this._vr;
    const gl = this.context;
    const animator = this._animator;

    if (!vr) return;

    vr.removeEndCallback(this.exitVR);
    vr.destroy();
    this._vr = null;

    // Restore canvas & context on iOS
    if (IS_IOS) {
      this._restoreStyle();
    }
    this.updateViewportDimensions(this.width, this.height);
    this._updateViewport();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this._bindBuffers();
    this._shouldForceDraw = true;

    animator.stop();
    animator.setContext(window);
    animator.setCallback(this._render.bind(this));
    animator.start();
  };

  private _setImageType(imageType) {
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
        this._renderer = new SphereRenderer(this.sphericalConfig.stereoFormat);
        break;
      default:
        this._renderer = new SphereRenderer(STEREO_FORMAT.NONE);
        break;
    }

    this._renderer.on(Renderer.EVENTS.ERROR, e => {
      this.trigger(new ComponentEvent(EVENTS.ERROR, {
        type: ERROR_TYPE.RENDERER_ERROR,
        message: e.message
      }));
    });

    this._initWebGL();
  }

  private _initCanvas(container: HTMLElement, canvasClass: string, width: number, height: number) {
    const canvasInContainer = container.querySelector<HTMLCanvasElement>(`.${canvasClass}`);
    const canvas = canvasInContainer || this._createCanvas(canvasClass);

    this._hasExternalCanvas = !!canvasInContainer;

    canvas.width = width;
    canvas.height = height;

    this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
    this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);

    canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
    canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);

    return canvas;
  }

  private _createCanvas(className: string) {
    const canvas = document.createElement("canvas");

    canvas.className = className;

    return canvas;
  }

  private _setDefaultCanvasStyle() {
    const canvas = this.canvas;

    canvas.style.bottom = "0";
    canvas.style.left = "0";
    canvas.style.right = "0";
    canvas.style.top = "0";
    canvas.style.margin = "auto";
    canvas.style.maxHeight = "100%";
    canvas.style.maxWidth = "100%";
    canvas.style.outline = "none";
    canvas.style.position = "absolute";
  }

  private _onContentError() {
    this._imageIsReady = false;
    this._image = null;
    this.trigger(new ComponentEvent(EVENTS.ERROR, {
      type: ERROR_TYPE.FAIL_IMAGE_LOAD,
      message: "failed to load image"
    }));

    return false;
  }

  private _triggerContentLoad() {
    this.trigger(new ComponentEvent(EVENTS.IMAGE_LOADED, {
      content: this._image as HTMLElement,
      isVideo: this._isVideo,
      projectionType: this._imageType
    }));
  }

  private _onContentLoad(e: OnReady) {
    if (e.errorCount > 0) return;

    this._imageIsReady = true;

    this._triggerContentLoad();
  }

  private _initShaderProgram() {
    const gl = this.context;

    if (this.shaderProgram) {
      gl.deleteProgram(this.shaderProgram);
      this.shaderProgram = null;
    }

    const renderer = this._renderer;

    const vsSource = renderer.getVertexShaderSource();
    const fsSource = renderer.getFragmentShaderSource();

    const vertexShader = WebGLUtils.createShader(gl, gl.VERTEX_SHADER, vsSource)!;
    const fragmentShader = WebGLUtils.createShader(gl, gl.FRAGMENT_SHADER, fsSource)!;

    const shaderProgram = WebGLUtils.createProgram(gl, vertexShader, fragmentShader);

    if (!shaderProgram) {
      throw new Error(`Failed to initialize shaders: ${WebGLUtils.getErrorNameFromWebGLErrorCode(gl.getError())}`);
    }

    gl.useProgram(shaderProgram);
    (shaderProgram as any).vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    (shaderProgram as any).pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    (shaderProgram as any).mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    (shaderProgram as any).samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    (shaderProgram as any).textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    (shaderProgram as any).uEye = gl.getUniformLocation(shaderProgram, "uEye");

    gl.enableVertexAttribArray((shaderProgram as any).vertexPositionAttribute);
    gl.enableVertexAttribArray((shaderProgram as any).textureCoordAttribute);

    // clear buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    // Use TEXTURE0
    gl.uniform1i((shaderProgram as any).samplerUniform, 0);

    this.shaderProgram = shaderProgram;
  }

  private _onWebglcontextlost(e) {
    e.preventDefault();
    this.trigger(new ComponentEvent(EVENTS.RENDERING_CONTEXT_LOST));
  }

  private _onWebglcontextrestored() {
    this._initWebGL();
    this.trigger(new ComponentEvent(EVENTS.RENDERING_CONTEXT_RESTORE));
  }

  private _updateViewport() {
    mat4.perspective(
      this.pMatrix,
      glMatrix.toRadian(this.fieldOfView),
      this.canvas.width / this.canvas.height,
      0.1,
      100);

    this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
  }

  private _initWebGL() {
    let gl: WebGLRenderingContext;

    // TODO: Following code does need to be executed only if width/height, cubicStrip property is changed.
    try {
      this._initRenderingContext();
      gl = this.context;

      this.updateViewportDimensions(this.width, this.height);
      this._initShaderProgram();
    } catch (e) {
      this.trigger(new ComponentEvent(EVENTS.ERROR, {
        type: ERROR_TYPE.NO_WEBGL,
        message: "no webgl support"
      }));
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

    this.texture = WebGLUtils.createTexture(gl, textureTarget)!;

    if (this._imageType === ImageType.CUBESTRIP) {
      // TODO: Apply following options on other projection type.
      gl.enable(gl.CULL_FACE);
      // gl.enable(gl.DEPTH_TEST);
    }
  }

  private _initRenderingContext() {
    if (this.hasRenderingContext()) {
      return;
    }

    if (!window.WebGLRenderingContext) {
      throw new Error("WebGLRenderingContext not available.");
    }

    this.context = WebGLUtils.getWebglContext(this.canvas, this._renderingContextAttributes)!;

    if (!this.context) {
      throw new Error("Failed to acquire 3D rendering context");
    }
  }

  private _initBuffers() {
    const image = this._image as HTMLImageElement | HTMLVideoElement;

    const vertexPositionData = this._renderer.getVertexPositionData();
    const indexData = this._renderer.getIndexData();
    const textureCoordData = this._renderer.getTextureCoordData({
      image,
      imageConfig: this._imageConfig!
    });
    const gl = this.context;

    this.vertexBuffer = WebGLUtils.initBuffer(
      gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3,
      (this.shaderProgram as any).vertexPositionAttribute);

    this.indexBuffer = WebGLUtils.initBuffer(
      gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);

    this.textureCoordBuffer = WebGLUtils.initBuffer(
      gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), this._isCubeMap ? 3 : 2,
      (this.shaderProgram as any).textureCoordAttribute);

    this._bindBuffers();
  }

  private _bindTexture() {
    // Detect if it is EAC Format while CUBESTRIP mode.
    // We assume it is EAC if image is not 3/2 ratio.
    if (this._imageType === ImageType.CUBESTRIP) {
      const { width, height } = this._renderer.getDimension(this._image as HTMLImageElement | HTMLVideoElement);
      const isEAC = width && height && width / height !== 1.5 ? 1 : 0;

      this.context.uniform1f(this.context.getUniformLocation(this.shaderProgram!, "uIsEAC"), isEAC);
    } else if (this._imageType === ImageType.PANORAMA) {
      const { width, height } = this._renderer.getDimension(this._image as HTMLImageElement | HTMLVideoElement);
      const imageAspectRatio = width && height && width / height;

      this._renderer.updateShaderData({imageAspectRatio});
    }

    // initialize shader buffers after image is loaded.(by updateShaderData)
    // because buffer may be differ by image size.(eg. CylinderRenderer)
    this._initBuffers();

    this._renderer.bindTexture(
      this.context,
      this.texture,
      this._image as HTMLImageElement | HTMLVideoElement,
      this._imageConfig!,
    );
    this._shouldForceDraw = true;

    this.trigger(new ComponentEvent(EVENTS.BIND_TEXTURE));
  }

  private _updateTexture() {
    this._renderer.updateTexture(
      this.context,
      this._image as HTMLImageElement | HTMLVideoElement,
      this._imageConfig!,
    );
  }

  private _render() {
    const yawPitchControl = this._yawPitchControl;
    const fov = yawPitchControl.getFov();

    if (yawPitchControl.shouldRenderWithQuaternion()) {
      const quaternion = yawPitchControl.getQuaternion();

      this.renderWithQuaternion(quaternion, fov);
    } else {
      const yawPitch = yawPitchControl.getYawPitch();

      this.renderWithYawPitch(yawPitch.yaw, yawPitch.pitch, fov);
    }
  }

  private _renderStereo = (time: number, frame: XRFrame) => {
    const vr = this._vr;
    const gl = this.context;

    const eyeParams = vr!.getEyeParams(gl, frame);

    if (!eyeParams) return;

    vr!.beforeRender(gl, frame);

    // Render both eyes
    for (const eyeIndex of [0, 1]) {
      const eyeParam = eyeParams[eyeIndex];

      this.mvMatrix = eyeParam.mvMatrix;
      this.pMatrix = eyeParam.pMatrix;

      gl.viewport(...eyeParam.viewport as [number, number, number, number]);
      gl.uniform1f((this.shaderProgram as any).uEye, eyeIndex);

      this._bindBuffers();
      this._draw();
    }

    vr!.afterRender();
  };

  private _bindBuffers() {
    const gl = this.context;
    const program = this.shaderProgram;

    const vertexBuffer = this.vertexBuffer;
    const textureCoordBuffer = this.textureCoordBuffer;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.enableVertexAttribArray((program as any).vertexPositionAttribute);
    gl.vertexAttribPointer(
      (program as any).vertexPositionAttribute, (vertexBuffer as any).itemSize, gl.FLOAT, false, 0, 0
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.enableVertexAttribArray((program as any).textureCoordAttribute);
    gl.vertexAttribPointer(
      (program as any).textureCoordAttribute, (textureCoordBuffer as any).itemSize, gl.FLOAT, false, 0, 0
    );
  }

  private _draw() {
    if (this._isVideo && this._keepUpdate) {
      this._updateTexture();
    }

    this._renderer.render({
      gl: this.context,
      shaderProgram: this.shaderProgram!,
      indexBuffer: this.indexBuffer!,
      mvMatrix: this.mvMatrix,
      pMatrix: this.pMatrix
    });
  }

  private _requestPresent(options) {
    const gl = this.context;
    const canvas = this.canvas;
    const animator = this._animator;

    this._vr = WEBXR_SUPPORTED ?
      new XRManager(options) :
      new VRManager();

    const vr = this._vr;

    animator.stop();
    return new Promise((resolve, reject) => {
      vr.requestPresent(canvas, gl)
        .then(() => {
          vr.addEndCallback(this.exitVR);
          animator.setContext(vr.context);
          animator.setCallback(this._onFirstVRFrame);

          if (IS_IOS) {
            this._setWrapperFullscreen();
          }

          this._shouldForceDraw = true;
          animator.start();

          resolve("success");
        })
        .catch(e => {
          vr.destroy();
          this._vr = null;
          animator.start();

          reject(e);
        });
    });
  }

  private _onFirstVRFrame = (time, frame) => {
    const vr = this._vr!;
    const gl = this.context;
    const animator = this._animator;

    // If rendering is not ready, wait for next frame
    if (!vr.canRender(frame)) return;

    const minusZDir = vec3.fromValues(0, 0, -1);
    const eyeParam = vr.getEyeParams(gl, frame)![0];
    // Extract only rotation
    const mvMatrix = mat3.fromMat4(mat3.create(), eyeParam.mvMatrix);
    const pMatrix = mat3.fromMat4(mat3.create(), eyeParam.pMatrix);

    const mvInv = mat3.invert(mat3.create(), mvMatrix);
    const pInv = mat3.invert(mat3.create(), pMatrix);
    const viewDir = vec3.transformMat3(vec3.create(), minusZDir, pInv);

    vec3.transformMat3(viewDir, viewDir, mvInv);

    const yawOffset = mathUtil.yawOffsetBetween(viewDir, vec3.fromValues(0, 0, 1));

    if (yawOffset === 0) {
      // If the yawOffset is exactly 0, then device sensor is not ready
      // So read it again until it has any value in it
      return;
    }

    vr.setYawOffset(yawOffset);
    animator.setCallback(this._renderStereo);
  };

  private _setWrapperFullscreen() {
    const wrapper = this._wrapper;

    if (!wrapper) return;

    this._wrapperOrigStyle = wrapper.getAttribute("style");
    const wrapperStyle = wrapper.style;

    wrapperStyle.width = "100vw";
    wrapperStyle.height = "100vh";
    wrapperStyle.position = "fixed";
    wrapperStyle.left = "0";
    wrapperStyle.top = "0";
    wrapperStyle.zIndex = "9999";
  }

  private _restoreStyle() {
    const wrapper = this._wrapper;
    const canvas = this.canvas;

    if (!wrapper) return;

    if (this._wrapperOrigStyle) {
      wrapper.setAttribute("style", this._wrapperOrigStyle);
    } else {
      wrapper.removeAttribute("style");
    }

    this._wrapperOrigStyle = null;

    // Restore canvas style
    canvas.removeAttribute("style");
    this._setDefaultCanvasStyle();
  }
}

export default PanoImageRenderer;
