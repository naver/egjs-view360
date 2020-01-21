import {expect} from "chai";
import {vec3, quat, glMatrix} from "gl-matrix";
import {util, ROTATE_CONSTANT} from "../../../src/utils/math-util";

describe("mathUtil", () => {
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

	describe("#getRotationDelta", () => {
		it("should return 0 for any rotation kind if prevQ === curQ", () => {
			// Given
			const sampleQuat = quat.create();

			// When
			const rotateKinds = [
				ROTATE_CONSTANT.PITCH_DELTA,
				ROTATE_CONSTANT.YAW_DELTA_BY_ROLL,
				ROTATE_CONSTANT.YAW_DELTA_BY_YAW,
			];

			const results = rotateKinds
				.map(rotateKind => util.getRotationDelta(sampleQuat, sampleQuat, rotateKind));

			// Then
			expect(results.every(delta => delta === 0)).to.be.true;
		});

		it("should return correct pitch delta", () => {
			// Given
			const pitch = 90;
			const prev = quat.create();
			const next = quat.create();

			// Those won't apply pitch
			quat.rotateZ(next, prev, glMatrix.toRadian(45));
			quat.rotateY(next, next, glMatrix.toRadian(-30));
			// This applies pitch
			quat.rotateX(next, next, glMatrix.toRadian(pitch));

			// When
			const delta = util.getRotationDelta(prev, next, ROTATE_CONSTANT.PITCH_DELTA);

			// Then
			expect(delta).closeTo(pitch, 0.0001);
		});

		it("should return correct yaw delta by roll", () => {
			// Given
			const expectedYaw = -90;
			const prev = quat.create();
			const next = quat.create();

			quat.rotateZ(next, prev, glMatrix.toRadian(90));

			// When
			const delta = util.getRotationDelta(prev, next, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL);
			const byYawDelta = util.getRotationDelta(prev, next, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);

			// Then
			expect(delta).closeTo(expectedYaw, 0.0001);
			expect(byYawDelta).closeTo(0, 0.0001);
		});

		it("should return correct yaw delta by yaw", () => {
			// Given
			const expectedYaw = 90;
			const prev = quat.create();
			const next = quat.create();

			quat.rotateY(next, prev, glMatrix.toRadian(90));

			// When
			const delta = util.getRotationDelta(prev, next, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
			const byRollDelta = util.getRotationDelta(prev, next, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL);

			// Then
			expect(delta).closeTo(expectedYaw, 0.0001);
			expect(byRollDelta).closeTo(0, 0.0001);
		});
	});
});
