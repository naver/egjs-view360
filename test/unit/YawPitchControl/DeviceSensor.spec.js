import {expect} from "chai";
import {quat, glMatrix} from "gl-matrix";
import DeviceSensor from "../../../src/YawPitchControl/DeviceSensor";


describe("DeviceSensor", function() {
	this.inst = null;

	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new DeviceSensor();

			// Then
			expect(this.inst).to.be.exist;
			if (this.inst) {
				this.inst.destroy();
			}
			this.inst = null;
		});
	});

	describe("#getCombinedQuaternion", function() {
		beforeEach(() => {
			this.inst = new DeviceSensor();
		});

		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
			}
			this.inst = null;
		});

		it("should return quat(0, 0, 0, 1) if no motion &$ yaw = 0 && pitch = 0", () => {
			// Given
			// When
			const resultQ = this.inst.getCombinedQuaternion(0, 0);

			// Then
			const expectedQ = quat.create();

			// Didn't use deep equal, as that just gives me [-0, -0, -0, 1] is different from [0, 0, 0, 1]
			for (let i = 0; i < expectedQ.length; i++) {
				expect(resultQ[i]).equals(expectedQ[i]);
			}
		});

		it("should return responding quaternion if no motion && yaw != 0 && pitch != 0", () => {
			// Given
			// When
			const yaw = 10;

			let resultQ = this.inst.getCombinedQuaternion(yaw);
			let expectedQ = quat.create();

			// Then
			quat.rotateY(expectedQ, expectedQ, glMatrix.toRadian(-yaw));

			// Ignore small tiny difference in value (eg. resultQ.z: 0.007596123497933149, expectedQ.z: 0.007596123963594437)
			resultQ = resultQ.map(val => val.toFixed(5));
			expectedQ = expectedQ.map(val => val.toFixed(5));

			expect(resultQ).to.deep.equal(expectedQ);
		});

		// it("should return conjugate quaternion if yaw = 0 && pitch = 0", () => {
		// 	// Given
		// 	this.inst = new RotationPanInput(this.el);

		// 	// When
		// 	const scale = this.inst.options.scale;
		// 	const inputProperties = [10, 10];
		// 	const result = this.inst.getOffset(inputProperties, [true, true]);

		// 	// Then
		// 	const expected = inputProperties.map((input, index) => input * scale[index]);
		// 	expect(result).to.deep.equal(expected);
		// });
	});

	describe("#destroy", function() {
		beforeEach(() => {
			this.inst = new DeviceSensor();
		});

		it("should not fire event any more after destroyed", () => {
			// Given
			// When
			this.inst.destroy();

			// Then
			expect(this.inst.isEnabled()).to.be.false;
			expect(this.inst._sensor.activated).to.be.false;
			expect(this.inst._sensor.hasReading).to.be.false;
		});
	});
});
