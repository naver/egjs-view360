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

		it("should get image URL as a parameter", function() {
			// Given
			this.inst = new ImageLoader("./images/PanoViewer/waterpark_preview.jpg");

			// When
			expect(this.inst).to.be.exist;
			return this.inst.get().then(image => {
				// Then
				assert.isOk(image);
				assert.isOk(image.complete);
				assert.isNumber(image.naturalWidth);
				assert.isNumber(image.naturalHeight);
				assert.notEqual(image.naturalWidth, 0); // need to check dimension is not 0
				assert.notEqual(image.naturalHeight, 0); // need to check dimension is not 0
			});
		});

		it("should fails when url is invalid#1", function() {
			// Given
			// When (invlid url param)
			this.inst = new ImageLoader("https://invalidurl.png");

			expect(this.inst).to.be.exist;
			// Then
			return this.inst.get()
				.then(() => false, () => true)
				.then(success => assert.isOk(success, "Invalid url should not be resolved."));
		});

		it("should fails to getwhen url is invalid#2", function() {
			let inst = new ImageLoader("https://invalidurl.png");

			expect(inst).to.be.exist;

			return new Promise((res, rej) => {
				setTimeout(() => {
					inst.get().then(rej, res);
				}, 100);
			});
		});

		/**
		 * Does this test has meaning ? because is is guaranteed by promise.
		 */
		it("should not call again", function() {
			let countCb1 = 0;
			let countCb2 = 0;
			this.inst = new ImageLoader("./images/PanoViewer/waterpark_preview.jpg");

			expect(this.inst).to.be.exist;

			function callback1() {
				console.log("callback1");
				countCb1++;
			}

			function callback2() {
				console.log("callback2");
				countCb2++;
			}

			// When
			return this.inst.get()
				.then(callback1)
				.then(() => this.inst.get())
				.then(callback2)
				.then(() => this.inst.get())
				.then(() => {
					// Then
					assert.equal(countCb1, 1);
					assert.equal(countCb2, 1);
				});
		});
	});

	describe("#set", function() {
		it("should set image by set()", () => {
			// Given
			// When
			this.inst = new ImageLoader();
			this.inst.set("./images/PanoViewer/waterpark_preview.jpg");

			return this.inst.get().then(img => {
				assert.isOk(img.complete);
			});
		});

		it("should set status loading if image is not loaded", () => {
			// Given && When
			const imgObj = new Image();
			const inst = new ImageLoader(imgObj); // image is not loaded.

			// Then
			expect(inst.getStatus()).to.be.equal(ImageLoader.STATUS.LOADING); // 2 is LOADING status
		});

		it("should set status loaded if image is already loaded", done => {
			// Given && When
			let inst;
			const imgObj = new Image();

			imgObj.onload = function() {
				// image is loaded.
				inst = new ImageLoader(imgObj);

				// Then
				expect(inst.getStatus()).to.be.equal(ImageLoader.STATUS.LOADED); // 2 is LOADED status
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

		it("should remove onceHandler if get() is not done.", () => {
			// Given
			// When
			const inst = new ImageLoader("./images/PanoViewer/only-used-for-destroy-test.png");
			inst.get();
			const prevOnceHandlerCount = inst._onceHandlers.length;

			inst.destroy();
			const currOnceHandlerCount = inst._onceHandlers.length;

			expect(prevOnceHandlerCount).to.be.equal(4); // 4 = 2(getter) + 2(setter)
			expect(currOnceHandlerCount).to.be.equal(0);
		});
	});
});
