import VideoLoader from "../../../src/PanoImageRenderer/VideoLoader";

describe("VideoLoader", function() {
	describe("#constructor", function() {
		it("Instance", () => {
			// Given
			// When
			this.inst = new VideoLoader();

			// Then
			expect(this.inst).to.be.exist;
			return this.inst.get()
				.then(() => {
					assert(false, "No resource should not trigger resolve.");
				})
				.catch(() => {
					assert(true);
				})
		});

		it("should set video as a url", function() {
			// Given && When
			this.inst = new VideoLoader("./images/PanoViewer/pano.webm");

			expect(this.inst).to.be.exist;

			// Then
			return this.inst.get()
				.then(video => {
					assert.isOk(video);
					assert.isTrue(video instanceof HTMLVideoElement);
				}, () => {
					assert.isOk(false, "Failed to load video resource. check URL is valid.");
				});
		});

		it("should set video as a video tag", function() {
			const video = document.createElement("video");

			video.src = "./images/PanoViewer/pano.webm";
			this.inst = new VideoLoader(video);

			expect(this.inst).to.be.exist;
			return this.inst.get()
				.then(video => {
					assert.isOk(video);
					assert.isTrue(video instanceof HTMLVideoElement);
				}, () => {
					assert.isOk(false, "Failed to load video resource. check URL is valid.");
				});
		});

		it("should fails when url is invalid#1", function() {
			this.inst = new VideoLoader("https://invalidurl.png");

			expect(this.inst).to.be.exist;
			return this.inst.get()
				.then(() => false, () => true)
				.then(success => {
					assert.isOk(success, "Invalid url should trigger promise 'reject'.");
				});
		});

		it("should fails to get() after 100ms when url is invalid#2", function() {
			this.inst = new VideoLoader("https://invalidurl.png");

			expect(this.inst).to.be.exist;

			return new Promise((res, rej) => {
				setTimeout(() => {
					this.inst.get().then(rej, res);
				}, 100);
			});
		});

		it("should not call again", function() {
			let countCb1 = 0;
			let countCb2 = 0;
			this.inst = new VideoLoader("./images/PanoViewer/pano.webm");

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

	describe("#set/get", function() {
		it("should be available to get/set sequentially", () => {
			// Given
			// When
			this.inst = new VideoLoader();
			this.inst.set("./images/PanoViewer/pano.webm");

			return this.inst.get()
				.then(video => {
					// First Then
					expect(video instanceof HTMLVideoElement).to.be.true;

					// Next Given && When
					const v = document.createElement("video");

					v.src = "./images/PanoViewer/pano.webm";
					this.inst.set(v);
					return this.inst.get();
				})
				.then(video => {
					expect(video instanceof HTMLVideoElement).to.be.true;
				});
		});

		it("should destroy video instance if set() called with no parameter", () => {
			// Given & When
			this.inst = new VideoLoader("./images/PanoViewer/pano.webm");

			return this.inst.get()
				.then(video => {
					expect(video instanceof HTMLVideoElement);
					// When
					this.inst.set();

					return this.inst.get();
				})
				.then(video => {
					expect(false, "this code should not be called.").to.be.true;
				}, msg => {
					expect(true, "no parameter triggers reject.").to.be.true;
				});
		});

		it("should get video without once handler if cached video", () => {
			// Given & When
			let videoEl = document.createElement("video");
			videoEl.src = "./images/PanoViewer/pano.webm";

			return new Promise((res, rej) => {
				videoEl.addEventListener("canplaythrough", () => {
					const loader = new VideoLoader(videoEl);

					loader.get()
						.then(video => {
							expect(video).to.be.equal(videoEl);// It means that it resolve
							res();
						})
						.catch(rej);
				});

				videoEl.addEventListener("error", rej);
			});


		});
	});

	describe("#destroy", function() {
		it("should not crash when destroying VideoLoader with no source.", () => {
			// Given & When
			this.inst = new VideoLoader();

			this.inst.destroy();
		});

		it("should destroy video instance", () => {
			// Given & When
			this.inst = new VideoLoader("./images/PanoViewer/pano.webm");

			return this.inst.get()
				.then(video => {
					expect(video instanceof HTMLVideoElement);
					this.inst.destroy();
					return this.inst.get();
				})
				.then(video => {
					expect(false, "this code should not be called.").to.be.true;
				}, msg => {
					expect(true, "no parameter triggers reject.").to.be.true;
				});
		});
	});
});
