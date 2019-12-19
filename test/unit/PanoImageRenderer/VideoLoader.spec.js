import {expect, assert} from "chai";
import VideoLoader from "../../../src/PanoImageRenderer/VideoLoader";

let inst;

describe("VideoLoader", () => {
	describe("#constructor", () => {
		it("Instance", () => {
			// Given
			// When
			inst = new VideoLoader();

			// Then
			expect(inst).to.be.exist;
			return inst.get()
				.then(() => {
					assert(false, "No resource should not trigger resolve.");
				})
				.catch(() => {
					assert(true);
				});
		});

		it("should set video as a url", () => {
			// Given && When
			inst = new VideoLoader("./images/PanoViewer/pano.mp4");

			expect(inst).to.be.exist;

			// Then
			return inst.get()
				.then(video => {
					assert.isOk(video);
					assert.isTrue(video instanceof HTMLVideoElement);
					assert.isTrue(video.getAttribute("crossorigin") === "anonymous");
					assert.isTrue(video.getAttribute("playsinline") === "");
					assert.isTrue(video.getAttribute("webkit-playsinline") === "");
				}, () => {
					assert.isOk(false, "Failed to load video resource. check URL is valid.");
				});
		});

		it("should set video as a object({type, src})", () => {
			// Given && When
			inst = new VideoLoader({src: "./images/PanoViewer/pano.mp4", type: "video/mp4"});

			expect(inst).to.be.exist;

			// Then
			return inst.get()
				.then(video => {
					assert.isOk(video);
					assert.isTrue(video instanceof HTMLVideoElement);
				}, () => {
					assert.isOk(false, "Failed to load video resource. check URL is valid.");
				});
		});

		it("should set video as a object({src}) although type is not defined.", () => {
			// Given && When
			inst = new VideoLoader({src: "./images/PanoViewer/pano.mp4"});

			expect(inst).to.be.exist;

			// Then
			return inst.get()
				.then(video => {
					assert.isOk(video);
					assert.isTrue(video instanceof HTMLVideoElement);
				}, () => {
					assert.isOk(false, "Failed to load video resource. check URL is valid.");
				});
		});

		it("should set video as mixed({type, src} object & url string)", () => {
			// Given && When
			inst = new VideoLoader(["./images/PanoViewer/pano.webm", {src: "./images/PanoViewer/pano.mp4", type: "video/mp4"}]);

			expect(inst).to.be.exist;

			// Then
			return inst.get()
				.then(video => {
					assert.isOk(video);
					assert.isTrue(video instanceof HTMLVideoElement);
				}, () => {
					assert.isOk(false, "Failed to load video resource. check URL is valid.");
				});
		});

		it("should set video as a video tag", () => {
			const video = document.createElement("video");

			video.src = "./images/PanoViewer/pano.mp4";
			inst = new VideoLoader(video);
			expect(inst).to.be.exist;
			return inst.get()
				.then(videoEl => {
					assert.isOk(videoEl);
					assert.isTrue(videoEl instanceof HTMLVideoElement);
				}, () => {
					assert.isOk(false, "Failed to load video resource. check URL is valid.");
				});
		});

		it("should fail if src is not defined.", () => {
			// Given && When
			inst = new VideoLoader({type: "video/mp4"});

			expect(inst).to.be.exist;

			// Then
			return inst.get()
				.then(() => true, () => false)
				.then(success => {
					assert.isOk(success === false, "Invalid url should trigger promise 'reject'.");
				});
		});

		it("should fails when url is invalid#1", () => {
			inst = new VideoLoader("https://invalidurl.png");

			expect(inst).to.be.exist;
			return inst.get()
				.then(() => false, () => true)
				.then(success => {
					assert.isOk(success, "Invalid url should trigger promise 'reject'.");
				});
		});

		it("should fails to get() after 100ms when url is invalid#2", () => {
			inst = new VideoLoader("https://invalidurl.png");

			expect(inst).to.be.exist;

			return new Promise((res, rej) => {
				setTimeout(() => {
					inst.get().then(rej, res);
				}, 100);
			});
		});

		it("should not call again", () => {
			let countCb1 = 0;
			let countCb2 = 0;

			inst = new VideoLoader("./images/PanoViewer/pano.mp4");

			expect(inst).to.be.exist;

			function callback1() {
				countCb1++;
			}

			function callback2() {
				countCb2++;
			}

			// When
			return inst.get()
				.then(callback1)
				.then(() => inst.get())
				.then(callback2)
				.then(() => inst.get())
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
			inst = new VideoLoader();
			inst.set("./images/PanoViewer/pano.mp4");

			return inst.get()
				.then(video => {
					// First Then
					expect(video instanceof HTMLVideoElement).to.be.true;

					// Next Given && When
					const v = document.createElement("video");

					v.src = "./images/PanoViewer/pano.mp4";
					inst.set(v);
					return inst.get();
				})
				.then(video => {
					expect(video instanceof HTMLVideoElement).to.be.true;
				});
		});

		it("should destroy video instance if set() called with no parameter", () => {
			// Given & When
			inst = new VideoLoader("./images/PanoViewer/pano.mp4");

			return inst.get()
				.then(video => {
					expect(video instanceof HTMLVideoElement);
					// When
					inst.set();

					return inst.get();
				})
				.then(video => {
					expect(false, "this code should not be called.").to.be.true;
				}, msg => {
					expect(true, "no parameter triggers reject.").to.be.true;
				});
		});

		it("should get video without once handler if cached video", () => {
			// Given & When
			const videoEl = document.createElement("video");

			videoEl.src = "./images/PanoViewer/pano.mp4";
			videoEl.load();

			let runAssertion = function(videoElToTest, res, rej) {
				videoElToTest.removeEventListener("loadedmetadata", runAssertion);
				const loader = new VideoLoader(videoElToTest);

				loader.get()
					.then(video => {
						expect(video).to.be.equal(videoEl);// It means that it resolve
						res();
					})
					.catch(rej);
			};

			return new Promise((res, rej) => {
				runAssertion = runAssertion.bind(this, videoEl, res, rej);
				videoEl.addEventListener("loadedmetadata", runAssertion);
				videoEl.addEventListener("error", rej);
			});
		}).timeout(60000);

		it("should set video url as a Array<String>", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				"./images/PanoViewer/pano.webm",
				"./images/PanoViewer/pano.mp4"
			]);

			// Then
			return inst.get().then(video => {
				const els = video.querySelectorAll("source");

				expect(els.length).to.be.eql(2);
			});
		});

		it("should reject when there is only invalid url", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				"https://invalidurl1.png",
				"https://invalidurl2.png",
			]);

			// Then
			return inst.get()
				.then(
					() => false,
					() => true
				);
		});

		it("should set video url if valid & invalid url is mixed", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				"https://invalidurl1.png",
				"https://invalidurl2.png",
				"./images/PanoViewer/pano.mp4",
			]);

			// Then
			return inst.get()
				.then(video => {
					const els = video.querySelectorAll("source");

					expect(els.length).to.be.eql(3);

					return true;
				}, () => false)
				.then(success => {
					expect(success).to.be.equal(true);
				});
		});
		// on iOS safari, there is long delay (over 15s) to video tag trigger error event when source is missing.


		/**
		 * 2017.12.08. For the present, WE SKIP THIS TEST
		 * we changed the spec that getter doesn't reject if error occurs on video source.
		 * Delegate responsibility to user.because User can do advanced handling by video tag.
		 *
		 */
		it.skip("should reject video on getting video if invalid url list is set", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				"https://invalidurl1.png",
				"https://invalidurl2.png",
				"https://invalidurl3.png"
			]);

			// Then
			return inst.get()
				.then(video => true, errMsg => {
					console.log(errMsg); // Log to check if errMsg is ok.
					return false;
				})
				.then(success => {
					expect(success).to.be.equal(false);
				});
		});

		it("should resolve video on getting video if valid url list is set", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				"./images/PanoViewer/pano.webm",
				"./images/PanoViewer/pano.mp4"
			]);

			// Then
			return inst.get()
				.then(video => true, errMsg => false)
				.then(success => {
					expect(success).to.be.equal(true);
				});
		});

		it("should resolve video on getting video if valid url list is set", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				"./images/PanoViewer/pano.webm",
				"./images/PanoViewer/pano.mp4"
			]);

			// Then
			return inst.get()
				.then(video => true, errMsg => false)
				.then(success => {
					expect(success).to.be.equal(true);
				});
		});

		it("should resolve video on getting video if valid object is set", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set({src: "./images/PanoViewer/pano.mp4", type: "video/mp4"});

			// Then
			return inst.get()
				.then(video => true, errMsg => false)
				.then(success => {
					expect(success).to.be.equal(true);
				});
		});

		it("should resolve video on getting video if valid object list is set", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				{src: "./images/PanoViewer/pano.webm", type: "video/webm"},
				{src: "./images/PanoViewer/pano.mp4", type: "video/mp4"}
			]);

			// Then
			return inst.get()
				.then(video => {
					let typeCount = 0;
					const els = video.querySelectorAll("source");

					expect(els.length).to.be.equal(2);
					els.forEach(el => el.type.indexOf("video") >= 0 && typeCount++);
					expect(typeCount).to.be.equal(2);
					return true;
				}, errMsg => false)
				.then(success => {
					expect(success).to.be.equal(true);
				});
		});

		it("should not set type on video if type is not set", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				{src: "./images/PanoViewer/pano.webm", type: "video/webm"},
				{src: "./images/PanoViewer/pano.mp4"}
			]);

			// Then
			return inst.get()
				.then(video => {
					let typeCount = 0;
					const els = video.querySelectorAll("source");

					expect(els.length).to.be.equal(2);
					els.forEach(el => el.type.indexOf("video") >= 0 && typeCount++);
					expect(typeCount).to.be.equal(1);
					return true;
				}, errMsg => false)
				.then(success => {
					expect(success).to.be.equal(true);
				});
		});

		it("should resolve video on getting video if valid object and invalid object is mixed in list", () => {
			// Given
			inst = new VideoLoader();

			// When
			inst.set([
				{},
				"https://invalidurl.mov",
				"",
				{src: "./images/PanoViewer/pano.mp4", type: "video/mp4"}
			]);

			// Then
			const video = inst.getElement();
			const els = video.querySelectorAll("source");

			expect(els.length).to.be.equal(2);
		});

		it("should set video of crossOrigin as anonymous when setting by url", () => {
			// Given
			const videoUrl = "./images/PanoViewer/pano.mp4";

			// When
			const loader = new VideoLoader(videoUrl);

			// Then
			expect(loader.getElement().crossOrigin).to.be.equal("anonymous");
		});
	});

	describe("#getElement", () => {
		it("could get video element after set video by resource path", () => {
			// Given
			const videoPath = "./images/PanoViewer/pano.webm";
			const loader = new VideoLoader(videoPath);

			// When
			const element = loader.getElement();

			// Then

			expect(element.querySelector("source").getAttribute("src")).to.be.equal(videoPath);
		});
		it("could get video element after set video by element", () => {
			// Given
			const videoObj = document.createElement("video");
			const videoPath = "./images/PanoViewer/pano.mp4";

			videoObj.src = videoPath;
			const loader = new VideoLoader(videoObj);

			// When
			const element = loader.getElement();

			// Then
			expect(element.getAttribute("src")).to.be.equal(videoPath);
			expect(element).to.be.equal(videoObj);
		});
	});


	describe("#destroy", () => {
		it("should not crash when destroying VideoLoader with no source.", () => {
			// Given & When
			inst = new VideoLoader();

			inst.destroy();
		});

		it("should destroy video instance", () => {
			// Given & When
			inst = new VideoLoader("./images/PanoViewer/pano.mp4");

			return inst.get()
				.then(video => {
					expect(video instanceof HTMLVideoElement);
					inst.destroy();
					return inst.get();
				})
				.then(video => {
					expect(false, "this code should not be called.").to.be.true;
				}, msg => {
					expect(true, "no parameter triggers reject.").to.be.true;
				});
		});
	});
});
