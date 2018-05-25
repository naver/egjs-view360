import SpriteImage from "../../../src/SpinViewer/SpriteImage";
import {TRANSFORM, SUPPORT_WILLCHANGE} from "../../../src/SpinViewer/browser";

describe("SpriteImage", function() {
	describe("create", function() {
		var target
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		afterEach(() => {
			cleanup();
		});

		it("should make instance", () => {
			let o = new SpriteImage(target);

			assert(o !== null, "instance is created");
		});

		it("should fire imageError event when image is undefined", (done) => {
			let o = new SpriteImage(target);

			o.on("imageError", e => {
				assert(e.imageUrl === undefined);
				done();
			})
		});

		it("should not fire load event if imageUrl is undefined", (done) => {
			let o = new SpriteImage(target);

			const callback = sinon.spy();
			o.on("load", callback);

			setTimeout(() => {
				assert(callback.called === false, "callback should not be called");
				done();
			}, 50);
		});

		// TODO: remote image fails on CI
		it("should fire load event if imageUrl is valid", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "./images/SpinViewer/whale.png"
			});

			const callback = sinon.spy();
			o.on("load", callback);

			setTimeout(() => {
				// TODO: it fails on travis because image load time is too long (>500ms)
				assert(callback.called === true, "callback should be called");
				done();
			}, 500);
		});

		it("should have will-change property be transform if possible", done => {
			// Given
			// When
			let o = new SpriteImage(target, {
				imageUrl: "./images/SpinViewer/whale.png"
			});

			o.on("load", e => {
				if (SUPPORT_WILLCHANGE) {
					expect(e.bgElement.querySelector("img").style.willChange).to.be.equal("transform");
				} else {
					expect(true);
				}
				done();
			});
		});
	});

	describe("setColRow", function() {
		var target
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		afterEach(() => {
			cleanup();
		});

		it("should set background position correctly", (done) => {
			const TOTAL_ROW = 10;
			const TOTAL_COL = 10;
			let o = new SpriteImage(target, {
				imageUrl: "./images/SpinViewer/whale.png",
				colCount: TOTAL_COL,
				rowCount: TOTAL_ROW
			});

			o.on("load", e => {
				for (let y = 0; y < TOTAL_ROW; y++) {
					for (let x = 0; x < TOTAL_COL; x++) {
						o.setColRow(x, y);
						assert(e.bgElement.querySelector("img").style[TRANSFORM] === `translate(${-x / TOTAL_COL * 100}%, ${-y / TOTAL_ROW * 100}%)`);
					}
				}
				done();
			});
		});

		// TODO: remote image fails on CI
		it("should not change background position if col or row is out of range", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "./images/SpinViewer/whale.png",
				colCount: 1,
				rowCount: 1
			});

			o.on("load", e => {
				o.setColRow(1, 1);
				assert(e.bgElement.querySelector("img").style[TRANSFORM] === `translate(0%, 0%)`);
				done();
			});
		});
	});

	describe("play", function() {
		var target
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});
		it("should update frame after play()", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "./images/SpinViewer/whale.png",
				colCount: 10,
				rowCount: 10
			});

			const prev = o.getFrameIndex();
			const timeout = 1000 / 100 * 3;

			o.play();
			setTimeout(() => {
				assert(o.getFrameIndex() !== prev);
				o.stop();
				done();
			}, timeout);
		});
	});
});
