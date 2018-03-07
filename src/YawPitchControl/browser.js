/* eslint-disable no-new-func */
/* eslint-disable no-nested-ternary */
const win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-nested-ternary */
/* eslint-enable no-new-func */

win.Float32Array = (typeof win.Float32Array !== "undefined") ? win.Float32Array : win.Array;

export {win as window};
export const screen = win.screen;
export const orientation = win.orientation;
export const document = win.document;
export const Float32Array = win.Float32Array;
export const getComputedStyle = win.getComputedStyle;
export const userAgent = win.navigator.userAgent;
export const SUPPORT_TOUCH = "ontouchstart" in win;
export const SUPPORT_DEVICEMOTION = "ondevicemotion" in win;
