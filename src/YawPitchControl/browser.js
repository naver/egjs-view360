/* eslint-disable no-new-func */
/* eslint-disable no-nested-ternary */
const win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-nested-ternary */
/* eslint-enable no-new-func */

win.Float32Array = (typeof win.Float32Array !== "undefined") ? win.Float32Array : win.Array;

export {win as window};
export const document = win.document;
export const Float32Array = win.Float32Array;
export const getComputedStyle = win.getComputedStyle;
export const ontouchstart = win.ontouchstart;
export const ondevicemotion = win.ondevicemotion;
