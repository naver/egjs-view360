import Component, { ComponentEvent } from "@egjs/component";
import Promise from "promise-polyfill";
import { quat } from "gl-matrix";

import { DeviceMotionEvent, checkXRSupport } from "../utils/browserFeature";
import YawPitchControl, { YawPitchControlOptions } from "../YawPitchControl/YawPitchControl";
import PanoImageRenderer from "../PanoImageRenderer/PanoImageRenderer";
import WebGLUtils from "../PanoImageRenderer/WebGLUtils";
import { util as mathUtil } from "../utils/math-util";
import { VERSION } from "../version";
import { CubemapConfig, ValueOf } from "../types/internal";
import { AnimationEndEvent, ReadyEvent, ViewChangeEvent, ErrorEvent } from "../types/event";

import { ERROR_TYPE, PANOVIEWER_EVENTS as EVENTS, GYRO_MODE, PROJECTION_TYPE, STEREO_FORMAT, DEFAULT_CANVAS_CLASS } from "./consts";

export interface PanoViewerOptions {
  image: string | HTMLElement;
  video: string | HTMLElement;
  projectionType: ValueOf<typeof PROJECTION_TYPE>;
  cubemapConfig: Partial<CubemapConfig>;
  stereoFormat: ValueOf<typeof STEREO_FORMAT>;
  width: number;
  height: number;
  yaw: number;
  pitch: number;
  fov: number;
  showPolePoint: boolean;
  useZoom: boolean;
  useKeyboard: boolean;
  gyroMode: ValueOf<typeof GYRO_MODE>;
  yawRange: number[];
  pitchRange: number[];
  fovRange: number[];
  touchDirection: ValueOf<typeof PanoViewer.TOUCH_DIRECTION>;
  canvasClass: string;
}

export interface PanoViewerEvent {
  ready: ReadyEvent;
  viewChange: ViewChangeEvent;
  animationEnd: AnimationEndEvent<PanoViewer>;
  error: ErrorEvent;
}

/**
 * @memberof eg.view360
 * @extends eg.Component
 * PanoViewer
 */
class PanoViewer extends Component<PanoViewerEvent> {
  /**
   * Check whether the current environment can execute PanoViewer
   * @ko 현재 브라우저 환경에서 PanoViewer 실행이 가능한지 여부를 반환합니다.
   * @return PanoViewer executable <ko>PanoViewer 실행가능 여부</ko>
   */
  public static isSupported(): boolean {
    return WebGLUtils.isWebGLAvailable() && WebGLUtils.isStableWebGL();
  }

  /**
   * Check whether the current environment supports the WebGL
   * @ko 현재 브라우저 환경이 WebGL 을 지원하는지 여부를 확인합니다.
   * @return WebGL support <ko>WebGL 지원여부</ko>
   */
  public static isWebGLAvailable(): boolean {
    return WebGLUtils.isWebGLAvailable();
  }

  /**
   * Check whether the current environment supports the gyro sensor.
   * @ko 현재 브라우저 환경이 자이로 센서를 지원하는지 여부를 확인합니다.
   * @param callback Function to take the gyro sensor availability as argument <ko>자이로 센서를 지원하는지 여부를 인자로 받는 함수</ko>
   */
  public static isGyroSensorAvailable(callback: (isAvailable: boolean) => any) {
    if (!DeviceMotionEvent && callback) {
      callback(false);
      return;
    }

    let onDeviceMotionChange;

    const checkGyro = () => new Promise(res => {
      onDeviceMotionChange = deviceMotion => {
        const isGyroSensorAvailable = !(deviceMotion.rotationRate.alpha == null);

        res(isGyroSensorAvailable);
      };

      window.addEventListener("devicemotion", onDeviceMotionChange);
    });

    const timeout = () => new Promise(res => {
      setTimeout(() => res(false), 1000);
    });

    Promise.race([checkGyro(), timeout()]).then((isGyroSensorAvailable: boolean) => {
      window.removeEventListener("devicemotion", onDeviceMotionChange);

      if (callback) {
        callback(isGyroSensorAvailable);
      }

      PanoViewer.isGyroSensorAvailable = fb => {
        if (fb) {
          fb(isGyroSensorAvailable);
        }
        return isGyroSensorAvailable;
      };
    });
  }

  private static _isValidTouchDirection(direction) {
    return direction === PanoViewer.TOUCH_DIRECTION.NONE ||
      direction === PanoViewer.TOUCH_DIRECTION.YAW ||
      direction === PanoViewer.TOUCH_DIRECTION.PITCH ||
      direction === PanoViewer.TOUCH_DIRECTION.ALL;
  }

