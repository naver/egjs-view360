/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "./Geometry";
import { ROTATE } from "../const/internal";

/**
 *
 */
class CubeGeometry extends Geometry {
  public constructor({
    order,
    rotateUV
  }: {
    order: string;
    rotateUV?: ROTATE[]
  }) {
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

    if (rotateUV) {
      rotateUV.forEach((degree, idx) => {
        if (degree === ROTATE.ZERO) return;

        const coord = coords[idx];
        let newOrder: number[];

        if (degree === ROTATE.CW_90) {
          newOrder = [1, 2, 3, 0];
        } else if (degree === ROTATE.CCW_90) {
          newOrder = [3, 0, 1, 2];
        } else {
          newOrder = [2, 3, 0, 1];
        }

        const newCoords = Array<number>(coord.length);
        for (let uvIdx = 0; uvIdx < coord.length / 2; uvIdx++) {
          newCoords[uvIdx * 2 + 0] = coord[newOrder[uvIdx] * 2 + 0];
          newCoords[uvIdx * 2 + 1] = coord[newOrder[uvIdx] * 2 + 1];
        }

        coords[idx] = newCoords;
      });
    }

    const uvs = "BFUDRL".split("")
      .map(face => order.indexOf(face))
      .map(index => coords[index])
      .reduce((acc, val) => acc.concat(val), []);

    super(vertices, indicies, uvs);
  }
}

export default CubeGeometry;
