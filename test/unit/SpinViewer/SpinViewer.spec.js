import {expect, assert} from "chai";
import SpinViewer from "../../../src/SpinViewer/SpinViewer";
import {sandbox, cleanup} from "../util";

describe("SpinViewer", () => {
	describe("event", () => {
		let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;
		});
		// load
		it("should fire load event when image is vaild", done => {
			const COL = 4;
			const ROW = 3;
			const inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: "images/SpinViewer/bag360.jpg"
			});

			inst.on("load", e => {
				assert(e.target !== null && e.bgElement !== null);
				done();
			});
		});
		// error
		it("should fire error event when image is not valid", done => {
			const COL = 4;
			const ROW = 3;
			const invalidUrl = "images/SpinViewer/bag360.invalid";
			const inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: invalidUrl
			});

			inst.on("imageError", e => {
				assert(e.imageUrl === invalidUrl);
				done();
			});
		});
		// change
		it("should fire change event when spin", done => {
			const COL = 4;
			const ROW = 3;
			const inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: "images/SpinViewer/bag360.jpg"
			});

			inst.on({
				"load": e => {
					inst.spinBy(30, {duration: 0});
				},
				"change": e => {
					assert(e.target !== null && e.bgElement !== null);
					assert(e.angle === 30);
					done();
				}
			});
		});
		// change #2
		it("should not fire change event when angle is not changed", done => {
			const COL = 4;
			const ROW = 3;
			let called = false;
			const inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: "images/SpinViewer/bag360.jpg"
			});

			inst.on({
				"load": e => {
					inst.spinBy(0, {duration: 0});
				},
				"change": e => {
					called = true;
				}
			});

			setTimeout(() => {
				expect(called).to.be.equal(false);
				expect(inst.getAngle()).to.be.equal(0);
				done();
			}, 30);
		});
	});

	describe("#setScale", () => {
		let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;
		});

		it("should update input's scale array", () => {
			// Given
			const inst = new SpinViewer(target, {
				colCount: 3,
				rowCount: 3
			});

			const prevScale = inst._panInput.options.scale;

			// When
			inst.setScale(3);

			// Then
			const currScale = inst._panInput.options.scale;

			assert(prevScale[0] * 3 === currScale[0] && prevScale[1] * 3 === currScale[1]);
		});

		it("should not update scale if scale value is invalid", () => {
			// Given
			const inst = new SpinViewer(target, {
				colCount: 3,
				rowCount: 3
			});
			const nextScales = [];
			const prevScale = inst.getScale();

			// When
			inst.setScale("invalid");
			nextScales.push(inst.getScale());
			inst.setScale(-1);
			nextScales.push(inst.getScale());
			// Then
			expect(prevScale).to.be.equal(1);
			expect(prevScale).to.be.equal(nextScales[0]);
			expect(prevScale).to.be.equal(nextScales[1]);
		});
	});

	describe("#spinBy", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;

			const COL = 0;
			const ROW = 0;

			inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: "images/SpinViewer/bag360.jpg"
			});
		});

		afterEach(() => {
			inst = null;
			cleanup();
		});

		it("should spinBy with duration 0, if no option is specified", done => {
			// Given
			// When
			let sync = true;

			inst.on("change", () => {
				// Then
				expect(sync).to.be.equal(true);
				expect(inst.getAngle()).to.be.equal(100);
				done();
			});
			inst.spinTo(100);
			sync = false;
		});

		it("should not change if param is not specified", done => {
			// Given
			// When
			let changeCount = 0;
			const prevAngle = inst.getAngle();

			inst.on("change", () => {
				changeCount = 1;
			});
			inst.spinBy();

			// Then
			setTimeout(() => {
				expect(changeCount).to.be.equal(0);
				expect(inst.getAngle()).to.be.equal(prevAngle);
				done();
			}, 30);
		});
	});
	describe("#spinTo", () => {
		let target;
		let inst;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;

			const COL = 0;
			const ROW = 0;

			inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: "images/SpinViewer/bag360.jpg"
			});
		});

		afterEach(() => {
			inst = null;
			cleanup();
		});

		it("should set to angle user specified in normal range.(0 ~ 360)", done => {
			// Given
			let i = 0;
			/* 0 ~ 359 */
			const NORMAL_ANGLES = [1, 30, 60, 120, 150, 180, 359, 0];

			inst.on("change", evt => {
				const currAngle = inst.getAngle();

				// Then
				expect(currAngle).be.equal(NORMAL_ANGLES[i]);

				if (++i < NORMAL_ANGLES.length) {
					inst.spinTo(NORMAL_ANGLES[i]); // It causes recursive call, but it does not matter because it has done condition.
				} else {
					done();
				}
			});

			// When
			inst.spinTo(NORMAL_ANGLES[i]);
		});

		it("should change angle in a circular value within the range if input angle is beyond range.(angle < 0 || angle >= 360)", done => {
			// Given
			let i = 0;
			/* angle < 0 || angle >= 360 */
			const NORMAL_ANGLES = [-1, -10, -100, -360, -540, -720, 360, 370, 720];
			const EXPECTED_ANGLES = [358, 349, 259, 358, 178, 357, 1, 11, 2];

			// When
			inst.on("change", evt => {
				// Then
				const currAngle = inst.getAngle();

				expect(currAngle).be.equal(EXPECTED_ANGLES[i]);

				if (++i < NORMAL_ANGLES.length) {
					inst.spinTo(NORMAL_ANGLES[i]);
				} else {
					done();
				}
			});
			inst.spinTo(NORMAL_ANGLES[i]);
		});

		it("should set 0 if angle is not specified", done => {
			// Given
			// When
			inst.spinTo();

			// Then
			setTimeout(() => {
				const currAngle = inst.getAngle();

				expect(currAngle).be.equal(0);
				done();
			}, 100);
		});

		it("should apply duration", done => {
			// Given
			let before;
			let after;

			inst.on("animationEnd", evt => {
				after = new Date().getTime();
				const currAngle = inst.getAngle();
				const diff = after - before;

				// Then
				expect(diff).be.above(100);
				expect(diff).be.below(150); // timeout margin 50ms: it cannot be accurate because timeout is not accurate.
				expect(currAngle).be.equal(10);
				done();
			});

			// When
			before = new Date().getTime();
			inst.spinTo(10, {duration: 100});
		});

		it("should follow last spinTo if spin is requested again before animationEnd", done => {
			// Given
			let animationEndCount = 0;

			inst.on("animationEnd", () => {
				animationEndCount++;
			});
			inst.spinTo(100, {duration: 100});

			// When
			// call spinTo before above spin is not end
			inst.spinTo(200);

			setTimeout(() => {
				expect(inst.getAngle() === 200);
				expect(animationEndCount === 1);
				done();
			}, 400);
		});
	});
});
