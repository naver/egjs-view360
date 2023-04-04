/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { EASING } from "./external";
import { Range } from "../type/utils";

export const CAMERA_EVENTS = {
  CHANGE: "change",
  ANIMATION_END: "animationEnd"
} as const;

export const OBJECT_3D_EVENTS = {
  UPDATE: "update"
} as const;

export const CONTROL_EVENTS = {
  INPUT_START: "inputStart",
  CHANGE: "change",
  INPUT_END: "inputEnd",
  ENABLE: "enable",
  DISABLE: "disable",
  STATIC_CLICK: "staticClick"
} as const;

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const DEFAULT_EASING = EASING.EASE_OUT_CUBIC;
export const DEFAULT_ANIMATION_DURATION = 300;
export const INFINITE_RANGE: Readonly<Range> = {
  min: -Infinity, max: Infinity
} as const;
export const DEFAULT_PITCH_RANGE: Readonly<Range> = {
  min: -90, max: 90
} as const;
export const DEFAULT_ZOOM_RANGE: Readonly<Range> = {
  min: 0.6, max: 10
} as const;

export enum ROTATE {
  ZERO,
  CW_90,
  CCW_90,
  CW_180
}

// Custom event name for video time change
export const VIDEO_TIME_CHANGE_EVENT = "view360videotimechange";
export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export const SESSION_VR = "immersive-vr";
export const XR_REFERENCE_SPACE = "local";

export const EPSILON = Number.EPSILON ?? 2.220446049250313e-16;
