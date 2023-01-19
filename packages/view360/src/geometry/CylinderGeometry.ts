/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Geometry from "./Geometry";

/**
 * @hidden
 */
class CylinderGeometry extends Geometry {
  public constructor(maxTheta: number) {
    const vertices: number[] = [];
    const indicies: number[] = [];
    const uvs: number[] = [];

    const height = 1;
    const radialSegments = 60;
    const halfHeight = height * 0.5;
    const heightSegments = [-halfHeight, halfHeight];
    const invRadialSegments = 1 / radialSegments;
    const angleConst = maxTheta * invRadialSegments;

    for (let yIdx = 0; yIdx < 2; yIdx++) {
      const y = heightSegments[yIdx];

      for (let lngIdx = 0; lngIdx <= radialSegments; lngIdx++) {
        const angle = lngIdx * angleConst + Math.PI - maxTheta * 0.5;
        const x = Math.cos(angle);
        const z = Math.sin(angle);
        const u = lngIdx * invRadialSegments;
        const v = yIdx;

        uvs.push(u, v);
        vertices.push(x, y, z);

        if (yIdx === 0 && lngIdx < radialSegments) {
          const a = lngIdx;
          const b = a + radialSegments + 1;

          indicies.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }

    super(vertices, indicies, uvs);
  }
}

export default CylinderGeometry;
