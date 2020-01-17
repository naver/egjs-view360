import sinon from "sinon";
import {expect} from "chai";
import Component from "@egjs/component";
import {quat, vec3} from "gl-matrix";
import YawPitchControlrInjector from "inject-loader!../../../src/YawPitchControl/YawPitchControl"; // eslint-disable-line import/no-duplicates
import {
	CONTROL_MODE_VR,
	TOUCH_DIRECTION_YAW,
	TOUCH_DIRECTION_PITCH,
	TOUCH_DIRECTION_NONE,
	TOUCH_DIRECTION_ALL,
	MC_DECELERATION,
	MAX_FIELD_OF_VIEW,
	KEYMAP,
	GYRO_MODE,
	YAW_RANGE_HALF,
	CIRCULAR_PITCH_RANGE_HALF,
	MC_MAXIMUM_DURATION
} from "../../../src/YawPitchControl/consts";
import YawPitchControl from "../../../src/YawPitchControl/YawPitchControl"; // eslint-disable-line import/no-duplicates
import DeviceSensorInput from "../../../src/YawPitchControl/input/DeviceSensorInput";
import TestHelper from "./testHelper";
import devicemotionRotateSample from "./devicemotionSampleRotate";
import {window} from "../../../src/utils/browser";
import {sandbox, cleanup} from "../util";

