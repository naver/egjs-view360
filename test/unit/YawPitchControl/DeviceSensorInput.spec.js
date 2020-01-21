import {expect} from "chai";
import sinon from "sinon";
import {quat, glMatrix} from "gl-matrix";
import DeviceSensorInput from "../../../src/YawPitchControl/input/DeviceSensorInput";


describe("DeviceSensorInput", function() {
	this.inst = null;

	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new DeviceSensorInput();

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
			this.inst = new DeviceSensorInput();
		});

		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
			}
			this.inst = null;
		});

		it("should return quat(0, 0, 0, 1) if no motion &$ yaw = 0", () => {
			// Given
			// When
			const resultQ = this.inst.getCombinedQuaternion(0);

			// Then
			const expectedQ = quat.create();

			// Didn't use deep equal, as that just gives me [-0, -0, -0, 1] is different from [0, 0, 0, 1]
			for (let i = 0; i < expectedQ.length; i++) {
				expect(resultQ[i]).equals(expectedQ[i]);
			}
		});

		it("should return responding quaternion if no motion && yaw != 0", () => {
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
	});

	describe("#destroy", function() {
		beforeEach(() => {
			this.inst = new DeviceSensorInput();
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

	// Doing some white-box testing here
	// Change if any structural change happens
	describe("#enable", () => {
		it("should attach calibration callback when not calibrated", async () => {
			// Given
			const inst = new DeviceSensorInput();
			const addEventStub = sinon.stub(inst._sensor, "addEventListener");

			// When
			await inst.enable();

			// Then
			expect(addEventStub.calledOnceWith(inst._onFirstRead));
		});
	});

	describe("#getYawPitchDelta", () => {
		it("should return yaw: 0, pitch: 0 on first call", () => {
			// Given
			const inst = new DeviceSensorInput();

			// When
			const result = inst.getYawPitchDelta();

			// Then
			expect(result.yaw).equals(0);
			expect(result.pitch).equals(0);
		});
	});
});
