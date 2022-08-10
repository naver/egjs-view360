/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Representation of 4D vectors.
 */
class Vector4 implements Iterable<number> {
  /**
   * One vector, which equals Vector4(1, 1, 1, 1).
   */
  public static get ONE(): Vector4 { return new Vector4(1, 1, 1, 1); }
  /**
   * Zero vector, which equals Vector4(0, 0, 0, 0).
   */
  public static get ZERO(): Vector4 { return new Vector4(0, 0, 0, 0); }

  /**
   * X component of the vector.
   */
  public get 0(): number { return this.x; }
  public set 0(val: number) { this.x = val; }
  /**
   * Y component of the vector.
   */
  public get 1(): number { return this.y; }
  public set 1(val: number) { this.y = val; }
  /**
   * Z component of the vector.
   */
  public get 2(): number { return this.z; }
  public set 2(val: number) { this.z = val; }
  /**
   * W component of the vector.
   */
  public get 3(): number { return this.w; }
  public set 3(val: number) { this.w = val; }

  /**
   * Create new Vector4
   * @param x - X component of the vector.
   * @param y - Y component of the vector.
   * @param z - Z component of the vector.
   * @param w - W component of the vector.
   */
  public constructor(public x = 0, public y = 0, public z = 0, public w = 0) {}

  /**
   * Add vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Add(v1: Vector4, v2: Vector4, result = new Vector4()): Vector4 {
    const { x: x1, y: y1, z: z1, w: w1 } = v1;
    const { x: x2, y: y2, z: z2, w: w2 } = v2;

    result.x = x1 + x2;
    result.y = y1 + y2;
    result.z = z1 + z2;
    result.w = w1 + w2;

    return result;
  }

  /**
   * Subtract vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Sub(v1: Vector4, v2: Vector4, result = new Vector4()): Vector4 {
    const { x: x1, y: y1, z: z1, w: w1 } = v1;
    const { x: x2, y: y2, z: z2, w: w2 } = v2;

    result.x = x1 - x2;
    result.y = y1 - y2;
    result.z = z1 - z2;
    result.w = w1 - w2;

    return result;
  }

  /**
   * Multiply vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Multiply(v1: Vector4, v2: Vector4, result = new Vector4()): Vector4 {
    const { x: x1, y: y1, z: z1, w: w1 } = v1;
    const { x: x2, y: y2, z: z2, w: w2 } = v2;

    result.x = x1 * x2;
    result.y = y1 * y2;
    result.z = z1 * z2;
    result.w = w1 * w2;

    return result;
  }

  /**
   * Divide vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Divide(v1: Vector4, v2: Vector4, result = new Vector4()): Vector4 {
    const { x: x1, y: y1, z: z1, w: w1 } = v1;
    const { x: x2, y: y2, z: z2, w: w2 } = v2;

    result.x = x1 / x2;
    result.y = y1 / y2;
    result.z = z1 / z2;
    result.w = w1 / w2;

    return result;
  }

  /**
   * Add a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static AddScalar(vector: Vector4, scalar: number, result = new Vector4()): Vector4 {
    const { x, y, z, w } = vector;

    result.x = x + scalar;
    result.y = y + scalar;
    result.z = z + scalar;
    result.w = w + scalar;

    return result;
  }

  /**
   * Subtract a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static SubScalar(vector: Vector4, scalar: number, result = new Vector4()): Vector4 {
    const { x, y, z, w } = vector;

    result.x = x - scalar;
    result.y = y - scalar;
    result.z = z - scalar;
    result.w = w - scalar;

    return result;
  }

  /**
   * Multiply a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static MultiplyScalar(vector: Vector4, scalar: number, result = new Vector4()): Vector4 {
    const { x, y, z, w } = vector;

    result.x = x * scalar;
    result.y = y * scalar;
    result.z = z * scalar;
    result.w = w * scalar;

    return result;
  }

  /**
   * Multiply a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static DivideScalar(vector: Vector4, scalar: number, result = new Vector4()): Vector4 {
    const { x, y, z, w } = vector;
    const invScalar = 1 / scalar;

    result.x = x * invScalar;
    result.y = y * invScalar;
    result.z = z * invScalar;
    result.w = w * invScalar;

    return result;
  }

  /**
   * Calculate the dot product between two vectors
   * @param v1 - the first operand
   * @param v2 - the second operand
   */
  public static Dot(v1: Vector4, v2: Vector4): number {
    const { x: x1, y: y1, z: z1, w: w1 } = v1;
    const { x: x2, y: y2, z: z2, w: w2 } = v2;

    return x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2;
  }

  /**
   * Normalize vector
   * @param vec - A vector to normalize
   * @param result - Result vector
   */
  public static Normalize(vec: Vector4, result = new Vector4()): Vector4 {
    const { x, y, z, w } = vec;
    const lengthSqr = x * x + y * y + z * z + w * w;

    if (lengthSqr <= 0) {
      result.x = 0;
      return result;
    }

    const lengthInv = 1 / Math.sqrt(lengthSqr);

    result.x = x * lengthInv;
    result.y = y * lengthInv;
    result.z = z * lengthInv;
    result.w = w * lengthInv;

    return result;
  }

