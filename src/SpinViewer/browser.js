/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */
const global = typeof window !== "undefined" &&
	window.Math === Math ?
	window : typeof self !== "undefined" && self.Math === Math ?
		self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

const doc = global.document;

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
	TRANSFORM,
	SUPPORT_WILLCHANGE
};
