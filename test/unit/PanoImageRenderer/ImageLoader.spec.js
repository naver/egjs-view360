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

		it("should set multiple images by set()", () => {
			// Given
			// When
			this.inst = new ImageLoader();
			this.inst.set([
				"./images/PanoViewer/waterpark_preview.jpg",
				"./images/PanoViewer/waterpark_cube_1024.jpg"
			]);

			return this.inst.get().then(imgs => {
				imgs.forEach(img => {
					assert.isOk(img.complete);
				});
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

		it("should set image of crossOrigin as anonymous when setting by url", () => {
			// Given
			const imgUrl = "./images/PanoViewer/waterpark_preview.jpg";

			// When
			let inst = new ImageLoader(imgUrl);

			// Then
			expect(inst.getElement().crossOrigin).to.be.equal("anonymous");
		});
	});

	describe("#getElement", function() {
		it("could get image element after set image by resource path", () => {
			// Given
			const imagePath = "./images/PanoViewer/waterpark_preview.jpg";
			const inst = new ImageLoader(imagePath);

			// When
			const element = inst.getElement();

			// Then
			expect(element.getAttribute("src")).to.be.equal(imagePath);
		});

		it("could get image element after set image by element", () => {
			// Given
			const imgObj = new Image();
			const imagePath = "./images/PanoViewer/waterpark_preview.jpg";

			imgObj.src = imagePath;
			const inst = new ImageLoader(imgObj);

			// When
			const element = inst.getElement();

			// Then
			expect(element.getAttribute("src")).to.be.equal(imagePath);
			expect(element).to.be.equal(imgObj);
		});

		it("could get image elements after set images by url", () => {
			// Given
			const imgObj = new Image();
			const imagePath = "./images/PanoViewer/waterpark_preview.jpg";

			imgObj.src = imagePath;
			const inst = new ImageLoader([
				imagePath,
				imagePath
			]);

			// When
			const element = inst.getElement();

			// Then
			expect(element.length).to.be.equal(2);
			expect(element[0].getAttribute("src")).to.be.equal(imagePath);
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
						assert.isOk(img instanceof Image);
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


		it("should reject image object with a invalid source url", done => {
			// Given
			const imgObj = new Image();
			imgObj.src = "./images/PanoViewer/does_not_exist.jpg";
			const inst = new ImageLoader(imgObj);

			// When	
			inst.get()
				.then(
					() => {},
					() => {
						// Then
						expect(true).to.be.true;
						done();
					}
				);
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

	describe("#onceLoaded", function() {
		it("should work with single image", (done) => {
			// Given
			const inst = new ImageLoader();
			const image = new Image();
			image.src = "./images/PanoViewer/waterpark_preview.jpg";

			// When
			inst.onceLoaded(image, function (img) {
				// Then
				const srcToken = img.src.split("/");

				expect(srcToken[srcToken.length - 1]).to.be.equal("waterpark_preview.jpg");
				expect(ImageLoader.isMaybeLoaded(img)).to.be.true;
				done();
			});
		});
		it("should call error handler when not loaded with single image", (done) => {
			// Given
			const inst = new ImageLoader();

			// When
			const image = new Image();
			image.src = "./images/PanoViewer/not-exist.png";


			inst.onceLoaded(image, function() {}, function(img) {
				// Then
				const srcToken = img.src.split("/");
				expect(srcToken[srcToken.length - 1]).to.be.equal("not-exist.png");
				expect(ImageLoader.isMaybeLoaded(img)).to.be.false;
				done();
			});
		});
		it("should work with multiple image", (done) => {
			// Given
			const inst = new ImageLoader();
			const image1 = new Image();
			const image2 = new Image();
			image1.src = "./images/PanoViewer/waterpark_preview.jpg";
			image2.src = "./images/PanoViewer/waterpark_preview.jpg";

			// When
			inst.onceLoaded([image1, image2], function(imgs) {
				// Then
				let srcToken1 = imgs[0].src.split("/");
				srcToken1 = srcToken1[srcToken1.length - 1];
				let srcToken2 = imgs[1].src.split("/");
				srcToken2 = srcToken2[srcToken2.length - 1];
				expect(srcToken1).to.be.equal("waterpark_preview.jpg");
				expect(ImageLoader.isMaybeLoaded(imgs[0])).to.be.true;
				expect(srcToken2).to.be.equal("waterpark_preview.jpg");
				expect(ImageLoader.isMaybeLoaded(imgs[1])).to.be.true;
				done();
			});
		});
		it("should call error handler when not loaded with multiple image", (done) => {
			// Given
			const inst = new ImageLoader();
			const image1 = new Image();
			const image2 = new Image();
			image1.src = "./images/PanoViewer/waterpark_preview.jpg";
			image2.src = "./images/PanoViewer/not-exist.png";


			// When
			inst.onceLoaded([image1, image2], () => {}, function(img2) {
				// Then
				let srcToken = img2.src.split("/");
				srcToken = srcToken[srcToken.length - 1];
				expect(srcToken).to.be.equal("not-exist.png");
				expect(ImageLoader.isMaybeLoaded(img2)).to.be.false;
				done();
			});
		});
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

			expect(prevOnceHandlerCount).to.be.equal(2); // 2(setter)
			expect(currOnceHandlerCount).to.be.equal(0);
		});
	});

	describe("static", function() {
		describe("#isMaybeLoaded", function() {
			it("should work with single image", (done) => {
				// Given
				// When
				const image = new Image();
				image.src = "./images/PanoViewer/waterpark_preview.jpg";

				image.onload = function() {
					expect(ImageLoader.isMaybeLoaded([image])).to.be.true;
					done();
				};
			});
			it("should return false when not loaded with single image", (done) => {
				// Given
				// When
				const image = new Image();
				image.src = "./images/PanoViewer/not-exist.png";

				image.onerror = function() {
					expect(ImageLoader.isMaybeLoaded([image])).to.be.false;
					done();
				};
			});
			it("should work with multiple image", (done) => {
				// Given
				const image1 = new Image();
				const image2 = new Image();				

				const p1 = new Promise((res, rej) => {
					image1.onload = function() {
						res();
					};
					image1.error = function() {
						rej();
					};
				});
				const p2 = new Promise((res, rej) => {
					image2.onload = function() {
						res();
					};
					image2.error = function() {
						rej();
					};
				});

				// When
				image1.src = "./images/PanoViewer/waterpark_preview.jpg";
				image2.src = "./images/PanoViewer/waterpark_preview.jpg";
				Promise.all([p1, p2]).then(result => {
					// Then
					expect(ImageLoader.isMaybeLoaded([image1, image2])).to.be.true;
					done();
				});
			});
			it("should return false when not loaded with multiple image", done => {
				// Given
				const image1 = new Image();
				const image2 = new Image();
				const p1 = new Promise((res, rej) => {
					image1.onload = function() {
						res();
					};
					image1.onerror = function() {
						rej();
					};
				});
				const p2 = new Promise((res, rej) => {
					image2.onload = function() {
						res();
					};
					image2.onerror = function() {
						rej();
					};
				});

				// When
				image1.src = "./images/PanoViewer/waterpark_preview.jpg";
				image2.src = "./images/PanoViewer/not-exist.png";
				Promise.all([p1, p2]).then(result => {}, reason => {
					// Then
					expect(ImageLoader.isMaybeLoaded([image1, image2])).to.be.false;
					done();
				});
			});
		});

		describe("#createElement", function() {
			it("should work with single image object", () => {
				// Given
				const image = new Image();
				image.src = "./images/PanoViewer/waterpark_preview.jpg";

				// When
				const element = ImageLoader.createElement(image)[0];

				// Then
				let srcToken = element.src.split("/");
				srcToken = srcToken[srcToken.length - 1];
				expect(element instanceof Image).to.be.true;
				expect(srcToken).to.be.equal("waterpark_preview.jpg");
			});
			it("should work with single image url", () => {
				// Given
				const imageUrl = "./images/PanoViewer/waterpark_preview.jpg";

				// When
				const element = ImageLoader.createElement(imageUrl)[0];

				// Then
				let srcToken = element.src.split("/");
				srcToken = srcToken[srcToken.length - 1];
				expect(element instanceof Image).to.be.true;
				expect(srcToken).to.be.equal("waterpark_preview.jpg");
			});
			it("should work with multiple image object", () => {
				// Given
				const image1 = new Image();
				const image2 = new Image();
				image1.src = "./images/PanoViewer/waterpark_preview.jpg";
				image2.src = "./images/PanoViewer/waterpark_preview.jpg";

				// When
				const element = ImageLoader.createElement([image1, image2]);

				// Then
				element.forEach(elm => {
					let srcToken = elm.src.split("/");
					srcToken = srcToken[srcToken.length - 1];
					expect(elm instanceof Image).to.be.true;
					expect(srcToken).to.be.equal("waterpark_preview.jpg");
				});
			});
			it("should work with multiple image url", () => {
				// Given
				const image1 = new Image();
				const image2 = new Image();
				image1.src = "./images/PanoViewer/waterpark_preview.jpg";
				image2.src = "./images/PanoViewer/waterpark_preview.jpg";

				// When
				const element = ImageLoader.createElement([image1, image2]);

				// Then
				element.forEach(elm => {
					let srcToken = elm.src.split("/");
					srcToken = srcToken[srcToken.length - 1];
					expect(elm instanceof Image).to.be.true;
					expect(srcToken).to.be.equal("waterpark_preview.jpg");
				});
			});
		});
	});
});
