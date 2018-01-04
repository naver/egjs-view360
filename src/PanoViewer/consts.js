import {GYRO_MODE} from "../YawPitchControl/consts";

const ERROR_TYPE = {
	INVALID_DEVICE: 10,
	NO_WEBGL: 11,
	FAIL_IMAGE_LOAD: 12,
	FAIL_BIND_TEXTURE: 13,
	INVALID_RESOURCE: 14
};

const EVENTS = {
	RESUME: "resume",
	SUSPEND: "suspend",
	VIEW_CHANGE: "viewChange",
	ANIMATION_END: "animationEnd",
	ERROR: "error",
	INIT: "init",
	CONTENT_LOADED: "contentLoaded"
};

module.exports = {
	GYRO_MODE,
	EVENTS,
	ERROR_TYPE
};
