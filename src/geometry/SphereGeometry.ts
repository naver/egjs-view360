/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "./Geometry";

/** */
class SphereGeometry extends Geometry {
  /** */
  public constructor() {
    // const radius = 1;
    const widthSegments = 60;
    const heightSegments = 60;
    const ANGLE_CORRECTION_FOR_CENTER_ALIGN = -0.5 * Math.PI;

    const uvs: number[] = [];
    const vertices: number[] = [];
    const indicies: number[] = [];
    let latIdx: number;
    let lngIdx: number;

    for (latIdx = 0; latIdx <= widthSegments; latIdx++) {
      const theta = (latIdx / widthSegments - 0.5) * Math.PI;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (lngIdx = 0; lngIdx <= heightSegments; lngIdx++) {
        const phi = (lngIdx / heightSegments - 0.5) * 2 * Math.PI + ANGLE_CORRECTION_FOR_CENTER_ALIGN;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const x = cosPhi * cosTheta;
        const y = sinTheta;
        const z = sinPhi * cosTheta;
        const u = lngIdx / heightSegments;
        const v = latIdx / widthSegments;

        uvs.push(u, v);
        vertices.push(x, y, z);

        if (lngIdx !== heightSegments && latIdx !== widthSegments) {
          const a = latIdx * (heightSegments + 1) + lngIdx;
          const b = a + heightSegments + 1;

          indicies.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }

    super(vertices, indicies, uvs);
  }
}

export default SphereGeometry;
