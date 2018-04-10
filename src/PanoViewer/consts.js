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
import {GYRO_MODE} from "../YawPitchControl/consts";

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
const EVENTS = {
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
const PROJECTION_TYPE = {
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
	CUBEMAP: "cubemap"
};

module.exports = {
	GYRO_MODE,
	EVENTS,
	ERROR_TYPE,
	PROJECTION_TYPE
};