  /**
   * Version info string
   * @ko 버전정보 문자열
   * @name VERSION
   * @static
   * @type {String}
   * @example
   * eg.view360.PanoViewer.VERSION;  // ex) 3.0.1
   * @memberof eg.view360.PanoViewer
   */
  public static VERSION = VERSION;
  public static ERROR_TYPE = ERROR_TYPE;
  public static EVENTS = EVENTS;
  public static PROJECTION_TYPE = PROJECTION_TYPE;
  public static GYRO_MODE = GYRO_MODE;
  // This should be deprecated!
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static ProjectionType = PROJECTION_TYPE;
  public static STEREO_FORMAT = STEREO_FORMAT;

  /**
   * Constant value for touch directions
   * @ko 터치 방향에 대한 상수 값.
   * @namespace
   * @name TOUCH_DIRECTION
   */
  public static TOUCH_DIRECTION = {
    /**
     * Constant value for none direction.
     * @ko none 방향에 대한 상수 값.
     * @name NONE
     * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
     * @constant
     * @type {Number}
     * @default 1
     */
    NONE: YawPitchControl.TOUCH_DIRECTION_NONE,
    /**
     * Constant value for horizontal(yaw) direction.
     * @ko horizontal(yaw) 방향에 대한 상수 값.
     * @name YAW
     * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
     * @constant
     * @type {Number}
     * @default 6
     */
    YAW: YawPitchControl.TOUCH_DIRECTION_YAW,
    /**
     * Constant value for vertical direction.
     * @ko vertical(pitch) 방향에 대한 상수 값.
     * @name PITCH
     * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
     * @constant
     * @type {Number}
     * @default 24
     */
    PITCH: YawPitchControl.TOUCH_DIRECTION_PITCH,
    /**
     * Constant value for all direction.
     * @ko all 방향에 대한 상수 값.
     * @name ALL
     * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
     * @constant
     * @type {Number}
     * @default 30
     */
    ALL: YawPitchControl.TOUCH_DIRECTION_ALL
  };

  private _container: HTMLElement;
  // Options
  private _image: ConstructorParameters<typeof PanoImageRenderer>[0];
  private _isVideo: boolean;
  private _projectionType: ValueOf<typeof PROJECTION_TYPE>;
  private _cubemapConfig: Partial<CubemapConfig>;
  private _stereoFormat: ValueOf<typeof STEREO_FORMAT>;
  private _width: number;
  private _height: number;
  private _yaw: number;
  private _pitch: number;
  private _fov: number;
  private _gyroMode: ValueOf<typeof GYRO_MODE>;
  private _quaternion: quat | null;
  private _aspectRatio: number;
  private _isReady: boolean;
  private _canvasClass: string;

  // Internal Values
  private _photoSphereRenderer: PanoImageRenderer | null;
  private _yawPitchControl: YawPitchControl | null;

