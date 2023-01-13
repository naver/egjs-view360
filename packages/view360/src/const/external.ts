/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export { ERROR_CODES } from "./error";

/**
 * Default class names
 * @ko 기본 클래스 이름들
 * @since 4.0.0
 */
export const DEFAULT_CLASS = {
  CONTAINER: "view360-container",
  CANVAS: "view360-canvas",
  CTX_LOST: "view360-ctx-lost",
  IN_VR: "view360-vr-presenting",
  HOTSPOT_CONTAINER: "view360-hotspots",
  HOTSPOT: "view360-hotspot",
  HOTSPOT_VISIBLE: "view360-hotspot-visible",
  HOTSPOT_FLIP_X: "view360-hotspot-flip-x",
  HOTSPOT_FLIP_Y: "view360-hotspot-flip-y",
} as const;

/**
 * Event names
 * @ko 이벤트 이름들
 * @since 4.0.0
 * @example
 * ```ts
 * import View360, { EVENTS } from "@egjs/view360";
 *
 * const viewer = new View360("#el_id");
 *
 * viewer.on(EVENTS.READY, evt => {
 *   console.log("View360 is ready!");
 * });
 * ```
 */
export const EVENTS = {
  READY: "ready",
  LOAD_START: "loadStart",
  LOAD: "load",
  PROJECTION_CHANGE: "projectionChange",
  RESIZE: "resize",
  BEFORE_RENDER: "beforeRender",
  RENDER: "render",
  INPUT_START: "inputStart",
  INPUT_END: "inputEnd",
  VIEW_CHANGE: "viewChange",
  STATIC_CLICK: "staticClick",
  VR_START: "vrStart",
  VR_END: "vrEnd"
} as const;

/**
 * Collection of predefined easing functions
 * @ko 미리 정의된 easing 함수들
 */
export const EASING = {
  LINEAR: (x: number) => x,
  SINE_WAVE: (x: number) => Math.sin(x * Math.PI * 2),
  EASE_OUT_CUBIC: (x: number) => 1 - Math.pow(1 - x, 3),
  EASE_OUT_BOUNCE: (x: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }
} as const;
