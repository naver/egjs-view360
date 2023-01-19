/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "./Geometry";

/**
 * @hidden
 */
class PlaneGeometry extends Geometry {
  /** */
  public constructor(width: number = 2, height: number = 2, z: number = -1) {
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const vertices = [
      -halfWidth, -halfHeight, z,
      halfWidth, -halfHeight, z,
      -halfWidth, halfHeight, z,
      halfWidth, halfHeight, z
    ];
    const indicies = [
      0, 1, 2,
      2, 1, 3
    ];
    const uvs = [
      0, 0,
      1, 0,
      0, 1,
      1, 1
    ];

    super(vertices, indicies, uvs);
  }
}

export default PlaneGeometry;
