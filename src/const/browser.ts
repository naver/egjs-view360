/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export const EVENTS = {
  MOUSE_DOWN: "mousedown",
  MOUSE_MOVE: "mousemove",
  MOUSE_UP: "mouseup",
  TOUCH_START: "touchstart",
  TOUCH_MOVE: "touchmove",
  TOUCH_END: "touchend",
  WHEEL: "wheel",
  RESIZE: "resize",
  CONTEXT_MENU: "contextmenu",
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
  POINTER_DOWN: "pointerdown",
  POINTER_MOVE: "pointermove",
  POINTER_UP: "pointerup",
  POINTER_ENTER: "pointerenter",
  POINTER_LEAVE: "pointerleave",
  LOAD: "load",
  ERROR: "error",
  CLICK: "click",
  DOUBLE_CLICK: "dblclick",
  CONTEXT_CREATE_ERROR: "webglcontextcreationerror",
  CONTEXT_LOST: "webglcontextlost",
  CONTEXT_RESTORED: "webglcontextrestored"
} as const;

export const EL_DIV = "div";
export const EL_SLOT = "slot";

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
export enum MOUSE_BUTTON {
  LEFT,
  MIDDLE,
  RIGHT
}

export const CURSOR = {
  GRAB: "grab",
  GRABBING: "grabbing",
  NONE: ""
} as const;