  /**
   * @classdesc 360 media viewer
   * @ko 360 미디어 뷰어
   *
   * @param container The container element for the renderer. <ko>렌더러의 컨테이너 엘리먼트</ko>
   * @param options
   *
   * @param {String|HTMLImageElement} options.image Input image url or element (Use only image property or video property)<ko>입력 이미지 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
   * @param {String|HTMLVideoElement} options.video Input video url or element(Use only image property or video property)<ko>입력 비디오 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
   * @param {String} [options.projectionType=equirectangular] The type of projection: equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}<ko>Projection 유형 : equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}</ko>
   * @param {Object} options.cubemapConfig Config cubemap projection layout. It is applied when projectionType is {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} or {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP}<ko>cubemap projection type 의 레이아웃을 설정한다. 이 설정은 ProjectionType이 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} 혹은 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP} 인 경우에만 적용된다.</ko>
   * @param {Object} [options.cubemapConfig.order = "RLUDBF"(ProjectionType === CUBEMAP) | "RLUDFB" (ProjectionType === CUBESTRIP)] Order of cubemap faces <ko>Cubemap 형태의 이미지가 배치된 순서</ko>
   * @param {Object} [options.cubemapConfig.tileConfig = { flipHorizontal:false, rotation: 0 }] Setting about rotation angle(degree) and whether to flip horizontal for each cubemap faces, if you put this object as a array, you can set each faces with different setting. For example, [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]<ko>각 Cubemap 면에 대한 회전 각도/좌우반전 여부 설정, 객체를 배열 형태로 지정하여 각 면에 대한 설정을 다르게 지정할 수도 있다. 예를 들어 [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]과 같이 지정할 수 있다.</ko>
   * @param {Number} [options.cubemapConfig.trim=0] A px distance to discard from each tile side. You can use this value to avoid graphical glitch at where tiles are connected. This option is available when there's only one texture.<ko>각 타일의 끝으로부터 폐기할 px 거리. 이 옵션을 사용하여 타일의 접합부에서 나타나는 그래픽 결함을 완화할 수 있습니다. 이 옵션은 한 개의 텍스쳐만 사용할 때 적용 가능합니다.</ko>
   * @param {String} [options.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection.<br/>See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다.<br/>{@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
   * @param {Number} [options.width=width of container] the viewer's width. (in px) <ko>뷰어의 너비 (px 단위)</ko>
   * @param {Number} [options.height=height of container] the viewer's height.(in px) <ko>뷰어의 높이 (px 단위)</ko>
   * @param {Number} [options.yaw=0] Initial Yaw of camera (in degree) <ko>카메라의 초기 Yaw (degree 단위)</ko>
   * @param {Number} [options.pitch=0] Initial Pitch of camera (in degree) <ko>카메라의 초기 Pitch (degree 단위)</ko>
   * @param {Number} [options.fov=65] Initial vertical field of view of camera (in degree) <ko>카메라의 초기 수직 field of view (degree 단위)</ko>
   * @param {Boolean} [options.showPolePoint=false] If false, the pole is not displayed inside the viewport <ko>false 인 경우, 극점은 뷰포트 내부에 표시되지 않습니다</ko>
   * @param {Boolean} [options.useZoom=true] When true, enables zoom with the wheel and Pinch gesture <ko>true 일 때 휠 및 집기 제스춰로 확대 / 축소 할 수 있습니다.</ko>
   * @param {Boolean} [options.useKeyboard=true] When true, enables the keyboard move key control: awsd, arrow keys <ko>true 이면 키보드 이동 키 컨트롤을 활성화합니다: awsd, 화살표 키</ko>
   * @param {String} [options.gyroMode=yawPitch] Enables control through device motion. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} <ko>디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} </ko>
   * @param {Array} [options.yawRange=[-180, 180]] Range of controllable Yaw values <ko>제어 가능한 Yaw 값의 범위</ko>
   * @param {Array} [options.pitchRange=[-90, 90]] Range of controllable Pitch values <ko>제어 가능한 Pitch 값의 범위</ko>
   * @param {Array} [options.fovRange=[30, 110]] Range of controllable vertical field of view values <ko>제어 가능한 수직 field of view 값의 범위</ko>
   * @param {Number} [options.touchDirection= {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}(6)] Direction of touch that can be controlled by user <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>사용자가 터치로 조작 가능한 방향 <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
   * @param {String} [options.canvasClass="view360-canvas"] A class name for the canvas element inside the container element. PanoViewer will use the canvas that has this class instead of creating one if it exists<ko>콘테이너 엘리먼트 내부의 캔버스 엘리먼트의 클래스 이름. PanoViewer는 해당 클래스를 갖는 캔버스 엘리먼트가 콘테이너 엘리먼트 내부에 존재할 경우, 새로 생성하는 대신 그 엘리먼트를 사용할 것입니다</ko>
   *
   * @example
   * ```
   * // PanoViewer Creation
   * // create PanoViewer with option
   * var PanoViewer = eg.view360.PanoViewer;
   * // Area where the image will be displayed(HTMLElement)
   * var container = document.getElementById("myPanoViewer");
   *
   * var panoViewer = new PanoViewer(container, {
   *   // If projectionType is not specified, the default is "equirectangular".
   *   // Specifies an image of the "equirectangular" type.
   *   image: "/path/to/image/image.jpg"
   * });
   * ```
   *
   * @example
   * ```
   * // Cubemap Config Setting Example
   * // For support Youtube EAC projection, You should set cubemapConfig as follows.
   * cubemapConfig: {
   *   order: "LFRDBU",
   *   tileConfig: [{rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: -90}, {rotation: 180}]
   * }
   * ```
   */
  public constructor(container: HTMLElement, options: Partial<PanoViewerOptions> = {}) {
    super();

    // Raises the error event if webgl is not supported.
    if (!WebGLUtils.isWebGLAvailable()) {
      setTimeout(() => {
        this.trigger(new ComponentEvent(EVENTS.ERROR, {
          type: ERROR_TYPE.NO_WEBGL,
          message: "no webgl support"
        }));
      }, 0);
      return this;
    }

    if (!WebGLUtils.isStableWebGL()) {
      setTimeout(() => {
        this.trigger(new ComponentEvent(EVENTS.ERROR, {
          type: ERROR_TYPE.INVALID_DEVICE,
          message: "blacklisted browser"
        }));
      }, 0);

      return this;
    }

    if (!!options.image && !!options.video) {
      setTimeout(() => {
        this.trigger(new ComponentEvent(EVENTS.ERROR, {
          type: ERROR_TYPE.INVALID_RESOURCE,
          message: "Specifying multi resouces(both image and video) is not valid."
        }));
      }, 0);
      return this;
    }

    // Check XR support at not when imported, but when created.
    // This is intended to make polyfills easier to use.
    checkXRSupport();

    this._container = container;
    this._image = options.image! as HTMLImageElement || options.video! as HTMLVideoElement;
    this._isVideo = !!options.video;
    this._projectionType = options.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
    this._cubemapConfig = {
      ...{
        /* RLUDBF is abnormal, we use it on CUBEMAP only for backward compatibility*/
        order: this._projectionType === PROJECTION_TYPE.CUBEMAP ? "RLUDBF" : "RLUDFB",
        tileConfig: {
          flipHorizontal: false,
          rotation: 0
        },
        trim: 0
      }, ...options.cubemapConfig
    };
    this._stereoFormat = options.stereoFormat || STEREO_FORMAT.TOP_BOTTOM;

    // If the width and height are not provided, will use the size of the container.
    this._width = options.width || parseInt(window.getComputedStyle(container).width, 10);
    this._height = options.height || parseInt(window.getComputedStyle(container).height, 10);

    /**
     * Cache the direction for the performance in renderLoop
     *
     * This value should be updated by "change" event of YawPitchControl.
     */
    this._yaw = options.yaw || 0;
    this._pitch = options.pitch || 0;
    this._fov = options.fov || 65;

    this._gyroMode = options.gyroMode || GYRO_MODE.YAWPITCH;
    this._quaternion = null;

    this._aspectRatio = this._height !== 0 ? this._width / this._height : 1;

    this._canvasClass = options.canvasClass || DEFAULT_CANVAS_CLASS;

    const fovRange = options.fovRange || [30, 110];
    const touchDirection = PanoViewer._isValidTouchDirection(options.touchDirection) ?
      options.touchDirection : YawPitchControl.TOUCH_DIRECTION_ALL;
    const yawPitchConfig = {
      ...options,
      ...{
        element: container,
        yaw: this._yaw,
        pitch: this._pitch,
        fov: this._fov,
        gyroMode: this._gyroMode,
        fovRange,
        aspectRatio: this._aspectRatio,
        touchDirection
      }
    };

    this._isReady = false;

    this._initYawPitchControl(yawPitchConfig);
    this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);
  }

  /**
   * Get the video element that the viewer is currently playing. You can use this for playback.
   * @ko 뷰어가 현재 사용 중인 비디오 요소를 얻습니다. 이 요소를 이용해 비디오의 컨트롤을 할 수 있습니다.
   * @return HTMLVideoElement<ko>HTMLVideoElement</ko>
   * @example
   * ```
   * var videoTag = panoViewer.getVideo();
   * videoTag.play(); // play the video!
   * ```
   */
  public getVideo() {
    if (!this._isVideo) {
      return null;
    }

    return this._photoSphereRenderer!.getContent() as HTMLVideoElement;
  }

  /**
   * Set the video information to be used by the viewer.
   * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
   * @param {string|HTMLVideoElement|object} video Input video url or element or config object<ko>입력 비디오 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정)</ko>
   * @param {object} param
   * @param {string} [param.projectionType={@link eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR}("equirectangular")] Projection Type<ko>프로젝션 타입</ko>
   * @param {object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃 설정</ko>
   * @param {string} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
   *
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   * @example
   * ```
   * panoViewer.setVideo("/path/to/video/video.mp4", {
   *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR
   * });
   * ```
   */
  public setVideo(video: string | HTMLElement | { type: string; src: string }, param: Partial<{
    projectionType: PanoViewer["_projectionType"];
    cubemapConfig: PanoViewer["_cubemapConfig"];
    stereoFormat: PanoViewer["_stereoFormat"];
  }> = {}) {
    if (video) {
      this.setImage(video, {
        projectionType: param.projectionType,
        isVideo: true,
        cubemapConfig: param.cubemapConfig,
        stereoFormat: param.stereoFormat
      });
    }

    return this;
  }

  /**
   * Get the image information that the viewer is currently using.
   * @ko 뷰어가 현재 사용하고있는 이미지 정보를 얻습니다.
   * @return Image Object<ko>이미지 객체</ko>
   * @example
   * var imageObj = panoViewer.getImage();
   */
  public getImage() {
    if (this._isVideo) {
      return null;
    }

    return this._photoSphereRenderer!.getContent();
  }

  /**
   * Set the image information to be used by the viewer.
   * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
   * @param {string|HTMLElement|object} image Input image url or element or config object<ko>입력 이미지 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정한다.)</ko>
   * @param {object} param Additional information<ko>이미지 추가 정보</ko>
   * @param {string} [param.projectionType="equirectangular"] Projection Type<ko>프로젝션 타입</ko>
   * @param {object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 레이아웃</ko>
   * @param {string} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
   * @param {boolean} [param.isVideo=false] Whether the given `imaage` is video or not.<ko>이미지가 비디오인지 여부</ko>
   *
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   * @example
   * ```
   * panoViewer.setImage("/path/to/image/image.png", {
   *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP
   * });
   * ```
   */
  public setImage(image: string | HTMLElement | { src: string; type: string }, param: Partial<{
    projectionType: PanoViewer["_projectionType"];
    cubemapConfig: PanoViewer["_cubemapConfig"];
    stereoFormat: PanoViewer["_stereoFormat"];
    isVideo: boolean;
  }> = {}) {
    const cubemapConfig = {
      ...{
        order: "RLUDBF",
        tileConfig: {
          flipHorizontal: false,
          rotation: 0
        },
        trim: 0
      }, ...param.cubemapConfig
    };
    const stereoFormat = param.stereoFormat || STEREO_FORMAT.TOP_BOTTOM;
    const isVideo = !!(param.isVideo);

    if (this._image && this._isVideo !== isVideo) {
      /* eslint-disable no-console */
      console.warn("PanoViewer is not currently supporting content type changes. (Image <--> Video)");
      /* eslint-enable no-console */
      return this;
    }

    if (image) {
      this._deactivate();

      this._image = image as HTMLImageElement;
      this._isVideo = isVideo;
      this._projectionType = param.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
      this._cubemapConfig = cubemapConfig;
      this._stereoFormat = stereoFormat;

      this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);
    }

    return this;
  }

  /**
   * Set whether the renderer always updates the texture and renders.
   * @ko 렌더러가 항상 텍스쳐를 갱신하고 화면을 렌더링 할지 여부를 설정할 수 있습니다.
   * @param doUpdate When true viewer will always update texture and render, when false viewer will not update texture and render only camera config is changed.<ko>true면 항상 텍스쳐를 갱신하고 화면을 그리는 반면, false면 텍스쳐 갱신은 하지 않으며, 카메라 요소에 변화가 있을 때에만 화면을 그립니다.</ko>
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public keepUpdate(doUpdate: boolean) {
    this._photoSphereRenderer!.keepUpdate(doUpdate);
    return this;
  }

  /**
   * Get the current projection type (equirectangular/cube)
   * @ko 현재 프로젝션 타입(Equirectangular 혹은 Cube)을 반환합니다.
   * @return {@link eg.view360.PanoViewer.PROJECTION_TYPE}
   */
  public getProjectionType() {
    return this._projectionType;
  }

  /**
   * Activate the device's motion sensor, and return the Promise whether the sensor is enabled
   * If it's iOS13+, this method must be used in the context of user interaction, like onclick callback on the button element.
   * @ko 디바이스의 모션 센서를 활성화하고, 활성화 여부를 담는 Promise를 리턴합니다.
   * iOS13+일 경우, 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
   * @return Promise containing nothing when resolved, or string of the rejected reason when rejected.<ko>Promise. resolve되었을 경우 아무것도 반환하지 않고, reject되었을 경우 그 이유를 담고있는 string을 반환한다.</ko>
   */
  public enableSensor() {
    return new Promise((resolve, reject) => {
      if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission().then(permissionState => {
          if (permissionState === "granted") {
            resolve();
          } else {
            reject(new Error("permission denied"));
          }
        }).catch(e => {
          // This can happen when this method wasn't triggered by user interaction
          reject(e);
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Disable the device's motion sensor.
   * @ko 디바이스의 모션 센서를 비활성화합니다.
   * @deprecated
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public disableSensor() {
    return this;
  }

  /**
   * Switch to VR stereo rendering mode which uses WebXR / WebVR API (WebXR is preferred).
   * This method must be used in the context of user interaction, like onclick callback on the button element.
   * It can be rejected when an enabling device sensor fails or image/video is still loading("ready" event not triggered).
   * @ko WebXR / WebVR API를 사용하는 VR 스테레오 렌더링 모드로 전환합니다. (WebXR을 더 선호합니다)
   * 이 메소드는 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
   * 디바이스 센서 활성화에 실패시 혹은 아직 이미지/비디오가 로딩중인 경우("ready"이벤트가 아직 트리거되지 않은 경우)에는 Promise가 reject됩니다.
   * @param {object} [options={}] Additional options for WebXR session, see {@link https://developer.mozilla.org/en-US/docs/Web/API/XRSessionInit XRSessionInit}.<ko>WebXR용 추가 옵션, {@link https://developer.mozilla.org/en-US/docs/Web/API/XRSessionInit XRSessionInit}을 참조해주세요.</ko>
   * @return Promise containing either a string of resolved reason or an Error instance of rejected reason.<ko>Promise가 resolve된 이유(string) 혹은 reject된 이유(Error)</ko>
   */
  public enterVR(options: {
    requiredFeatures?: any[];
    optionalFeatures?: any[];
    [key: string]: any;
  } = {}): globalThis.Promise<string> {
    if (!this._isReady) {
      return Promise.reject(new Error("PanoViewer is not ready to show image.")) as any;
    }

    return new Promise((resolve, reject) => {
      this.enableSensor()
        .then(() => this._photoSphereRenderer!.enterVR(options))
        .then((res: string) => resolve(res))
        .catch(e => reject(e));
    }) as any;
  }

  /**
   * Exit VR stereo rendering mode.
   * @ko VR 스테레오 렌더링 모드에서 일반 렌더링 모드로 전환합니다.
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public exitVR() {
    this._photoSphereRenderer!.exitVR();
    return this;
  }

  /**
   * When set true, enables zoom with the wheel or pinch gesture. However, in the case of touch, pinch works only when the touchDirection setting is {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}.
   * @ko true 로 설정 시 휠 혹은 집기 동작으로 확대/축소 할 수 있습니다. false 설정 시 확대/축소 기능을 비활성화 합니다. 단, 터치인 경우 touchDirection 설정이 {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL} 인 경우에만 pinch 가 동작합니다.
   * @param useZoom
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public setUseZoom(useZoom: boolean): this {
    if (typeof useZoom === "boolean") {
      this._yawPitchControl!.option("useZoom", useZoom);
    }

    return this;
  }

  /**
   * When true, enables the keyboard move key control: awsd, arrow keys
   * @ko true이면 키보드 이동 키 컨트롤을 활성화합니다. (awsd, 화살표 키)
   * @param useKeyboard
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public setUseKeyboard(useKeyboard: boolean): this {
    this._yawPitchControl!.option("useKeyboard", useKeyboard);
    return this;
  }

  /**
   * Enables control through device motion. ("none", "yawPitch", "VR")
   * @ko 디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR")
   * @param gyroMode {@link eg.view360.PanoViewer.GYRO_MODE}
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   * @example
   * ```
   * panoViewer.setGyroMode("yawPitch");
   * //equivalent
   * panoViewer.setGyroMode(eg.view360.PanoViewer.GYRO_MODE.YAWPITCH);
   * ```
   */
  public setGyroMode(gyroMode: PanoViewer["_gyroMode"]) {
    this._yawPitchControl!.option("gyroMode", gyroMode);
    return this;
  }

  /**
   * Set the range of controllable FOV values
   * @ko 제어 가능한 FOV 구간을 설정합니다.
   * @param range
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   * @example
   * panoViewer.setFovRange([50, 90]);
   */
  public setFovRange(range: number[]) {
    this._yawPitchControl!.option("fovRange", range);
    return this;
  }

  /**
   * Get the range of controllable FOV values
   * @ko 제어 가능한 FOV 구간을 반환합니다.
   * @return FOV range
   * @example
   * var range = panoViewer.getFovRange(); // [50, 90]
   */
  public getFovRange(): [number, number] {
    return this._yawPitchControl!.option("fovRange") as [number, number];
  }

  /**
   * Update size of canvas element by it's container element's or specified size. If size is not specified, the size of the container area is obtained and updated to that size.
   * @ko 캔버스 엘리먼트의 크기를 컨테이너 엘리먼트의 크기나 지정된 크기로 업데이트합니다. 만약 size 가 지정되지 않으면 컨테이너 영역의 크기를 얻어와 해당 크기로 갱신합니다.
   * @param {object} [size]
   * @param {number} [size.width=width of the container]
   * @param {number} [size.height=height of the container]
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public updateViewportDimensions(size: Partial<{
    width: number;
    height: number;
  }> = {}): this {
    if (!this._isReady) {
      return this;
    }

    let containerSize;

    if (size.width === undefined || size.height === undefined) {
      containerSize = window.getComputedStyle(this._container);
    }

    const width = size.width || parseInt(containerSize.width, 10);
    const height = size.height || parseInt(containerSize.height, 10);

    // Skip if viewport is not changed.
    if (width === this._width && height === this._height) {
      return this;
    }

    this._width = width;
    this._height = height;

    this._aspectRatio = width / height;
    this._photoSphereRenderer!.updateViewportDimensions(width, height);
    this._yawPitchControl!.option("aspectRatio", this._aspectRatio);
    this._yawPitchControl!.updatePanScale({height});

    this.lookAt({}, 0);
    return this;
  }

  /**
   * Get the current field of view(FOV)
   * @ko 현재 field of view(FOV) 값을 반환합니다.
   */
  public getFov(): number {
    return this._fov;
  }

  /**
   * Get current yaw value
   * @ko 현재 yaw 값을 반환합니다.
   */
  public getYaw() {
    return this._yaw;
  }

  /**
   * Get current pitch value
   * @ko 현재 pitch 값을 반환합니다.
   */
  public getPitch() {
    return this._pitch;
  }

  /**
   * Get the range of controllable Yaw values
   * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
   */
  public getYawRange(): [number, number] {
    return this._yawPitchControl!.option("yawRange") as [number, number];
  }

  /**
   * Get the range of controllable Pitch values
   * @ko 컨트롤 가능한 Pitch 구간을 가져옵니다.
   */
  public getPitchRange(): [number, number] {
    return this._yawPitchControl!.option("pitchRange") as [number, number];
  }

  /**
   * Set the range of controllable yaw
   * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
   * @param {number[]} range
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   * @example
   * panoViewer.setYawRange([-90, 90]);
   */
  public setYawRange(yawRange: number[]) {
    this._yawPitchControl!.option("yawRange", yawRange);
    return this;
  }

  /**
   * Set the range of controllable Pitch values
   * @ko 컨트롤 가능한 Pitch 구간을 설정합니다.
   * @param {number[]} range
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   * @example
   * panoViewer.setPitchRange([-40, 40]);
   */
  public setPitchRange(pitchRange: number[]) {
    this._yawPitchControl!.option("pitchRange", pitchRange);
    return this;
  }

  /**
   * Specifies whether to display the pole by limiting the pitch range. If it is true, pole point can be displayed. If it is false, it is not displayed.
   * @ko pitch 범위를 제한하여 극점을 표시할지를 지정합니다. true 인 경우 극점까지 표현할 수 있으며 false 인 경우 극점까지 표시하지 않습니다.
   * @param showPolePoint
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public setShowPolePoint(showPolePoint: boolean) {
    this._yawPitchControl!.option("showPolePoint", showPolePoint);
    return this;
  }

  /**
   * Set a new view by setting camera configuration. Any parameters not specified remain the same.
   * @ko 카메라 설정을 지정하여 화면을 갱신합니다. 지정되지 않은 매개 변수는 동일하게 유지됩니다.
   * @param {object} orientation
   * @param {number} orientation.yaw Target yaw in degree <ko>목표 yaw (degree 단위)</ko>
   * @param {number} orientation.pitch Target pitch in degree <ko>목표 pitch (degree 단위)</ko>
   * @param {number} orientation.fov Target vertical fov in degree <ko>목표 수직 fov (degree 단위)</ko>
   * @param {number} duration Animation duration in milliseconds <ko>애니메이션 시간 (밀리 초)</ko>
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   * @example
   * ```
   * // Change the yaw angle (absolute angle) to 30 degrees for one second.
   * panoViewer.lookAt({yaw: 30}, 1000);
   * ```
   */
  public lookAt(orientation: Partial<{
    yaw: number;
    pitch: number;
    fov: number;
  }>, duration: number = 0) {
    if (!this._isReady) {
      return this;
    }

    const yaw = orientation.yaw !== undefined ? orientation.yaw : this._yaw;
    const pitch = orientation.pitch !== undefined ? orientation.pitch : this._pitch;
    const pitchRange = this._yawPitchControl!.option("pitchRange");
    const verticalAngleOfImage = pitchRange[1] - pitchRange[0];
    let fov = orientation.fov !== undefined ? orientation.fov : this._fov;

    if (verticalAngleOfImage < fov) {
      fov = verticalAngleOfImage;
    }

    this._yawPitchControl!.lookAt({yaw, pitch, fov}, duration);

    if (duration === 0) {
      this._photoSphereRenderer!.renderWithYawPitch(yaw, pitch, fov);
    }
    return this;
  }

  /**
   * Set touch direction by which user can control.
   * @ko 사용자가 조작가능한 터치 방향을 지정합니다.
   * @param direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
   * @return PanoViewer instance
   * @example
   * ```
   * panoViewer = new PanoViewer(el);
   * // Limit the touch direction to the yaw direction only.
   * panoViewer.setTouchDirection(eg.view360.PanoViewer.TOUCH_DIRECTION.YAW);
   * ```
   */
  public setTouchDirection(direction: number): this {
    if (PanoViewer._isValidTouchDirection(direction)) {
      this._yawPitchControl!.option("touchDirection", direction);
    }

    return this;
  }

  /**
   * Returns touch direction by which user can control
   * @ko 사용자가 조작가능한 터치 방향을 반환한다.
   * @return direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
   * @example
   * ```
   * panoViewer = new PanoViewer(el);
   * // Returns the current touch direction.
   * var dir = panoViewer.getTouchDirection();
   * ```
   */
  public getTouchDirection(): number {
    return this._yawPitchControl!.option("touchDirection") ;
  }

  /**
   * Destroy viewer. Remove all registered event listeners and remove viewer canvas.
   * @ko 뷰어 인스턴스를 해제합니다. 모든 등록된 이벤트리스너를 제거하고 뷰어 캔버스를 삭제합니다.
   * @return PanoViewer instance<ko>PanoViewer 인스턴스</ko>
   */
  public destroy(): this {
    this._deactivate();

    if (this._yawPitchControl) {
      this._yawPitchControl.destroy();
      this._yawPitchControl = null;
    }

    return this;
  }

  // TODO: Remove parameters as they're just using private values
  private _initRenderer(
    yaw: number,
    pitch: number,
    fov: number,
    projectionType: PanoViewer["_projectionType"],
    cubemapConfig: PanoViewer["_cubemapConfig"]
  ) {
    this._photoSphereRenderer = new PanoImageRenderer(
      this._image,
      this._width,
      this._height,
      this._isVideo,
      this._container,
      this._canvasClass,
      {
        initialYaw: yaw,
        initialPitch: pitch,
        fieldOfView: fov,
        imageType: projectionType,
        cubemapConfig,
        stereoFormat: this._stereoFormat
      },
    );
    this._photoSphereRenderer.setYawPitchControl(this._yawPitchControl!);

    this._bindRendererHandler();

    this._photoSphereRenderer
      .bindTexture()
      .then(() => this._activate())
      .catch(() => {
        this.trigger(new ComponentEvent(EVENTS.ERROR, {
          type: ERROR_TYPE.FAIL_BIND_TEXTURE,
          message: "failed to bind texture"
        }));
      });
  }

  /**
   * @private
   * update values of YawPitchControl if needed.
   * For example, In Panorama mode, initial fov and pitchRange is changed by aspect ratio of image.
   *
   * This function should be called after isReady status is true.
   */
  private _updateYawPitchIfNeeded() {
    if (this._projectionType === PanoViewer.ProjectionType.PANORAMA) {
      // update fov by aspect ratio
      const image = this._photoSphereRenderer!.getContent()! as HTMLImageElement;
      let imageAspectRatio = image.naturalWidth / image.naturalHeight;
      let yawSize;
      let maxFov;

      // If height is larger than width, then we assume it's rotated by 90 degree.
      if (imageAspectRatio < 1) {
        // So inverse the aspect ratio.
        imageAspectRatio = 1 / imageAspectRatio;
      }

      if (imageAspectRatio < 6) {
        yawSize = mathUtil.toDegree(imageAspectRatio);
        // 0.5 means ratio of half height of cylinder(0.5) and radius of cylider(1). 0.5/1 = 0.5
        maxFov = mathUtil.toDegree(Math.atan(0.5)) * 2;
      } else {
        yawSize = 360;
        maxFov = (360 / imageAspectRatio); // Make it 5 fixed as axes does.
      }

      // console.log("_updateYawPitchIfNeeded", maxFov, "aspectRatio", image.naturalWidth, image.naturalHeight, "yawSize", yawSize);
      const minFov = (this._yawPitchControl!.option("fovRange"))[0];

      // this option should be called after fov is set.
      this._yawPitchControl!.option({
        "fov": maxFov, /* parameter for internal validation for pitchrange */
        "yawRange": [-yawSize / 2, yawSize / 2],
        "pitchRange": [-maxFov / 2, maxFov / 2],
        "fovRange": [minFov, maxFov]
      });
      this.lookAt({fov: maxFov});
    }
  }

  private	_bindRendererHandler() {
    this._photoSphereRenderer!.on(PanoImageRenderer.EVENTS.ERROR, e => {
      this.trigger(new ComponentEvent(EVENTS.ERROR, e));
    });

    this._photoSphereRenderer!.on(PanoImageRenderer.EVENTS.RENDERING_CONTEXT_LOST, () => {
      this._deactivate();
      this.trigger(new ComponentEvent(EVENTS.ERROR, {
        type: ERROR_TYPE.RENDERING_CONTEXT_LOST,
        message: "webgl rendering context lost"
      }));
    });
  }

  private _initYawPitchControl(yawPitchConfig: Partial<YawPitchControlOptions>) {
    this._yawPitchControl = new YawPitchControl(yawPitchConfig);

    this._yawPitchControl.on(EVENTS.ANIMATION_END, e => {
      this.trigger(new ComponentEvent(EVENTS.ANIMATION_END, e));
    });

    this._yawPitchControl.on("change", e => {
      this._yaw = e.yaw;
      this._pitch = e.pitch;
      this._fov = e.fov;
      this._quaternion = e.quaternion;

      this.trigger(new ComponentEvent(EVENTS.VIEW_CHANGE, {
        yaw: e.yaw,
        pitch: e.pitch,
        fov: e.fov,
        quaternion: e.quaternion,
        isTrusted: e.isTrusted
      }));
    });
  }

  private _activate() {
    this._photoSphereRenderer!.attachTo(this._container);
    this._yawPitchControl!.enable();

    this.updateViewportDimensions();

    this._isReady = true;

    // update yawPitchControl after isReady status is true.
    this._updateYawPitchIfNeeded();

    this.trigger(new ComponentEvent(EVENTS.READY));
    this._photoSphereRenderer!.startRender();
  }

  /**
   * Destroy webgl context and block user interaction and stop rendering
   */
  private _deactivate() {
    // Turn off the video if it has one
    const video = this.getVideo();
    if (video) {
      video.pause();
    }

    if (this._isReady) {
      this._photoSphereRenderer!.stopRender();
      this._yawPitchControl!.disable();
      this._isReady = false;
    }

    if (this._photoSphereRenderer) {
      this._photoSphereRenderer.destroy();
      this._photoSphereRenderer = null;
    }
  }
}

export default PanoViewer;

