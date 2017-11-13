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

		it("should get image URL as a parameter", function(done) {
			// this.inst = new ImageLoader("https://s.pstatic.net/static/www/mobile/edit/2015/0318/mobile_110629401121.png");
			this.inst = new ImageLoader("./images/PanoViewer/waterpark_preview.jpg");

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

		it("should fails to getwhen url is invalid#2", function(done) {
			let inst = new ImageLoader("https://invalidurl.png");

			expect(inst).to.be.exist;
			setTimeout(() => {
				inst.get().then(null, msg => {
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

	describe("#set", function() {
		it("should return promise after setImage", () => {
			// Given
			// When
			this.inst = new ImageLoader();

			return this.inst.set("./images/PanoViewer/waterpark_preview.jpg").then(img => {
				assert.isOk(img.complete);
			});
		});

		it("should set status loading if image is not loaded", () => {
			// Given && When
			const imgObj = new Image();
			const inst = new ImageLoader(imgObj); // image is not loaded.

			// Then
			expect(inst._loadStatus).to.be.equal(1); // 2 is LOADING status
		});

		it("should set status loaded if image is already loaded", done => {
			// Given && When
			let inst;
			const imgObj = new Image();

			imgObj.onload = function() {
				// image is loaded.
				inst = new ImageLoader(imgObj);

				// Then
				expect(inst._loadStatus).to.be.equal(2); // 2 is LOADED status
				done();
			};
			imgObj.src = "./images/PanoViewer/waterpark_preview.jpg";
		});
	});

	describe("#get", function() {
		it("should accept image object as a parameter", done => {
			// Given
			// When
			let inst;
			const imgObj = new Image();

			imgObj.onload = function() {
				// Then: Image can be obtained although it's been set by image object.
				inst.get()
					.then(img => {
						assert.isOk(img instanceof Image || img instanceof HTMLImageElement);
						done();
					})
					.catch(e => {
						expect(false, e).to.be.true;
						done();
					});
			};
			imgObj.src = "./images/PanoViewer/waterpark_preview.jpg";
			inst = new ImageLoader(imgObj);
		});

		it("should reject when image is undefined", () => {
			// Given
			// When
			const inst = new ImageLoader();

			return inst.get().then(() => {
				expect(false, "this code should not be called.").to.be.true;
			}, errMsg => {
				expect(true, "no parameter triggers reject.").to.be.true;
			});
		});

		it("should resolve image after image is loaded successfully", () => {
			// Given
			// When
			const inst = new ImageLoader("./images/PanoViewer/waterpark_preview.jpg");

			return inst.get()
				.then(() => {
					return inst.get();
				})
				.then(() => {
					expect(true, "resolve image after image has been loaded.").to.be.true;
				}, () => {
					expect(false, "this code should not be called.").to.be.true;
				});
		})
	});

	describe("#destroy", function() {
		it("should destory ", () => {
			// Given
			// When
			const inst = new ImageLoader("./images/PanoViewer/waterpark_preview.jpg");

			// Then
			return inst.get()
				.then(() => {
					inst.destroy();

					expect(inst._image).to.be.null;
				});
		});
	});
});
