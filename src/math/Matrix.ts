import Quaternion from "./Quaternion";
import Vector3 from "./Vector3";
import Vector4 from "./Vector4";

const identityFloat32Arr = new Float32Array([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]);

/**
 * 4x4 matrix of column-major floating point values
 */
class Matrix {
  /**
   * Actual data of the matrix
   */
  public readonly m: Float32Array;

  /**
   * Create new 4x4 matrix
   * If parameters are not given, it will initialize as identity matrix
   */
  public constructor(m?: Float32Array) {
    this.m = m ?? new Float32Array(identityFloat32Arr);
  }

  /**
   * Multiply this matrix by the given matrix
   * @param other - the second operand
   */
  public static Multiply(m1: Matrix, m2: Matrix, result = new Matrix()): Matrix {
    const { m: a } = m1;
    const { m: b } = m2;
    const { m } = result;

    const a00 = a[ 0], a10 = a[ 1], a20 = a[ 2], a30 = a[ 3];
    const a01 = a[ 4], a11 = a[ 5], a21 = a[ 6], a31 = a[ 7];
    const a02 = a[ 8], a12 = a[ 9], a22 = a[10], a32 = a[11];
    const a03 = a[12], a13 = a[13], a23 = a[14], a33 = a[15];

    const b00 = b[ 0], b10 = b[ 1], b20 = b[ 2], b30 = b[ 3];
    const b01 = b[ 4], b11 = b[ 5], b21 = b[ 6], b31 = b[ 7];
    const b02 = b[ 8], b12 = b[ 9], b22 = b[10], b32 = b[11];
    const b03 = b[12], b13 = b[13], b23 = b[14], b33 = b[15];

    m[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
    m[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
    m[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
    m[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;

    m[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
    m[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
    m[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
    m[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;

    m[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
    m[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
    m[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
    m[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;

    m[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
    m[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
    m[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
    m[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

    return result;
  }

  /**
   * Invert matrix
   * @param matrix - A matrix to invert
   * @param result - A result matrix
   */
  public static Invert(matrix: Matrix, result = new Matrix()) {
    const m = matrix.m;
    const r = result.m;

    const m00 = m[ 0], m10 = m[ 1], m20 = m[ 2], m30 = m[ 3];
    const m01 = m[ 4], m11 = m[ 5], m21 = m[ 6], m31 = m[ 7];
    const m02 = m[ 8], m12 = m[ 9], m22 = m[10], m32 = m[11];
    const m03 = m[12], m13 = m[13], m23 = m[14], m33 = m[15];

    // Determinant of the sub matrix (2*2)
    const d0213 = m02 * m13 - m03 * m12;
    const d0223 = m02 * m23 - m03 * m22;
    const d0233 = m02 * m33 - m03 * m32;
    const d1223 = m12 * m23 - m13 * m22;
    const d1233 = m12 * m33 - m13 * m32;
    const d2233 = m22 * m33 - m23 * m32;

    const cofactor00 = m11 * d2233 - m21 * d1233 + m31 * d1223;
    const cofactor10 = m01 * d2233 - m21 * d0233 + m31 * d0223;
    const cofactor20 = m01 * d1233 - m11 * d0233 + m31 * d0213;
    const cofactor30 = m01 * d1223 - m11 * d0223 + m21 * d0213;

    const det = m00 * cofactor00 - m10 * cofactor10 + m20 * cofactor20 - m30 * cofactor30;

    if (det === 0) {
      r.fill(0);
      return result;
    }

    const detInv = 1 / det;

    const d2133 = m21 * m33 - m23 * m31;
    const d1133 = m11 * m33 - m13 * m31;
    const d1123 = m11 * m23 - m13 * m21;
    const d2132 = m21 * m32 - m22 * m31;
    const d1132 = m11 * m32 - m12 * m31;
    const d1122 = m11 * m22 - m12 * m21;
    const d0133 = m01 * m33 - m03 * m31;
    const d0123 = m01 * m23 - m03 * m21;
    const d0132 = m01 * m32 - m02 * m31;
    const d0122 = m01 * m22 - m02 * m21;
    const d0113 = m01 * m13 - m03 * m11;
    const d0112 = m01 * m12 - m02 * m11;

    const cofactor01 = m10 * d2233 - m20 * d1233 + m30 * d1223;
    const cofactor02 = m10 * d2133 - m20 * d1133 + m30 * d1123;
    const cofactor03 = m10 * d2132 - m20 * d1132 + m30 * d1122;

    const cofactor11 = m00 * d2233 - m20 * d0233 + m30 * d0223;
    const cofactor12 = m00 * d2133 - m20 * d0133 + m30 * d0123;
    const cofactor13 = m00 * d2132 - m20 * d0132 + m30 * d0122;

    const cofactor21 = m00 * d1233 - m10 * d0233 + m30 * d0213;
    const cofactor22 = m00 * d1133 - m10 * d0133 + m30 * d0113;
    const cofactor23 = m00 * d1132 - m10 * d0132 + m30 * d0112;

    const cofactor31 = m00 * d1223 - m10 * d0223 + m20 * d0213;
    const cofactor32 = m00 * d1123 - m10 * d0123 + m20 * d0113;
    const cofactor33 = m00 * d1122 - m10 * d0122 + m20 * d0112;

    r[0] = +(cofactor00 * detInv);
    r[1] = -(cofactor01 * detInv);
    r[2] = +(cofactor02 * detInv);
    r[3] = -(cofactor03 * detInv);

    r[4] = -(cofactor10 * detInv);
    r[5] = +(cofactor11 * detInv);
    r[6] = -(cofactor12 * detInv);
    r[7] = +(cofactor13 * detInv);

    r[8] = +(cofactor20 * detInv);
    r[9] = -(cofactor21 * detInv);
    r[10] = +(cofactor22 * detInv);
    r[11] = -(cofactor23 * detInv);

    r[12] = -(cofactor30 * detInv);
    r[13] = +(cofactor31 * detInv);
    r[14] = -(cofactor32 * detInv);
    r[15] = +(cofactor33 * detInv);

    return result;
  }

  /**
   * Transpose matrix
   * @param matrix - A matrix to invert
   * @param result - A result matrix
   */
  public static Transpose(matrix: Matrix, result = new Matrix()): Matrix {
    const { m } = matrix;
    const { m: r } = result;

    const m00 = m[ 0], m10 = m[ 1], m20 = m[ 2], m30 = m[ 3];
    const m01 = m[ 4], m11 = m[ 5], m21 = m[ 6], m31 = m[ 7];
    const m02 = m[ 8], m12 = m[ 9], m22 = m[10], m32 = m[11];
    const m03 = m[12], m13 = m[13], m23 = m[14], m33 = m[15];

    // Transpose matrix values
    r[0] = m00;
    r[1] = m01;
    r[2] = m02;
    r[3] = m03;

    r[4] = m10;
    r[5] = m11;
    r[6] = m12;
    r[7] = m13;

    r[8] = m20;
    r[9] = m21;
    r[10] = m22;
    r[11] = m23;

    r[12] = m30;
    r[13] = m31;
    r[14] = m32;
    r[15] = m33;

    return result;
  }

  /**
   * Clone this matrix
   */
  public clone(): Matrix {
    return new Matrix(new Float32Array(this.m));
  }

  /**
   * Copy the values of the other matrix
   * @param other - matrix to copy
   */
  public copy(other: Matrix) {
    this.m.set(other.m);
  }

  /**
   * Get a row of the matrix as Vector4
   * @param index Index of the row
   */
  public getRow(index: number): Vector4 {
    const m = this.m;

    return new Vector4(m[index], m[index + 4], m[index + 8], m[index + 12]);
  }

  /**
   * Get a column of the matrix as Vector4
   * @param index Index of the column
   */
  public getColumn(index: number): Vector4 {
    const m = this.m;
    const row = 4 * index;

    return new Vector4(m[row], m[row + 1], m[row + 2], m[row + 3]);
  }

  /**
   * Set a row of the matrix
   * @param index Index of the row
   * @param row Values of the row
   */
  public setRow(index: number, row: Vector4): this {
    const m = this.m;

    m[index] = row.x;
    m[index + 4] = row.y;
    m[index + 8] = row.z;
    m[index + 12] = row.w;

    return this;
  }

  /**
   * Set a column of the matrix
   * @param index Index of the column
   * @param column Values of the column
   */
  public setColumn(index: number, column: Vector4): this {
    const m = this.m;
    const row = 4 * index;

    m[row] = column.x;
    m[row + 1] = column.y;
    m[row + 2] = column.z;
    m[row + 3] = column.w;

    return this;
  }

  /**
   * Set this matrix to identity matrix
   */
  public identity(): this {
    this.m.set(identityFloat32Arr);

    return this;
  }

  /**
   * Calculate determinant of this matrix
   */
  public determinant(): number {
    const m = this.m;

    const m00 = m[ 0], m10 = m[ 1], m20 = m[ 2], m30 = m[ 3];
    const m01 = m[ 4], m11 = m[ 5], m21 = m[ 6], m31 = m[ 7];
    const m02 = m[ 8], m12 = m[ 9], m22 = m[10], m32 = m[11];
    const m03 = m[12], m13 = m[13], m23 = m[14], m33 = m[15];

    const detSubMat0213 = m02 * m13 - m03 * m12;
    const detSubMat0223 = m02 * m23 - m03 * m22;
    const detSubMat0233 = m02 * m33 - m03 * m32;
    const detSubMat1223 = m12 * m23 - m13 * m22;
    const detSubMat1233 = m12 * m33 - m13 * m32;
    const detSubMat2233 = m22 * m33 - m23 * m32;

    const cofactor00 = m11 * detSubMat2233 - m21 * detSubMat1233 + m31 * detSubMat1223;
    const cofactor10 = m01 * detSubMat2233 - m21 * detSubMat0233 + m31 * detSubMat0223;
    const cofactor20 = m01 * detSubMat1233 - m11 * detSubMat0233 + m31 * detSubMat0213;
    const cofactor30 = m01 * detSubMat1223 - m11 * detSubMat0223 + m21 * detSubMat0213;

    return m00 * cofactor00 - m10 * cofactor10 + m20 * cofactor20 - m30 * cofactor30;
  }

  /**
   * Invert the values of this matrix
   */
  public invert = Matrix.Invert.bind(Matrix, this, this) as () => this;

  /**
   * Transpose the values of this matrix
   */
  public transpose = Matrix.Transpose.bind(Matrix, this, this) as () => this;

  /**
   * Multiply this matrix by the given matrix and save the result to this matrix
   * @param other - the second operand
   */
  public multiply = (other: Matrix): this => Matrix.Multiply(this, other, this) as this;

  public multiplyVec4(vec4: Vector4) {
    const m = this.m;
    const { x, y, z, w } = vec4;

    const a00 = m[ 0], a10 = m[ 1], a20 = m[ 2], a30 = m[ 3];
    const a01 = m[ 4], a11 = m[ 5], a21 = m[ 6], a31 = m[ 7];
    const a02 = m[ 8], a12 = m[ 9], a22 = m[10], a32 = m[11];
    const a03 = m[12], a13 = m[13], a23 = m[14], a33 = m[15];

    return new Vector4(
      a00 * x + a01 * y + a02 * z + a03 * w,
      a10 * x + a11 * y + a12 * z + a13 * w,
      a20 * x + a21 * y + a22 * z + a23 * w,
      a30 * x + a31 * y + a32 * z + a33 * w,
    );
  }

  public decompose(translation: Vector3, rotation: Quaternion, scale: Matrix) {
    const m = this.m;

    // Extract translation
    translation.x = m[3];
    translation.y = m[7];
    translation.z = m[11];

    const M = new Float32Array(this.m);

    for (let i = 0; i < 3; i++) {
      M[4 * i + 3] = 0;
      M[i + 12] = 0;
    }
    M[15] = 1;

    // Extract rotation by polar decomposition
    let norm = 0;
    let count = 0;
    const R = new Matrix(M);
    const RNext = new Matrix();
    const Rit = new Matrix();

    do {
      Matrix.Invert(Matrix.Transpose(R, Rit), Rit);

      for (let idx = 0; idx < 16; idx++) {
        RNext.m[idx] = 0.5 * (R.m[idx] + Rit.m[idx]);
      }

      norm = 0;
      for (let idx = 0; idx < 3; idx++) {
        const rowIdx = 4 * idx;
        const n = Math.abs(
          R.m[rowIdx] - RNext.m[rowIdx]
          + R.m[rowIdx + 1] - RNext.m[rowIdx + 1]
          + R.m[rowIdx + 2] - RNext.m[rowIdx + 2]
        );
        norm = Math.max(norm, n);
      }

      R.copy(RNext);
    } while (++count < 100 && norm > 0.0001);

    R.toQuaternion(rotation);

    Matrix.Multiply(Matrix.Invert(R), new Matrix(M), scale);
  }

  /**
   * Create a quaternion from this as rotation matrix
   * @param result - Quaternion to copy result
   */
  public toQuaternion(result: Quaternion = new Quaternion()): Quaternion {
    const m = this.m;

    const trace = m[0] + m[5] + m[10];

    let s;
    if (trace > 0.0) {
      s = Math.sqrt(trace + 1.0);
      result.w = 0.5 * s;
      s = 0.5 / s;
      // (m21 - m12) / 4w
      result.x = (m[6] - m[9]) * s;
      // (m02 - m20) / 4w
      result.y = (m[8] - m[2]) * s;
      // (m10 - m01) / 4w
      result.z = (m[1] - m[4]) * s;
    } else {
      // |w| <= 1/2
      let i = 0;
      if (m[5] > m[0]) i = 1;
      if (m[10] > m[i * 4 + i]) i = 2;
      const j = (i + 1) % 3;
      const k = (i + 2) % 3;
      const quatVals: [number, number, number, number] = [0, 0, 0, 0];

      s = Math.sqrt(m[i * 4 + i] - m[j * 4 + j] - m[k * 4 + k] + 1.0);
      quatVals[i] = 0.5 * s;
      s = 0.5 / s;
      quatVals[3] = (m[j * 4 + k] - m[k * 4 + j]) * s;
      quatVals[j] = (m[j * 4 + i] + m[i * 4 + j]) * s;
      quatVals[k] = (m[k * 4 + i] + m[i * 4 + k]) * s;

      result.set(...quatVals);
    }

    return result;
  }
}

export default Matrix;
