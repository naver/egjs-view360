import Component from "@egjs/component";
import {glMatrix} from "gl-matrix";
import {
	DeviceMotionEvent, checkXRSupport
} from "../utils/browserFeature";

import YawPitchControl from "../YawPitchControl/YawPitchControl";
import PanoImageRenderer from "../PanoImageRenderer/PanoImageRenderer";
import WebGLUtils from "../PanoImageRenderer/WebGLUtils";
import {ERROR_TYPE, EVENTS, GYRO_MODE, PROJECTION_TYPE, STEREO_FORMAT} from "./consts";
import {util as mathUtil} from "../utils/math-util.js";
import {VERSION} from "../version";

class PanoViewer extends Component {
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
	static VERSION = VERSION;
	static ERROR_TYPE = ERROR_TYPE;
	static EVENTS = EVENTS;
	static PROJECTION_TYPE = PROJECTION_TYPE;
	static GYRO_MODE = GYRO_MODE;
	// It should be deprecated!
	static ProjectionType = PROJECTION_TYPE;
	static STEREO_FORMAT = STEREO_FORMAT;
	/**
	 * Constant value for touch directions
	 * @ko 터치 방향에 대한 상수 값.
	 * @namespace
	 * @name TOUCH_DIRECTION
	 * @memberof eg.view360.PanoViewer
	 */
	static TOUCH_DIRECTION = {
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

	/**
	 * @classdesc 360 media viewer
	 * @ko 360 미디어 뷰어
	 * @class
	 * @name eg.view360.PanoViewer
	 * @extends eg.Component
	 *
	 * @param {HTMLElement} container The container element for the renderer. <ko>렌더러의 컨테이너 엘리먼트</ko>
	 * @param {Object} config
	 *
	 * @param {String|Image} config.image Input image url or element (Use only image property or video property)<ko>입력 이미지 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
	 * @param {String|HTMLVideoElement} config.video Input video url or element(Use only image property or video property)<ko>입력 비디오 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
	 * @param {String} [config.projectionType=equirectangular] The type of projection: equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}<ko>Projection 유형 : equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}</ko>
	 * @param {Object} config.cubemapConfig config cubemap projection layout. It is applied when projectionType is {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} or {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP}<ko>cubemap projection type 의 레이아웃을 설정한다. 이 설정은 ProjectionType이 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} 혹은 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP} 인 경우에만 적용된다.</ko>
	 * @param {Object} [config.cubemapConfig.order = "RLUDBF"(ProjectionType === CUBEMAP) | "RLUDFB" (ProjectionType === CUBESTRIP)] Order of cubemap faces <ko>Cubemap 형태의 이미지가 배치된 순서</ko>
	 * @param {Object} [config.cubemapConfig.tileConfig = {flipHorizontal:false, rotation: 0}] Setting about rotation angle(degree) and whether to flip horizontal for each cubemap faces, if you put this object as a array, you can set each faces with different setting. For example, [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]<ko>각 Cubemap 면에 대한 회전 각도/좌우반전 여부 설정, 객체를 배열 형태로 지정하여 각 면에 대한 설정을 다르게 지정할 수도 있다. 예를 들어 [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]과 같이 지정할 수 있다.</ko>
	 * @param {String} [config.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection.<br/>See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다.<br/>{@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
	 * @param {Number} [config.width=width of container] the viewer's width. (in px) <ko>뷰어의 너비 (px 단위)</ko>
	 * @param {Number} [config.height=height of container] the viewer's height.(in px) <ko>뷰어의 높이 (px 단위)</ko>
	 *
	 * @param {Number} [config.yaw=0] Initial Yaw of camera (in degree) <ko>카메라의 초기 Yaw (degree 단위)</ko>
	 * @param {Number} [config.pitch=0] Initial Pitch of camera (in degree) <ko>카메라의 초기 Pitch (degree 단위)</ko>
	 * @param {Number} [config.fov=65] Initial vertical field of view of camera (in degree) <ko>카메라의 초기 수직 field of view (degree 단위)</ko>
	 * @param {Boolean} [config.showPolePoint=false] If false, the pole is not displayed inside the viewport <ko>false 인 경우, 극점은 뷰포트 내부에 표시되지 않습니다</ko>
	 * @param {Boolean} [config.useZoom=true] When true, enables zoom with the wheel and Pinch gesture <ko>true 일 때 휠 및 집기 제스춰로 확대 / 축소 할 수 있습니다.</ko>
	 * @param {Boolean} [config.useKeyboard=true] When true, enables the keyboard move key control: awsd, arrow keys <ko>true 이면 키보드 이동 키 컨트롤을 활성화합니다: awsd, 화살표 키</ko>
	 * @param {String} [config.gyroMode=yawPitch] Enables control through device motion. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} <ko>디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} </ko>
	 * @param {Array} [config.yawRange=[-180, 180]] Range of controllable Yaw values <ko>제어 가능한 Yaw 값의 범위</ko>
	 * @param {Array} [config.pitchRange=[-90, 90]] Range of controllable Pitch values <ko>제어 가능한 Pitch 값의 범위</ko>
	 * @param {Array} [config.fovRange=[30, 110]] Range of controllable vertical field of view values <ko>제어 가능한 수직 field of view 값의 범위</ko>
	 * @param {Number} [config.touchDirection= {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}(6)] Direction of touch that can be controlled by user <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>사용자가 터치로 조작 가능한 방향 <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
	 *
	 * @example
	 * // PanoViewer Creation
	 * // create PanoViewer with option
	 * var PanoViewer = eg.view360.PanoViewer;
	 * // Area where the image will be displayed(HTMLElement)
	 * var container = document.getElementById("myPanoViewer");
	 *
	 * var panoViewer = new PanoViewer(container, {
	 *     // If projectionType is not specified, the default is "equirectangular".
	 *     // Specifies an image of the "equirectangular" type.
	 *     image: "/path/to/image/image.jpg"
	 *});
	 *
	 * @example
	 * // Cubemap Config Setting Example
	 * // For support Youtube EAC projection, You should set cubemapConfig as follows.
	 * cubemapConfig: {
	 * 	order: "LFRDBU",
	 * 	tileConfig: [
	 * 		tileConfig: [{rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: -90}, {rotation: 180}]
	 * 	]
	 * }
	 */
	constructor(container, options = {}) {
		super();

		// Raises the error event if webgl is not supported.
		if (!WebGLUtils.isWebGLAvailable()) {
			setTimeout(() => {
				this.trigger(EVENTS.ERROR, {
					type: ERROR_TYPE.NO_WEBGL,
					message: "no webgl support"
				});
			}, 0);
			return this;
		}

		if (!WebGLUtils.isStableWebGL()) {
			setTimeout(() => {
				this.trigger(EVENTS.ERROR, {
					type: ERROR_TYPE.INVALID_DEVICE,
					message: "blacklisted browser"
				});
			}, 0);

			return this;
		}

		if (!!options.image && !!options.video) {
			setTimeout(() => {
				this.trigger(EVENTS.ERROR, {
					type: ERROR_TYPE.INVALID_RESOURCE,
					message: "Specifying multi resouces(both image and video) is not valid."
				});
			}, 0);
			return this;
		}

		// Check XR support at not when imported, but when created.
		// This is intended to make polyfills easier to use.
		checkXRSupport();

		this._container = container;
		this._image = options.image || options.video;
		this._isVideo = !!options.video;
		this._projectionType = options.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
		this._cubemapConfig = Object.assign({
			/* RLUDBF is abnormal, we use it on CUBEMAP only for backward compatibility*/
			order: this._projectionType === PROJECTION_TYPE.CUBEMAP ? "RLUDBF" : "RLUDFB",
			tileConfig: {
				flipHorizontal: false,
				rotation: 0
			}
		}, options.cubemapConfig);
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
		const fovRange = options.fovRange || [30, 110];
		const touchDirection = PanoViewer._isValidTouchDirection(options.touchDirection) ?
			options.touchDirection : YawPitchControl.TOUCH_DIRECTION_ALL;
		const yawPitchConfig = Object.assign(options, {
			element: container,
			yaw: this._yaw,
			pitch: this._pitch,
			fov: this._fov,
			gyroMode: this._gyroMode,
			fovRange,
			aspectRatio: this._aspectRatio,
			touchDirection
		});

		this._isReady = false;

		this._initYawPitchControl(yawPitchConfig);
		this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);
	}

