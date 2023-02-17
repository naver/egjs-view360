/*
 * Copyright (c) 2023-present NAVER Corp.
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
  POINTER_CANCEL: "pointercancel",
  POINTER_ENTER: "pointerenter",
  POINTER_LEAVE: "pointerleave",
  KEY_DOWN: "keydown",
  KEY_UP: "keyup",
  LOAD: "load",
  ERROR: "error",
  CLICK: "click",
  DOUBLE_CLICK: "dblclick",
  CONTEXT_CREATE_ERROR: "webglcontextcreationerror",
  CONTEXT_LOST: "webglcontextlost",
  CONTEXT_RESTORED: "webglcontextrestored",
  DEVICE_ORIENTATION: "deviceorientation",
  DEVICE_MOTION: "devicemotion",
  ORIENTATION_CHANGE: "orientationchange",
  VIDEO_PLAY: "play",
  VIDEO_PAUSE: "pause",
  VIDEO_LOADED_DATA: "loadeddata",
  VIDEO_VOLUME_CHANGE: "volumechange",
  VIDEO_TIME_UPDATE: "timeupdate",
  VIDEO_DURATION_CHANGE: "durationchange",
  VIDEO_CAN_PLAYTHROUGH: "canplaythrough",
  TRANSITION_END: "transitionend",
  XR_END: "end"
} as const;

export const EL_DIV = "div";
export const EL_BUTTON = "button";

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

export const KEY_DIRECTION = ["LEFT", "UP", "RIGHT", "DOWN"] as const;
export enum DIRECTION_KEY_CODE {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40
}
export const SPACE_KEY_CODE = 32;

export const DIRECTION_KEY_NAME = {
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown"
} as const;
export const SPACE_KEY_NAME = " ";

export const FULLSCREEN_REQUEST = [
  "requestFullscreen",
  "webkitRequestFullscreen",
  "webkitRequestFullScreen",
  "webkitCancelFullScreen",
  "mozRequestFullScreen",
  "msRequestFullscreen"
];

export const FULLSCREEN_ELEMENT = [
  "fullscreenElement",
  "webkitFullscreenElement",
  "webkitCurrentFullScreenElement",
  "mozFullScreenElement",
  "msFullscreenElement"
];

export const FULLSCREEN_EXIT = [
  "exitFullscreen",
  "webkitExitFullscreen",
  "webkitCancelFullScreen",
  "mozCancelFullScreen",
  "msExitFullscreen"
];

export const FULLSCREEN_CHANGE = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
