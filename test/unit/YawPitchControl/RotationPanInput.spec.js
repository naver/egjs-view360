import {expect} from "chai";
import {vec2} from "gl-matrix";
import RotationPanInput from "../../../src/YawPitchControl/input/RotationPanInput";
import {sandbox, cleanup} from "../util";

describe("RotationPanInput", () => {
	let el;
	let inst;

	describe("#constructor", () => {
		beforeEach(() => {
			el = sandbox();
		});

		afterEach(() => {
			cleanup();

			inst.destroy();
		});

		it("Instance", () => {
			// Given
			// When
			inst = new RotationPanInput(el);

			// Then
			expect(inst).to.be.exist;
		});

		it("Instance with useRotation: true", () => {
			// Given
			// When
			inst = new RotationPanInput(el, {useRotation: true});

			// Then
			expect(inst).to.be.exist;
		});
	});

	describe("#getOffset", () => {
		beforeEach(() => {
			el = sandbox();
		});

		afterEach(() => {
			el = sandbox();

			inst.destroy();
		});

		it("should return just scaled properties if useRotation is not true", () => {
			// Given
			inst = new RotationPanInput(el);

			// When
			const scale = inst.options.scale;
			const inputProperties = [10, 10];
			const result = inst.getOffset(inputProperties, [true, true]);

			// Then
			const expected = inputProperties.map((input, index) => input * scale[index]);

			expect(result).to.deep.equal(expected);
		});

		it("should return rotated scaled properties if useRotation is true", () => {
			// Given
			const TEST_ANGLE = Math.PI / 4;

			class MockDeviceQuaternion {
				getDeviceHorizontalRight() {
					return vec2.normalize(vec2.create(), vec2.fromValues(1, 1));
				}
			}

			inst = new RotationPanInput(el, {
				useRotation: true
			}, new MockDeviceQuaternion());

			// When
			const scale = inst.options.scale;
			const input = [10, 10];
			const result = inst.getOffset(input, [true, true]);

			// Then
			const expected = [
				input[0] * scale[0] * Math.cos(TEST_ANGLE) - input[1] * scale[1] * Math.sin(TEST_ANGLE),
				input[1] * scale[1] * Math.cos(TEST_ANGLE) + input[0] * scale[1] * Math.sin(TEST_ANGLE)
			];

			expect(result).to.deep.equal(expected);
		});
	});
});
