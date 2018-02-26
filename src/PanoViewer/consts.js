import {GYRO_MODE} from "../YawPitchControl/consts";

const ERROR_TYPE = {
	INVALID_DEVICE: 10,
	NO_WEBGL: 11,
	FAIL_IMAGE_LOAD: 12,
	FAIL_BIND_TEXTURE: 13,
	INVALID_RESOURCE: 14,
	RENDERING_CONTEXT_LOST: 15
};

const EVENTS = {
	VIEW_CHANGE: "viewChange",
	ANIMATION_END: "animationEnd",
	ERROR: "error",
	CONTENT_LOADED: "contentLoaded"
};

const PROJECTION_TYPE = {
	EQUIRECTANGULAR: "equirectangular",
	CUBEMAP: "cubemap"
};

module.exports = {
	GYRO_MODE,
	EVENTS,
	ERROR_TYPE,
	PROJECTION_TYPE
};
