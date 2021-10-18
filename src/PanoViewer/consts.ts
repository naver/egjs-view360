/**
 * Constant value for gyro mode. <br>(Reference {@link https://github.com/naver/egjs-view360/wiki/PanoViewer-3.0-User-Guide})
 * @ko gyro 모드 대한 상수 값. <br>({@link https://github.com/naver/egjs-view360/wiki/PanoViewer-3.0-User-Guide} 참고)
 * @namespace
 * @name GYRO_MODE
 * @memberof eg.view360.PanoViewer
 */
/**
 * Disable gyro
 * @ko gyro 비활성화
 * @name NONE
 * @memberof eg.view360.PanoViewer.GYRO_MODE
 * @constant
 * @type {String}
 * @default "none"
 */
/**
 * YawPitch Mode
 * @ko YawPitch Mode
 * @name YAWPITCH
 * @memberof eg.view360.PanoViewer.GYRO_MODE
 * @constant
 * @type {String}
 * @default "yawPitch"
 */
/**
 * VR Mode
 * @ko VR Mode
 * @name VR
 * @memberof eg.view360.PanoViewer.GYRO_MODE
 * @constant
 * @type {String}
 * @default "VR"
 */
import { PanoViewerOptions } from "../PanoViewer/PanoViewer";
import { GYRO_MODE } from "../YawPitchControl/consts";

/**
 * Constant value for errors
 * @ko 에러에 대한 상수 값
 * @namespace
 * @name ERROR_TYPE
 * @memberof eg.view360.PanoViewer
 */
const ERROR_TYPE = {
  /**
   * Unsupported device
   * @ko 미지원 기기
   * @name INVALID_DEVICE
   * @memberof eg.view360.PanoViewer.ERROR_TYPE
   * @constant
   * @type {Number}
   * @default 10
   */
  INVALID_DEVICE: 10,
  /**
   * Webgl not support
   * @ko WEBGL 미지원
   * @name NO_WEBGL
   * @memberof eg.view360.PanoViewer.ERROR_TYPE
   * @constant
   * @type {Number}
   * @default 11
   */
  NO_WEBGL: 11,
  /**
   * Failed to load image
   * @ko 이미지 로드 실패
   * @name FAIL_IMAGE_LOAD
   * @memberof eg.view360.PanoViewer.ERROR_TYPE
   * @constant
   * @type {Number}
   * @default 12
   */
  FAIL_IMAGE_LOAD: 12,
  /**
   * Failed to bind texture
   * @ko 텍스쳐 바인딩 실패
   * @name FAIL_BIND_TEXTURE
   * @memberof eg.view360.PanoViewer.ERROR_TYPE
   * @constant
   * @type {Number}
   * @default 13
   */
  FAIL_BIND_TEXTURE: 13,
  /**
   * Only one resource(image or video) should be specified
   * @ko 리소스 지정 오류 (image 혹은 video 중 하나만 지정되어야 함)
   * @name INVALID_RESOURCE
   * @memberof eg.view360.PanoViewer.ERROR_TYPE
   * @constant
   * @type {Number}
   * @default 14
   */
  INVALID_RESOURCE: 14,
  /**
   * WebGL context lost occurred
   * @ko WebGL context lost 발생
   * @name RENDERING_CONTEXT_LOST
   * @memberof eg.view360.PanoViewer.ERROR_TYPE
   * @constant
   * @type {Number}
   * @default 15
   */
  RENDERING_CONTEXT_LOST: 15
};

/**
 * Constant value for events
 * @ko 이벤트에 대한 상수 값
 * @namespace
 * @name EVENTS
 * @memberof eg.view360.PanoViewer
 */
const PANOVIEWER_EVENTS: {
  READY: "ready";
  VIEW_CHANGE: "viewChange";
  ANIMATION_END: "animationEnd";
  ERROR: "error";
} = {
  /**
   * Events that is fired when PanoViewer is ready to show image and handle user interaction.
   * @ko PanoViewer 가 사용자의 인터렉션 및 렌더링이 준비되상태에 발생하는 이벤트
   * @name READY
   * @memberof eg.view360.PanoViewer.EVENTS
   * @constant
   * @type {String}
   * @default ready
   */
  READY: "ready",
  /**
   * Events that is fired when direction or fov is changed.
   * @ko PanoViewer 에서 바라보고 있는 방향이나 FOV(화각)가 변경되었을때 발생하는 이벤트
   * @name VIEW_CHANGE
   * @memberof eg.view360.PanoViewer.EVENTS
   * @constant
   * @type {String}
   * @default viewChange
   */
  VIEW_CHANGE: "viewChange",
  /**
   * Events that is fired when animation which is triggered by inertia is ended.
   * @ko 관성에 의한 애니메이션 동작이 완료되었을때 발생하는 이벤트
   * @name ANIMATION_END
   * @memberof eg.view360.PanoViewer.EVENTS
   * @constant
   * @type {String}
   * @default animationEnd
   */
  ANIMATION_END: "animationEnd",
  /**
   * Events that is fired when error occurs
   * @ko 에러 발생 시 발생하는 이벤트
   * @name ERROR
   * @memberof eg.view360.PanoViewer.EVENTS
   * @constant
   * @type {String}
   * @default error
   */
  ERROR: "error"
};

/**
 * Constant value for projection type
 * @ko 프로젝션 타입 대한 상수 값
 * @namespace
 * @name PROJECTION_TYPE
 * @memberof eg.view360.PanoViewer
 */
