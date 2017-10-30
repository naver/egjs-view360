import Axes from "@egjs/axes";
import MoveKeyInput from "../../../src/YawPitchControl/input/MoveKeyInput";
import {KEYMAP} from "../../../src/YawPitchControl/consts";
import TestHelper from "./testHelper";

const INTERVAL = 1000 / 60.0;

describe("MoveKeyInput", function() {
	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new MoveKeyInput(document.body, {scale: 1});

			// Then
			expect(this.inst).to.be.exist;
		});
	});

	describe("change event", function() {
		// 특정 포커스 해제 되었을 때 는 반응하지 않아야함.

		describe("single key short press", function() {
			let axes = null;
			let moveKeyInput = null;
			let changed = false;
			let deltaYaw = 0;
			let deltaPitch = 0;

			beforeEach(() => {
				moveKeyInput = new MoveKeyInput(document.body, {scale:[1, 1]});
				axes = new Axes({
					yaw: {range: [0, 20]},
					pitch: {range: [0, 20]}
				})
				.on({
					change: e => {
						changed = true;
						deltaYaw = e.delta.yaw;
						deltaPitch = e.delta.pitch;
					}
				}).connect(["yaw", "pitch"], moveKeyInput);
			});

			afterEach(() => {
				axes && axes.destroy();
				moveKeyInput && moveKeyInput.destroy();
				axes = null;
				moveKeyInput = null;
				changed = false;
				deltaYaw = 0;
				deltaPitch = 0;
			});

			// left
			[KEYMAP.LEFT_ARROW, KEYMAP.A].forEach((keyCode, idx) => {
				it("should trigger 'change' event to left(keyCode: "+keyCode+")", (done) => {
					// Given
					const leftKeyCode = {
						keyCode: keyCode
					};
					moveKeyInput.options.scale[0] = -1;
					
					// When
					TestHelper.keyDown(document.body, leftKeyCode);
					TestHelper.keyUp(document.body, leftKeyCode);

					// Then
					expect(changed).to.be.true;
					expect(deltaYaw).to.be.equal(1);
					done();
				});
			});

			// right
			[KEYMAP.RIGHT_ARROW, KEYMAP.D].forEach((keyCode, idx) => {
				it("should trigger 'change' event to right(keyCode: "+keyCode+")", () => {
					// Given
					const rightKeyCode = {
						keyCode: keyCode
					};

					// When
					TestHelper.keyDown(document.body, rightKeyCode);
					TestHelper.keyUp(document.body, rightKeyCode);

					// Then
					expect(changed).to.be.true;
					expect(deltaYaw).to.be.equal(1);
				});
			});

			// up
			[KEYMAP.UP_ARROW, KEYMAP.W].forEach((keyCode, idx) => {
				it("should trigger 'change' event to up("+keyCode+")", () => {
					// Given
					const upKeyCode = {
						keyCode: keyCode
					};

					// When
					TestHelper.keyDown(document.body, upKeyCode);
					TestHelper.keyUp(document.body, upKeyCode);

					// Then
					expect(changed).to.be.true;
					expect(deltaPitch).to.be.equal(1);
				});
			});

			// down
			[KEYMAP.DOWN_ARROW, KEYMAP.S].forEach((keyCode, idx) => {
				it("should trigger 'change' event to down("+keyCode+")", () => {
					// Given
					const downKeyCode = {
						keyCode: keyCode
					};
					moveKeyInput.options.scale[1] = -1;

					// When
					TestHelper.keyDown(document.body, downKeyCode);
					TestHelper.keyUp(document.body, downKeyCode);

					// Then
					expect(changed).to.be.true;
					expect(deltaPitch).to.be.equal(1);
				});
			});
		});
	});
});
