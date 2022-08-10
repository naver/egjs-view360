/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Representation of 2D vectors and points.
 */
 class Vector2 implements Iterable<number> {
  /**
   * Down vector, which equals Vector2(0, -1).
   */
  public static get DOWN(): Vector2 { return new Vector2(0, -1); }
  /**
   * Left vector, which equals Vector2(-1, 0).
   */
  public static get LEFT(): Vector2 { return new Vector2(-1, 0); }
  /**
   * One vector, which equals Vector2(1, 1).
   */
  public static get ONE(): Vector2 { return new Vector2(1, 1); }
  /**
   * Right vector, which equals Vector2(1, 0).
   */
  public static get RIGHT(): Vector2 { return new Vector2(1, 0); }
  /**
   * Up vector, which equals Vector2(0, 1).
   */
  public static get UP(): Vector2 { return new Vector2(0, 1); }
  /**
   * Zero vector, which equals Vector2(0, 0).
   */
  public static get ZERO(): Vector2 { return new Vector2(0, 0); }

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
   * Create new Vector2
   * @param x - X component of the vector.
   * @param y - Y component of the vector.
   */
  public constructor(public x = 0, public y = 0) {}

  /**
   * Add vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Add(v1: Vector2, v2: Vector2, result = new Vector2()): Vector2 {
    const { x: x1, y: y1 } = v1;
    const { x: x2, y: y2 } = v2;

    result.x = x1 + x2;
    result.y = y1 + y2;

    return result;
  }

  /**
   * Subtract vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Sub(v1: Vector2, v2: Vector2, result = new Vector2()): Vector2 {
    const { x: x1, y: y1 } = v1;
    const { x: x2, y: y2 } = v2;

    result.x = x1 - x2;
    result.y = y1 - y2;

    return result;
  }

  /**
   * Multiply vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
   public static Multiply(v1: Vector2, v2: Vector2, result = new Vector2()): Vector2 {
    const { x: x1, y: y1 } = v1;
    const { x: x2, y: y2 } = v2;

    result.x = x1 * x2;
    result.y = y1 * y2;

    return result;
  }

  /**
   * Divide vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result vector
   */
  public static Divide(v1: Vector2, v2: Vector2, result = new Vector2()): Vector2 {
    const { x: x1, y: y1 } = v1;
    const { x: x2, y: y2 } = v2;

    result.x = x1 / x2;
    result.y = y1 / y2;

    return result;
  }


  /**
   * Add a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static AddScalar(vector: Vector2, scalar: number, result = new Vector2()): Vector2 {
    const { x, y } = vector;

    result.x = x + scalar;
    result.y = y + scalar;

    return result;
  }

  /**
   * Subtract a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static SubScalar(vector: Vector2, scalar: number, result = new Vector2()): Vector2 {
    const { x, y } = vector;

    result.x = x - scalar;
    result.y = y - scalar;

    return result;
  }

  /**
   * Multiply a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static MultiplyScalar(vector: Vector2, scalar: number, result = new Vector2()): Vector2 {
    const { x, y } = vector;

    result.x = x * scalar;
    result.y = y * scalar;

    return result;
  }

  /**
   * Multiply a scalar value to vector
   * @param vector - A base vector
   * @param scalar - A scalar value to add
   * @param result - Result vector
   */
  public static DivideScalar(vector: Vector2, scalar: number, result = new Vector2()): Vector2 {
    const { x, y } = vector;
    const invScalar = 1 / scalar;

    result.x = x * invScalar;
    result.y = y * invScalar;

    return result;
  }

  /**
   * Calculate the dot product between two vectors
   * @param v1 - the first operand
   * @param v2 - the second operand
   */
  public static Dot(v1: Vector2, v2: Vector2): number {
    const { x: x1, y: y1 } = v1;
    const { x: x2, y: y2 } = v2;

    return x1 * x2 + y1 * y2;
  }

  /**
   * Normalize this vector
   */
  public static Normalize(vec: Vector2, result = new Vector2()): Vector2 {
    const { x, y } = vec;
    const lengthSqr = x * x + y * y;

    if (lengthSqr <= 0) {
      result.x = 0;
      return result;
    }

    const lengthInv = 1 / Math.sqrt(lengthSqr);

    result.x = x * lengthInv;
    result.y = y * lengthInv;

    return result;
  }

  /**
   * Negate this vector
   */
  public static Negate(vec: Vector2, result = new Vector2()): Vector2 {
    const { x, y } = vec;

    result.x = -x;
    result.y = -y;

    return result;
  }

  /**
   * Return a vector which has minimum element of two vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Min(v1: Vector2, v2: Vector2, result = new Vector2()): Vector2 {
    const { x: x1, y: y1 } = v1;
    const { x: x2, y: y2 } = v2;

    result.x = Math.min(x1, x2);
    result.y = Math.min(y1, y2);

    return result;
  }

  /**
   * Return a vector which has maximum element of two vectors
   * @param v1 - The first operand
   * @param v2 - The second operand
   * @param result - Result
   */
  public static Max(v1: Vector2, v2: Vector2, result = new Vector2()): Vector2 {
    const { x: x1, y: y1 } = v1;
    const { x: x2, y: y2 } = v2;

    result.x = Math.max(x1, x2);
    result.y = Math.max(y1, y2);

    return result;
  }

  public *[Symbol.iterator](): Iterator<number> {
		yield this.x;
		yield this.y;
  }

  /**
   * Set components of this vector
   * @param x - X component of the vector.
   * @param y - Y component of the vector.
   */
   public set(x: number, y: number): this {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Clone this vector
   */
  public clone(): Vector2 {
    const { x, y } = this;

    return new Vector2(x, y);
  }

  /**
   * Copy elements of the given vector
   */
  public copy(vector: Vector2): this {
    const { x, y } = vector;

    this.x = x;
    this.y = y;

    return this;
  }


  /**
   * Returns [x, y]
   */
  public toArray(): number[] {
    const { x, y } = this;

    return [x, y];
  }

  /**
   * Calculates the sqaured euclidian length from [0, 0, 0] to this vector
   */
  public lengthSquared(): number {
    const { x, y } = this;

    return x * x + y * y;
  }

  /**
   * Calculates the euclidian length from [0, 0, 0] to this vector
   */
  public length(): number {
    const { x, y } = this;

    return Math.hypot(x, y);
  }

  /**
   * Normalize this vector
   */
  public normalize = Vector2.Normalize.bind(null, this, this) as () => this;

  /**
   * Negate this vector
   */
  public negate = Vector2.Negate.bind(null, this, this) as () => this;

  /**
   * Add another vector to this vector
   * @param vector - the second operand
   */
  public add = (vector: Vector2): this => Vector2.Add(this, vector, this) as this;

  /**
   * Subtract another vector to this vector
   * @param vector - the second operand
   */
  public sub = (vector: Vector2): this => Vector2.Sub(this, vector, this) as this;

  /**
   * Multiply this vector by the given vector
   * @param vector - the second operand
   */
  public multiply = (vector: Vector2): this => Vector2.Multiply(this, vector, this) as this;

  /**
   * Divide this vector by the given vector
   * @param vector - the second operand
   */
  public divide = (vector: Vector2): this => Vector2.Divide(this, vector, this) as this;

  /**
   * Add a scalar value to this vector
   * @param scalar - A scalar value to add
   */
  public addScalar = (scalar: number): this => Vector2.AddScalar(this, scalar, this) as this;

  /**
   * Subtract a scalar value to this vector
   * @param scalar - A scalar value to subtract
   */
  public subScalar = (scalar: number): this => Vector2.SubScalar(this, scalar, this) as this;

  /**
   * Multiply this vector by the given scalar
   * @param scalar - A scalar value to scale the vector by
   */
  public multiplyScalar = (scalar: number): this => Vector2.MultiplyScalar(this, scalar, this) as this;

  /**
   * Divide this vector by the given scalar
   * @param scalar - A scalar value to scale the vector by
   */
  public divideScalar = (scalar: number): this => Vector2.DivideScalar(this, scalar, this) as this;

  /**
   * Calculate the dot product between this vector and the given vector
   * @param vector - the second operand
   */
  public dot = (vector: Vector2): number => Vector2.Dot(this, vector);

  /**
   * Replace all elements of this vector with the smaller of the two vectors.
   * @param vector - the second operand
   */
  public min = (vector: Vector2): this => Vector2.Min(this, vector, this) as this;

  /**
   * Replace all elements of this vector with the bigger of the two vectors.
   * @param vector - the second operand
   */
  public max = (vector: Vector2): this => Vector2.Max(this, vector, this) as this;
}

export default Vector2;
