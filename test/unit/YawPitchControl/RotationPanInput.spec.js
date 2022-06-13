import {expect} from "chai";
import RotationPanInputInjector from "inject-loader!../../../src/YawPitchControl/input/RotationPanInput"; // eslint-disable-line import/no-duplicates
import RotationPanInput from "../../../src/YawPitchControl/input/RotationPanInput";// eslint-disable-line import/no-duplicates
import {sandbox, cleanup} from "../util";

describe("RotationPanInput", () => {
	describe("#constructor", function() {
		beforeEach(() => {
			this.el = sandbox();
		});

		afterEach(() => {
			this.el = sandbox();

			this.inst.destroy();
			cleanup();
		});

		it("Instance", () => {
			// Given
			// When
			this.inst = new RotationPanInput(this.el);

			// Then
			expect(this.inst).to.be.exist;
		});

		it("Instance with useRotation: true", () => {
			// Given
			// When
			this.inst = new RotationPanInput(this.el, {useRotation: true});

			// Then
			expect(this.inst).to.be.exist;
		});
	});

	describe("#getOffset", function() {
		beforeEach(() => {
			this.el = sandbox();
		});

		afterEach(() => {
			this.el = sandbox();

			this.inst.destroy();
		});

		it("should return just scaled properties if useRotation is not true", () => {
			// Given
			this.inst = new RotationPanInput(this.el);

			// When
			const scale = this.inst.options.scale;
			const inputProperties = [10, 10];
			const result = this.inst._getOffset(inputProperties, [true, true]);

			// Then
			const expected = inputProperties.map((input, index) => input * scale[index]);

			expect(result).to.deep.equal(expected);
		});

		it("should return rotated scaled properties if useRotation is true", () => {
			// Given
			const TEST_ANGLE = Math.PI / 4;

			class MockScreenRotation {
				getRadian() {
					return TEST_ANGLE;
				}
				unref() {
				}
			}
			const RotatedModePanInput = RotationPanInputInjector({
				"../ScreenRotationAngle": MockScreenRotation
			}).default;

			this.inst = new RotatedModePanInput(this.el, {
				useRotation: true
			});

			// When
			const scale = this.inst.options.scale;
			const input = [10, 10];
			const result = this.inst._getOffset(input, [true, true]);

			// Then
			const expected = [
				input[0] * scale[0] * Math.cos(TEST_ANGLE) - input[1] * scale[1] * Math.sin(TEST_ANGLE),
				input[1] * scale[1] * Math.cos(TEST_ANGLE) + input[0] * scale[1] * Math.sin(TEST_ANGLE)
			];

			expect(result).to.deep.equal(expected);
		});
	});
});