	/**
	 * Get the video element that the viewer is currently playing. You can use this for playback.
	 * @ko 뷰어가 현재 사용 중인 비디오 요소를 얻습니다. 이 요소를 이용해 비디오의 컨트롤을 할 수 있습니다.
	 * @method eg.view360.PanoViewer#getVideo
	 * @return {HTMLVideoElement} HTMLVideoElement<ko>HTMLVideoElement</ko>
	 * @example
	 * var videoTag = panoViewer.getVideo();
	 * videoTag.play(); // play video!
	 */
	getVideo() {
		if (!this._isVideo) {
			return null;
		}

		return this._photoSphereRenderer.getContent();
	}

	/**
	 * Set the video information to be used by the viewer.
	 * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
	 * @method eg.view360.PanoViewer#setVideo
	 * @param {String|HTMLVideoElement|Object} video Input video url or element or config object<ko>입력 비디오 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정)</ko>
	 * @param {Object} param
	 * @param {String} [param.projectionType={@link eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR}("equirectangular")] Projection Type<ko>프로젝션 타입</ko>
	 * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃 설정</ko>
	 * @param {String} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
	 *
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 * @example
	 * panoViewer.setVideo("/path/to/video/video.mp4", {
	 *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR
	 * });
	 */
	setVideo(video, param = {}) {
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
	 * @method eg.view360.PanoViewer#getImage
	 * @return {Image} Image Object<ko>이미지 객체</ko>
	 * @example
	 * var imageObj = panoViewer.getImage();
	 */
	getImage() {
		if (this._isVideo) {
			return null;
		}

		return this._photoSphereRenderer.getContent();
	}

	/**
	 * Set the image information to be used by the viewer.
	 * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
	 * @method eg.view360.PanoViewer#setImage
	 * @param {String|Image|Object} image Input image url or element or config object<ko>입력 이미지 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정한다.)</ko>
	 * @param {Object} param Additional information<ko>이미지 추가 정보</ko>
	 * @param {String} [param.projectionType="equirectangular"] Projection Type<ko>프로젝션 타입</ko>
	 * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 레이아웃</ko>
	 * @param {String} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
	 *
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 * @example
	 * panoViewer.setImage("/path/to/image/image.png", {
	 *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP
	 * });
	 */
	setImage(image, param = {}) {
		const cubemapConfig = Object.assign({
			order: "RLUDBF",
			tileConfig: {
				flipHorizontal: false,
				rotation: 0
			}
		}, param.cubemapConfig);
		const stereoFormat = param.stereoFormat || STEREO_FORMAT.TOP_BOTTOM;
		const isVideo = !!(param.isVideo);

		if (this._image && this._isVideo !== isVideo) {
			/* eslint-disable no-console */
			console.warn("Currently not supporting to change content type(Image <--> Video)");
			/* eslint-enable no-console */
			return this;
		}

		if (image) {
			this._image = image;
			this._isVideo = isVideo;
			this._projectionType = param.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
			this._cubemapConfig = cubemapConfig;
			this._stereoFormat = stereoFormat;

			this._deactivate();
			this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);
		}

		return this;
	}

