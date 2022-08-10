/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Matrix from "./Matrix";
import Transform from "../core/Transform";
import { clamp } from "../utils";

/**
 * Representation of rotation
 */
class Quaternion {
  /**
   * Identity quaternion, which equals Quaternion(0, 0, 0, 1)
   */
  public static get IDENTITY() { return new Quaternion(0, 0, 0, 1); }

  /**
   * X component of the quaternion.
   */
  public get 0() { return this.x; }
  /**
  * Y component of the quaternion.
  */
  public get 1() { return this.y; }
  /**
  * Z component of the quaternion.
  */
  public get 2() { return this.z; }
  /**
  * W component of the quaternion.
  */
  public get 3() { return this.w; }

  /**
   * Create new Quaternion
   * @param x - X component of the quaternion.
   * @param y - Y component of the quaternion.
   * @param z - Z component of the quaternion.
   * @param w - W component of the quaternion.
   */
  public constructor(public x = 0, public y = 0, public z = 0, public w = 1) {}

  /**
   * Add quaternions
   * @param q1 - The first operand
   * @param q2 - The second operand
   * @param result - Result quaternion
   */
   public static Add(q1: Quaternion, q2: Quaternion, result = new Quaternion()): Quaternion {
    const { x: x1, y: y1, z: z1, w: w1 } = q1;
    const { x: x2, y: y2, z: z2, w: w2 } = q2;

    result.x = x1 + x2;
    result.y = y1 + y2;
    result.z = z1 + z2;
    result.w = w1 + w2;

    return result;
  }

  /**
   * Subtract quaternions
   * @param q1 - The first operand
   * @param q2 - The second operand
   * @param result - Result quaternion
   */
  public static Sub(q1: Quaternion, q2: Quaternion, result = new Quaternion()): Quaternion {
    const { x: x1, y: y1, z: z1, w: w1 } = q1;
    const { x: x2, y: y2, z: z2, w: w2 } = q2;

    result.x = x1 - x2;
    result.y = y1 - y2;
    result.z = z1 - z2;
    result.w = w1 - w2;

    return result;
  }

  /**
   * Multiply two quaternions
   * @param q1 - the first operand
   * @param q2 - the second operand
   * @param result - result
   */
   public static Multiply(q1: Quaternion, q2: Quaternion, result = new Quaternion()): Quaternion {
    const { x: x1, y: y1, z: z1, w: w1 } = q1;
    const { x: x2, y: y2, z: z2, w: w2 } = q2;

    result.x = w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2;
    result.y = w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2;
    result.z = w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2;
    result.w = w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2;

    return result;
  }

  /**
   * Add a scalar value to quaternion
   * @param q - Base quaternion
   * @param scalar - A scalar value to add
   * @param result - Result quaternion
   */
  public static AddScalar(q: Quaternion, scalar: number, result = new Quaternion()): Quaternion {
    const { x, y, z, w } = q;

    result.x = x + scalar;
    result.y = y + scalar;
    result.z = z + scalar;
    result.w = w + scalar;

    return result;
  }

  /**
   * Subtract a scalar value to quaternion
   * @param q - Base quaternion
   * @param scalar - A scalar value to add
   * @param result - Result quaternion
   */
  public static SubScalar(q: Quaternion, scalar: number, result = new Quaternion()): Quaternion {
    const { x, y, z, w } = q;

    result.x = x - scalar;
    result.y = y - scalar;
    result.z = z - scalar;
    result.w = w - scalar;

    return result;
  }

  /**
   * Multiply a scalar value to quaternion
   * @param q - Base quaternion
   * @param scalar - A scalar value to add
   * @param result - Result quaternion
   */
  public static MultiplyScalar(q: Quaternion, scalar: number, result = new Quaternion()): Quaternion {
    const { x, y, z, w } = q;

    result.x = x * scalar;
    result.y = y * scalar;
    result.z = z * scalar;
    result.w = w * scalar;

    return result;
  }

  /**
   * Multiply a scalar value to quaternion
   * @param q - Base quaternion
   * @param scalar - A scalar value to add
   * @param result - Result quaternion
   */
  public static DivideScalar(q: Quaternion, scalar: number, result = new Quaternion()): Quaternion {
    const { x, y, z, w } = q;
    const invScalar = 1 / scalar;

    result.x = x * invScalar;
    result.y = y * invScalar;
    result.z = z * invScalar;
    result.w = w * invScalar;

    return result;
  }

  /**
   * Conjugate the given quaternion
   * @param q The quaternion to conjugate
   * @param result Result
   */
  public static Conjugate(q: Quaternion, result = new Quaternion()): Quaternion {
    const { x, y, z, w } = q;

    result.x = -x;
    result.y = -y;
    result.z = -z;
    result.w = w;

    return result;
  }

  /**
   * Invert the given quaternion
   * @param q - the quaternion to invert
   * @param result - result
   */
  public static Invert(q: Quaternion, result = new Quaternion()): Quaternion {
    const { x, y, z, w } = q;
    const sqrLen = x * x + y * y + z * z + w * w;

    if (sqrLen <= 0) {
      result.x = 0;
      result.y = 0;
      result.z = 0;
      result.w = 0;
    } else {
      const invSqrLen = 1 / sqrLen;

      result.x = -x * invSqrLen;
      result.y = -y * invSqrLen;
      result.z = -z * invSqrLen;
      result.w = w * invSqrLen;
    }

    return result;
  }

