/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { window as win, document as doc } from "./browser";

win.Float32Array = (typeof win.Float32Array !== "undefined") ? win.Float32Array : win.Array;

const Float32Array = win.Float32Array;
const getComputedStyle = win.getComputedStyle;
const userAgent = win.navigator && win.navigator.userAgent;
const SUPPORT_TOUCH = "ontouchstart" in win;
const SUPPORT_DEVICEMOTION = "ondevicemotion" in win;
const DeviceMotionEvent = win.DeviceMotionEvent;
const devicePixelRatio = win.devicePixelRatio;

const TRANSFORM = (() => {
  const docStyle = doc?.documentElement.style ?? {};
  const target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

  for (let i = 0, len = target.length; i < len; i++) {
    if (target[i] in docStyle) {
      return target[i];
    }
  }
  return "";
})();

// check for will-change support
const SUPPORT_WILLCHANGE = win.CSS && win.CSS.supports &&
	win.CSS.supports("will-change", "transform");

let WEBXR_SUPPORTED = false;

const checkXRSupport = () => {
  const navigator = window.navigator as any;

  if (!navigator.xr) {
    return;
  }

  if (navigator.xr.isSessionSupported) {
    navigator.xr.isSessionSupported("immersive-vr").then(res => {
      WEBXR_SUPPORTED = res;
    }).catch(() => void 0);
  } else if (navigator.xr.supportsSession) {
    navigator.xr.supportsSession("immersive-vr").then(res => {
      WEBXR_SUPPORTED = res;
    }).catch(() => void 0);
  }
};

export {
  Float32Array,
  getComputedStyle,
  userAgent,
  TRANSFORM,
  SUPPORT_TOUCH,
  SUPPORT_DEVICEMOTION,
  SUPPORT_WILLCHANGE,
  checkXRSupport,
  WEBXR_SUPPORTED,
  DeviceMotionEvent,
  devicePixelRatio
};

