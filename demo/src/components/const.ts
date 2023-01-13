/**
 * Constant value for projection type
 */
export const PROJECTION_TYPE = {
  /**
   * Constant value for equirectangular type.
   */
  EQUIRECTANGULAR: "equirect",
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
  CYLINDRICAL: "cylindrical",
  /**
   * Constant value for EQUI_STEREOSCOPY.
   * Stereoscopy image format of EQUIRECTANGULAR. It is an experimental function to show a stereoscopic type equirectangular image on a plane.
   */
  STEREOSCOPIC_EQUI: "stereoequi",
  /**
   * Constant value for "Little Planet" style projection type.
   */
  LITTLE_PLANET: "littleplanet"
} as const;

export const PROJECTION_NAME: {[key in PROJECTION_TYPE[keyof typeof PROJECTION_TYPE]]: string} = {
  [PROJECTION_TYPE.EQUIRECTANGULAR]: "EquirectProjection",
  [PROJECTION_TYPE.CUBEMAP]: "CubemapProjection",
  [PROJECTION_TYPE.CUBESTRIP]: "CubestripProjection",
  [PROJECTION_TYPE.EAC]: "EquiangularProjection",
  [PROJECTION_TYPE.CYLINDRICAL]: "CylindricalProjection",
  [PROJECTION_TYPE.STEREOSCOPIC_EQUI]: "StereoEquiProjection",
  [PROJECTION_TYPE.LITTLE_PLANET]: "LittlePlanetProjection"
}