  /**
   * Normalize the given quaternion
   * @param q - the quaternion to normalize
   * @param result - result
   */
  public static Normalize(q: Quaternion, result = new Quaternion()): Quaternion {
    const { x, y, z, w } = q;
    const lengthSqr = x * x + y * y + z * z + w * w;

    if (lengthSqr <= 0) {
      result.x = 0;
      result.y = 0;
      result.z = 0;
      result.w = 0;
    } else {
      const lengthInv = 1 / Math.sqrt(lengthSqr);

      result.x = x * lengthInv;
      result.y = y * lengthInv;
      result.z = z * lengthInv;
      result.w = w * lengthInv;
    }

    return result;
  }

  /**
   * Calculate the dot product between two quaternions
   * @param q1 - the first operand
   * @param q2 - the second operand
   */
  public static Dot(q1: Quaternion, q2: Quaternion): number {
    const { x: x1, y: y1, z: z1, w: w1 } = q1;
    const { x: x2, y: y2, z: z2, w: w2 } = q2;

    return x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2;
  }

  /**
   * Spherical linear interpolation
   * @param q1 The first operand
   * @param q2 The second operand
   * @param t Interpolation amount, t ∈ [0, 1]
   * @param result Result
   */
  public static Slerp(q1: Quaternion, q2: Quaternion, t: number, result = new Quaternion()): Quaternion {
    const { x: x1, y: y1, z: z1, w: w1 } = q1;
    const { x: x2, y: y2, z: z2, w: w2 } = q2;
    const cosTheta = x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2;
    const oneMinusT = 1 - t;

    if (cosTheta > 0.9995) {
      result.x = oneMinusT * x1 + t * x2;
      result.y = oneMinusT * x1 + t * x2;
      result.z = oneMinusT * x1 + t * x2;
      result.w = oneMinusT * x1 + t * x2;
      result.normalize();
    } else {
      const thetaP = t * Math.acos(clamp(cosTheta, -1, 1));
      const cosThetaP = Math.cos(thetaP);
      const sinThetaP = Math.sin(thetaP);
      const { x: xp, y: yp, z: zp, w: wp } = new Quaternion(
        x2 - x1 * cosTheta,
        y2 - y1 * cosTheta,
        z2 - z1 * cosTheta,
        w2 - w1 * cosTheta
      ).normalize();

      result.x = cosThetaP * x1 + sinThetaP * xp;
      result.y = cosThetaP * y1 + sinThetaP * yp;
      result.z = cosThetaP * z1 + sinThetaP * zp;
      result.w = cosThetaP * w1 + sinThetaP * wp;
    }

    return result;
  }

  public *[Symbol.iterator](): Iterator<number> {
		yield this.x;
		yield this.y;
		yield this.z;
    yield this.w;
  }

  /**
   * Set components of this quaternion
   * @param x - X component of the quaternion.
   * @param y - Y component of the quaternion.
   * @param z - Z component of the quaternion.
   * @param w - W component of the quaternion.
   */
  public set(x: number, y: number, z: number, w: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
  }

  /**
   * Clone this quaternion
   */
  public clone(): Quaternion {
    const { x, y, z, w } = this;

    return new Quaternion(x, y, z, w);
  }

  /**
   * Returns [x, y, z, w]
   */
  public toArray(): number[] {
    const { x, y, z, w } = this;

    return [x, y, z, w];
  }

  /**
   * Set this quaternion to identity quaternion
   */
  public identity(): this {
    return this.set(0, 0, 0, 1);
  }

  /**
   * Conjugate this quaternion
   */
  public conjugate = Quaternion.Conjugate.bind(Quaternion, this, this);

  /**
   * Invert this quaternion
   */
  public invert = Quaternion.Invert.bind(Quaternion, this, this);

  /**
   * Normalize this quaternion
   */
  public normalize = Quaternion.Normalize.bind(Quaternion, this, this);

  /**
   * Multiply this quaternion by the given quaternion and save the result to this quaternion
   * @param other - the second operand
   */
  public multiply = (other: Quaternion): this => Quaternion.Multiply(this, other, this) as this;

  /**
   * Return dot production of this and other quaternion
   * @param other - the second operand
   */
  public dot = Quaternion.Dot.bind(Quaternion, this);

  /**
   * Create rotation transform from this quaternion
   */
  public toTransform(): Transform {
    const { x, y, z, w } = this;

    const m = new Float32Array(16);

    m[0] = 1 - 2 * (y * y + z * z);
    m[1] = 2 * (x * y - z * w);
    m[2] = 2 * (x * z + y * w);
    m[3] = 0;

    m[4] = 2 * (x * y + z * w);
    m[5] = 1 - 2 * (x * x + z * z);
    m[6] = 2 * (y * z - x * w);
    m[7] = 0;

    m[8] = 2 * (x * z - y * w);
    m[9] = 2 * (y * z + x * w);
    m[10] = 1 - 2 * (x * x + y * y);
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    const rotMat = new Matrix(m);

    return new Transform(rotMat, Matrix.Transpose(rotMat));
  }
}

export default Quaternion;
