import {
	CONTROL_MODE_VR,
	CONTROL_MODE_YAWPITCH,
	TOUCH_DIRECTION_YAW,
	TOUCH_DIRECTION_PITCH,
	TOUCH_DIRECTION_NONE,
	TOUCH_DIRECTION_ALL,
	MC_DECELERATION,
	MAX_FIELD_OF_VIEW,
	KEYMAP,
	GYRO_MODE
} from "../../../src/YawPitchControl/consts";
import YawPitchControl from "../../../src/YawPitchControl/YawPitchControl";
import TestHelper from "./testHelper";

import YawPitchControlrInjector from "inject-loader!../../../src/YawPitchControl/YawPitchControl";
import devicemotionRotateSample from "./devicemotionSampleRotate";

const INTERVAL = 1000 / 60.0;

describe("YawPitchControl", function() {
	describe("constructor", function() {
		describe("default options", function() {
			var target
			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div></div>`;
			});

			afterEach(() => {
				// this.inst && this.inst.destroy();
				// this.inst = null;
			});

			it("Instance without params", () => {
				// Given
				const options = {
					element: target
				};
				// When
				this.inst = new YawPitchControl(options);

				// Then
				expect(this.inst).to.be.exist;
			});

			it("should have default values when options are not given", () => {
				// Given
				const options = {
					element: target
				};
				// When
				this.inst = new YawPitchControl(options);

				// Then
				const appliedOption = this.inst.option();
				expect(appliedOption.yaw).to.equal(0);
				expect(appliedOption.pitch).to.equal(0);
				expect(appliedOption.fov).to.equal(65);
				expect(appliedOption.showPolePoint).to.equal(false);
				expect(appliedOption.useZoom).to.equal(true);
				expect(appliedOption.useKeyboard).to.equal(true);
				expect(appliedOption.useGyro).to.equal(GYRO_MODE.YAWPITCH);
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
				this.inst = new YawPitchControl(options);

				// Then
				const appliedOption = this.inst.option();
				expect(appliedOption.yawRange).to.deep.equal([-180, 180]);
				expect(appliedOption.pitchRange).to.deep.equal([-90, 90]);
			});
		});

		describe("Setting options test that affect each other", function() {
			var target
			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div></div>`;
			});

			it("should change initial yaw by yaw range", function() {
				// Given
				// When
				this.inst = new YawPitchControl({
					element: target,
					yawRange: [30, 180]
				});

				expect(this.inst.getYaw()).to.above(30);
				expect(this.inst.getYaw()).to.below(180);
			});
		});
	});

	describe("enable / diable", function() {
		let target;
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			this.inst = new YawPitchControl({
				element: target
			});
		});

		afterEach(() => {
			this.inst && this.inst.destroy();
			target && target.remove();
			target = null;
		});

		it("should disable panning when first place", (done) => {
			// Given
			var callback = sinon.spy();

			setTimeout(() => {
				this.inst.on("change", callback);

				// When
				Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
					pos: [30, 30],
					deltaX: 10,
					deltaY: 10,
					duration: 1000,
					easing: "linear"
				}, function() {
					// Then
					expect(callback.called).to.be.false;
					done();
				});
			}, 0);
		});

		it("should trigger change event when panning after enabled", (done) => {
			// Given
			var callback = sinon.spy();
			this.inst.enable();

			setTimeout(() => {
				this.inst.on("change", callback);

				// When
				Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
					pos: [30, 30],
					deltaX: 10,
					deltaY: 10,
					duration: 1000,
					easing: "linear"
				}, function() {
					// Then
					expect(callback.called).to.be.true;
					done();
				});
			}, 0);
		});

		it("should not disable lookAt method while disable() method is called", (done) => {
			// Given
			this.inst.on("change", then);

			// When
			this.inst.disable();
			this.inst.lookAt({yaw: 45}, 0);

			// Then
			function then(e) {
				expect(e.yaw).to.equal(45);
				done();
			}
		});

		it("should enable panning on enable mode after disable mode.", (done) => {
			// Given
			const callback = sinon.spy();
			this.inst.on("change", callback);
			this.inst.enable();
			this.inst.disable();
			this.inst.enable();

			// When
			Simulator.gestures.pan(target, {
				pos: [30, 30],
				deltaX: 10,
				deltaY: 10,
				duration: 1000,
				easing: "linear"
			}, function() {
				// Then
				expect(callback.called).to.be.true;
				done();
			});
		});

		it("should lookAt work on enable mode after disable mode.", (done) => {
			// Given
			this.inst.enable();
			this.inst.disable();
			this.inst.enable();

			// When
			/**
			 * enable() makes a "change" event for first rendering
			 * This event does not use it in this case, So here we attach event handler later.
			 */
			this.inst.on("change", then);
			this.inst.lookAt({yaw: 45}, 0);

			// Then
			function then(e) {
				expect(e.yaw).to.equal(45);
				done();
			}
		});

		it("should lookAt trigger change event once when enable called multiple times.", () => {
			// Given
			this.inst.enable();
			this.inst.enable();
			this.inst.enable();
			let changeTriggerCnt = 0;
			this.inst.on("change", function() {
				changeTriggerCnt++;
			});

			// When
			this.inst.lookAt({yaw: 45}, 0);

			// Then
			expect(changeTriggerCnt).to.equal(1);
		});
	});

	describe("YawPitch Angle Test", function() {
		describe("Yaw Range Test", function() {
			let results = [];
			beforeEach(() => {
				this.target = sandbox();
				this.target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				this.inst = new YawPitchControl({
					element: this.target
				});
			});

			afterEach(() => {
				results = [];

				this.target.remove();
				this.inst.destroy();
			});

			it("should set value as intented in default range", (done) => {
				// Given
				const normals = [10, 170, 0, 180, -10, -150, -180];
				const expected = [10, 170, 0, 180, -10, -150, -180];
				let results = [];

				this.inst.on("change", then);

				// When
				normals.forEach((yaw) => {
					this.inst.lookAt({yaw: yaw}, 0);
				});

				// Then
				function then(e) {
					results.push(e.yaw);

					if (results.length < expected.length) {
						return;
					}
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				}
			});

			it("should set value as corrected in default range when values are out of ranges", (done) => {
				// Given
				const abnormals = [-181, 90, 260];
				const expected = [179, 90, -100];
				let results = [];

				this.inst.on("change", then);

				// When
				abnormals.forEach((yaw) => {
					this.inst.lookAt({
						yaw: yaw
					}, 0);
				});

				// Then
				// If requested angle is out of range then use circular value on circular mode.
				function then(e) {
					results.push(e.yaw);

					if (results.length < expected.length) {
						return;
					}

					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				}
			});

			it("should set yaw in range when default yaw is out of range.", (done) => {
				// Given
				const yawRanges = [[10, 180], [-180, 10], [30, 200]];
				const expected = [];
				// let prevYaws = [];
				let resultYaws = [];

				this.inst.on("change", then);

				// When
				yawRanges.forEach((range) => {
					this.inst.option("yawRange", range);
				});

				function then(e) {
					results.push(e.yaw);

					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				}
			});

			it("should returns specific value when yaw range has 1 value", () => {
				// Given
				const yaws = [-180, -90, 0, 80, 190];
				const horizontalFov = this.inst.option("fov") * 1;
				const expectedYaws = horizontalFov / 2;

				// When
				this.inst.option("yawRange", [0, horizontalFov]);// Range has 1 value

				yaws.forEach((yaw) => {
					this.inst.lookAt({
						yaw: yaw
					}, 0);
				});
				expect(this.inst.get().yaw).to.equal(expectedYaws);
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
			// 	this.inst.option("yawRange", []);
			// 	// Then
			// 	//this.inst.options
			// 	// TODO: data.expected 와 옵션값을 비교하는 코드를 넣는다.
			// });
		});

		describe("Pitch Range Test", function() {
			beforeEach(() => {
				this.target = sandbox();
				this.target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				this.inst = new YawPitchControl({
					element: this.target
				});
			});

			afterEach(() => {
				this.target.remove();
				this.inst.destroy();
			});

			it("should set pitch in default pitch range.", (done) => {
				// Given
				const pitches = [-180, 60, 180];
				const expected = [-90, 60, 90];
				let results = [];

				// When
				this.inst.option("showPolePoint", true);
				this.inst.on("change", then);

				pitches.forEach((pitch) => {
					this.inst.lookAt({
						pitch: pitch
					}, 0);
				});

				function then(e) {
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				}
			});

			it("should set intended pitch in specified range.", (done) => {
				// -35 ~ +35
				// Given
				// When
				const pitches = [-50, -70, -100];
				let results = [];

				this.inst.on("change", then);
				this.inst.option("showPolePoint", true);
				this.inst.option("pitchRange", [-90, 90]);
				const expected = [-50, -70, -90];

				pitches.forEach((pitch) => {
					this.inst.lookAt({
						pitch: pitch
					}, 0);
				});

				function then(e) {
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				}
			});

			it("should set specific pitch when pitch range has 1 value.", () => {
				// Given
				const pitches = [-180, -30, 30, 90, 360];
				const expected = 32.5;

				// When
				this.inst.option("pitchRange", [0, 65]);

				pitches.forEach((pitch) => {
					this.inst.lookAt({
						pitch: pitch
					}, 0);
				});

				expect(this.inst.getPitch()).to.equal(expected);
			});

			it("should return pole excluded pitches when showPole is false", (done) => {
				// Given
				const pitches = [-90, 0, 180];
				// Second parameter -57.5 doesn't fire event.
				const expected = [-57.5, 0, 57.5];
				let results = [];

				// When
				this.inst.on("change", then);
				this.inst.option("showPole", false);
				pitches.forEach((pitch) => {
					this.inst.lookAt({
						pitch: pitch
					}, 0);
				});

				function then(e) {
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				}
			});

			it("should return pitches in pitchRange when showPolePoint is false and min/max range is smaller than pole range", (done) => {
				// Given
				const pitches = [-90, -30, 0, 30, 360];
				const expected = [-10, 0, 10];
				let results = [];

				// When
				this.inst.option("showPole", false);
				this.inst.option("pitchRange", [-42.5, 42.5]);
				this.inst.on("change", then);
				pitches.forEach((pitch) => {
					this.inst.lookAt({
						pitch: pitch
					}, 0);
				});

				// Then
				function then(e) {
					results.push(e.pitch);
					if (results.length < expected.length) {
						return;
					}

					// Then
					expected.forEach((val, i) => {
						expect(results[i]).to.equal(val);
					});
					done();
				}
			});

			/**
			 * VR MODE
			 *
			 * Does lookAt({pitch}) need to be ignored?
			 * It need to be supported by MovableCoord!
			 */
			it.skip("should not change the pitch in VR MODE", (done) => {
				// Given
				const pitches = [-90, -30, 0, 30, 360];
				const expected = [0, 0, 0, 0, 0];
				let results = [];
				let self = this;

				// When
				this.inst.on("change", then);
				this.inst.option("controlMode", CONTROL_MODE_VR);
				pitches.forEach((pitch) => {
					this.inst.lookAt({
						pitch: pitch
					}, 0);
				});

				// Then
				function then(e) {
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
				}
			});
		});

	});

	describe("FOV Test", function() {
		describe("Min/Max FOV", function() {
			let inst;
			let target;
			let results = [];

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				results = [];
				target.remove();
				inst.destroy();
			});

			// It this test need?
			it("should set `fov-range` in certain range", () => {
				// Given
				this.inputValues = [
					[60, 110], [30, 110], [0, 110], [-30, 110], [-60, 110],/* min test */
					[30, 30], [30, 90], [30, 150], [30, 210], [30, 270] /* max text */
				];
				// TODO: Is need to throw errors on exceptional range?
				this.expectedValues = [
					[60, 110], [30, 110], [0, 110], [-30, 110], [-60, 110],/* min test */
					[30, 30], [30, 90], [30, 150], [30, 210], [30, 270] /* max text */
				];

				// When
				this.inputValues.forEach((range) => {
					inst.option("fovRange", range);

					results.push(inst.option("fovRange"));
				});

				// Then
				this.expectedValues.forEach((expectedVal, i) => {
					expect(results[i]).to.be.eql(expectedVal);
				});
			});
		});

		describe("FOV setting within FOV Range", function() {
			let results = [];
			let inst = null;
			let target;
			let attachThenHandler = (expected, done) => {
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
			});

			afterEach(() => {
				results = [];
				inst.destroy();
				target.remove();
			});

			it("should set fov within fov-range", (done) => {
				// Given
				const inputFov = [-10, 0, 40, 90, 120, 200];
				const expectedFov = [30, 40, 90, 110];

				attachThenHandler(expectedFov, then);

				// When
				inputFov.forEach((fov) => {
					inst.lookAt({fov: fov}, 0);
				});

				// Then
				function then(res) {
					expectedFov.forEach((expectedVal, i) => {
						expect(res[i]).to.equal(expectedVal);
					});
					done();
				}
			});

			it("should set fov within user defined fov-range", (done) => {
				// Given
				const inputFov = [-10, 0, 25, 30, 60, 120];
				const expected = [20, 25, 30, 60];

				// When
				inst.option("fovRange", [20, 60]);
				attachThenHandler(expected, then);

				inputFov.forEach((fov) => {
					inst.lookAt({
						fov: fov
					}, 0);
				});

				// Then
				function then(res) {
					expected.forEach((expectedVal, i) => {
						expect(res[i]).to.equal(expectedVal);
					});

					done();
				}
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

		describe("Pitch Min/Max update by FOV Change", function() {
			let results = [];
			let inst = null;
			let target;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				results = [];
				target.remove();
				inst.destroy();
			});

			it("should update current pitch when 'changed fov' cannot accept current pitch", function(done) {
				// Given
				const firstPitch = 57.5;

				// When
				// It is valid when showPolePoint is false or isPanorama
				inst.option("showPole", false);
				inst.lookAt({pitch: firstPitch});// 57.5 is current pitchMax

				// This makes pitchMax to be updated to value which is below current pitch(57.5)
				inst.on("change", changed);
				inst.lookAt({fov:90}); //_pitchMin/Max = [-45, 45]

				function changed(e) {
					// Then
					expect(e.pitch).to.be.below(firstPitch);
					done();
				}
			});
		});

		// FOV 변화에 따라 scale 변경을 적용하는 거라면 좋겠따.
		describe("Deceleration update by FOV Change", function() {
			let results = [];
			let inst = null;
			let target;
			let attachThenHandler = (expected, then) => {
				inst.on("change", e => {
					const deceleration = inst.axes.options["deceleration"];
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
			});

			it("should update deceleration when FOV changed", function(done) {
				// Given
				const inputFov = [30, 60, 100]; // Valid fov range
				const expected = inputFov.map(fov => MC_DECELERATION * fov / MAX_FIELD_OF_VIEW);

				attachThenHandler(expected, then);
				// When
				inputFov.forEach(fov => {
					inst.lookAt({fov});
				})

				// Then
				function then(res) {
					expected.forEach((expectedVal, i) => {
						expect(res[i]).to.equal(expectedVal);
					});

					done();
				}
			});
		});

		describe("useZoom false Test", () => {
			let results = [];
			let inst = null;
			let target;
			let attachThenHandler = (expected, done) => {
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
			});

			// allow FOV (Zoom) (Spec for embedding in a document)
			it("should change fov although useZoom is false", () => {
				// Given
				var fovs = [60, 90, 30];
				var expected = [60, 90, 30];

				// When
				inst.option("useZoom", false);
				attachThenHandler(expected, then);
				fovs.forEach((fov) => {
					inst.lookAt({
						fov: fov
					}, 0);
				});

				// Then
				function then(res) {
					expected.forEach((expectedVal, i) => {
						expect(res[i]).to.equal(expectedVal);
					});
				}
			});
		});

		describe.only("useGyro none Test", () => {
			let results = [];
			let inst = null;
			let target;

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
			});

			// allow FOV (Zoom) (Spec for embedding in a document)
			it("should not change yaw/pitch when useGyro is none", () => {
				// Given
				inst.option("useGyro", GYRO_MODE.NONE);
				let changeTriggered = false;
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
			let results = [];
			let inst = null;
			let target;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				results = [];
				target.remove();
				inst.destroy();
			});

			// allow FOV (Zoom) (Spec for embedding in a document)
			it("should not change yaw/pitch when useKeyboard is false", () => {
				// Given
				inst.option("useKeyboard", false);
				let changeTriggered = false;
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

		describe("PinchZoom Test", ()=> {
			let results = [];
			let inst = null;
			let target;
			let attachThenHandler = (expected, done) => {
				inst.on("change", e => {
					results.push(e.fov);
					if (results.length < expected.length) {
						return;
					}
					done && done.call(this, results);
				});
			}

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:300px;height:300px;"></div>`;

				inst = new YawPitchControl({element: target});
			});

			afterEach(() => {
				results = [];
				target.remove();
				inst && inst.destroy();
			});

			it("should increase fov using pinchZoom if useZoom is true", (done) => {
				// Given
				let firstFov = inst.getFov();
				inst.option("useZoom", true);

				// When
				Simulator.gestures.pinch(target, {
					scale: 0.5
				}, function() {
					// Then
					expect(inst.getFov()).to.be.above(firstFov);
					done();
				});
			});

			it("should decrease fov using pinchZoom if useZoom is true", (done) => {
				// Given
				let firstFov = inst.getFov();
				inst.option("useZoom", true);

				// When
				Simulator.gestures.pinch(target, {
					scale: 2
				}, function() {
					// Then
					expect(inst.getFov()).to.be.below(firstFov);
					done();
				});
			});

			it("should not change fov using pinchZoom if useZoom is false", (done) => {
				// Given
				let firstFov = inst.getFov();
				inst.option("useZoom", false);

				// When
				Simulator.gestures.pinch(target, {
					scale: 2
				}, function() {
					// Then
					expect(inst.getFov()).to.be.equal(firstFov);
					done();
				});
			});

			// useZoom false 인 경우 pinch zoom 이 동작하지 않아야 한다.
			it("should change fov using pinchZoom if useZoom is followed by true", (done) => {
				// Given
				let firstFov = inst.getFov();
				inst.option("useZoom", false);

				// When
				inst.option("useZoom", true);
				Simulator.gestures.pinch(target, {
					scale: 2
				}, function() {
					// Then
					expect(inst.getFov()).to.be.below(firstFov);
					done();
				});
			});

			it("should not change fov using pinchZoom if useZoom is false on constructor", (done) => {
				// Given
				inst.destroy();
				inst = new YawPitchControl({
					element: target,
					useZoom: false,
				});

				let firstFov = inst.getFov();

				// When
				Simulator.gestures.pinch(target, {
					scale: 2
				}, function() {
					// Then
					expect(inst.getFov()).to.be.equal(firstFov);
					done();
				});
			});
		});

		describe("Wheel Test", ()=> {
			let inst = null;
			let lastFov;
			let changed = false;
			let target;

			beforeEach(() => {
				target = sandbox();
				target.innerHTML = `<div style="width:100px;height:100px;"></div>`;
				inst = new YawPitchControl({element: target});

				inst.on("change", (e) => {
					lastFov = e.fov;
					changed = true;
				});
			});

			afterEach(() => {
				inst.destroy();
				target.remove();
				changed = false;
			});

			// useZoom true 인 경우 wheel scroll 을 통한 확대가 가능해야 한다.
			it("should increase fov using wheelScroll if useZoom is true", () => {
				// Given
				let firstFov = inst.getFov();
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
				let firstFov = inst.getFov();
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
				let firstFov = inst.getFov();
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
				let firstFov = inst.getFov();
				inst.option("useZoom", false);

				// When
				// wheel scroll down
				TestHelper.wheelVertical(target, -100, () => {
					// Then
					expect(changed).to.be.equal(false);
				});
			});

		});
	});

	describe("Pitch adjustment", function() {
		let targetEl;
		beforeEach(() => {
			targetEl = sandbox();
			targetEl.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			// this.inst = new YawPitchControl({
			// 	element: target
			// });
		});

		afterEach(() => {
			this.inst && this.inst.destroy();
			targetEl && targetEl.remove();
			targetEl = null;
		});

		it("zoomming when showPolePoint is false, should adjust pitch", (done) => {
			// Given
			this.inst = new YawPitchControl({
				element: targetEl,
				pitch: -75,
				fov: 30,
				showPolePoint: false
			});
			// When
			TestHelper.wheelVertical(targetEl , 100, () => {
				// then
				let pitch = this.inst.getPitch();
				expect(this.inst.getPitch()).to.equal(-73);	
				done();	
			});
		});

		// it.only("zoomming when showPolePoint is false and after user input, should adjust pitch", (done) => {
		// 	// Given
		// 	this.inst = new YawPitchControl({
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
		// 			setTimeout(function() {
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
		// 		console.log(this.inst.getPitch());
		// 	});
		// 	// TestHelper.wheelVertical(targetEl , 100, () => {
		// 	// 	// then
		// 	// 	let pitch = this.inst.getPitch();
		// 	// 	expect(this.inst.getPitch()).to.equal(-73);	
		// 	// 	done();	
		// 	// });
		// });

		it("zoomming when showPolePoint is false, should adjust pitch smoothly", (done) => {
			// Given
			this.inst = new YawPitchControl({
				element: targetEl,
				pitch: -100,
				fov: 30,
				showPolePoint: false
			});
			
			function getWheelPromises(count, duration) {
				return Array.apply(null, {length: count})
				.map(Number.call, Number)
				.map(idx => idx * duration / count)
				.map(delay => new Promise(function(res, rej) {
					setTimeout(function() {
						TestHelper.wheelVertical(targetEl , 100, () => {
							res();
						});
					}, delay);
				}));
			}

			// When
			const wheelP = getWheelPromises(20, 1000);
			
			Promise.all(wheelP).then(() => {
				// then
				expect(this.inst.getPitch()).to.be.equal(-35);	
				done();			
			});
		});
	});

	describe("no devicemotion, touch", function() {
		let target;
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			// this.inst = new YawPitchControl({
			// 	element: target
			// });
		});

		afterEach(() => {
			this.inst && this.inst.destroy();
			target && target.remove();
			target = null;
		});
		it("no script errer with no touch, no motion", () => {
			// Given
			let errorThrown = false;

			// When
            try {
				var MockYawPitchControl = YawPitchControlrInjector(
					{
						"./browser": {
							getComputedStyle: window.getComputedStyle,
							SUPPORT_TOUCH: false,
							SUPPORT_DEVICEMOTION: false
						}
					}
				).default;
				new MockYawPitchControl({
					element: target
				})
            } catch (e) {
                errorThrown = true;
			}

            // Then
            expect(errorThrown).to.not.ok;
		});
	});

	describe.skip("set option when disabled", function() {
		let target;
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			this.inst = new YawPitchControl({
				element: target
			});
		});

		afterEach(() => {
			this.inst && this.inst.destroy();
			target && target.remove();
			target = null;
		});

	});

	describe("release, animationEnd", function() {
		let target;
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:300px;height:300px;"></div>`;
			this.inst = new YawPitchControl({
				element: target
			});
		});

		afterEach(() => {
			this.inst && this.inst.destroy();
			target && target.remove();
			target = null;
		});

		it("pan scale change after pich zoom", (done) => {
			// Given
			let inst = this.inst;
			let yawDistanceBeforePinch = 0;
			let yawDistanceAfterPinch = 0;
			let yaw = inst.getYaw();
			this.inst.enable();

			// When
			Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
				pos: [30, 30],
				deltaX: 100,
				deltaY: 0,
				duration: 500,
				easing: "linear"
			}, function() {
				yawDistanceBeforePinch = Math.abs(inst.getYaw() - yaw);
				yaw = inst.getYaw();

				Simulator.gestures.pinch(target, { // this.el 이 300 * 300 이라고 가정
					scale: 1.2
				}, function() {
					Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
						pos: [30, 30],
						deltaX: 100,
						deltaY: 0,
						duration: 500,
						easing: "linear"
					}, function() {
						yawDistanceAfterPinch = Math.abs(inst.getYaw() - yaw);
						// Then
						expect(yawDistanceAfterPinch).to.be.below(yawDistanceBeforePinch);
						done()
					});
				});
			});
		});

		it("animationEnd", (done) => {
			// Given
			let triggered = false;
			this.inst.on("animationEnd", then);
			this.inst.enable();

			// When
			this.inst.lookAt({
				yaw: 90
			}, 1000);

			function then() {
				triggered = true;
				// Then
				expect(triggered).to.be.true;
				done();
			}
		});
	});
});
