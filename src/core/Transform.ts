/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Matrix from "../math/Matrix";
import Vector3 from "../math/Vector3";
import { toRadian } from "../utils";

/**
 * Object Transform
 */
class Transform {
  public m: Matrix;
  public mInv: Matrix;

  public constructor(m: Matrix, mInv: Matrix) {
    this.m = m;
    this.mInv = mInv;
  }

  /**
   * Create new translate transform
   * @param delta - position delta
   */
  public static Translate(delta: Vector3): Transform {
    const { x, y, z } = delta;
    const m = new Matrix(new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1
    ]));
    const mInv = new Matrix(new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -x, -y, -z, 1
    ]));

    return new Transform(m, mInv);
  }

  /**
   * Create new scale transform
   * @param x - X scale
   * @param y - Y scale
   * @param z - Z scale
   */
  public static Scale(x: number, y: number, z: number): Transform {
    const m = new Matrix(new Float32Array([
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    ]));
    const mInv = new Matrix(new Float32Array([
      1 / x, 0, 0, 0,
      0, 1 / y, 0, 0,
      0, 0, 1 / z, 0,
      0, 0, 0, 1
    ]));

    return new Transform(m, mInv);
  }

  /**
   * Create a new transform that represents rotation about arbitary axis
   * @param degree - rotation degree
   * @param axis - rotation axis
   */
  public static Rotate(degree: number, axis: Vector3): Transform {
    const { x, y, z } = axis.clone().normalize();
    const radian = toRadian(degree);
    const sinTheta = Math.sin(radian);
    const cosTheta = Math.cos(radian);
    const oneMinusCosTheta = 1 - cosTheta;
    const m = new Float32Array(16);

    m[0] = cosTheta + oneMinusCosTheta * x * x;
    m[1] = oneMinusCosTheta * x * y + sinTheta * z;
    m[2] = oneMinusCosTheta * x * z - sinTheta * y;
    m[3] = 0;

    m[4] = oneMinusCosTheta * x * y - sinTheta * z;
    m[5] = cosTheta + oneMinusCosTheta * y * y;
    m[6] = oneMinusCosTheta * y * z + sinTheta * x;
    m[7] = 0;

    m[8] = oneMinusCosTheta * x * z + sinTheta * y;
    m[9] = oneMinusCosTheta * y * z - sinTheta * x;
    m[10] = cosTheta + oneMinusCosTheta * z * z;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    const rotMat = new Matrix(m);

    return new Transform(rotMat, Matrix.Transpose(rotMat));
  }

  /**
   * Create a new transform that represents rotation about x-axis
   * @param degree - rotation degree
   */
  public static RotateX(degree: number): Transform {
    const radian = toRadian(degree);
    const sinTheta = Math.sin(radian);
    const cosTheta = Math.cos(radian);

    const m = new Matrix(new Float32Array([
      1, 0, 0, 0,
      0, cosTheta, sinTheta, 0,
      0, -sinTheta, cosTheta, 0,
      0, 0, 0, 1
    ]));
    const mInv = Matrix.Transpose(m);

    return new Transform(m, mInv);
  }

  /**
   * Create a new transform that represents rotation about y-axis
   * @param degree - rotation degree
   */
  public static RotateY(degree: number): Transform {
    const radian = toRadian(degree);
    const sinTheta = Math.sin(radian);
    const cosTheta = Math.cos(radian);

    const m = new Matrix(new Float32Array([
      cosTheta, 0, -sinTheta, 0,
      0, 1, 0, 0,
      sinTheta, 0, cosTheta, 0,
      0, 0, 0, 1
    ]));
    const mInv = Matrix.Transpose(m);

    return new Transform(m, mInv);
  }

  /**
   * Create a new transform that represents rotation about z-axis
   * @param degree - rotation degree
   */
  public static RotateZ(degree: number): Transform {
    const radian = toRadian(degree);
    const sinTheta = Math.sin(radian);
    const cosTheta = Math.cos(radian);

    const m = new Matrix(new Float32Array([
      cosTheta, sinTheta, 0, 0,
      -sinTheta, cosTheta, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]));
    const mInv = Matrix.Transpose(m);

    return new Transform(m, mInv);
  }

  /**
   * Create a new transform that represents LookAt matrix
   * @param pos - camera position
   * @param look - position to look at
   * @param up - up vector
   */
  public static LookAt(pos: Vector3, look: Vector3, up: Vector3): Transform {
    const dir = Vector3.Sub(look, pos).normalize();
    const left = Vector3.Cross(up, dir).normalize();
    const newUp = Vector3.Cross(dir, left);
    const m = new Float32Array(16);

    m[0] = left.x;
    m[1] = left.y;
    m[2] = left.z;
    m[3] = 0;
    m[4] = newUp.x;
    m[5] = newUp.y;
    m[6] = newUp.z;
    m[7] = 0;
    m[8] = dir.x;
    m[9] = dir.y;
    m[10] = dir.z;
    m[11] = 0;
    m[12] = pos.x;
    m[13] = pos.y;
    m[14] = pos.z;
    m[15] = 1;

    const cameraToWorld = new Matrix(m);

    return new Transform(cameraToWorld.clone().invert(), cameraToWorld);
  }

  /**
   * Inverse transform
   * @param transform - transform to inverse
   * @param result - result transform
   */
  public static Inverse(transform: Transform, result: Transform): Transform {
    const { m, mInv } = transform;

    result.mInv = m;
    result.m = mInv;

    return result;
  }

  /**
   * Transpose transform
   * @param transform - transform to transpose
   * @param result - result transform
   */
  public static Transpose(transform: Transform, result: Transform): Transform {
    const { m, mInv } = transform;

    result.m = Matrix.Transpose(m);
    result.mInv = Matrix.Transpose(mInv);

    return result;
  }

  /**
   * Multiply transforms
   * @param transform1 - The first operand
   * @param transform2 - The second operand
   * @param result - result transform
   */
  public static Multiply(transform1: Transform, transform2: Transform, result: Transform) {
    const { m: m1, mInv: mInv1 } = transform1;
    const { m: m2, mInv: mInv2 } = transform2;

    result.m = Matrix.Multiply(m1, m2);
    result.mInv = Matrix.Multiply(mInv1, mInv2);

    return result;
  }

  /**
   * Apply this transform to the point
   * @param pos - A point to apply transform
   * @param result - A transformed point
   */
  public applyToPoint(pos: Vector3, result = new Vector3()): Vector3 {
    const { m } = this.m;

    const { x, y, z } = pos;
    const m00 = m[ 0], m10 = m[ 1], m20 = m[ 2], m30 = m[ 3];
    const m01 = m[ 4], m11 = m[ 5], m21 = m[ 6], m31 = m[ 7];
    const m02 = m[ 8], m12 = m[ 9], m22 = m[10], m32 = m[11];
    const m03 = m[12], m13 = m[13], m23 = m[14], m33 = m[15];

    const xp = m00 * x + m01 * y + m02 * z + m03;
    const yp = m10 * x + m11 * y + m12 * z + m13;
    const zp = m20 * x + m21 * y + m22 * z + m23;
    const wp = m30 * x + m31 * y + m32 * z + m33;


    if (wp !== 1) {
      result.x = xp / wp;
      result.y = yp / wp;
      result.z = zp / wp;
    } else {
      result.x = xp;
      result.y = yp;
      result.z = zp;
    }

    return result;
  }

  /**
   * Apply this transform to the vector
   * @param pos - A vector to apply transform
   * @param result - A transformed vector
   */
  public applyToVector(pos: Vector3, result = new Vector3()): Vector3 {
    const { m } = this.m;

    const { x, y, z } = pos;
    const m00 = m[ 0], m10 = m[ 1], m20 = m[ 2];
    const m01 = m[ 4], m11 = m[ 5], m21 = m[ 6];
    const m02 = m[ 8], m12 = m[ 9], m22 = m[10];

    const xp = m00 * x + m01 * y + m02 * z;
    const yp = m10 * x + m11 * y + m12 * z;
    const zp = m20 * x + m21 * y + m22 * z;

    result.x = xp;
    result.y = yp;
    result.z = zp;

    return result;
  }

  /**
   * Apply this transform to the normal vector
   * @param pos - A normal vector to apply transform
   * @param result - A transformed normal vector
   */
  public applyToNormal(normal: Vector3, result = new Vector3()): Vector3 {
    const { m } = this.mInv;

    const { x, y, z } = normal;
    const m00 = m[ 0], m10 = m[ 1], m20 = m[ 2];
    const m01 = m[ 4], m11 = m[ 5], m21 = m[ 6];
    const m02 = m[ 8], m12 = m[ 9], m22 = m[10];

    result.x = m00 * x + m10 * y + m20 * z;
    result.y = m01 * x + m11 * y + m21 * z;
    result.z = m02 * x + m12 * y + m22 * z;

    return result;
  }

  /**
   * Returns whether this transform swaps handedness
   */
  public swapsHandedness(): boolean {
    const { m } = this.m;

    const m00 = m[ 0], m10 = m[ 1], m20 = m[ 2];
    const m01 = m[ 4], m11 = m[ 5], m21 = m[ 6];
    const m02 = m[ 8], m12 = m[ 9], m22 = m[10];

    const det = m00 * (m11 * m22 - m12 * m21)
      - m01 * (m10 * m22 - m12 * m20)
      + m02 * (m10 * m21 - m11 * m20);

    return det < 0;
  }
}

export default Transform;
