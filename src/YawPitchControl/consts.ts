import { userAgent } from "../utils/browserFeature";
/**
 * Returns a number value indiciating the version of Chrome being used,
 * or otherwise `null` if not on Chrome.
 *
 * Ref: https://github.com/immersive-web/cardboard-vr-display/pull/19
 */
/**
 * In Chrome m65, `devicemotion` events are broken but subsequently fixed
 * in 65.0.3325.148. Since many browsers use Chromium, ensure that
 * we scope this detection by branch and build numbers to provide
 * a proper fallback.
 * https://github.com/immersive-web/webvr-polyfill/issues/307
 */
let version = -1; // It should not be null because it will be compared with number
let branch: string | null = null;
let build: string | null = null;

const match = /Chrome\/([0-9]+)\.(?:[0-9]*)\.([0-9]*)\.([0-9]*)/i.exec(userAgent);

if (match) {
  version = parseInt(match[1], 10);
  branch = match[2];
  build = match[3];
}

const CHROME_VERSION = version;
const IS_CHROME_WITHOUT_DEVICE_MOTION = version === 65 && branch === "3325" && parseInt(build!, 10) < 148;
const IS_ANDROID = /Android/i.test(userAgent);

const CONTROL_MODE_VR = 1;
const CONTROL_MODE_YAWPITCH = 2;

const TOUCH_DIRECTION_NONE = 1;
const TOUCH_DIRECTION_YAW = 2;
const TOUCH_DIRECTION_PITCH = 4;
const TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_YAW | TOUCH_DIRECTION_PITCH;

/* Const for MovableCoord */
const MC_DECELERATION = 0.0014;
const MC_MAXIMUM_DURATION = 1000;
const MC_BIND_SCALE = [0.20, 0.20];

const MIN_FIELD_OF_VIEW = 20;
const MAX_FIELD_OF_VIEW = 110;
const PAN_SCALE = 320;

// const DELTA_THRESHOLD = 0.015;
// const DELTA_THRESHOLD = 0.09; // Note4
// const DELTA_THRESHOLD = 0.0825;
// const DELTA_THRESHOLD = 0.075;
// const DELTA_THRESHOLD = 0.06;
// const DELTA_THRESHOLD = 0.045;
const DELTA_THRESHOLD = 0.0375; // Note2

const YAW_RANGE_HALF = 180;
const PITCH_RANGE_HALF = 90;
const CIRCULAR_PITCH_RANGE_HALF = 180;
const PINCH_EVENTS = "pinchstart pinchmove pinchend";

const KEYMAP = {
  LEFT_ARROW: 37,
  A: 65,
  UP_ARROW: 38,
  W: 87,
  RIGHT_ARROW: 39,
  D: 68,
  DOWN_ARROW: 40,
  S: 83
};

const GYRO_MODE: {
  NONE: "none";
  YAWPITCH: "yawPitch";
  VR: "VR";
} = {
  NONE: "none",
  YAWPITCH: "yawPitch",
  VR: "VR"
};

export {
  GYRO_MODE,

  CONTROL_MODE_VR,
  CONTROL_MODE_YAWPITCH,

  TOUCH_DIRECTION_NONE,
  TOUCH_DIRECTION_YAW,
  TOUCH_DIRECTION_PITCH,
  TOUCH_DIRECTION_ALL,

  MC_DECELERATION,
  MC_MAXIMUM_DURATION,
  MC_BIND_SCALE,
  MIN_FIELD_OF_VIEW,
  MAX_FIELD_OF_VIEW,
  PAN_SCALE,
  DELTA_THRESHOLD,
  YAW_RANGE_HALF,
  PITCH_RANGE_HALF,
  CIRCULAR_PITCH_RANGE_HALF,
  PINCH_EVENTS,
  KEYMAP,

  CHROME_VERSION,
  IS_CHROME_WITHOUT_DEVICE_MOTION,
  IS_ANDROID
};
