import {window} from "../../../src/YawPitchControl/browser";
import FusionPoseSensor from "../../../src/YawPitchControl/input/FusionPoseSensor";
import TestHeler from "./testHelper";
import devicemotionSample from "./devicemotionSample";


describe("FusionPoseSensor", function() {
	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new FusionPoseSensor();

			// Then
			expect(this.inst).to.be.exist;
		});
	});

	describe("DeviceMotion Test", function() {
		describe("change event fire Test", function() {
			let inst = null;
			let changed = false;

			beforeEach(() => {
				inst = new FusionPoseSensor();
				inst.on("change", (e) => {
					changed = true;
				});
			});

			afterEach(() => {
				inst && inst.disable();
				inst = null;
				changed = false;
			});

			it("should trigger change event", (done) => {
				// Given
				// When
				TestHeler.multipleDevicemotion(window, devicemotionSample, () => {
					// Then
					expect(changed).to.be.true;
					done();
				});
			});

			it("should not trigger change event when disabled", (done) => {
				// Given
				// When
				inst.disable();

				TestHeler.multipleDevicemotion(window, devicemotionSample, () => {
					// Then
					expect(changed).to.be.false;
					done();
				});
			});
		});
	});

	describe("#enable", function() {
		it("should change event have quaternion property", (done) => {
			// Given
			let inst = new FusionPoseSensor();
			let changeEvent = null;
			inst.on("change", (e) => {
				changeEvent = e;
			});
			// When
			TestHeler.multipleDevicemotion(window, devicemotionSample, () => {
				// Then
				expect(changeEvent.quaternion).to.be.exist;
				done();
			});
		});
	})
});
