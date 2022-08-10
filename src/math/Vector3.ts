/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Representation of 3D vectors and points.
 */
class Vector3 implements Iterable<number> {
  /**
   * Back vector, which equals Vector3(0, 0, -1).
   */
  public static get BACK(): Vector3 { return new Vector3(0, 0, -1); }
  /**
   * Down vector, which equals Vector3(0, -1, 0).
   */
  public static get DOWN(): Vector3 { return new Vector3(0, -1, 0); }
  /**
   * Forward vector, which equals Vector3(0, 0, 1).
   */
  public static get FORWARD(): Vector3 { return new Vector3(0, 0, 1); }
  /**
   * Left vector, which equals Vector3(-1, 0, 0).
   */
  public static get LEFT(): Vector3 { return new Vector3(-1, 0, 0); }
  /**
   * One vector, which equals Vector3(1, 1, 1).
   */
  public static get ONE(): Vector3 { return new Vector3(1, 1, 1); }
  /**
   * Right vector, which equals Vector3(1, 0, 0).
   */
  public static get RIGHT(): Vector3 { return new Vector3(1, 0, 0); }
  /**
   * Up vector, which equals Vector3(0, 1, 0).
   */
  public static get UP(): Vector3 { return new Vector3(0, 1, 0); }
  /**
   * Zero vector, which equals Vector3(0, 0, 0).
   */
  public static get ZERO(): Vector3 { return new Vector3(0, 0, 0); }

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
   * Create a new Vector3
   * @param x - X component of the vector.
   * @param y - Y component of the vector.
   * @param z - Z component of the vector.
   */
  public constructor(public x = 0, public y = 0, public z = 0) {}

  /**
   * Add vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Add(v1: Vector3, v2: Vector3, result = new Vector3()): Vector3 {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    result.x = x1 + x2;
    result.y = y1 + y2;
    result.z = z1 + z2;

    return result;
  }

  /**
   * Subtract vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Sub(v1: Vector3, v2: Vector3, result = new Vector3()): Vector3 {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    result.x = x1 - x2;
    result.y = y1 - y2;
    result.z = z1 - z2;

    return result;
  }

  /**
   * Multiply vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Multiply(v1: Vector3, v2: Vector3, result = new Vector3()): Vector3 {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    result.x = x1 * x2;
    result.y = y1 * y2;
    result.z = z1 * z2;

    return result;
  }

  /**
   * Divide vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Divide(v1: Vector3, v2: Vector3, result = new Vector3()): Vector3 {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    result.x = x1 / x2;
    result.y = y1 / y2;
    result.z = z1 / z2;

    return result;
  }

  /**
   * Add a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static AddScalar(vector: Vector3, scalar: number, result = new Vector3()): Vector3 {
    const { x, y, z } = vector;

    result.x = x + scalar;
    result.y = y + scalar;
    result.z = z + scalar;

    return result;
  }

  /**
   * Subtract a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static SubScalar(vector: Vector3, scalar: number, result = new Vector3()): Vector3 {
    const { x, y, z } = vector;

    result.x = x - scalar;
    result.y = y - scalar;
    result.z = z - scalar;

    return result;
  }

  /**
   * Multiply a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static MultiplyScalar(vector: Vector3, scalar: number, result = new Vector3()): Vector3 {
    const { x, y, z } = vector;

    result.x = x * scalar;
    result.y = y * scalar;
    result.z = z * scalar;

    return result;
  }

  /**
   * Multiply a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static DivideScalar(vector: Vector3, scalar: number, result = new Vector3()): Vector3 {
    const { x, y, z } = vector;
    const invScalar = 1 / scalar;

    result.x = x * invScalar;
    result.y = y * invScalar;
    result.z = z * invScalar;

    return result;
  }

  /**
   * Calculate the dot product between two vectors
   * @param v1 - the first operand
   * @param v2 - the second operand
   */
  public static Dot(v1: Vector3, v2: Vector3): number {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    return x1 * x2 + y1 * y2 + z1 * z2;
  }

  /**
   * Normalize vector
   * @param vec - A vector to normalize
   * @param result - Result vector
   */
  public static Normalize(vec: Vector3, result = new Vector3()): Vector3 {
    const { x, y, z } = vec;
    const lengthSqr = x * x + y * y + z * z;

    if (lengthSqr <= 0) {
      result.x = 0;
      return result;
    }

    const lengthInv = 1 / Math.sqrt(lengthSqr);

    result.x = x * lengthInv;
    result.y = y * lengthInv;
    result.z = z * lengthInv;

    return result;
  }

  /**
   * Negate vector
   * @param vec - A vector to negate
   * @param result - Result vector
   */
  public static Negate(vec: Vector3, result = new Vector3()): Vector3 {
    const { x, y, z } = vec;

    result.x = -x;
    result.y = -y;
    result.z = -z;

    return result;
  }