describe("YawPitchControl", () => {
	describe("constructor", () => {
		describe("default options", () => {
			let inst;
			let target;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div></div>`;
			});

			afterEach(() => {
				inst && inst.destroy();
				cleanup();
			});

			it("Instance without params", () => {
				// Given
				const options = {
					element: target
				};

				// When
				inst = new YawPitchControl(options);

				// Then
				expect(inst).to.be.exist;
			});

			it("should have default values when options are not given", () => {
				// Given
				const options = {
					element: target
				};

				// When
				inst = new YawPitchControl(options);

				// Then
				const appliedOption = inst.option();

				expect(appliedOption.yaw).to.equal(0);
				expect(appliedOption.pitch).to.equal(0);
				expect(appliedOption.fov).to.equal(65);
				expect(appliedOption.showPolePoint).to.equal(false);
				expect(appliedOption.useZoom).to.equal(true);
				expect(appliedOption.useKeyboard).to.equal(true);
				expect(appliedOption.gyroMode).to.equal(GYRO_MODE.YAWPITCH);
				expect(appliedOption.touchDirection).to.equal(TOUCH_DIRECTION_ALL);
				expect(appliedOption.yawRange).to.deep.equal([-180, 180]);
				expect(appliedOption.pitchRange).to.deep.equal([-90, 90]);
				expect(appliedOption.fovRange).to.deep.equal([30, 110]);
				expect(appliedOption.aspectRatio).to.equal(1);
			});

			it("should have default values when options are invalid", () => {
				// Given
				const options = {
					element: target,
					yawRange: [-1, 1],
					pitchRange: [-1, 1],
				};

				// When
				inst = new YawPitchControl(options);

				// Then
				const appliedOption = inst.option();

				expect(appliedOption.yawRange).to.deep.equal([-180, 180]);
				expect(appliedOption.pitchRange).to.deep.equal([-90, 90]);
			});
		});

		describe("Setting options test that affect each other", () => {
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div></div>`;
			});

			afterEach(() => {
				inst && inst.destroy();
				cleanup();
			});

			it("should change initial yaw by yaw range", () => {
				// Given
				// When
				inst = new YawPitchControl({
					element: target,
					yawRange: [30, 180]
				});

				expect(inst.getYawPitch().yaw).to.above(30);
				expect(inst.getYawPitch().yaw).to.below(180);
			});
		});
	});

	describe("enable / diable", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			inst = new YawPitchControl({
				element: target
			});
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});

		it("should disable panning when first place", done => {
			// Given
			const callback = sinon.spy();

			setTimeout(() => {
				inst.on("change", callback);

				// When
				Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
					pos: [30, 30],
					deltaX: 10,
					deltaY: 10,
					duration: 1000,
					easing: "linear"
				}, () => {
					// Then
					expect(callback.called).to.be.false;
					done();
				});
			}, 0);
		});

		it("should trigger change event when panning after enabled", done => {
			// Given
			const callback = sinon.spy();

			inst.enable();

			setTimeout(() => {
				inst.on("change", callback);

				// When
				Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
					pos: [30, 30],
					deltaX: 10,
					deltaY: 10,
					duration: 1000,
					easing: "linear"
				}, () => {
					// Then
					expect(callback.called).to.be.true;
					done();
				});
			}, 0);
		});

		it("should not disable lookAt method while disable() method is called", done => {
			// Given
			inst.on("change", e => {
				// Then
				expect(e.yaw).to.equal(45);
				done();
			});

			// When
			inst.disable();
			inst.lookAt({yaw: 45}, 0);
		});

		it("should enable panning on enable mode after disable mode.", done => {
			// Given
			const callback = sinon.spy();

			inst.on("change", callback);
			inst.enable();
			inst.disable();
			inst.enable();

			// When
			Simulator.gestures.pan(target, {
				pos: [30, 30],
				deltaX: 10,
				deltaY: 10,
				duration: 1000,
				easing: "linear"
			}, () => {
				// Then
				expect(callback.called).to.be.true;
				done();
			});
		});

		it("should lookAt work on enable mode after disable mode.", done => {
			// Given
			inst.enable();
			inst.disable();
			inst.enable();

			// When
			/**
			 * enable() makes a "change" event for first rendering
			 * This event does not use it in this case, So here we attach event handler later.
			 */
			inst.on("change", e => {
				// Then
				expect(e.yaw).to.equal(45);
				done();
			});
			inst.lookAt({yaw: 45}, 0);
		});

		it("should lookAt trigger change event once when enable called multiple times.", () => {
			// Given
			let changeTriggerCnt = 0;

			inst.enable();
			inst.enable();
			inst.enable();
			inst.on("change", () => {
				changeTriggerCnt++;
			});

			// When
			inst.lookAt({yaw: 45}, 0);

			// Then
			expect(changeTriggerCnt).to.equal(1);
		});
	});

	describe("change event", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			inst = new YawPitchControl({
				element: target
			});
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});

		it("Should have isTrusted value true when trigged by user interaction", done => {
			// Given
			let isTrustedOnHold = null;
			let isTrustedOnChange = null;

			inst.enable();

			inst.on("hold", e => {
				isTrustedOnHold = e.isTrusted;
			});
			inst.on("change", e => {
				isTrustedOnChange = e.isTrusted;
			});

			// When
			Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
				pos: [30, 30],
				deltaX: 10,
				deltaY: 10,
				duration: 1000,
				easing: "linear"
			}, () => {
				// Then
				expect(isTrustedOnHold).to.be.true;
				expect(isTrustedOnChange).to.be.true;
				done();
			});
		});

		it("Should have isTrusted value false when trigged by javascript api", done => {
			// Given
			let isTrustedOnChange = null;
			let isTrustedOnAnimationEnd = null;

			inst.enable();
			inst.on("change", e => {
				isTrustedOnChange = e.isTrusted;
			});
			inst.on("animationEnd", e => {
				isTrustedOnAnimationEnd = e.isTrusted;

				// Then
				expect(isTrustedOnChange).to.be.false;
				expect(isTrustedOnAnimationEnd).to.be.false;
				done();
			});

			// When
			inst.lookAt({
				yaw: 20
			}, 1000);
		});
	});

	describe("YawPitch Angle Test", () => {
		describe("Yaw Range Test", () => {
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({
					element: target
				});
			});

			afterEach(() => {
				target.remove();
				inst.destroy();
				cleanup();
			});

			it("should set value as intented in default range", done => {
				// Given
				const normals = [10, 170, 0, 180, -10, -150, -180];
				const expected = [10, 170, 0, 180, -10, -150, -180];

				const changes = [];

				inst.on("change", e => {
					changes.push(e.yaw);

					if (changes.length < expected.length) {
						return;
					}
					expected.forEach((val, i) => {
						expect(changes[i]).to.equal(val);
					});
					done();
				});

				// When
				normals.forEach(yaw => {
					inst.lookAt({yaw}, 0);
				});
			});

			it("should set value as corrected in default range when values are out of ranges", done => {
				// Given
				const abnormals = [-181, 90, 260];
				const expected = [179, 90, -100];
				const changes = [];

				inst.on("change", e => {
					// Then
					// If requested angle is out of range then use circular value on circular mode.
					changes.push(e.yaw);

					if (changes.length < expected.length) {
						return;
					}

					expected.forEach((val, i) => {
						expect(changes[i]).to.equal(val);
					});
					done();
				});

				// When
				abnormals.forEach(yaw => {
					inst.lookAt({
						yaw
					}, 0);
				});
			});

			it("should set yaw in range when default yaw is out of range.", done => {
				// Given
				const yawRanges = [[10, 180], [-180, 10], [30, 200]];
				const expected = [];
				// let prevYaws = [];
				const resultYaws = [];

				inst.on("change", e => {
					resultYaws.push(e.yaw);

					if (resultYaws.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(resultYaws[i]).to.equal(val);
					});
					done();
				});

				// When
				yawRanges.forEach(range => {
					inst.option("yawRange", range);
				});
			});

			it("should returns specific value when yaw range has 1 value", () => {
				// Given
				const yaws = [-180, -90, 0, 80, 190];
				const horizontalFov = inst.option("fov") * 1;
				const expectedYaws = horizontalFov / 2;

				// When
				inst.option("yawRange", [0, horizontalFov]);// Range has 1 value

				yaws.forEach(yaw => {
					inst.lookAt({
						yaw
					}, 0);
				});
				expect(inst.getYawPitch().yaw).to.equal(expectedYaws);
			});

			// TODO [20, -20] 과 같이 순서가 맞지 않는 경우를 허용해야 하는가?
			it("should consider range in order when range is inverted ", () => {
				// Given
				// 190 -> 180
				// When

				// Then
			});

			// // VR 모드에서의 범위 테스트가 별도로 필요한가?
			// it("VR Mode??", () => {
			// 	// Given
			// 	// When
			// 	inst.option("yawRange", []);
			// 	// Then
			// 	//inst.options
			// 	// TODO: data.expected 와 옵션값을 비교하는 코드를 넣는다.
			// });
		});

		describe("Pitch Range Test", () => {
			let inst;
			let target;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({
					element: target
				});
			});

			afterEach(() => {
				target.remove();
				inst.destroy();
				cleanup();
			});

			it("should set pitch in default pitch range.", done => {
				// Given
				const pitches = [-180, 60, 180];
				const expected = [-90, 60, 90];
				const results = [];

				// When
				inst.option("showPolePoint", true);
				inst.on("change", e => {
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				});

				pitches.forEach(pitch => {
					inst.lookAt({
						pitch
					}, 0);
				});
			});

			it("should set intended pitch in specified range.", done => {
				// -35 ~ +35
				// Given
				// When
				const pitches = [-50, -70, -100];
				const expected = [-50, -70, -90];
				const results = [];

				inst.on("change", e => {
					// Then
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				});
				inst.option("showPolePoint", true);
				inst.option("pitchRange", [-90, 90]);

				pitches.forEach(pitch => {
					inst.lookAt({
						pitch
					}, 0);
				});
			});

			it("should set specific pitch when pitch range has 1 value.", () => {
				// Given
				const pitches = [-180, -30, 30, 90, 360];
				const expected = 32.5;

				// When
				inst.option("pitchRange", [0, 65]);

				pitches.forEach(pitch => {
					inst.lookAt({pitch}, 0);
				});

				expect(inst.getYawPitch().pitch).to.equal(expected);
			});

			it("should return pole excluded pitches when showPole is false", done => {
				// Given
				const pitches = [-90, 0, 180];
				// Second parameter -57.5 doesn't fire event.
				const expected = [-57.5, 0, 57.5];
				const results = [];

				// When
				inst.on("change", e => {
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				});
				inst.option("showPole", false);
				pitches.forEach(pitch => {
					inst.lookAt({pitch}, 0);
				});
			});

			it("should return pitches in pitchRange when showPolePoint is false and min/max range is smaller than pole range", done => {
				// Given
				const pitches = [-90, -30, 0, 30, 360];
				const expected = [-10, 0, 10];
				const results = [];

				// When
				inst.option("showPole", false);
				inst.option("pitchRange", [-42.5, 42.5]);
				inst.on("change", e => {
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				});
				pitches.forEach(pitch => {
					inst.lookAt({
						pitch
					}, 0);
				});
			});

			/**
			 * VR MODE
			 *
			 * Does lookAt({pitch}) need to be ignored?
			 * It need to be supported by MovableCoord!
			 */
			it.skip("should not change the pitch in VR MODE", done => {
				// Given
				const pitches = [-90, -30, 0, 30, 360];
				const expected = [0, 0, 0, 0, 0];
				const results = [];
				const self = this;

				// When
				inst.on("change", () => {
					results.push(self.inst._pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					// console.debug("expected", expected);
					expected.forEach((val, i) => {
						// console.debug(i, results[i], val);
						expect(results[i]).to.equal(val);
					});
					done();
				});
				inst.option("controlMode", CONTROL_MODE_VR);
				pitches.forEach(pitch => {
					inst.lookAt({
						pitch
					}, 0);
				});
			});
		});
	});

	describe("FOV Test", () => {
		describe("Min/Max FOV", () => {
			let target;
			let inst;
			let results = [];

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				results = [];
				target.remove();
				cleanup();
			});

			// It this test need?
			it("should set `fov-range` in certain range", () => {
				// Given
				const inputValues = [
					[60, 110], [30, 110], [0, 110], [-30, 110], [-60, 110], /* min test */
					[30, 30], [30, 90], [30, 150], [30, 210], [30, 270] /* max text */
				];
				// TODO: Is need to throw errors on exceptional range?
				const expectedValues = [
					[60, 110], [30, 110], [0, 110], [-30, 110], [-60, 110], /* min test */
					[30, 30], [30, 90], [30, 150], [30, 210], [30, 270] /* max text */
				];

				// When
				inputValues.forEach(range => {
					inst.option("fovRange", range);

					results.push(inst.option("fovRange"));
				});

				// Then
				expectedValues.forEach((expectedVal, i) => {
					expect(results[i]).to.be.eql(expectedVal);
				});
			});
		});

		describe("FOV setting within FOV Range", () => {
			let results = [];
			let target;
			let inst;
			const attachThenHandler = (expected, done) => {
				inst.on("change", e => {
					results.push(e.fov);
					if (results.length < expected.length) {
						return;
					}
					done && done(results);
				});
			};

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				results = [];
				inst.destroy();
				inst = null;
				target.remove();
				cleanup();
			});

			it("should set fov within fov-range", done => {
				// Given
				const inputFov = [-10, 0, 40, 90, 120, 200];
				const expectedFov = [30, 40, 90, 110];

				inst.on("change", e => {
					results.push(e.fov);
					if (results.length >= expectedFov.length) {
						// Then
						expectedFov.forEach((expectedVal, i) => {
							expect(results[i]).to.equal(expectedVal);
						});
						done();
					}
				});

				// When
				inputFov.forEach(fov => {
					inst.lookAt({fov}, 0);
				});
			});

			it("should set fov within user defined fov-range", done => {
				// Given
				const inputFov = [-10, 0, 25, 30, 60, 120];
				const expected = [20, 25, 30, 60];

				// When
				inst.option("fovRange", [20, 60]);
				attachThenHandler(expected, res => {
					expected.forEach((expectedVal, i) => {
						expect(res[i]).to.equal(expectedVal);
					});

					done();
				});

				inputFov.forEach(fov => {
					inst.lookAt({fov}, 0);
				});
			});

			it("should set fov when current fov is below new fov-range", () => {
				// Given
				inst.lookAt({
					fov: 65
				}, 0);

				// When
				inst.option("fovRange", [100, 110]);

				// Then
				expect(inst.getFov()).to.equal(100);
			});

			it("should not apply yawRange when current yaw range is narrower than viewport", () => {
				// Given
				inst.lookAt({
					fov: 65,
					yaw: 0
				}, 0);

				// When
				inst.option("yawRange", [-1, 1]);

				// Then
				expect(inst.option("yawRange")).to.deep.equal([-180, 180]);
			});

			it("should not apply pitchRange when current pitch range is narrower than viewport", () => {
				// Given
				inst.lookAt({
					fov: 65,
					pitch: 0
				}, 0);

				// When
				inst.option("pitchRange", [-1, 1]);

				// Then
				expect(inst.option("pitchRange")).to.deep.equal([-90, 90]);
			});
		});

		describe("Pitch Min/Max update by FOV Change", () => {
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				target.remove();
				inst.destroy();
				cleanup();
			});

			it("should update current pitch when 'changed fov' cannot accept current pitch", done => {
				// Given
				const firstPitch = 57.5;

				// When
				// It is valid when showPolePoint is false or isPanorama
				inst.option("showPole", false);
				inst.lookAt({pitch: firstPitch});// 57.5 is current pitchMax

				// This makes pitchMax to be updated to value which is below current pitch(57.5)
				inst.on("change", e => {
					// Then
					expect(e.pitch).to.be.below(firstPitch);
					done();
				});
				inst.lookAt({fov: 90}); // _pitchMin/Max = [-45, 45]
			});
		});

		// FOV 변화에 따라 scale 변경을 적용하는 거라면 좋겠따.
		describe("Deceleration update by FOV Change", () => {
			let results = [];
			let target;
			let inst;
			const attachThenHandler = (expected, then) => {
				inst.on("change", e => {
					const deceleration = inst.axes.options.deceleration;

					results.push(deceleration);
					if (results.length < expected.length) {
						return;
					}
					then && then.call(this, results);
				});
			};

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				results = [];
				target.remove();
				inst.destroy();
				cleanup();
			});

			it("should update deceleration when FOV changed", done => {
				// Given
				const inputFov = [30, 60, 100]; // Valid fov range
				const expected = inputFov.map(fov => MC_DECELERATION * fov / MAX_FIELD_OF_VIEW);

				attachThenHandler(expected, res => {
					// Then
					expected.forEach((expectedVal, i) => {
						expect(res[i]).to.equal(expectedVal);
					});

					done();
				});

				// When
				inputFov.forEach(fov => {
					inst.lookAt({fov});
				});
			});
		});

		describe("useZoom false Test", () => {
			let results = [];
			let target;
			let inst;
			const attachThenHandler = (expected, done) => {
				inst.on("change", e => {
					results.push(e.fov);
					if (results.length < expected.length) {
						return;
					}
					done && done.call(this, results);
				});
			};

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
				inst.enable();
			});

			afterEach(() => {
				results = [];
				target.remove();
				inst.destroy();
				cleanup();
			});

			// allow FOV (Zoom) (Spec for embedding in a document)
			it("should change fov although useZoom is false", () => {
				// Given
				const fovs = [60, 90, 30];
				const expected = [60, 90, 30];

				// When
				inst.option("useZoom", false);
				attachThenHandler(expected, res => {
					// Then
					expected.forEach((expectedVal, i) => {
						expect(res[i]).to.equal(expectedVal);
					});
				});

				fovs.forEach(fov => {
					inst.lookAt({fov}, 0);
				});
			});
		});

		describe("gyroMode none Test", () => {
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
				inst.enable();
			});

			afterEach(() => {
				target.remove();
				inst.destroy();
				cleanup();
			});

			// allow FOV (Zoom) (Spec for embedding in a document)
			it("should not change yaw/pitch when gyroMode is none", () => {
				// Given
				let changeTriggered = false;

				inst.option("gyroMode", GYRO_MODE.NONE);
				inst.on("change", e => {
					changeTriggered = true;
				});

				// When
				return TestHelper.multipleDevicemotion(window, devicemotionRotateSample)
					.then(() => {
						// Then
						expect(changeTriggered).to.be.false;
					});
			});
		});

		describe("useKeyboard false Test", () => {
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				target.remove();
				inst.destroy();
				cleanup();
			});

			// allow FOV (Zoom) (Spec for embedding in a document)
			it("should not change yaw/pitch when useKeyboard is false", () => {
				// Given
				let changeTriggered = false;

				inst.option("useKeyboard", false);
				inst.on("change", e => {
					changeTriggered = true;
				});

				// When
				TestHelper.keyDown(target, KEYMAP.RIGHT_ARROW);
				TestHelper.keyUp(target, KEYMAP.RIGHT_ARROW);

				// Then
				expect(changeTriggered).to.be.false;
			});
		});

		describe("PinchZoom Test", () => {
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				target.remove();
				inst && inst.destroy();
				cleanup();
			});

			it("should increase fov using pinchZoom if useZoom is true", done => {
				// Given
				const firstFov = inst.getFov();

				inst.option("useZoom", true);

				// When
				Simulator.gestures.pinch(target, {
					scale: 0.5
				}, () => {
					// Then
					expect(inst.getFov()).to.be.above(firstFov);
					done();
				});
			});

			it("should decrease fov using pinchZoom if useZoom is true", done => {
				// Given
				const firstFov = inst.getFov();

				inst.option("useZoom", true);

				// When
				Simulator.gestures.pinch(target, {
					scale: 2
				}, () => {
					// Then
					expect(inst.getFov()).to.be.below(firstFov);
					done();
				});
			});

			it("should not change fov using pinchZoom if useZoom is false", done => {
				// Given
				const firstFov = inst.getFov();

				inst.option("useZoom", false);

				// When
				Simulator.gestures.pinch(target, {
					scale: 2
				}, () => {
					// Then
					expect(inst.getFov()).to.be.equal(firstFov);
					done();
				});
			});

			// useZoom false 인 경우 pinch zoom 이 동작하지 않아야 한다.
			it("should change fov using pinchZoom if useZoom is followed by true", done => {
				// Given
				const firstFov = inst.getFov();

				inst.option("useZoom", false);

				// When
				inst.option("useZoom", true);
				Simulator.gestures.pinch(target, {
					scale: 2
				}, () => {
					// Then
					expect(inst.getFov()).to.be.below(firstFov);
					done();
				});
			});

			it("should not change fov using pinchZoom if useZoom is false on constructor", done => {
				// Given
				inst.destroy();
				inst = new YawPitchControl({
					element: target,
					useZoom: false,
				});

				const firstFov = inst.getFov();

				// When
				Simulator.gestures.pinch(target, {
					scale: 2
				}, () => {
					// Then
					expect(inst.getFov()).to.be.equal(firstFov);
					done();
				});
			});
		});

		describe("Wheel Test", () => {
			let lastFov;
			let changed = false;
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:100px;height:100px;"></div>`;
				inst = new YawPitchControl({element: target});

				inst.on("change", e => {
					lastFov = e.fov;
					changed = true;
				});
			});

			afterEach(() => {
				inst.destroy();
				target.remove();
				changed = false;
				cleanup();
			});

			// useZoom true 인 경우 wheel scroll 을 통한 확대가 가능해야 한다.
			it("should increase fov using wheelScroll if useZoom is true", () => {
				// Given
				const firstFov = inst.getFov();

				inst.option("useZoom", true);

				// When
				// wheel scroll up
				TestHelper.wheelVertical(target, 100, () => {
					// Then
					expect(lastFov).to.be.above(firstFov);
				});
			});

			// useZoom true 인 경우 wheel scroll 을 통한 축소가 가능해야 한다.
			it("should decrease fov using wheelScroll if useZoom is true", () => {
				// Given
				const firstFov = inst.getFov();

				inst.option("useZoom", true);

				// When
				// wheel scroll down
				TestHelper.wheelVertical(target, -100, () => {
					// Then
					expect(lastFov).to.be.below(firstFov);
				});
			});

			// useZoom true 인 경우 wheel scroll 을 통한 확대가 불가능해야 한다.
			it("should not increase fov using wheelScroll if useZoom is false", () => {
				// Given
				inst.option("useZoom", false);

				// When
				// wheel scroll up
				TestHelper.wheelVertical(target, 100, () => {
					// Then
					expect(changed).to.be.equal(false);
				});
			});

			// useZoom true 인 경우 wheel scroll 을 통한 축소가 불가능해야 한다.
			it("should not decrease fov using wheelScroll if useZoom is false", () => {
				// Given
				inst.option("useZoom", false);

				// When
				// wheel scroll down
				TestHelper.wheelVertical(target, -100, () => {
					// Then
					expect(changed).to.be.equal(false);
				});
			});
		});

		describe("fovRange Test", () => {
			let yawpitch;
			let target;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				yawpitch = new YawPitchControl({element: target});
			});

			afterEach(() => {
				cleanup();
				yawpitch.destroy();
			});

			it("should update panScale if fov is changed by fovRange's change", () => {
				// Given
				const prevFov = yawpitch.getFov();
				const prevPanScale = yawpitch.axesPanInput.options.scale;

				// When
				yawpitch.option("fovRange", [prevFov + 10, prevFov + 30]);

				// Then
				const currFov = yawpitch.getFov();
				const currPanScale = yawpitch.axesPanInput.options.scale;

				expect(currFov).to.not.equal(prevFov);
				expect(prevPanScale).to.not.equal(currPanScale);
			});
		});

		describe("YawRange test by FOV change", () => {
			let target;
			let inst;

			beforeEach(() => {
				target = sandbox();

				// aspect ratio is 1, so fov is same with horizontal fov(hfov)
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			});

			afterEach(() => {
				inst && inst.destroy();
				cleanup();
			});

			it("should update movable yawRange by fov change", () => {
				// Given
				const YAW_RANGE = [-120, 120];

				// default fov range is [30, 110], but increase max fovRange for boundary check.
				inst = new YawPitchControl({
					element: target,
					fovRange: [30, 240],
					yawRange: YAW_RANGE
				});

				let yaw;
				let calculatedRangeSize;
				let expectedRangeSize;

				// When
				[30, 45, 60, 75, 90, 120, 240].forEach(newFov => {
					inst.option({"fov": newFov});

					yaw = inst.axes.axis.yaw;
					calculatedRangeSize = yaw.range[1] - yaw.range[0];
					expectedRangeSize = (YAW_RANGE[1] - YAW_RANGE[0]) - inst.getFov();

					// Then
					expect(calculatedRangeSize).to.be.closeTo(expectedRangeSize, 0.00001);
				});
			});
		});
	});

	describe("Pitch adjustment", () => {
		let targetEl;
		let inst;

		beforeEach(() => {
			targetEl = sandbox();
			targetEl.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			// inst = new YawPitchControl({
			// 	element: target
			// });
		});

		afterEach(() => {
			inst && inst.destroy();
			targetEl && targetEl.remove();
			targetEl = null;
			cleanup();
		});

		it("zoomming when showPolePoint is false, should adjust pitch", done => {
			// Given
			inst = new YawPitchControl({
				element: targetEl,
				pitch: -75,
				fov: 30,
				showPolePoint: false
			});
			// When
			TestHelper.wheelVertical(targetEl, 100, () => {
				// then
				expect(inst.getYawPitch().pitch).to.equal(-73);
				done();
			});
		});

		// it.only("zoomming when showPolePoint is false and after user input, should adjust pitch", done => {
		// 	// Given
		// 	inst = new YawPitchControl({
		// 		element: targetEl,
		// 		pitch: 0,
		// 		fov: 30,
		// 		showPolePoint: false
		// 	});
		// 	targetEl.focus();

		// 	function getDownPromises(count, duration) {
		// 		return Array.apply(null, {length: count})
		// 		.map(Number.call, Number)
		// 		.map(idx => idx * duration / count)
		// 		.map(delay => new Promise(function(res, rej) {
		// 			setTimeout(() => {
		// 				Promise.all([
		// 					new Promise(res => {
		// 						TestHelper.keyDown(targetEl, KEYMAP.DOWN_ARROW, () => {
		// 							console.log("keyDown");
		// 							res();
		// 						});
		// 					}),
		// 					new Promise(res => {
		// 						TestHelper.keyUp(targetEl, KEYMAP.DOWN_ARROW, () => {
		// 							console.log("keyUp");
		// 							res();
		// 						});
		// 					})
		// 				]).then(() => {
		// 					res();
		// 				});
		// 			}, delay);
		// 		}));
		// 	}

		// 	// When
		// 	Promise.all(getDownPromises(3, 100)).then(() => {
		// 		console.log(inst.getYawPitch().pitch);
		// 	});
		// 	// TestHelper.wheelVertical(targetEl , 100, () => {
		// 	// 	// then
		// 	// 	let pitch = inst.getYawPitch().pitch;
		// 	// 	expect(inst.getYawPitch().pitch).to.equal(-73);
		// 	// 	done();
		// 	// });
		// });

		it("zoomming when showPolePoint is false, should adjust pitch smoothly", done => {
			// Given
			inst = new YawPitchControl({
				element: targetEl,
				pitch: -100,
				fov: 30,
				showPolePoint: false
			});

			function getWheelPromises(count, duration) {
				return [...new Array(count).keys()]
					.map(idx => idx * duration / count)
					.map(delay => new Promise((res, rej) => {
						setTimeout(() => {
							TestHelper.wheelVertical(targetEl, 100, () => {
								res();
							});
						}, delay);
					}));
			}

			// When
			const wheelP = getWheelPromises(20, 1000);

			Promise.all(wheelP).then(() => {
				// then
				expect(inst.getYawPitch().pitch).to.be.equal(-35);
				done();
			});
		});
	});

	describe("no devicemotion, touch", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});
		it("no script errer with no touch, no motion", () => {
			// Given
			let errorThrown = false;

			// When
			try {
				const MockYawPitchControl = YawPitchControlrInjector({
					"../utils/browserFeature": {
						getComputedStyle: window.getComputedStyle,
						SUPPORT_TOUCH: false,
						SUPPORT_DEVICEMOTION: false
					}
				}).default;

				// eslint-disable-next-line no-new
				new MockYawPitchControl({
					element: target
				});
			} catch (e) {
				errorThrown = true;
			}

			// Then
			expect(errorThrown).to.not.ok;
		});
	});

	// describe("Rotating yaw 45 degree by tilting device", () => {
	// 	let target;

	// 	beforeEach(() => {
	// 		target = sandbox();
	// 		target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

	// 		// inst = new YawPitchControl({element: target});
	// 		// inst.enable();
	// 	});

	// 	afterEach(() => {
	// 		target.remove();
	// 		inst.destroy();
	// 	});

	// 	it("should work on chrome 65 android", done => {
	// 		// When
	// 		inst = new YawPitchControlOnChrome65({element: target});
	// 		inst.enable();

	// 		Promise.all(
	// 			[
	// 				TestHelper.multipleDevicemotion(window, chrome65Sample.devicemotion),
	// 				TestHelper.multipleDeviceorientation(window, chrome65Sample.deviceorientation)
	// 			]
	// 		).then(result => {
	// 			then();
	// 		});

	// 		function then() {
	// 			expect(Math.round(Math.abs(inst.get().yaw / 10))).to.be.equal(4);
	// 			done();
	// 		}
	// 	});

	// 	it("should work on chrome 66 android", done => {
	// 		inst = new YawPitchControlOnChrome66({element: target});
	// 		inst.enable();

	// 		Promise.all(
	// 			[
	// 				TestHelper.multipleDevicemotion(window, chrome66Sample.devicemotion),
	// 				TestHelper.multipleDeviceorientation(window, chrome66Sample.deviceorientation)
	// 			]
	// 		).then(result => {
	// 			then();
	// 		});

	// 		function then() {
	// 			expect(Math.round(Math.abs(inst.get().yaw / 10))).to.be.equal(4);
	// 			done();
	// 		}
	// 	});
	// });

	describe.skip("set option when disabled", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			inst = new YawPitchControl({
				element: target
			});
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});
	});

	describe("release, animationEnd", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			inst = new YawPitchControl({
				element: target
			});
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});

		it("pan scale change after pich zoom", done => {
			// Given
			let yawDistanceBeforePinch = 0;
			let yawDistanceAfterPinch = 0;
			let yaw = inst.getYawPitch().yaw;

			inst.enable();

			// When
			Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
				pos: [30, 30],
				deltaX: 100,
				deltaY: 0,
				duration: 500,
				easing: "linear"
			}, () => {
				yawDistanceBeforePinch = Math.abs(inst.getYawPitch().yaw - yaw);
				yaw = inst.getYawPitch().yaw;

				Simulator.gestures.pinch(target, { // this.el 이 300 * 300 이라고 가정
					scale: 1.2
				}, () => {
					Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
						pos: [30, 30],
						deltaX: 100,
						deltaY: 0,
						duration: 500,
						easing: "linear"
					}, () => {
						yawDistanceAfterPinch = Math.abs(inst.getYawPitch().yaw - yaw);
						// Then
						expect(yawDistanceAfterPinch).to.be.below(yawDistanceBeforePinch);
						done();
					});
				});
			});
		});

		it("animationEnd", done => {
			// Given
			let triggered = false;

			inst.on("animationEnd", () => {
				triggered = true;
				// Then
				expect(triggered).to.be.true;
				done();
			});
			inst.enable();

			// When
			inst.lookAt({
				yaw: 90
			}, 1000);
		});
	});

	describe("VR Mode", () => {
		let target;
		let inst;

		class MockDeviceSensorInput extends Component {
			constructor() {
				super();
				this._timer = null;
			}
			getYawPitchDelta() {
				return {
					yaw: 0, pitch: 0
				};
			}
			getCombinedQuaternion(yaw, pitch) {
				return quat.create();
			}
			async enable() {
				this._timer = setInterval(() => {
					this.trigger("change", {isTrusted: true});
				}, 50);
			}
			destroy() {
				this._timer && clearInterval(this._timer);
			}
			setGyroMode() {}
			mapAxes(axes) {
				this.axes = axes;
			}
			connect(observer) {
				return this;
			}
			disconnect() {
				return this;
			}
		}
		const DeviceSensorInputMockYawPitchControl = YawPitchControlrInjector({
			"./input/DeviceSensorInput": MockDeviceSensorInput
		}).default;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			inst = new DeviceSensorInputMockYawPitchControl({
				element: target,
				gyroMode: GYRO_MODE.VR
			});
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});

		it("should ignore yaw/pitch range option. it use circular range.", () => {
			// Given
			inst.option({
				"yawRange": [-100, 100],
				"pitchRange": [-70, 70]
			});

			// When
			// negative max
			inst.lookAt({yaw: -YAW_RANGE_HALF, pitch: -CIRCULAR_PITCH_RANGE_HALF}, 0);
			const negativePos = inst.getYawPitch();

			// positive max
			inst.lookAt({yaw: YAW_RANGE_HALF, pitch: CIRCULAR_PITCH_RANGE_HALF}, 0);
			const positivePos = inst.getYawPitch();

			// if pos is over max, circular value should be return
			inst.lookAt({yaw: YAW_RANGE_HALF + 1, pitch: -CIRCULAR_PITCH_RANGE_HALF - 1}, 0);
			const circularPos = inst.getYawPitch();

			// Then
			expect(negativePos.yaw).to.equal(-YAW_RANGE_HALF);
			expect(negativePos.pitch).to.equal(-CIRCULAR_PITCH_RANGE_HALF);

			expect(positivePos.yaw).to.equal(YAW_RANGE_HALF);
			expect(positivePos.pitch).to.equal(CIRCULAR_PITCH_RANGE_HALF);

			expect(circularPos.yaw).to.equal(-YAW_RANGE_HALF + 1);
			expect(circularPos.pitch).to.equal(CIRCULAR_PITCH_RANGE_HALF - 1);
		});

		it("should trigger event which has quaternion property if device moves on VR mode", done => {
			// Given
			// When
			inst.on("change", e => {
				// Then
				expect(e.quaternion).to.be.exist;
				done();
			});
		});

		it("should retain VR Mode although device does not support devicemotion", () => {
			// Given
			const DeviceMotionUnsupportedMockYawPitchControl = YawPitchControlrInjector({
				"./input/DeviceSensorInput": MockDeviceSensorInput,
				"../utils/browserFeature": {
					SUPPORT_DEVICEMOTION: false,
					getComputedStyle: window.getComputedStyle
				}
			}).default;

			const el = sandbox();

			el.innerHTML = `<div style="width:300px;height:300px;"></div>`;

			const yawpitchControl = new DeviceMotionUnsupportedMockYawPitchControl({
				element: el,
				gyroMode: GYRO_MODE.VR,
				yawRange: [-100, 100],
				pitchRange: [-70, 70]
			});

			// When
			// Same Test for VR: should ignore yaw/pitch range option. it use circular range.
			// negative max
			yawpitchControl.lookAt({yaw: -YAW_RANGE_HALF, pitch: -CIRCULAR_PITCH_RANGE_HALF}, 0);
			const negativePos = yawpitchControl.getYawPitch();

			// positive max
			yawpitchControl.lookAt({yaw: YAW_RANGE_HALF, pitch: CIRCULAR_PITCH_RANGE_HALF}, 0);
			const positivePos = yawpitchControl.getYawPitch();

			// if pos is over max, circular value should be return
			yawpitchControl.lookAt({yaw: YAW_RANGE_HALF + 1, pitch: -CIRCULAR_PITCH_RANGE_HALF - 1}, 0);
			const circularPos = yawpitchControl.getYawPitch();

			// Then
			expect(yawpitchControl.option("gyroMode")).to.be.equal(GYRO_MODE.VR);
			expect(negativePos.yaw).to.equal(-YAW_RANGE_HALF);
			expect(negativePos.pitch).to.equal(-CIRCULAR_PITCH_RANGE_HALF);

			expect(positivePos.yaw).to.equal(YAW_RANGE_HALF);
			expect(positivePos.pitch).to.equal(CIRCULAR_PITCH_RANGE_HALF);

			expect(circularPos.yaw).to.equal(-YAW_RANGE_HALF + 1);
			expect(circularPos.pitch).to.equal(CIRCULAR_PITCH_RANGE_HALF - 1);

			// Cleanup
			yawpitchControl.destroy();
			el.remove();
		});
	});

	describe("Animation Duration Test", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			inst = new YawPitchControl({
				element: target
			});
			inst.enable();
		});

		afterEach(() => {
			inst && inst.destroy();
			cleanup();
		});

		it("should not animate more than 1000 ms after user releases touch", done => {
			// Given
			const VERY_STRONG_HORIZONTAL_MOVEMENT = {
				pos: [0, 0],
				deltaX: 300,
				deltaY: 0,
				duration: 100,
				easing: "expo"
			};

			let before;
			let after;

			inst.on("animationEnd", () => {
				// Then
				after = new Date().getTime();
				const diff = after - before;

				expect(diff).to.be.lessThan(MC_MAXIMUM_DURATION);
				done();
			});

			// When
			Simulator.gestures.pan(target, VERY_STRONG_HORIZONTAL_MOVEMENT, () => {
				before = new Date().getTime();
			});
		});

		it("should animate for duration of lookAt parameter although it is more than 1000ms", done => {
			// Given
			const DURATION = 3000;

			// When
			const before = new Date().getTime();

			inst.on("animationEnd", () => {
				// Then
				const after = new Date().getTime();

				expect(after - before).to.satisfy(time => time >= DURATION);
				done();
			});

			inst.lookAt({yaw: 180}, DURATION);
		});
	});

	describe("Touch Direction Test by constructor's option property -touchDirection '", () => {
		let target;
		let inst;

		/**
		 * Due to the next issue, we move horizontally and vertically, respectively.
		 * And it's not bug, it's policy.
		 * https://github.com/naver/egjs-axes/issues/99
		 */
		const MOVE_HORIZONTALLY = {
			pos: [0, 0],
			deltaX: 100,
			deltaY: 0,
			duration: 200,
			easing: "linear"
		};

		const MOVE_VERTICALLY = {
			pos: [0, 0],
			deltaX: 0,
			deltaY: 100,
			duration: 200,
			easing: "linear"
		};

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});

		it("should enable all direction when TOUCH_DIRECTION_ALL is specified", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_ALL
			});
			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.not.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.not.equal(prevPitch);
					done();
				});
			});
		});

		it("should enable only yaw direction when TOUCH_DIRECTION_YAW is specified", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_YAW
			});
			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.not.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
					done();
				});
			});
		});
		it("should enable only pitch direction when TOUCH_DIRECTION_PITCH is specified", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_PITCH
			});
			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.not.equal(prevPitch);
					done();
				});
			});
		});
		it("should disable all direction when TOUCH_DIRECTION_NONE is specified", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_NONE
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
					done();
				});
			});
		});
	});

	describe("Touch Direction Test by option method'", () => {
		let target;
		let inst;
		/**
		 * Due to the next issue, we move horizontally and vertically, respectively.
		 * And it's not bug, it's policy.
		 * https://github.com/naver/egjs-axes/issues/99
		 */
		const MOVE_HORIZONTALLY = {
			pos: [0, 0],
			deltaX: 100,
			deltaY: 0,
			duration: 200,
			easing: "linear"
		};

		const MOVE_VERTICALLY = {
			pos: [0, 0],
			deltaX: 0,
			deltaY: 100,
			duration: 200,
			easing: "linear"
		};

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});

		it("should enable only yaw direction when direction changed from TOUCH_DIRECTION_ALL to TOUCH_DIRECTION_YAW", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_ALL
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			inst.option("touchDirection", TOUCH_DIRECTION_YAW);

			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.not.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
					done();
				});
			});
		});
		it("should enable only pitch direction when direction changed from TOUCH_DIRECTION_ALL to TOUCH_DIRECTION_PITCH", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_ALL
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			inst.option("touchDirection", TOUCH_DIRECTION_PITCH);

			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.not.equal(prevPitch);
					done();
				});
			});
		});
		it("should disable all direction when direction changed from DIRECTION_ALL to TOUCH_DIRECTION_NONE", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_ALL
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			inst.option("touchDirection", TOUCH_DIRECTION_NONE);

			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
					done();
				});
			});
		});
		it("should enable only pitch direction when direction changed from TOUCH_DIRECTION_YAW to TOUCH_DIRECTION_PITCH", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_YAW
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			inst.option("touchDirection", TOUCH_DIRECTION_PITCH);

			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.not.equal(prevPitch);
					done();
				});
			});
		});

		it("should enable only pitch direction when direction changed from TOUCH_DIRECTION_PITCH to TOUCH_DIRECTION_PITCH", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_PITCH
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			inst.option("touchDirection", TOUCH_DIRECTION_PITCH);

			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					// Then
					expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
					expect(inst.getYawPitch().pitch).to.be.not.equal(prevPitch);
					done();
				});
			});
		});
	});

	describe("Touch Direction Test when useRotation is enabled but screen is not rotated(angle = 0)'", () => {
		let target;
		let inst;
		/**
		 * VR Mode, https://github.com/naver/egjs-axes/issues/99 is not applied.
		 * Known Issue
		 */
		const MOVE_HORIZONTALLY = {
			pos: [0, 0],
			deltaX: 100,
			deltaY: 0,
			duration: 200,
			easing: "linear"
		};

		const MOVE_VERTICALLY = {
			pos: [0, 0],
			deltaX: 0,
			deltaY: 100,
			duration: 200,
			easing: "linear"
		};

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
		});

		afterEach(() => {
			inst && inst.destroy();
			inst = null;
			target && target.remove();
			target = null;
			cleanup();
		});

		it("should change yaw when direction = TOUCH_DIRECTION_YAW & moved horizontally", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_YAW,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				// Then
				expect(inst.getYawPitch().yaw).to.be.not.closeTo(prevYaw, 0.00001);
				expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});

		it("should not change yaw when direction = TOUCH_DIRECTION_YAW & moved vertically", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_YAW,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
				// Then
				expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
				expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});
		it("should not change pitch when direction = TOUCH_DIRECTION_PITCH & moved vertically", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_PITCH,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
				// Then
				expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
				expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});
		it("should not change pitch when direction = DIRECTION_VERTICAL && moved horizontally", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_PITCH,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				// Then
				expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
				expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});
	});

	describe("Touch Direction Test when useRotation is enabled and screen is rotated(angle = 90)'", () => {
		let target;
		let inst;
		/**
		 * VR Mode, https://github.com/naver/egjs-axes/issues/99 is not applied.
		 * Known Issue
		 */
		const MOVE_HORIZONTALLY = {
			pos: [0, 0],
			deltaX: 100,
			deltaY: 0,
			duration: 200,
			easing: "linear"
		};

		const MOVE_VERTICALLY = {
			pos: [0, 0],
			deltaX: 0,
			deltaY: 100,
			duration: 200,
			easing: "linear"
		};

		class MockDeviceSensorInput extends DeviceSensorInput {
			getDeviceHorizontalRight() {
				return vec3.fromValues(0, -1, 0); /* 90 degree */
			}
		}

		const MockYawPitchControl90Rotated = YawPitchControlrInjector({
			"./input/DeviceSensorInput": MockDeviceSensorInput
		}).default;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
		});

		afterEach(() => {
			inst && inst.destroy();
			inst = null;
			target && target.remove();
			target = null;
			cleanup();
		});

		it("should change yaw when direction = TOUCH_DIRECTION_YAW & moved vertically", done => {
			// Given
			inst = new MockYawPitchControl90Rotated({
				element: target,
				touchDirection: TOUCH_DIRECTION_YAW,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
				// Then
				const currYaw = inst.getYawPitch().yaw;
				const currPitch = inst.getYawPitch().pitch;

				expect(currYaw).to.be.not.closeTo(prevYaw, 0.00001);
				expect(currPitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});

		it("should not change yaw when direction = TOUCH_DIRECTION_YAW & moved horizontally", done => {
			// Given
			inst = new MockYawPitchControl90Rotated({
				element: target,
				touchDirection: TOUCH_DIRECTION_YAW,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				// Then
				expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
				expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});
		it("should not change pitch when direction = TOUCH_DIRECTION_PITCH & moved horizontally", done => {
			// Given
			inst = new MockYawPitchControl90Rotated({
				element: target,
				touchDirection: TOUCH_DIRECTION_PITCH,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				// Then
				expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
				expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});
		it("should not change pitch when direction = TOUCH_DIRECTION_PITCH && moved vertically", done => {
			// Given
			inst = new MockYawPitchControl90Rotated({
				element: target,
				touchDirection: TOUCH_DIRECTION_PITCH,
				gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			// When
			Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
				// Then
				expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
				expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);
				done();
			});
		});
	});

	describe("Touch Direction Test Others....", () => {
		let target;
		let inst;
		/**
		 * Due to the next issue, we move horizontally and vertically, respectively.
		 * And it's not bug, it's policy.
		 * https://github.com/naver/egjs-axes/issues/99
		 */
		const MOVE_HORIZONTALLY = {
			pos: [0, 0],
			deltaX: 100,
			deltaY: 0,
			duration: 200,
			easing: "linear"
		};

		const MOVE_VERTICALLY = {
			pos: [0, 0],
			deltaX: 0,
			deltaY: 100,
			duration: 200,
			easing: "linear"
		};

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
		});

		afterEach(() => {
			inst && inst.destroy();
			target && target.remove();
			target = null;
			cleanup();
		});

		it("should enable touch after changed from TOUCH_DIRECTION_ALL to TOUCH_DIRECTION_YAW", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_NONE
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
					expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);

					// When
					inst.option("touchDirection", TOUCH_DIRECTION_ALL);

					Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
						Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
							// Then
							expect(inst.getYawPitch().yaw).to.be.not.closeTo(prevYaw, 0.00001);
							expect(inst.getYawPitch().pitch).to.be.not.closeTo(prevPitch, 0.00001);
							done();
						});
					});
				});
			});
		});

		it("should follow touchDirection by option", done => {
			// Given
			inst = new YawPitchControl({
				element: target,
				touchDirection: TOUCH_DIRECTION_NONE
			});

			inst.enable();

			const prevYaw = inst.getYawPitch().yaw;
			const prevPitch = inst.getYawPitch().pitch;

			Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
				Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
					expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw, 0.00001);
					expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch, 0.00001);

					// When
					inst.option("touchDirection", TOUCH_DIRECTION_ALL);

					Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
						Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
							// Then
							const prevYaw2 = inst.getYawPitch().yaw;
							const prevPitch2 = inst.getYawPitch().pitch;

							expect(prevYaw2).to.be.not.closeTo(prevYaw, 0.00001);
							expect(prevPitch2).to.be.not.closeTo(prevPitch, 0.00001);

							inst.option("touchDirection", TOUCH_DIRECTION_NONE);

							Simulator.gestures.pan(target, MOVE_HORIZONTALLY, () => {
								Simulator.gestures.pan(target, MOVE_VERTICALLY, () => {
									expect(inst.getYawPitch().yaw).to.be.closeTo(prevYaw2, 0.00001);
									expect(inst.getYawPitch().pitch).to.be.closeTo(prevPitch2, 0.00001);
									done();
								});
							});
						});
					});
				});
			});
		});
	});

	/**
	 * TODO: It would be better to Simulator Pan test as a template format. because It's too long to read.
	 */

	// describe.skip("Touch Direction Test & useRotation", () => {
	// 	let target;
	// 	let inst = null;

	// 	const MOVE_ANGLE_X = {
	// 		pos: [100, 100],
	// 		deltaX: 100,
	// 		deltaY: 0,
	// 		duration: 200,
	// 		easing: "linear"
	// 	};

	// 	class MockRotationPanInput extends RotationPanInput {
	// 		constructor(el, options) {
	// 			super(el, options);

	// 			this._screenRotationAngle = {
	// 				getRadian: () => {
	// 					return glMatrix.toRadian(90); /* 90 degree */
	// 				},
	// 				unref: () => {
	// 					/* Do nothing */
	// 				}
	// 			}
	// 		}
	// 	}
	// 	const MockYawPitchControl90Rotated = YawPitchControlrInjector({
	// 		"./input/RotationPanInput": MockRotationPanInput
	// 	}).default;


	// 	beforeEach(() => {
	// 		target = sandbox();
	// 		target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
	// 	});

	// 	afterEach(() => {
	// 		inst && inst.destroy();
	// 		inst = null;
	// 		target && target.remove();
	// 		target = null;
	// 	});

	// 	function getMoveAngle(angle) {
	// 		const x = MOVE_ANGLE_X.deltaX;
	// 		return Object.assign({}, MOVE_ANGLE_X, {
	// 			deltaY: -x * Math.tan(glMatrix.toRadian(angle)),
	// 		});
	// 	}

	// 	/* This angle is based on not changed screen orientation */
	// 	it("should not change yaw when direction = TOUCH_DIRECTION_YAW & moved 0 angle", done => {
	// 		// Given
	// 		inst = new MockYawPitchControl90Rotated({
	// 			element: target,
	// 			touchDirection: TOUCH_DIRECTION_YAW,
	// 			gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
	// 		});

	// 		inst.enable();

	// 		const prevYaw = inst.getYawPitch().yaw;
	// 		const prevPitch = inst.getYawPitch().pitch;

	// 		// When
	// 		const MOVE_ANGLE_0 = getMoveAngle(0);
	// 		Simulator.gestures.pan(target, MOVE_ANGLE_0, () => {
	// 			// Then
	// 			// console.log(inst.getYawPitch().yaw, inst.getYawPitch().pitch)
	// 			expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
	// 			expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
	// 			done();
	// 		});
	// 	});

	// 	it("should not change yaw when direction = TOUCH_DIRECTION_YAW & moved 40 degree", done => {
	// 		// Given
	// 		inst = new MockYawPitchControl90Rotated({
	// 			element: target,
	// 			touchDirection: TOUCH_DIRECTION_YAW,
	// 			gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
	// 		});

	// 		inst.enable();

	// 		const prevYaw = inst.getYawPitch().yaw;
	// 		const prevPitch = inst.getYawPitch().pitch;

	// 		// When
	// 		const MOVE_ANGLE_40 = getMoveAngle(40);
	// 		Simulator.gestures.pan(target, MOVE_ANGLE_40, () => {
	// 			// Then
	// 			// console.log(inst.getYawPitch().yaw, inst.getYawPitch().pitch)
	// 			expect(inst.getYawPitch().yaw).to.be.equal(prevYaw);
	// 			expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
	// 			done();
	// 		});
	// 	});

	// 	it.only("should change yaw when direction = TOUCH_DIRECTION_YAW & moved 60 angle", done => {
	// 		// Given
	// 		inst = new MockYawPitchControl90Rotated({
	// 			element: target,
	// 			touchDirection: TOUCH_DIRECTION_YAW,
	// 			gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
	// 		});

	// 		inst.enable();

	// 		const prevYaw = inst.getYawPitch().yaw;
	// 		const prevPitch = inst.getYawPitch().pitch;

	// 		// When
	// 		const MOVE_ANGLE_60 = getMoveAngle(60);
	// 		Simulator.gestures.pan(target, MOVE_ANGLE_60, () => {
	// 			// Then
	// 			// console.log(inst.getYawPitch().yaw, inst.getYawPitch().pitch)
	// 			expect(inst.getYawPitch().yaw).to.be.not.equal(prevYaw);
	// 			expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
	// 			done();
	// 		});
	// 	});

	// 	it.only("should change yaw when direction = TOUCH_DIRECTION_YAW & moved 150 angle", done => {
	// 		// Given
	// 		inst = new MockYawPitchControl90Rotated({
	// 			element: target,
	// 			touchDirection: TOUCH_DIRECTION_YAW,
	// 			gyroMode: GYRO_MODE.VR /* this makes RotationPanInput as a rotation Mode */
	// 		});

	// 		inst.enable();

	// 		const prevYaw = inst.getYawPitch().yaw;
	// 		const prevPitch = inst.getYawPitch().pitch;

	// 		// When
	// 		const MOVE_ANGLE_150 = getMoveAngle(150);
	// 		Simulator.gestures.pan(target, MOVE_ANGLE_150, () => {
	// 			// Then
	// 			// console.log(inst.getYawPitch().yaw, inst.getYawPitch().pitch)
	// 			expect(inst.getYawPitch().yaw).to.be.not.equal(prevYaw);
	// 			expect(inst.getYawPitch().pitch).to.be.equal(prevPitch);
	// 			done();
	// 		});
	// 	});
	// });
});
