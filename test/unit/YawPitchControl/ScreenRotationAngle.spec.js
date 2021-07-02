import {expect} from "chai";
import ScreenRotationAngleInjector from "inject-loader!../../../src/YawPitchControl/ScreenRotationAngle"; // eslint-disable-line import/no-duplicates
import TestHelper from "./testHelper";
import {window} from "../../../src/utils/browser";
import ScreenRotationAngle from "../../../src/YawPitchControl/ScreenRotationAngle"; // eslint-disable-line import/no-duplicates

describe("ScreenRotationAngle", () => {
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

	describe("#getRadian", () => {
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
			TestHelper.once(window, "deviceorientation", () => {
				// Then
				expect(sr.getRadian()).to.equal(Math.PI / 2);

				// cleanup for later test
				sr.unref();
				done();
			});
			// Dispatch 'deviceorientation' event.
			const event = TestHelper.createDeviceOrientationEvent(0, 0, 90);

			window.dispatchEvent(event);
		});
	});

	describe("#orientationchange", () => {
		let tempScreen;
		let tempWindowOrientation;

		beforeEach(() => {
			tempScreen = window.screen;
			tempWindowOrientation = window.orientation;
		});

		afterEach(() => {
			// Restore original orientation information
			Object.assign(window, {
				screen: tempScreen,
				orientation: tempWindowOrientation
			});
		});

		it("should return rotated angles when screen is rotated.", done => {
			// Given
			const ScreenRotationAngle90 = ScreenRotationAngleInjector({"../utils/browser": {
				"window": window
			}}).default;

			const sr = new ScreenRotationAngle90();

			// When
			TestHelper.once(window, "orientationchange", () => {
				expect(sr.getRadian()).to.equal(Math.PI / 2);

				// cleanup for later test
				sr.unref();
				done();
			});

			// Dispatch 'orientationchange' event.
			Object.assign(window, {screen: {orientation: {angle: 90}}});
			const event = TestHelper.createOrientationChangeEvent();

			window.dispatchEvent(event);
		});

		it("should return rotated angles when screen is rotated && screen.orientation.angle is undefined", done => {
			// Given
			const MockScreenRotationAngle = ScreenRotationAngleInjector({"../utils/browser": {
				"window": window
			}}).default;

			const sr1 = new MockScreenRotationAngle();
			const testList = [
				{
					angle: 0,
					expected: 0
				}, {
					angle: 180,
					expected: Math.PI
				}, {
					angle: -180,
					expected: Math.PI
				}
			];

			function promiseFactory(test) {
				return new Promise(res => {
					// When
					TestHelper.once(window, "orientationchange", () => {
						// Then
						expect(sr1.getRadian()).to.equal(test.expected);
						res();
					});

					Object.assign(window, {screen: {orientation: {}}, orientation: test.angle});
					const event = TestHelper.createOrientationChangeEvent();

					window.dispatchEvent(event);
				});
			}

			testList.reduce((promise, test) => promise.then(() => promiseFactory(test)), Promise.resolve())
				.then(done);
		});

		it("should return 0 if screen.orientation.angle and window.orientation is undefiend", done => {
			// Given
			const ScreenRotationAngleUndefined = ScreenRotationAngleInjector({"../utils/browser": {
				"window": window,
			}}).default;
			const sr3 = new ScreenRotationAngleUndefined();

			// When
			TestHelper.once(window, "orientationchange", () => {
				// Then
				expect(sr3.getRadian()).to.equal(0);
				done();
			});
			Object.assign(window, {screen: {orientation: {}}, orientation: undefined});

			const event = TestHelper.createOrientationChangeEvent();

			window.dispatchEvent(event);
		});
	});

	describe("#unref", () => {
		it("should initialize angle & not affected by deviceorientation.", done => {
			// Given
			const sr = new ScreenRotationAngle();

			sr.unref();

			// When
			TestHelper.once(window, "deviceorientation", () => {
				expect(sr.getRadian()).to.equal(0);
				// cleanup for later test
				done();
			});

			// Dispatch 'deviceorientation' event.
			const event = TestHelper.createDeviceOrientationEvent(0, 0, 90);

			window.dispatchEvent(event);
		});

		it("should return valid angle if refCount for ScreenRotationAngle is more than 0.", done => {
			// Given
			const sr1 = new ScreenRotationAngle();
			const sr2 = new ScreenRotationAngle();

			sr1.unref();

			// When
			TestHelper.once(window, "deviceorientation", () => {
				// Then
				// Because it's singleton, sr1 and sr2 is same. So following is possible.
				expect(sr1.getRadian()).to.equal(Math.PI / 2);
				expect(sr2.getRadian()).to.equal(Math.PI / 2);
				// cleanup for later test
				sr2.unref();
				done();
			});

			// Dispatch 'deviceorientation' event.
			const event = TestHelper.createDeviceOrientationEvent(0, 0, 90);

			window.dispatchEvent(event);
		});
	});
});