  /**
   * Create a new Vector3 which equals v1 cross v2
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Cross(v1: Vector3, v2: Vector3, result = new Vector3()): Vector3 {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    result.x = y1 * z2 - z1 * y2;
    result.y = z1 * x2 - x1 * z2;
    result.z = x1 * y2 - y1 * x2;

    return result;
  }

  /**
   * Return a vector which has minimum element of two vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Min(v1: Vector3, v2: Vector3, result = new Vector3()): Vector3 {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    result.x = Math.min(x1, x2);
    result.y = Math.min(y1, y2);
    result.z = Math.min(z1, z2);

    return result;
  }

  /**
   * Return a vector which has maximum element of two vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Max(v1: Vector3, v2: Vector3, result = new Vector3()): Vector3 {
    const { x: x1, y: y1, z: z1 } = v1;
    const { x: x2, y: y2, z: z2 } = v2;

    result.x = Math.max(x1, x2);
    result.y = Math.max(y1, y2);
    result.z = Math.max(z1, z2);

    return result;
  }

  public *[Symbol.iterator](): Iterator<number> {
		yield this.x;
		yield this.y;
		yield this.z;
  }

  /**
   * Set components of this vector
   * @param x - X component of the vector.
   * @param y - Y component of the vector.
   * @param z - Z component of the vector.
   */
  public set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  /**
   * Clone this vector
   */
  public clone(): Vector3 {
    const { x, y, z } = this;

    return new Vector3(x, y, z);
  }

  /**
   * Copy elements of the given vector
   */
  public copy(vector: Vector3): this {
    const { x, y, z } = vector;

    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }

  /**
   * Returns [x, y, z]
   */
  public toArray(): number[] {
    const { x, y, z } = this;

    return [x, y, z];
  }

  /**
   * Calculates the sqaured euclidian length from [0, 0, 0] to this vector
   */
  public lengthSquared(): number {
    const { x, y, z } = this;

    return x * x + y * y + z * z;
  }

  /**
   * Calculates the euclidian length from [0, 0, 0] to this vector
   */
  public length(): number {
    const { x, y, z } = this;

    return Math.hypot(x, y, z);
  }

  /**
   * Normalize this vector
   */
  public normalize = Vector3.Normalize.bind(null, this, this) as () => this;

  /**
   * Negate this vector
   */
  public negate = Vector3.Negate.bind(null, this, this) as () => this;

  /**
   * Add another vector to this vector
   * @param vector - the second operand
   */
  public add = (vector: Vector3): this => Vector3.Add(this, vector, this) as this;

  /**
   * Subtract another vector to this vector
   * @param vector - the second operand
   */
  public sub = (vector: Vector3): this => Vector3.Sub(this, vector, this) as this;

  /**
   * Multiply this vector by the given vector
   * @param vector - the second operand
   */
  public multiply = (vector: Vector3): this => Vector3.Multiply(this, vector, this) as this;

  /**
   * Divide this vector by the given vector
   * @param vector - the second operand
   */
  public divide = (vector: Vector3): this => Vector3.Divide(this, vector, this) as this;

  /**
   * Add a scalar value to this vector
   * @param scalar - A scalar value to add
   */
  public addScalar = (scalar: number): this => Vector3.AddScalar(this, scalar, this) as this;

  /**
   * Subtract a scalar value to this vector
   * @param scalar - A scalar value to subtract
   */
  public subScalar = (scalar: number): this => Vector3.SubScalar(this, scalar, this) as this;

  /**
   * Multiply this vector by the given scalar
   * @param scalar - A scalar value to scale the vector by
   */
  public multiplyScalar = (scalar: number): this => Vector3.MultiplyScalar(this, scalar, this) as this;

  /**
   * Divide this vector by the given scalar
   * @param scalar - A scalar value to scale the vector by
   */
  public divideScalar = (scalar: number): this => Vector3.DivideScalar(this, scalar, this) as this;

  /**
   * Calculate the dot product between this vector and the given vector
   * @param vector - the second operand
   */
  public dot = (vector: Vector3): number => Vector3.Dot(this, vector);

  /**
   * Set this vector to cross product between this vector and the given vector
   * @param vector - the second operand
   */
  public cross = (vector: Vector3): Vector3 => Vector3.Cross(this, vector, this) as this;

  /**
   * Replace all elements of this vector with the smaller of the two vectors.
   * @param vector - the second operand
   */
  public min = (vector: Vector3): this => Vector3.Min(this, vector, this) as this;

  /**
   * Replace all elements of this vector with the bigger of the two vectors.
   * @param vector - the second operand
   */
  public max = (vector: Vector3): this => Vector3.Max(this, vector, this) as this;
}

export default Vector3;

