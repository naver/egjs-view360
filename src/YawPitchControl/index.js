import YawPitchControl from "./YawPitchControl";
import {
	CONTROL_MODE_VR,
	CONTROL_MODE_YAWPITCH,
	TOUCH_DIRECTION_ALL,
	TOUCH_DIRECTION_YAW,
	TOUCH_DIRECTION_PITCH,
	TOUCH_DIRECTION_NONE,
} from "./consts";

// Expose DeviceOrientationControls sub module for test purpose
YawPitchControl.CONTROL_MODE_VR = CONTROL_MODE_VR;
YawPitchControl.CONTROL_MODE_YAWPITCH = CONTROL_MODE_YAWPITCH;
YawPitchControl.TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_ALL;
YawPitchControl.TOUCH_DIRECTION_YAW = TOUCH_DIRECTION_YAW;
YawPitchControl.TOUCH_DIRECTION_PITCH = TOUCH_DIRECTION_PITCH;
YawPitchControl.TOUCH_DIRECTION_NONE = TOUCH_DIRECTION_NONE;

// module.exports = YawPitch;
export {
	YawPitchControl
};
