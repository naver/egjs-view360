import SpinViewer from "../../../src/SpinViewer/SpinViewer";

describe("SpinViewer", function() {
	describe("event", function() {
		var target
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});
		it("should fire load event when image is vaild", (done) => {
			const COL = 4;
			const ROW = 3;
			let inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: "images/SpinViewer/bag360.jpg"
			});
			inst.on("load", e => {
				assert(e.target !== null && e.bgElement !== null);
				done();
			});
		});
		it("should fire error event when image is not valid", (done) => {
			const COL = 4;
			const ROW = 3;
			const invalidUrl = "images/SpinViewer/bag360.invalid";
			let inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: invalidUrl
			});
			inst.on("imageError", e => {
				assert(e.imageUrl === invalidUrl);
				done();
			});
		});
		it("should fire change event when spin", (done) => {
			const COL = 4;
			const ROW = 3;
			let inst = new SpinViewer(target, {
				colCount: COL,
				rowCount: ROW,
				imageUrl: "images/SpinViewer/bag360.jpg"
			});
			inst.on({
				"load": e => {
					inst.spinBy({angle: 30, duration: 0})
				},
				"change": e => {
					assert(e.target !== null && e.bgElement !== null);
					assert(e.angle === 30);
					done();
				}
			});
		});
	});
	describe("setScale", function() {
		var target
		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		it("should update input's scale array", () => {
			// Given
			let inst = new SpinViewer(target, {
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
	});
});
