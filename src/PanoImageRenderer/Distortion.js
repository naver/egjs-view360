export default class Distortion {
	// Migrated from gvr-unity-sdk (Apache-2.0)
	// https://github.com/googlevr/gvr-unity-sdk/blob/b633dae09b46ffee45a5ac447c1313f83921b253/GoogleVR/Scripts/GvrProfile.cs
	static approximateInverse(coefficients, maxRadius = 1, numSamples = 100) {
		const numCoefficients = 12;

		// R + K1*R^3 + K2*R^5 = r, with R = rp = distort(r)
		// Repeating for numSamples:
		//   [ R0^3, R0^5 ] * [ K1 ] = [ r0 - R0 ]
		//   [ R1^3, R1^5 ]   [ K2 ]   [ r1 - R1 ]
		//   [ R2^3, R2^5 ]            [ r2 - R2 ]
		//   [ etc... ]                [ etc... ]
		// That is:
		//   matA * [K1, K2] = y
		// Solve:
		//   [K1, K2] = inverse(transpose(matA) * matA) * transpose(matA) * y
		const matA = new Array(numSamples);
		const vecY = new Array(numSamples);

		for (let i = 0; i < numSamples; ++i) {
			matA[i] = new Array(numCoefficients);
			const r = maxRadius * (i + 1) / numSamples;
			const rp = Distortion.distort(coefficients, r);
			let v = rp;

			for (let j = 0; j < numCoefficients; ++j) {
				v *= rp * rp;
				matA[i][j] = v;
			}
			vecY[i] = r - rp;
		}
		return Distortion.solveLeastSquares(matA, vecY);
	}

	// Solves a least-squares matrix equation.  Given the equation A * x = y, calculate the
	// least-square fit x = inverse(A * transpose(A)) * transpose(A) * y.  The way this works
	// is that, while A is typically not a square matrix (and hence not invertible), A * transpose(A)
	// is always square.  That is:
	//   A * x = y
	//   transpose(A) * (A * x) = transpose(A) * y   <- multiply both sides by transpose(A)
	//   (transpose(A) * A) * x = transpose(A) * y   <- associativity
	//   x = inverse(transpose(A) * A) * transpose(A) * y  <- solve for x
	// Matrix A's row count (first index) must match y's value count.  A's column count (second index)
	// determines the length of the result vector x.
	static solveLeastSquares(matA, vecY) {
		const numSamples = matA.length;
		const numCoefficients = matA[0].length;

		// Calculate transpose(A) * A
		const matATA = new Array(numCoefficients);

		for (let i = 0; i < numCoefficients; ++i) {
			matATA[i] = new Array(numCoefficients);
		}

		for (let k = 0; k < numCoefficients; ++k) {
			for (let j = 0; j < numCoefficients; ++j) {
				let sum = 0.0;

				for (let i = 0; i < numSamples; ++i) {
					sum += matA[i][j] * matA[i][k];
				}
				matATA[j][k] = sum;
			}
		}

		// Calculate transpose(A) * y
		const vecATY = new Array(numCoefficients);

		for (let j = 0; j < numCoefficients; ++j) {
			let sum = 0.0;

			for (let i = 0; i < numSamples; ++i) {
				sum += matA[i][j] * vecY[i];
			}
			vecATY[j] = sum;
		}

		// Now solve (A * transpose(A)) * x = transpose(A) * y.
		return Distortion.solveLinear(matATA, vecATY);
	}

	/**
	 * Solves a small linear equation via destructive gaussian
	 * elimination and back substitution.  This isn't generic numeric
	 * code, it's just a quick hack to work with the generally
	 * well-behaved symmetric matrices for least-squares fitting.
	 * Not intended for reuse.
	 *
	 * @param a Input positive definite symmetrical matrix. Destroyed during calculation.
	 * @param y Input right-hand-side values. Destroyed during calculation.
	 * @return Resulting x value vector.
	 */
	static solveLinear(a, y) {
		const n = a.length;

		// Gaussian elimination (no row exchange) to triangular matrix.
		// The input matrix is a A^T A product which should be a positive
		// definite symmetrical matrix, and if I remember my linear
		// algebra right this implies that the pivots will be nonzero and
		// calculations sufficiently accurate without needing row
		// exchange.
		for (let j = 0; j < n - 1; ++j) {
			for (let k = j + 1; k < n; ++k) {
				const p = a[k][j] / a[j][j];

				for (let i = j + 1; i < n; ++i) {
					a[k][i] -= p * a[j][i];
				}
				y[k] -= p * y[j];
			}
		}
		// From this point on, only the matrix elements a[j][i] with i>=j are
		// valid. The elimination doesn't fill in eliminated 0 values.

		const x = new Array(n);

		// Back substitution.
		for (let j = n - 1; j >= 0; --j) {
			let v = y[j];

			for (let i = j + 1; i < n; ++i) {
				v -= a[j][i] * x[i];
			}
			x[j] = v / a[j][j];
		}

		return x;
	}

	static distort(coeff, r) {
		const r2 = r * r;
		let ret = 0;

		for (let j = coeff.length - 1; j >= 0; j--) {
			ret = r2 * (ret + coeff[j]);
		}
		return (ret + 1) * r;
	}
}
