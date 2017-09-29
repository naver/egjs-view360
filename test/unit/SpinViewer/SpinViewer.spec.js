import SpriteImage from "../../../src/SpinViewer/SpriteImage";

describe("SpriteImage", function() {
	describe("create", function() {
		var target;
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
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

		it.skip("should fire load event if imageUrl is valid", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "http://static.whale.naver.net/pc/header-wordmark.png"
			});

			const callback = sinon.spy();
			o.on("load", callback);

			setTimeout(() => {
				assert(callback.called === true, "callback should not be called");
				done();
			}, 500);
		});
	});

	describe("toColRow", function() {
		let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		it("should returns col, row array by index", () => {
			const COL = 4;
			const ROW = 3;

			const o = new SpriteImage(target, {
				colCount: COL,
				rowCount: ROW
			});

			const list = [
				{index: 0, expected:[0, 0]},
				{index: 1, expected:[1, 0]},
				{index: 2, expected:[2, 0]},
				{index: 3, expected:[3, 0]},
				{index: 4, expected:[0, 1]},
				{index: 5, expected:[1, 1]},
				{index: 6, expected:[2, 1]},
				{index: 7, expected:[3, 1]},
				{index: 8, expected:[0, 2]},
				{index: 9, expected:[1, 2]},
				{index: 10, expected:[2, 2]},
				{index: 11, expected:[3, 2]}
			];

			list.forEach(testItem => {
				const result = o.toColRow(testItem.index, COL, ROW);
				assert(result[0] === testItem.expected[0] && result[1] === testItem.expected[1]);
			});
		});

		it("should returns first or last col, row array by invalid index", () => {
			const COL = 4;
			const ROW = 3;

			const o = new SpriteImage(target, {
				colCount: COL,
				rowCount: ROW
			});

			const list = [
				{index: -1, expected:[0, 0]},
				{index: 12, expected:[3, 2]}
			];

			list.forEach(testItem => {
				const result = o.toColRow(testItem.index, COL, ROW);
				assert(result[0] === testItem.expected[0] && result[1] === testItem.expected[1]);
			});
		});
	});

	describe("setColRow", function() {
		var target
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		it.skip("should set background position correctly", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "http://static.whale.naver.net/58rebrand/whale.png",
				colCount: 10,
				rowCount: 10
			});

			o.on("load", e => {
				for (let y = 0; y < 10; y++) {
					for (let x = 0; x < 10; x++) {
						o.setColRow(x, y);
						assert(e.bgElement.style.backgroundPosition === `${-x * 100}% ${-y * 100}%`);
						assert(o.getFrameIndex() === (y * 10 + x));
					}
				}
				done();
			});
		});

		it.skip("should not change background position if col or row is out of range", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "http://static.whale.naver.net/58rebrand/whale.png",
				colCount: 1,
				rowCount: 1
			});

			o.on("load", e => {
				o.setColRow(1, 1);
				assert(e.bgElement.style.backgroundPosition === "0% 0%");
				done();
			});
		});
	});

	describe("frameIndex in constructor", function() {
			let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		it("should returns col, row array by index", () => {
			const COL = 4;
			const ROW = 3;

			const o = new SpriteImage(target, {
				colCount: COL,
				rowCount: ROW,
				frameIndex: 0
			});

			assert(o.getFrameIndex() === 0);

			const resultColRow = o.getColRow();
			assert(resultColRow[0] === 0 && resultColRow[1] === 0);
		});

		it.skip("should not change background position if col or row is out of range", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "http://static.whale.naver.net/58rebrand/whale.png",
				colCount: 10,
				rowCount: 10,
				frameIndex: 10
			});

			o.on("load", e => {
				const cr = o.getColRow();
				const fi = o.getFrameIndex();

				assert(fi === 10);
				assert(cr[0] === 0 && cr[1] === 1);
				done();
			});
		});
	});

	describe("setFrameIndex", function() {
		let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		it("should returns col, row array by index", () => {
			const COL = 4;
			const ROW = 3;

			const o = new SpriteImage(target, {
				colCount: COL,
				rowCount: ROW
			});

			const list = [
				{index: 0, expected:[0, 0]},
				{index: 1, expected:[1, 0]},
				{index: 2, expected:[2, 0]},
				{index: 3, expected:[3, 0]},
				{index: 4, expected:[0, 1]},
				{index: 5, expected:[1, 1]},
				{index: 6, expected:[2, 1]},
				{index: 7, expected:[3, 1]},
				{index: 8, expected:[0, 2]},
				{index: 9, expected:[1, 2]},
				{index: 10, expected:[2, 2]},
				{index: 11, expected:[3, 2]}
			];

			list.forEach(testItem => {
				o.setFrameIndex(testItem.index);
				const result = o.getColRow();

				assert(result[0] === testItem.expected[0] && result[1] === testItem.expected[1]);
			});
		});

		it.skip("should set background position correctly", (done) => {
			let o = new SpriteImage(target, {
				imageUrl: "http://static.whale.naver.net/58rebrand/whale.png",
				colCount: 10,
				rowCount: 10
			});

			o.on("load", e => {
				for (let y = 0; y < 10; y++) {
					for (let x = 0; x < 10; x++) {
						const frameIndex = y * 10 + x;

						o.setFrameIndex(frameIndex);
						assert(e.bgElement.style.backgroundPosition === `${-x * 100}% ${-y * 100}%`);
						assert(o.getFrameIndex() === frameIndex);
					}
				}
				done();
			});
		});
	});
});
