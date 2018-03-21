import TestHelper from "./testHelper";
import {window} from "../../../src/YawPitchControl/browser";
import ScreenRotationAngle from "../../../src/YawPitchControl/ScreenRotationAngle";
import ScreenRotationAngleInjector from "inject-loader!../../../src/YawPitchControl/ScreenRotationAngle";

describe("ScreenRotationAngle", function() {
	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new ScreenRotationAngle();

			// Then
			expect(this.inst).to.be.exist;

			// cleanup for later test
			this.inst.unref();
		});

		it("should return singleton instance.", () => {
			// Given
			// When
			const sr1 = new ScreenRotationAngle();
			const sr2 = new ScreenRotationAngle();

			// Then
			expect(sr1).to.deep.equal(sr2);

			// cleanup
			sr1.unref();
			sr2.unref();
		});
	});

	describe("#getRadian", function() {
		it("should return 0 when first", () => {
			// Given
			// When
			const sr = new ScreenRotationAngle();

			// Then
			expect(sr.getRadian()).to.equal(0);

			// cleanup for later test
			sr.unref();
		});

		it("should reflect a deviceorientation change", done => {
			// Given
			const sr = new ScreenRotationAngle();

			// When
			TestHelper.once(window, "deviceorientation", then);
			// Dispatch 'deviceorientation' event.
			const event = TestHelper.createDeviceOrientationEvent(0, 0, 90);

			window.dispatchEvent(event);

			// Then
			function then() {
				expect(sr.getRadian()).to.equal(Math.PI / 2);

				// cleanup for later test
				sr.unref();
				done();
			};
		});
	});

	describe("#orientationchange", () => {
		it("should returns rotated angles when screen is rotated.", done => {
			// Given
			const win = {
				screen: {
					orientation: {
						angle: 90
					}
				}
			};

			const ScreenRotationAngle90 = ScreenRotationAngleInjector({"./browser": {
				"window": window,
				"screen": win.screen
			}}).default;

			const sr = new ScreenRotationAngle90();

			// When
			TestHelper.once(window, "orientationchange", then);

			// Dispatch 'orientationchange' event.
			const event = TestHelper.createOrientationChangeEvent();

			window.dispatchEvent(event);

			// Then
			function then() {
				expect(sr.getRadian()).to.equal(Math.PI / 2);

				// cleanup for later test
				sr.unref();
				done();
			}
		});

		it("should returns rotated angles when screen is rotated && screen.orientation.angle is undefined", () => {
			// Given
			const win = {
				screen: {
					orientation: {
					}
				},
				orientation: 180
			};

			const ScreenRotationAngle180 = ScreenRotationAngleInjector({"./browser": {
				"window": window,
				"screen": win.screen,
				"orientation": win.orientation
			}}).default;

			const sr1 = new ScreenRotationAngle180();

			/**
			 * It's impossible to dispatch orientationchange event.
			 * So here we go with calling private method.
			 */
			// sr._onOrientation
			sr1._onOrientationChange()
			expect(sr1.getRadian()).to.equal(Math.PI);

			const ScreenRotationAngleNagative180 = ScreenRotationAngleInjector({"./browser": {
				"window": window,
				"screen": win.screen,
				"orientation": -180
			}}).default;
			const sr2 = new ScreenRotationAngleNagative180();
			sr2._onOrientationChange()
			expect(sr2.getRadian()).to.equal(Math.PI);
		});

		it("should returns 0 if screen.orientation.angle and window.orientation is undefiend", () => {
			const ScreenRotationAngleUndefined = ScreenRotationAngleInjector({"./browser": {
				"window": window,
			}}).default;
			const sr3 = new ScreenRotationAngleUndefined();
			sr3._onOrientationChange()
			expect(sr3.getRadian()).to.equal(0);
		});
	});

	describe("#unref", function() {
		it("should intialize angle & not affected by deviceorientation.", done => {
			// Given
			const sr = new ScreenRotationAngle();
			sr.unref();

			// When
			TestHelper.once(window, "deviceorientation", then);

			// Dispatch 'deviceorientation' event.
			const event = TestHelper.createDeviceOrientationEvent(0, 0, 90);

			window.dispatchEvent(event);

			// Then
			function then() {
				expect(sr.getRadian()).to.equal(0);
				// cleanup for later test
				done();
			};
		});

		it("should return valid angle if refCount for ScreenRotationAngle is more than 0.", done => {
			// Given
			const sr1 = new ScreenRotationAngle();
			const sr2 = new ScreenRotationAngle();
			sr1.unref();

			// When
			TestHelper.once(window, "deviceorientation", then);

			// Dispatch 'deviceorientation' event.
			const event = TestHelper.createDeviceOrientationEvent(0, 0, 90);

			window.dispatchEvent(event);

			// Then
			function then() {
				// Because it's singleton, sr1 and sr2 is same. So following is possible.
				expect(sr1.getRadian()).to.equal(Math.PI / 2);
				expect(sr2.getRadian()).to.equal(Math.PI / 2);
				// cleanup for later test
				sr2.unref();
				done();
			};
		});
	});
});
