import ImageLoader from "../../../src/PanoImageRenderer/ImageLoader";

describe("ImageLoader", function() {
	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new ImageLoader();

			// Then
			expect(this.inst).to.be.exist;
		});

		it("should get image as a parameter", function(done) {
			this.inst = new ImageLoader("https://s.pstatic.net/static/www/mobile/edit/2015/0318/mobile_110629401121.png");

			expect(this.inst).to.be.exist;
			this.inst.get().then(image => {
				assert.isOk(image);
				assert.isOk(image.complete);
				assert.isNumber(image.width);
				assert.isNumber(image.height);
				// expect(image.width)
				done();
			});
		});

		it("should fails when url is invalid#1", function(done) {
			this.inst = new ImageLoader("https://invalidurl.png");

			expect(this.inst).to.be.exist;
			this.inst.get().then(null, (msg)=> {
				console.log(msg);
				done();
			});
		});

		it.skip("should fails when url is invalid#2", function(done) {
			this.inst = new ImageLoader("https://invalidurl.png");

			expect(this.inst).to.be.exist;
			setTimeout(() => {
				this.inst.get().then(null, (msg) => {
					console.log(msg);
					done();
				});
			}, 100);
		});

		it("should not call again", function(done) {
			let countCb1 = 0;
			let countCb2 = 0;
			this.inst = new ImageLoader("https://i.imgur.com/PtUXzkl.png");

			expect(this.inst).to.be.exist;

			function callback1() {
				console.log("callback1");
				countCb1++;
			}

			function callback2() {
				console.log("callback2");
				countCb2++;
			}

			this.inst.get().then(callback1);
			this.inst.get().then(callback2);
			this.inst.get().then(() => {
				assert.equal(countCb1, 1);
				assert.equal(countCb2, 1);
				done();
			});
		});
	});

	describe("set", function() {
		it("should return promise after setImage", (done) => {
			// Given
			// When
			this.inst = new ImageLoader();

			this.inst.setImage("https://s.pstatic.net/static/www/mobile/edit/2015/0318/mobile_110629401121.png").then((img) => {
				assert.isOk(img.complete);
				done();
			});

		});
	});
});
