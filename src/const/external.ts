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
   * Constant value for PANORAMA type.
   * PANORAMA is a format for a panorma image which is taken from smartphone.
   */
  PANORAMA: "panorama",
  /**
   * Constant value for EQUI_STEREOSCOPY.
   * Stereoscopy image format of EQUIRECTANGULAR. It is an experimental function to show a stereoscopic type equirectangular image on a plane. It does not support stereoscopic viewing function through special visual equipment at present.
   */
  STEREOSCOPIC_EQUI: "stereoequi"
} as const;

/**
 * Default class names
 */
export const DEFAULT_CLASS = {
  CONTAINER: "view360-container",
  CANVAS: "view360-canvas"
} as const;