  /**
   * Negate vector
   * @param vec - A vector to negate
   * @param result - Result vector
   */
  public static Negate(vec: Vector4, result = new Vector4()): Vector4 {
    const { x, y, z, w } = vec;

    result.x = -x;
    result.y = -y;
    result.z = -z;
    result.w = -w;

    return result;
  }

  /**
   * Return a vector which has minimum element of two vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Min(v1: Vector4, v2: Vector4, result = new Vector4()): Vector4 {
    const { x: x1, y: y1, z: z1, w: w1 } = v1;
    const { x: x2, y: y2, z: z2, w: w2 } = v2;

    result.x = Math.min(x1, x2);
    result.y = Math.min(y1, y2);
    result.z = Math.min(z1, z2);
    result.w = Math.min(w1, w2);

    return result;
  }

  /**
   * Return a vector which has maximum element of two vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Max(v1: Vector4, v2: Vector4, result = new Vector4()): Vector4 {
    const { x: x1, y: y1, z: z1, w: w1 } = v1;
    const { x: x2, y: y2, z: z2, w: w2 } = v2;

    result.x = Math.max(x1, x2);
    result.y = Math.max(y1, y2);
    result.z = Math.max(z1, z2);
    result.w = Math.max(w1, w2);

    return result;
  }

  public *[Symbol.iterator](): Iterator<number> {
		yield this.x;
		yield this.y;
		yield this.z;
    yield this.w;
  }

  /**
   * Set components of this vector
   * @param x - X component of the vector.
   * @param y - Y component of the vector.
   * @param z - Z component of the vector.
   * @param w - W component of the vector.
   */
  public set(x: number, y: number, z: number, w: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
  }

  /**
   * Clone this vector
   */
  public clone(): Vector4 {
    const { x, y, z, w } = this;

    return new Vector4(x, y, z, w);
  }

  /**
   * Copy elements of the given vector
   */
  public copy(vector: Vector4): this {
    const { x, y, z, w } = vector;

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
  }

  /**
   * Returns [x, y, z, w]
   */
  public toArray(): number[] {
    const { x, y, z, w } = this;

    return [x, y, z, w];
  }

  /**
   * Calculates the sqaured euclidian length from [0, 0, 0, 0] to this vector
   */
  public lengthSquared(): number {
    const { x, y, z, w } = this;

    return x * x + y * y + z * z + w * w;
  }

  /**
   * Calculates the euclidian length from [0, 0, 0, 0] to this vector
   */
  public length(): number {
    const { x, y, z, w } = this;

    return Math.hypot(x, y, z, w);
  }

  /**
   * Normalize this vector
   */
  public normalize = Vector4.Normalize.bind(Vector4, this, this) as () => this;

  /**
   * Negate this vector
   */
  public negate = Vector4.Negate.bind(Vector4, this, this) as () => this;

  /**
   * Add another vector to this vector
   * @param vector - the second operand
   */
  public add = (vector: Vector4): this => Vector4.Add(this, vector, this) as this;

  /**
   * Subtract another vector to this vector
   * @param vector - the second operand
   */
  public sub = (vector: Vector4): this => Vector4.Sub(this, vector, this) as this;

  /**
   * Multiply this vector by the given vector
   * @param vector - the second operand
   */
  public multiply = (vector: Vector4): this => Vector4.Multiply(this, vector, this) as this;

  /**
   * Divide this vector by the given vector
   * @param vector - the second operand
   */
  public divide = (vector: Vector4): this => Vector4.Divide(this, vector, this) as this;

  /**
   * Add a scalar value to this vector
   * @param scalar - A scalar value to add
   */
  public addScalar = (scalar: number): this => Vector4.AddScalar(this, scalar, this) as this;

  /**
   * Subtract a scalar value to this vector
   * @param scalar - A scalar value
   */
  public subScalar = (scalar: number): this => Vector4.SubScalar(this, scalar, this) as this;

  /**
   * Multiply a scalar value to this vector
   * @param scalar - A scalar value
   */
  public multiplyScalar = (scalar: number): this => Vector4.MultiplyScalar(this, scalar, this) as this;

  /**
   * Divide a scalar value to this vector
   * @param scalar - A scalar value
   */
  public divideScalar = (scalar: number): this => Vector4.DivideScalar(this, scalar, this) as this;

  /**
   * Calculate the dot product between this vector and the given vector
   * @param vector - the second operand
   */
  public dot = (vector: Vector4): number => Vector4.Dot(this, vector);

  /**
   * Replace all elements of this vector with the smaller of the two vectors.
   * @param vector - the second operand
   */
  public min = (vector: Vector4): this => Vector4.Min(this, vector, this) as this;

  /**
   * Replace all elements of this vector with the bigger of the two vectors.
   * @param vector - the second operand
   */
  public max = (vector: Vector4): this => Vector4.Max(this, vector, this) as this;
}

export default Vector4;
