/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "./Geometry";

/**
 *
 */
class CylinderGeometry extends Geometry {
  public constructor() {
    const vertices = [
      // back
      1, -1, 1,
      -1, -1, 1,
      -1, 1, 1,
      1, 1, 1,

      // front
      -1, -1, -1,
      1, -1, -1,
      1, 1, -1,
      -1, 1, -1,

      // up
      -1, 1, -1,
      1, 1, -1,
      1, 1, 1,
      -1, 1, 1,

      // down
      -1, -1, 1,
      1, -1, 1,
      1, -1, -1,
      -1, -1, -1,

      // right
      1, -1, -1,
      1, -1, 1,
      1, 1, 1,
      1, 1, -1,

      // left
      -1, -1, 1,
      -1, -1, -1,
      -1, 1, -1,
      -1, 1, 1
    ];

    const indicies = [
      0, 1, 2,
      0, 2, 3,
      4, 5, 6,
      4, 6, 7,
      8, 9, 10,
      8, 10, 11,
      12, 13, 14,
      12, 14, 15,
      16, 17, 18,
      16, 18, 19,
      20, 21, 22,
      20, 22, 23
    ];

    const oneThird = 1 / 3;
    const coords: number[][] = [];

    for (let r = 1; r >= 0; r--) {
      for (let c = 0; c < 3; c++) {
        const coord = [
          c * oneThird, r * 0.5,
          (c + 1) * oneThird, r * 0.5,
          (c + 1) * oneThird, (r + 1) * 0.5,
          c * oneThird, (r + 1) * 0.5
        ];

        coords.push(coord);
      }
    }

    const uvs = "BFUDRL".split("")
      .map(index => coords[index])
      .reduce((acc, val) => acc.concat(val), []);

    super(vertices, indicies, uvs);
  }
}

export default CylinderGeometry;
