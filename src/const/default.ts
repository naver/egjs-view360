/*
 * Copyright (c) 2020 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Range } from "../type/utils";

import { AR_SESSION_TYPE, EASING as EASING_CONST } from "./external";

// Animation
export const EASING = EASING_CONST.EASE_OUT_CUBIC;
export const ANIMATION_DURATION = 300;
export const ANIMATION_LOOP = false;
export const ANIMATION_RANGE: Readonly<Range> = {
  min: 0, max: 1
};

// Camera
export const FOV = 45;
export const INFINITE_RANGE: Readonly<Range> = {
  min: -Infinity, max: Infinity
};
export const PITCH_RANGE: Readonly<Range> = {
  min: -89.9, max: 89.9
};

export const ANNOTATION_BREAKPOINT = {
  165: 0,
  135: 0.4,
  0: 1
};

export const AR_OVERLAY_CLASS = "view3d-ar-overlay";
export const DRACO_DECODER_URL = "https://www.gstatic.com/draco/versioned/decoders/1.4.1/";
export const KTX_TRANSCODER_URL = "https://unpkg.com/three@0.134.0/examples/js/libs/basis/";

export const AR_PRIORITY = [
  AR_SESSION_TYPE.WEBXR,
  AR_SESSION_TYPE.SCENE_VIEWER,
  AR_SESSION_TYPE.QUICK_LOOK
];