const PROJECTION_TYPE: {
  EQUIRECTANGULAR: "equirectangular";
  CUBEMAP: "cubemap";
  CUBESTRIP: "cubestrip";
  PANORAMA: "panorama";
  STEREOSCOPIC_EQUI: "stereoequi";
} = {
  /**
   * Constant value for equirectangular type.
   * @ko equirectangular 에 대한 상수 값.
   * @name EQUIRECTANGULAR
   * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
   * @constant
   * @type {String}
   * @default equirectangular
   */
  EQUIRECTANGULAR: "equirectangular",
  /**
   * Constant value for cubemap type.
   * @ko cubemap 에 대한 상수 값.
   * @name CUBEMAP
   * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
   * @constant
   * @type {String}
   * @default cubemap
   */
  CUBEMAP: "cubemap",
  /**
   * Constant value for cubestrip type.
   * Cubestrip is a format for a single image with a combination of six cube faces. It is almost identical to cubemap, but it is implemented in a different way. It aims at better performance and efficiency. In addition, it automatically detects and supports EAC.
   * @ko cubemap 에 대한 상수 값.Cubestrip 은 cube 면이 6개가 조합된 조합을 한장의 이미지를 위한 포맷이다. cubemap 과 사용방법이 거의 동일하지만 다른 방식으로 구현되었다. 보다 좋은 성능과 효율성을 목적으로 한다. 더불어 자동으로 EAC 를 감지하고 지원한다.
   * @name CUBESTRIP
   * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
   * @constant
   * @type {String}
   * @default cubestrip
   */
  CUBESTRIP: "cubestrip",
  /**
   * Constant value for PANORAMA type.
   *
   * PANORAMA is a format for a panorma image which is taken from smartphone.
   * @ko PANORAMA 에 대한 상수값. 파노라마는 스마트 폰에서 가져온 파노라마 이미지의 형식입니다.
   *
   * @name PANORAMA
   * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
   * @constant
   * @type {String}
   * @default panorama
   */
  PANORAMA: "panorama",
  /**
   * Constant value for EQUI_STEREOSCOPY type.
   *
   * Constant value for EQUI_STEREOSCOPY. Stereoscopy image format of EQUIRECTANGULAR. It is an experimental function to show a stereoscopic type equirectangular image on a plane. It does not support stereoscopic viewing function through special visual equipment at present.
   * @ko EQUI_STEREOSCOPY 에 대한 상수값. EQUIRECTANGULAR 의 Stereoscopy 이미지 형식입니다. Stereoscopic 형태의 equirectangular 이미지를 평면에 보여주기 위한 실험적인 기능으로 현재는 특수한 시각 장비를 통한 입체적인 보기 기능은 지원하지 않습니다.
   *
   * @name STEREOSCOPIC_EQUI
   * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
   * @constant
   * @type {String}
   * @default stereoequi
   */
  STEREOSCOPIC_EQUI: "stereoequi"
};

/**
 * A constant value for the format of the stereoscopic equirectangular projection type.
 * @ko Stereoscopic equirectangular 프로젝션 타입의 포맷에 대한 상수 값
 * @namespace
 * @name STEREO_FORMAT
 * @memberof eg.view360.PanoViewer
 */
const STEREO_FORMAT: {
  TOP_BOTTOM: "3dv";
  LEFT_RIGHT: "3dh";
  NONE: "";
} = {
  /**
   * A constant value for format of top bottom stereoscopic 360 equirectangular projection.
   * @ko top bottom stereoscopic 360 equirectangular projection 콘텐츠 포맷에 대한 상수값.
   * @name TOP_BOTTOM
   * @memberof eg.view360.PanoViewer.STEREO_FORMAT
   * @constant
   * @type {String}
   * @default "3dv"
   */
  TOP_BOTTOM: "3dv",
  /**
   * A constant value for format of left right stereoscopic 360 equirectangular projection.
   * @ko Left right stereoscopic 360 equirectangular projection 콘텐츠 포맷에 대한 상수값.
   * @name LEFT_RIGHT
   * @memberof eg.view360.PanoViewer.STEREO_FORMAT
   * @constant
   * @type {String}
   * @default "3dh"
   */
  LEFT_RIGHT: "3dh",
  /**
   * A constant value specifying media is not in stereoscopic format.
   * @ko Stereoscopic 영상이 아닐 경우에 적용하는 상수값.
   * @name NONE
   * @memberof eg.view360.PanoViewer.STEREO_FORMAT
   * @constant
   * @type {String}
   * @default ""
   */
  NONE: ""
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PANOVIEWER_OPTIONS: { [key in keyof PanoViewerOptions]: true } = {
  image: true,
  video: true,
  projectionType: true,
  cubemapConfig: true,
  stereoFormat: true,
  width: true,
  height: true,
  yaw: true,
  pitch: true,
  fov: true,
  showPolePoint: true,
  useZoom: true,
  useKeyboard: true,
  gyroMode: true,
  yawRange: true,
  pitchRange: true,
  fovRange: true,
  touchDirection: true,
  canvasClass: true
};

const DEFAULT_CANVAS_CLASS = "view360-canvas";

export {
  GYRO_MODE,
  PANOVIEWER_EVENTS,
  ERROR_TYPE,
  PROJECTION_TYPE,
  STEREO_FORMAT,
  PANOVIEWER_OPTIONS,
  DEFAULT_CANVAS_CLASS
};