	/**
	 * Set whether the renderer always updates the texture and renders.
	 * @ko 렌더러가 항상 텍스쳐를 갱신하고 화면을 렌더링 할지 여부를 설정할 수 있습니다.
	 *
	 * @method eg.view360.PanoViewer#keepUpdate
	 * @param {Boolean} doUpdate When true viewer will always update texture and render, when false viewer will not update texture and render only camera config is changed.<ko>true면 항상 텍스쳐를 갱신하고 화면을 그리는 반면, false면 텍스쳐 갱신은 하지 않으며, 카메라 요소에 변화가 있을 때에만 화면을 그립니다.</ko>
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	keepUpdate(doUpdate) {
		this._photoSphereRenderer.keepUpdate(doUpdate);
		return this;
	}

	/**
	 * Get projection type (equirectangular/cube)
	 * @ko 프로젝션 타입(Equirectangular 혹은 Cube)을 반환합니다.
	 *
	 * @method eg.view360.PanoViewer#getProjectionType
	 * @return {String} {@link eg.view360.PanoViewer.PROJECTION_TYPE}
	 */
	getProjectionType() {
		return this._projectionType;
	}

	/**
	 * Activate the device's motion sensor, and return the Promise whether the sensor is enabled
	 * If it's iOS13+, this method must be used in the context of user interaction, like onclick callback on the button element.
	 * @ko 디바이스의 모션 센서를 활성화하고, 활성화 여부를 담는 Promise를 리턴합니다.
	 * iOS13+일 경우, 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
	 * @method eg.view360.PanoViewer#enableSensor
	 * @return {Promise<string>} Promise containing nothing when resolved, or string of the rejected reason when rejected.<ko>Promise. resolve되었을 경우 아무것도 반환하지 않고, reject되었을 경우 그 이유를 담고있는 string을 반환한다.</ko>
	 */
	enableSensor() {
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
	 * @method eg.view360.PanoViewer#disableSensor
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	disableSensor() {
		return this;
	}

	/**
	 * Switch to VR stereo rendering mode which uses WebXR / WebVR API (WebXR is preferred).
	 * This method must be used in the context of user interaction, like onclick callback on the button element.
	 * It can be rejected when an enabling device sensor fails or image/video is still loading("ready" event not triggered).
	 * @ko WebXR / WebVR API를 사용하는 VR 스테레오 렌더링 모드로 전환합니다. (WebXR을 더 선호합니다)
	 * 이 메소드는 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
	 * 디바이스 센서 활성화에 실패시 혹은 아직 이미지/비디오가 로딩중인 경우("ready"이벤트가 아직 트리거되지 않은 경우)에는 Promise가 reject됩니다.
	 * @method eg.view360.PanoViewer#enterVR
	 * @return {Promise<string>} Promise containing either a string of resolved reason or an Error instance of rejected reason.<ko>Promise가 resolve된 이유(string) 혹은 reject된 이유(Error)</ko>
	 */
	enterVR() {
		if (!this._isReady) {
			return Promise.reject(new Error("PanoViewer is not ready to show image."));
		}

		return new Promise((resolve, reject) => {
			this.enableSensor()
				.then(() => this._photoSphereRenderer.enterVR())
				.then(res => resolve(res))
				.catch(e => reject(e));
		});
	}

	/**
	 * Exit VR stereo rendering mode.
	 * @ko VR 스테레오 렌더링 모드에서 일반 렌더링 모드로 전환합니다.
	 *
	 * @method eg.view360.PanoViewer#exitVR
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	exitVR() {
		this._photoSphereRenderer.exitVR();
		return this;
	}

	// TODO: Remove parameters as they're just using private values
	_initRenderer(yaw, pitch, fov, projectionType, cubemapConfig) {
		this._photoSphereRenderer = new PanoImageRenderer(
			this._image,
			this._width,
			this._height,
			this._isVideo,
			{
				initialYaw: yaw,
				initialPitch: pitch,
				fieldOfView: fov,
				imageType: projectionType,
				cubemapConfig,
				stereoFormat: this._stereoFormat
			},
		);
		this._photoSphereRenderer.setYawPitchControl(this._yawPitchControl);

		this._bindRendererHandler();

		this._photoSphereRenderer
			.bindTexture()
			.then(() => this._activate())
			.catch(() => {
				this._triggerEvent(EVENTS.ERROR, {
					type: ERROR_TYPE.FAIL_BIND_TEXTURE,
					message: "failed to bind texture"
				});
			});
	}

	/**
	 * update values of YawPitchControl if needed.
	 * For example, In Panorama mode, initial fov and pitchRange is changed by aspect ratio of image.
	 *
	 * This function should be called after isReady status is true.
	 */
	_updateYawPitchIfNeeded() {
		if (this._projectionType === PanoViewer.ProjectionType.PANORAMA) {
			// update fov by aspect ratio
			const image = this._photoSphereRenderer.getContent();
			let imageAspectRatio = image.naturalWidth / image.naturalHeight;
			let isCircular;
			let yawSize;
			let maxFov;

			// If height is larger than width, then we assume it's rotated by 90 degree.
			if (imageAspectRatio < 1) {
				// So inverse the aspect ratio.
				imageAspectRatio = 1 / imageAspectRatio;
			}

			if (imageAspectRatio < 6) {
				yawSize = mathUtil.toDegree(imageAspectRatio);
				isCircular = false;
				// 0.5 means ratio of half height of cylinder(0.5) and radius of cylider(1). 0.5/1 = 0.5
				maxFov = mathUtil.toDegree(Math.atan(0.5)) * 2;
			} else {
				yawSize = 360;
				isCircular = true;
				maxFov = (360 / imageAspectRatio); // Make it 5 fixed as axes does.
			}

			// console.log("_updateYawPitchIfNeeded", maxFov, "aspectRatio", image.naturalWidth, image.naturalHeight, "yawSize", yawSize);
			const minFov = (this._yawPitchControl.option("fovRange"))[0];

			// this option should be called after fov is set.
			this._yawPitchControl.option({
				"fov": maxFov, /* parameter for internal validation for pitchrange */
				"yawRange": [-yawSize / 2, yawSize / 2],
				isCircular,
				"pitchRange": [-maxFov / 2, maxFov / 2],
				"fovRange": [minFov, maxFov]
			});
			this.lookAt({fov: maxFov});
		}
	}

	_bindRendererHandler() {
		this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.ERROR, e => {
			this.trigger(EVENTS.ERROR, e);
		});

		this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.RENDERING_CONTEXT_LOST, e => {
			this._deactivate();
			this.trigger(EVENTS.ERROR, {
				type: ERROR_TYPE.RENDERING_CONTEXT_LOST,
				message: "webgl rendering context lost"
			});
		});
	}

	_initYawPitchControl(yawPitchConfig) {
		this._yawPitchControl = new YawPitchControl(yawPitchConfig);

		this._yawPitchControl.on(EVENTS.ANIMATION_END, e => {
			this._triggerEvent(EVENTS.ANIMATION_END, e);
		});

		this._yawPitchControl.on("change", e => {
			this._yaw = e.yaw;
			this._pitch = e.pitch;
			this._fov = e.fov;
			this._quaternion = e.quaternion;

			this._triggerEvent(EVENTS.VIEW_CHANGE, e);
		});
	}

	_triggerEvent(name, param) {
		const evt = param || {};

		/**
		 * Events that is fired when error occurs
		 * @ko 에러 발생 시 발생하는 이벤트
		 * @name eg.view360.PanoViewer#error
		 * @event
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Number} param.type Error type
		 * 		10: INVALID_DEVICE: Unsupported device
		 * 		11: NO_WEBGL: Webgl not support
		 * 		12, FAIL_IMAGE_LOAD: Failed to load image
		 * 		13: FAIL_BIND_TEXTURE: Failed to bind texture
		 * 		14: INVALID_RESOURCE: Only one resource(image or video) should be specified
		 * 		15: RENDERING_CONTEXT_LOST: WebGL context lost occurred
		 * <ko>에러 종류
		 * 		10: INVALID_DEVICE: 미지원 기기
		 * 		11: NO_WEBGL: WEBGL 미지원
		 * 		12, FAIL_IMAGE_LOAD: 이미지 로드 실패
		 * 		13: FAIL_BIND_TEXTURE: 텍스쳐 바인딩 실패
		 * 		14: INVALID_RESOURCE: 리소스 지정 오류 (image 혹은 video 중 하나만 지정되어야 함)
		 * 		15: RENDERING_CONTEXT_LOST: WebGL context lost 발생
		 * </ko>
		 * @param {String} param.message Error message <ko>에러 메시지</ko>
		 * @see {@link eg.view360.PanoViewer.ERROR_TYPE}
		 * @example
		 *
		 * viwer.on({
		 *	"error" : function(evt) {
		 *		// evt.type === 13
		 *		// evt.message === "failed to bind texture"
		 * });
		 *
		 * // constant can be used
		 * viwer.on({
		 *	eg.view360.PanoViewer.EVENTS.ERROR : function(evt) {
		 *		// evt.type === eg.view360.PanoViewer.ERROR_TYPE.FAIL_BIND_TEXTURE
		 *		// evt.message === "failed to bind texture"
		 * });
		 */

		/**
		 * Events that is fired when PanoViewer is ready to go.
		 * @ko PanoViewer 가 준비된 상태에 발생하는 이벤트
		 * @name eg.view360.PanoViewer#ready
		 * @event
		 *
		 * @example
		 *
		 * viwer.on({
		 *	"ready" : function(evt) {
		 *		// PanoViewer is ready to show image and handle user interaction.
		 * });
		 */

		/**
		 * Events that is fired when direction or fov is changed.
		 * @ko PanoViewer 에서 바라보고 있는 방향이나 FOV(화각)가 변경되었을때 발생하는 이벤트
		 * @name eg.view360.PanoViewer#viewChange
		 * @event
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {Number} param.yaw yaw<ko>yaw</ko>
		 * @param {Number} param.pitch pitch <ko>pitch</ko>
		 * @param {Number} param.fov Field of view (fov) <ko>화각</ko>
		 * @example
		 *
		 * viwer.on({
		 *	"viewChange" : function(evt) {
		 *		//evt.yaw, evt.pitch, evt.fov is available.
		 * });
		 */

		/**
		 * Events that is fired when animation which is triggered by inertia is ended.
		 * @ko 관성에 의한 애니메이션 동작이 완료되었을때 발생하는 이벤트
		 * @name eg.view360.PanoViewer#animationEnd
		 * @event
		 * @example
		 *
		 * viwer.on({
		 *	"animationEnd" : function(evt) {
		 *		// animation is ended.
		 * });
		 */
		return this.trigger(name, evt);
	}

	/**
	 * When set true, enables zoom with the wheel or pinch gesture. However, in the case of touch, pinch works only when the touchDirection setting is {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}.
	 * @ko true 로 설정 시 휠 혹은 집기 동작으로 확대/축소 할 수 있습니다. false 설정 시 확대/축소 기능을 비활성화 합니다. 단, 터치인 경우 touchDirection 설정이 {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL} 인 경우에만 pinch 가 동작합니다.
	 * @method eg.view360.PanoViewer#setUseZoom
	 * @param {Boolean} useZoom
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	setUseZoom(useZoom) {
		typeof useZoom === "boolean" && this._yawPitchControl.option("useZoom", useZoom);

		return this;
	}

	/**
	 * When true, enables the keyboard move key control: awsd, arrow keys
	 * @ko true이면 키보드 이동 키 컨트롤을 활성화합니다. (awsd, 화살표 키)
	 * @method eg.view360.PanoViewer#setUseKeyboard
	 * @param {Boolean} useKeyboard
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	setUseKeyboard(useKeyboard) {
		this._yawPitchControl.option("useKeyboard", useKeyboard);
		return this;
	}

	/**
	 * Enables control through device motion. ("none", "yawPitch", "VR")
	 * @ko 디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR")
	 * @method eg.view360.PanoViewer#setGyroMode
	 * @param {String} gyroMode {@link eg.view360.PanoViewer.GYRO_MODE}
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 * @example
	 * panoViewer.setGyroMode("yawPitch");
	 * //equivalent
	 * panoViewer.setGyroMode(eg.view360.PanoViewer.GYRO_MODE.YAWPITCH);
	 */
	setGyroMode(gyroMode) {
		this._yawPitchControl.option("gyroMode", gyroMode);
		return this;
	}

	/**
	 * Set the range of controllable FOV values
	 * @ko 제어 가능한 FOV 구간을 설정합니다.
	 * @method eg.view360.PanoViewer#setFovRange
	 * @param {Array} range
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 * @example
	 * panoViewer.setFovRange([50, 90]);
	 */
	setFovRange(range) {
		this._yawPitchControl.option("fovRange", range);
		return this;
	}

	/**
	 * Getting the range of controllable FOV values
	 * @ko 제어 가능한 FOV 구간을 반환합니다.
	 * @method eg.view360.PanoViewer#getFovRange
	 * @return {Array}
	 * @example
	 * var range = panoViewer.getFovRange(); //[50, 90]
	 */
	getFovRange() {
		return this._yawPitchControl.option("fovRange");
	}

	/**
	 * Update size of canvas element by it's container element's or specified size. If size is not specified, the size of the container area is obtained and updated to that size.
	 * @ko 캔버스 엘리먼트의 크기를 컨테이너 엘리먼트의 크기나 지정된 크기로 업데이트합니다. 만약 size 가 지정되지 않으면 컨테이너 영역의 크기를 얻어와 해당 크기로 갱신합니다.
	 * @method eg.view360.PanoViewer#updateViewportDimensions
	 * @param {Object} [size]
	 * @param {Number} [size.width=width of container]
	 * @param {Number} [size.height=height of container]
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	updateViewportDimensions(size = {width: undefined, height: undefined}) {
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
		this._photoSphereRenderer.updateViewportDimensions(width, height);
		this._yawPitchControl.option("aspectRatio", this._aspectRatio);
		this._yawPitchControl.updatePanScale({height});

		this.lookAt({}, 0);
		return this;
	}

	/**
	 * Get the current field of view(FOV)
	 * @ko 현재 field of view(FOV) 값을 반환합니다.
	 * @method eg.view360.PanoViewer#getFov
	 * @return {Number}
	 */
	getFov() {
		return this._fov;
	}

	/**
	 * Get the horizontal field of view in degree
	 */
	_getHFov() {
		return mathUtil.toDegree(
			2 * Math.atan(this._aspectRatio * Math.tan(glMatrix.toRadian(this._fov) / 2)));
	}

	/**
	 * Get current yaw value
	 * @ko 현재 yaw 값을 반환합니다.
	 * @method eg.view360.PanoViewer#getYaw
	 * @return {Number}
	 */
	getYaw() {
		return this._yaw;
	}

	/**
	 * Get current pitch value
	 * @ko 현재 pitch 값을 반환합니다.
	 * @method eg.view360.PanoViewer#getPitch
	 * @return {Number}
	 */
	getPitch() {
		return this._pitch;
	}

	/**
	 * Get the range of controllable Yaw values
	 * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
	 * @method eg.view360.PanoViewer#getYawRange
	 * @return {Array}
	 */
	getYawRange() {
		return this._yawPitchControl.option("yawRange");
	}

	/**
	 * Get the range of controllable Pitch values
	 * @ko 컨트롤 가능한 Pitch 구간을 가져옵니다.
	 * @method eg.view360.PanoViewer#getPitchRange
	 * @return {Array}
	 */
	getPitchRange() {
		return this._yawPitchControl.option("pitchRange");
	}

	/**
	 * Set the range of controllable yaw
	 * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
	 * @method eg.view360.PanoViewer#setYawRange
	 * @param {Array} range
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 * @example
	 * panoViewer.setYawRange([-90, 90]);
	 */
	setYawRange(yawRange) {
		this._yawPitchControl.option("yawRange", yawRange);
		return this;
	}

	/**
	 * Set the range of controllable Pitch values
	 * @ko 컨트롤 가능한 Pitch 구간을 설정합니다.
	 * @method eg.view360.PanoViewer#setPitchRange
	 * @param {Array} range
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 * @example
	 * panoViewer.setPitchRange([-40, 40]);
	 */
	setPitchRange(pitchRange) {
		this._yawPitchControl.option("pitchRange", pitchRange);
		return this;
	}

	/**
	 * Specifies whether to display the pole by limiting the pitch range. If it is true, pole point can be displayed. If it is false, it is not displayed.
	 * @ko pitch 범위를 제한하여 극점을 표시할지를 지정합니다. true 인 경우 극점까지 표현할 수 있으며 false 인 경우 극점까지 표시하지 않습니다.
	 * @method eg.view360.PanoViewer#setShowPolePoint
	 * @param {Boolean} showPolePoint
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	setShowPolePoint(showPolePoint) {
		this._yawPitchControl.option("showPolePoint", showPolePoint);
		return this;
	}

	/**
	 * Set a new view by setting camera configuration. Any parameters not specified remain the same.
	 * @ko 카메라 설정을 지정하여 화면을 갱신합니다. 지정되지 않은 매개 변수는 동일하게 유지됩니다.
	 * @method eg.view360.PanoViewer#lookAt
	 * @param {Object} orientation
	 * @param {Number} orientation.yaw Target yaw in degree <ko>목표 yaw (degree 단위)</ko>
	 * @param {Number} orientation.pitch Target pitch in degree <ko>목표 pitch (degree 단위)</ko>
	 * @param {Number} orientation.fov Target vertical fov in degree <ko>목표 수직 fov (degree 단위)</ko>
	 * @param {Number} duration Animation duration in milliseconds <ko>애니메이션 시간 (밀리 초)</ko>
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 * @example
	 * // Change the yaw angle (absolute angle) to 30 degrees for one second.
	 * panoViewer.lookAt({yaw: 30}, 1000);
	 */
	lookAt(orientation, duration) {
		if (!this._isReady) {
			return this;
		}

		const yaw = orientation.yaw !== undefined ? orientation.yaw : this._yaw;
		const pitch = orientation.pitch !== undefined ? orientation.pitch : this._pitch;
		const pitchRange = this._yawPitchControl.option("pitchRange");
		const verticalAngleOfImage = pitchRange[1] - pitchRange[0];
		let fov = orientation.fov !== undefined ? orientation.fov : this._fov;

		if (verticalAngleOfImage < fov) {
			fov = verticalAngleOfImage;
		}

		this._yawPitchControl.lookAt({yaw, pitch, fov}, duration);

		if (duration === 0) {
			this._photoSphereRenderer.renderWithYawPitch(yaw, pitch, fov);
		}
		return this;
	}

	_activate() {
		this._photoSphereRenderer.attachTo(this._container);
		this._yawPitchControl.enable();

		this.updateViewportDimensions();

		this._isReady = true;

		// update yawPitchControl after isReady status is true.
		this._updateYawPitchIfNeeded();

		this._triggerEvent(EVENTS.READY);
		this._photoSphereRenderer.startRender();
	}

	/**
	 * Destroy webgl context and block user interaction and stop rendering
	 */
	_deactivate() {
		if (this._isReady) {
			this._photoSphereRenderer.stopRender();
			this._yawPitchControl.disable();
			this._isReady = false;
		}

		if (this._photoSphereRenderer) {
			this._photoSphereRenderer.destroy();
			this._photoSphereRenderer = null;
		}
	}

	static _isValidTouchDirection(direction) {
		return direction === PanoViewer.TOUCH_DIRECTION.NONE ||
			direction === PanoViewer.TOUCH_DIRECTION.YAW ||
			direction === PanoViewer.TOUCH_DIRECTION.PITCH ||
			direction === PanoViewer.TOUCH_DIRECTION.ALL;
	}

	/**
	 * Set touch direction by which user can control.
	 * @ko 사용자가 조작가능한 터치 방향을 지정합니다.
	 * @method eg.view360.PanoViewer#setTouchDirection
	 * @param {Number} direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
	 * @return {eg.view360.PanoViewer} PanoViewer instance
	 * @example
	 *
	 * panoViewer = new PanoViewer(el);
	 * // Limit the touch direction to the yaw direction only.
	 * panoViewer.setTouchDirection(eg.view360.PanoViewer.TOUCH_DIRECTION.YAW);
	 */
	setTouchDirection(direction) {
		if (PanoViewer._isValidTouchDirection(direction)) {
			this._yawPitchControl.option("touchDirection", direction);
		}

		return this;
	}

	/**
	 * Returns touch direction by which user can control
	 * @ko 사용자가 조작가능한 터치 방향을 반환한다.
	 * @method eg.view360.PanoViewer#getTouchDirection
	 * @return {Number} direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
	 * @example
	 *
	 * panoViewer = new PanoViewer(el);
	 * // Returns the current touch direction.
	 * var dir = panoViewer.getTouchDirection();
	 */
	getTouchDirection() {
		return this._yawPitchControl.option("touchDirection");
	}

	/**
	 * Destroy viewer. Remove all registered event listeners and remove viewer canvas.
	 * @ko 뷰어 인스턴스를 해제합니다. 모든 등록된 이벤트리스너를 제거하고 뷰어 캔버스를 삭제합니다.
	 * @method eg.view360.PanoViewer#destroy
	 * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
	 */
	destroy() {
		this._deactivate();

		if (this._yawPitchControl) {
			this._yawPitchControl.destroy();
			this._yawPitchControl = null;
		}

		return this;
	}

	/**
	 * Check whether the current environment can execute PanoViewer
	 * @ko 현재 브라우저 환경에서 PanoViewer 실행이 가능한지 여부를 반환합니다.
	 * @function isSupported
	 * @memberof eg.view360.PanoViewer
	 * @return {Boolean} PanoViewer executable <ko>PanoViewer 실행가능 여부</ko>
	 * @static
	 */
	static isSupported() {
		return WebGLUtils.isWebGLAvailable() && WebGLUtils.isStableWebGL();
	}

	/**
	 * Check whether the current environment supports the WebGL
	 * @ko 현재 브라우저 환경이 WebGL 을 지원하는지 여부를 확인합니다.
	 * @function isWebGLAvailable
	 * @memberof eg.view360.PanoViewer
	 * @return {Boolean} WebGL support <ko>WebGL 지원여부</ko>
	 * @static
	 */
	static isWebGLAvailable() {
		return WebGLUtils.isWebGLAvailable();
	}

	/**
	 * Check whether the current environment supports the gyro sensor.
	 * @ko 현재 브라우저 환경이 자이로 센서를 지원하는지 여부를 확인합니다.
	 * @function isGyroSensorAvailable
	 * @memberof eg.view360.PanoViewer
	 * @param {Function} callback Function to take the gyro sensor availability as argument <ko>자이로 센서를 지원하는지 여부를 인자로 받는 함수</ko>
	 * @static
	 */
	static isGyroSensorAvailable(callback) {
		if (!DeviceMotionEvent) {
			callback && callback(false);
			return;
		}

		let onDeviceMotionChange;

		function checkGyro() {
			return new Promise((res, rej) => {
				onDeviceMotionChange = function(deviceMotion) {
					const isGyroSensorAvailable = !(deviceMotion.rotationRate.alpha == null);

					res(isGyroSensorAvailable);
				};

				window.addEventListener("devicemotion", onDeviceMotionChange);
			});
		}

		function timeout() {
			return new Promise((res, rej) => {
				setTimeout(() => res(false), 1000);
			});
		}

		Promise.race([checkGyro(), timeout()]).then(isGyroSensorAvailable => {
			window.removeEventListener("devicemotion", onDeviceMotionChange);

			callback && callback(isGyroSensorAvailable);

			PanoViewer.isGyroSensorAvailable = function(fb) {
				fb && fb(isGyroSensorAvailable);
				return isGyroSensorAvailable;
			};
		});
	}
}

export default PanoViewer;
