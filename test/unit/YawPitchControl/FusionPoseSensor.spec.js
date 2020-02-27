import {expect} from "chai";
import {window} from "../../../src/utils/browser";
import FusionPoseSensor from "../../../src/YawPitchControl/input/FusionPoseSensor";
import TestHelper from "./testHelper";
import devicemotionSample from "./devicemotionSample";


describe("FusionPoseSensor", () => {
	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new FusionPoseSensor();

			// Then
			expect(this.inst).to.be.exist;
		});
	});

	describe("DeviceMotion Test", () => {
		describe("change event fire Test", () => {
			let inst = null;
			let changed = false;

			beforeEach(() => {
				inst = new FusionPoseSensor();
				inst.on("change", e => {
					changed = true;
				});
			});

			afterEach(() => {
				inst && inst.disable();
				inst = null;
				changed = false;
			});

			it("should trigger change event", done => {
				// Given
				// When
				TestHelper.multipleDevicemotion(window, devicemotionSample, () => {
					// Then
					expect(changed).to.be.true;
					done();
				});
			});

			it("should not trigger change event when disabled", done => {
				// Given
				// When
				inst.disable();

				TestHelper.multipleDevicemotion(window, devicemotionSample, () => {
					// Then
					expect(changed).to.be.false;
					done();
				});
			});
		});
	});

	describe("#enable", () => {
		it("should change event have quaternion property", done => {
			// Given
			const inst = new FusionPoseSensor();
			let changeEvent = null;

			inst.on("change", e => {
				changeEvent = e;
			});
			// When
			TestHelper.multipleDevicemotion(window, devicemotionSample, () => {
				// Then
				expect(changeEvent.quaternion).to.be.exist;
				done();
			});
		});
	});
});
