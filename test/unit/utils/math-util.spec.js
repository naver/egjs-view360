import {expect} from "chai";
import {vec3} from "gl-matrix";
import {util} from "../../../src/utils/math-util";

describe("mathUtil", () => {
	describe("util", () => {
		it("#isPowerOfTwo", () => {
			// Given & When & Then
			expect(util.isPowerOfTwo(256)).to.be.equal(true);
			expect(util.isPowerOfTwo(512)).to.be.equal(true);
			expect(util.isPowerOfTwo(1024)).to.be.equal(true);
			expect(util.isPowerOfTwo(2048)).to.be.equal(true);
			expect(util.isPowerOfTwo(2048)).to.be.equal(true);
			expect(util.isPowerOfTwo(4096)).to.be.equal(true);
			expect(util.isPowerOfTwo(1000)).to.be.equal(false);
		});

		describe("yawOffsetBetween", () => {
			it("should return correct yaw offset when y = 0", () => {
				// Given
				const targetDir = vec3.fromValues(0, 0, -1);
				const viewDirs = [
					vec3.fromValues(0, 0, -1),
					vec3.fromValues(1, 0, 0),
					vec3.fromValues(-1, 0, 0),
					vec3.fromValues(0, 0, 1),
				];
				const expects = [
					0,
					-Math.PI / 2,
					Math.PI / 2,
					-Math.PI,
				];

				// When
				viewDirs.forEach((viewDir, idx) => {
					expect(util.yawOffsetBetween(viewDir, targetDir))
						.equals(expects[idx]);
				});
			});

			it("should return correct yaw offset when y = 0.5 and both y's are same", () => {
				// Given
				const targetDir = vec3.normalize(vec3.create(), vec3.fromValues(0, 0.5, -1));
				const viewDirs = [
					vec3.normalize(vec3.create(), vec3.fromValues(0, 0.5, -1)),
					vec3.normalize(vec3.create(), vec3.fromValues(1, 0.5, 0)),
					vec3.normalize(vec3.create(), vec3.fromValues(-1, 0.5, 0)),
					vec3.normalize(vec3.create(), vec3.fromValues(0, 0.5, 1)),
				];
				const expects = [
					0,
					-Math.PI / 2,
					Math.PI / 2,
					-Math.PI,
				];

				// When
				viewDirs.forEach((viewDir, idx) => {
					expect(util.yawOffsetBetween(viewDir, targetDir))
						.equals(expects[idx]);
				});
			});

			it("should return correct yaw offset when y = 0.5 and both y's are not same", () => {
				// Given
				const targetDir = vec3.normalize(vec3.create(), vec3.fromValues(0, 0, -1));
				const viewDirs = [
					vec3.normalize(vec3.create(), vec3.fromValues(0, 0.6, -1)),
					vec3.normalize(vec3.create(), vec3.fromValues(1, -0.3, 0)),
					vec3.normalize(vec3.create(), vec3.fromValues(-1, 0.8, 0)),
					vec3.normalize(vec3.create(), vec3.fromValues(0, 0.2, 1)),
				];
				const expects = [
					0,
					-Math.PI / 2,
					Math.PI / 2,
					-Math.PI,
				];

				// When
				viewDirs.forEach((viewDir, idx) => {
					expect(util.yawOffsetBetween(viewDir, targetDir))
						.equals(expects[idx]);
				});
			});
		});
	});
});
