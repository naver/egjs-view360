/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export { ERROR_CODES } from "./error";

/**
 * Constant value for projection type
 */
export const PROJECTION_TYPE = {
  /**
   * Constant value for equirectangular type.
   */
  EQUIRECTANGULAR: "equirectangular",
  /**
   * Constant value for cubemap type.
   */
  CUBEMAP: "cubemap",
  /**
   * Constant value for cubestrip type.
   * Cubestrip is a format for a single image with a combination of six cube faces. It is almost identical to cubemap, but it is implemented in a different way. It aims at better performance and efficiency. In addition, it automatically detects and supports EAC.
   */
  CUBESTRIP: "cubestrip",
  /**
   * Constant value for equiangular cubemap(EAC) type.
   */
  EAC: "eac",
  /**
   * Constant value for PANORAMA type.
   * PANORAMA is a format for a panorma image which is taken from smartphone.
   */
  PANORAMA: "panorama",
  /**
   * Constant value for EQUI_STEREOSCOPY.
   * Stereoscopy image format of EQUIRECTANGULAR. It is an experimental function to show a stereoscopic type equirectangular image on a plane.
   */
  STEREOSCOPIC_EQUI: "stereoequi"
} as const;

/**
 * Default class names
 */
export const DEFAULT_CLASS = {
  CONTAINER: "view360-container",
  CANVAS: "view360-canvas",
  CTX_LOST: "ctx-lost"
} as const;

export const EVENTS = {
  READY: "ready",
  LOAD: "load",
  RESIZE: "resize",
  BEFORE_RENDER: "beforeRender",
  RENDER: "render",
  PROGRESS: "progress",
  INPUT_START: "inputStart",
  INPUT_END: "inputEnd",
  CAMERA_CHANGE: "cameraChange",
  ANIMATION_START: "animationStart",
  ANIMATION_LOOP: "animationLoop",
  ANIMATION_FINISHED: "animationFinished",
  ANNOTATION_FOCUS: "annotationFocus",
  ANNOTATION_UNFOCUS: "annotationUnfocus"
} as const;

/**
 * Collection of predefined easing functions
 * @type {object}
 * @property {function} SINE_WAVE
 * @property {function} EASE_OUT_CUBIC
 * @property {function} EASE_OUT_BOUNCE
 * @example
 * ```ts
 * import View3D, { EASING } from "@egjs/view3d";
 *
 * new RotateControl({
 *  easing: EASING.EASE_OUT_CUBIC,
 * });
 * ```
 */
export const EASING = {
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
