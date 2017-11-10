import VideoLoader from "../../../src/PanoImageRenderer/VideoLoader";

describe("VideoLoader", function() {
	describe("#constructor", function() {
		it("Instance", (done) => {
			// Given
			// When
			this.inst = new VideoLoader();

			// Then
			expect(this.inst).to.be.exist;
			this.inst.get()
				.then(() => {
					assert(false);
					done();
				})
				.catch(() => {
					assert(true);
					done();
				})
		});

		it("should set video as a url", function(done) {
			this.inst = new VideoLoader("./images/PanoViewer/pano.webm");

			expect(this.inst).to.be.exist;
			this.inst.get().then(video => {
				assert.isOk(video);
				assert.isTrue(video instanceof HTMLVideoElement);
				done();
			});
		});

		it("should set video as a video tag", function(done) {
			const video = document.createElement("video");

			video.src = "./images/PanoViewer/pano.webm";
			this.inst = new VideoLoader(video);

			expect(this.inst).to.be.exist;
			this.inst.get().then(video => {
				assert.isOk(video);
				assert.isTrue(video instanceof HTMLVideoElement);
				done();
			});
		});

		it("should fails when url is invalid#1", function(done) {
			this.inst = new VideoLoader("https://invalidurl.png");

			expect(this.inst).to.be.exist;
			this.inst.get().then(null, (msg)=> {
					console.log(msg);
					done();
				});
		});

		it("should fails when url is invalid#2", function(done) {
			this.inst = new VideoLoader("https://invalidurl.png");

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
			this.inst = new VideoLoader();

			return this.inst.set("./images/PanoViewer/pano.webm")
				.then(video => {
					// First Then
					expect(video instanceof HTMLVideoElement).to.be.true;

					// Next Given && When
					const v = document.createElement("video");

					v.src = "./images/PanoViewer/pano.webm";
					return this.inst.set(v)
				})
				.then(video => {
					expect(video instanceof HTMLVideoElement).to.be.true;
				});
		});

		it("should destroy video instance if no parameter", () => {
			// Given & When
			this.inst = new VideoLoader("./images/PanoViewer/pano.webm");

			return this.inst.get()
				.then(video => {
					expect(video instanceof HTMLVideoElement);
					return this.inst.set();
				})
				.then(video => {
					expect(false, "this code should not be called.").to.be.true;
				}, msg => {
					expect(true, "no parameter triggers reject.").to.be.true;
				});
		});
	});

	describe("#destroy", function() {
		it("should destroy video instance", () => {
			// Given & When
			this.inst = new VideoLoader("./images/PanoViewer/pano.webm");

			return this.inst.get()
				.then(video => {
					expect(video instanceof HTMLVideoElement);
					return this.inst.set();
				})
				.then(video => {
					expect(false, "this code should not be called.").to.be.true;
				}, msg => {
					expect(true, "no parameter triggers reject.").to.be.true;
				});
		});
	});
});