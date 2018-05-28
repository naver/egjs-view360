/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */
const win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

win.Float32Array = (typeof win.Float32Array !== "undefined") ? win.Float32Array : win.Array;

const doc = win.document;
const Float32Array = win.Float32Array;
const getComputedStyle = win.getComputedStyle;
const userAgent = win.navigator.userAgent;
const SUPPORT_TOUCH = "ontouchstart" in win;
const SUPPORT_DEVICEMOTION = "ondevicemotion" in win;
const DeviceMotionEvent = win.DeviceMotionEvent;
const devicePixelRatio = window.devicePixelRatio;

const TRANSFORM = (function() {
	const docStyle = doc.documentElement.style;
	const target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

	for (let i = 0, len = target.length; i < len; i++) {
		if (target[i] in docStyle) {
			return target[i];
		}
	}
	return "";
})();

// check for will-change support
const SUPPORT_WILLCHANGE = global.CSS && global.CSS.supports &&
	global.CSS.supports("will-change", "transform");


export {
	win as window,
	doc as document,
	Float32Array,
	getComputedStyle,
	userAgent,
	TRANSFORM,
	SUPPORT_TOUCH,
	SUPPORT_DEVICEMOTION,
	SUPPORT_WILLCHANGE,
	DeviceMotionEvent,
	devicePixelRatio
};
