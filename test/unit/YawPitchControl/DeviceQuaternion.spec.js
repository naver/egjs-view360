import {expect} from "chai";
import {quat, glMatrix} from "gl-matrix";
import DeviceQuaternionInjector from "inject-loader!../../../src/YawPitchControl/DeviceQuaternion"; // eslint-disable-line import/no-duplicates
import DeviceQuaternion from "../../../src/YawPitchControl/DeviceQuaternion"; // eslint-disable-line import/no-duplicates

describe("DeviceQuaternion", function() {
	this.inst = null;

	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new DeviceQuaternion();

			// Then
			expect(this.inst).to.be.exist;
			this.inst && this.inst.destroy();
			this.inst = null;
		});
	});

	describe("#getCombinedQuaternion", function() {
		beforeEach(() => {
			this.inst = new DeviceQuaternion();
		});

		afterEach(() => {
			this.inst && this.inst.destroy();
			this.inst = null;
		});

		it("should return quat(0, 0, 0, 0) if no motion &$ yaw = 0 && pitch = 0", () => {
			// Given
			// When
			const resultQ = this.inst.getCombinedQuaternion(0, 0);

			// Then
			const expectedQ = quat.create();

			expect(resultQ).to.deep.equal(expectedQ);
		});

		it("should return responding quaternion if no motion &$ yaw != 0 && pitch != 0", () => {
			// Given
			// When
			const yaw = 10;
			const pitch = 10;
			let resultQ = this.inst.getCombinedQuaternion(yaw, pitch);
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
		class MockPoseSensor {
			constructor() {
				this._motionEventTimer = null;
			}
			enable() {}
			disable() {}
			on(event, callback) {
				const e = {
					quaternion: quat.create()
				};

				this._motionEventTimer = setInterval(() => {
					callback(e);
				}, 50);
			}
			off() {
				clearInterval(this._motionEventTimer);
			}
			destroy() {
				this.off();
			}
		}

		beforeEach(() => {
			const MockSensorQuaternion = new DeviceQuaternionInjector({
				"./input/FusionPoseSensor": MockPoseSensor
			}).default;

			this.inst = new MockSensorQuaternion();
		});

		afterEach(() => {
			this.inst.destroy();
		});

		it("should fire event any more before destroy", done => {
			// Given
			// When MockSensorQuaternion is made

			// Then
			this.inst.on("change", () => {
				done();
			});
		});

		it("should not fire event any more after destroyed", done => {
			// Given
			// When
			let eventHandleCount = 0;

			this.inst.destroy();
			this.inst.on("change", () => {
				eventHandleCount++;
			});

			// Then
			setTimeout(() => {
				expect(eventHandleCount).to.equal(0);
				done();
			}, 100);
		});
	});
});
