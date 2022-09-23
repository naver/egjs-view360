/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { EASING } from "./external";
import { Range } from "../type/utils";

export const CONTROL_EVENTS = {
  HOLD: "hold",
  CHANGE: "change",
  RELEASE: "release",
  ENABLE: "enable",
  DISABLE: "disable"
} as const;

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const DEFAULT_EASING = EASING.EASE_OUT_CUBIC;
export const DEFAULT_ANIMATION_DURATION = 300;
export const INFINITE_RANGE: Readonly<Range> = {
  min: -Infinity, max: Infinity
};
export const PITCH_RANGE: Readonly<Range> = {
  min: -89.9, max: 89.9
};
