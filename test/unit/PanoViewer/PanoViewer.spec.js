import PanoViewer from "../../../src/PanoViewer/PanoViewer";
import {ERROR_TYPE, EVENTS} from "../../../src/PanoViewer/consts";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
function promiseFactory(inst, yaw, pitch, fov, answerFile, threshold = 2) {
	return new Promise(res => {
		// When
		inst.lookAt({
			yaw, pitch, fov
		}, 0);

		// Then
		compare(answerFile, inst._photoSphereRenderer.canvas, (pct, data) => {
			expect(pct).to.be.below(threshold);
			res();
		});
	});
}

function renderAndCompareSequentially(inst, tests) {
	return new Promise(res => {
		tests.reduce(
			(promiseChain, currentTask) => promiseChain.then(() => promiseFactory(inst, ...currentTask)
		)
		, Promise.resolve([])).then(() => {
			res();
		});
	});
}

describe("PanoViewer", function() {
	let IT = WebGLUtils.isWebGLAvailable() ? it : it.skip;
	const deviceRatio = window.devicePixelRatio;
	const suffix = `_${deviceRatio}x.png`;

	describe("constructor", function() {
		let target;
		let panoViewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		afterEach(() => {
			if (!panoViewer) {
				return;
			}
			panoViewer.destroy();
			panoViewer = null;
		});

		/** No more valid test. because we will allow no image/video */
		// IT("should use one resource (image or video) property #1 (no proerpty used)", function(done) {
		// 	panoViewer = new PanoViewer(target);
		// 	panoViewer.on(EVENTS.ERROR, e => {
		// 		if (e.type === ERROR_TYPE.INVALID_RESOURCE) {
		// 			done();
		// 		}
		// 	});
		// });

		IT("should use one resource (image or video) property #2 (both property used)", function(done) {
			panoViewer = new PanoViewer(target, {
				image: "imageurl-or-imagetag-or-imageobj",
				video: "videotag"
			});
			panoViewer.on(EVENTS.ERROR, e => {
				if (e.type === ERROR_TYPE.INVALID_RESOURCE) {
					done();
				}
			});
		});

		IT("should recognize image is not video", function() {
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});
			expect(panoViewer.getVideo()).to.be.null;
		});

		IT("should config cubemap layout", done => {
			// Given
			panoViewer = new PanoViewer(target, {
				projectionType: "cubemap",
				width: 200,
				height: 200,
				showPolePoint: true,
				image: "./images/test_cube_1x6_naver.jpg",
				cubemapConfig: {
					tileConfig: {flipHorizontal: true, rotation: 0}
				}
			});

			// When
			panoViewer.on("ready", when);

			function when() {
				// Then
				renderAndCompareSequentially(
					panoViewer,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, 2],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, 2],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, 2],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, 2],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, 2],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, 2]
					]
				).then(() => {
					done();
				});
			}
		});
	});

	describe("#setVideo/getVideo", function() {
		let target;
		let panoViewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;
		});

		afterEach(() => {
			if (!panoViewer) {
				return;
			}
			panoViewer.destroy();
			panoViewer = null;
		});

		IT("should set video content", function(done) {
			// Given
			panoViewer = new PanoViewer(target);

			// When
			panoViewer.setVideo("./images/PanoViewer/pano.webm");

			// Then
			panoViewer.on(PanoViewer.EVENTS.CONTENT_LOADED, e => {
				const video = panoViewer.getVideo();
				const projectionType = panoViewer.getProjectionType();

				expect(video).to.not.be.null;
				expect(projectionType).to.equal(PanoViewer.ProjectionType.EQUIRECTANGULAR);
				done();
			});

			panoViewer.on(PanoViewer.EVENTS.ERROR, e => {
				assert.isOk(false, "Error event occurs");
				done();
			});
		});

		IT("should not set different content type and should persist previous status", function(done) {
			// Given
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			}).on(PanoViewer.EVENTS.CONTENT_LOADED, e => {
				const image = panoViewer.getImage();

				// When
				panoViewer.setVideo("./images/PanoViewer/pano.webm");

				// Then
				expect(image).be.not.null;
				expect(panoViewer.getVideo()).be.null; // not change to video
				expect(panoViewer.getImage()).be.not.null; // persist previous status.
				done();
			});
		});
	});

	describe("#setImage/getImage", function() {
		let target;
		let panoViewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;
		});

		afterEach(() => {
			if (!panoViewer) {
				return;
			}
			panoViewer.destroy();
			panoViewer = null;
		});

		IT("should set image content", function(done) {
			// Given
			panoViewer = new PanoViewer(target);

			panoViewer.on(PanoViewer.EVENTS.CONTENT_LOADED, e => {
				// Then
				const image = panoViewer.getImage();
				const projectionType = panoViewer.getProjectionType();

				expect(image).to.not.be.null;
				expect(projectionType).to.equal(PanoViewer.ProjectionType.EQUIRECTANGULAR);
				expect(e.content).to.equal(image);
				expect(e.projectionType).to.equal(projectionType);
				expect(e.isVideo).to.be.false;
				done();
			});

			panoViewer.on(PanoViewer.EVENTS.ERROR, e => {
				// Then
				assert.isOk(false, "Error event occurs");
				done();
			});

			// When
			panoViewer.setImage("./images/test_equi.png");
		});

		// Currently not available
		IT("should replace image of other projection type", function(done) {
			// Given
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});

			// first `onContentLoad` event is for image specified in constructor.
			panoViewer.once(PanoViewer.EVENTS.CONTENT_LOADED, evt1 => {
				const prevContentSrc = evt1.content.src;
				const prevProjectionType = evt1.projectionType;

				panoViewer.once(PanoViewer.EVENTS.CONTENT_LOADED, evt2 => {
					// Then
					expect(evt2.content.src).to.not.equal(prevContentSrc);
					expect(evt2.projectionType).to.not.equal(prevProjectionType);

					done();
				});

				// When
				// Change image of other projection type.
				panoViewer.setImage("./images/glasscity_cube_1024.jpg", {
					projectionType: PanoViewer.ProjectionType.CUBEMAP
				});
			});
		});
	});

	describe("viewChange event", function() {
		let target;
		let panoViewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;
		});

		afterEach(() => {
			if (!panoViewer) {
				return;
			}
			panoViewer.destroy();
			panoViewer = null;
		});

		it("Should have isTrusted value true when trigged by user interaction", done => {
			// Given
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});
			let isTrustedOnChange = null;

			panoViewer.on("ready", () => {
				panoViewer.on("viewChange", e => {
					isTrustedOnChange = e.isTrusted;
				});
	
				// When
				Simulator.gestures.pan(target, { // this.el 이 300 * 300 이라고 가정
					pos: [30, 30],
					deltaX: 10,
					deltaY: 10,
					duration: 1000,
					easing: "linear"
				}, () => {
					// Then
					expect(isTrustedOnChange).to.be.true;
					done();
				});
			});
		});

		it("Should have isTrusted value false when trigged by javascript api", done => {
			// Given
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});
			let isTrustedOnChange = null;

			panoViewer.on("ready", () => {
				panoViewer.on("viewChange", e => {
					isTrustedOnChange = e.isTrusted;
				});

				panoViewer.on("animationEnd", then);

				// When
				panoViewer.lookAt({
					yaw: 20
				}, 1000);

				function then(e) {
				// Then
					expect(isTrustedOnChange).to.be.false;
					done();
				}
			});
		});
	});

	describe("event flow", function() {
		let target;
		let photo360Viewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		afterEach(() => {
			if (!photo360Viewer) {
				return;
			}
			photo360Viewer.destroy();
			photo360Viewer = null;
		});

		function startEventLogTest(order, done, callback) {
			let orderIndex = 0;

			photo360Viewer = new PanoViewer(target, {
				image: "/images/book_equi_1.jpg"
			}).on({
				"ready": eventLogger,
				"viewChange": eventLogger,
				"animationEnd": eventLogger,
				"contentLoaded": eventLogger,
				"error": eventLogger
			});

			function eventLogger(event) {
				console.log(`=======================[${orderIndex}] ${event.eventType}========================`);
				// makes callback aync not to block following flow.
				callback && setTimeout(() => {
					callback(event);
				}, 0);

				console.log("before orderIndex", orderIndex);
				if (event.eventType !== order[orderIndex++]) {
					done(new Error(`event order is invalid. Current(${event.eventType}), Expected(${order[orderIndex - 1]})`));
					return;
				}
				console.log("orderIndex increase", orderIndex);
				// orderIndex = orderIndex + 1;

				if (orderIndex === order.length) {
					done();
				}
			}
		}

		IT("should follow event order on create", function(done) {
			var order = [
				PanoViewer.EVENTS.CONTENT_LOADED,
				PanoViewer.EVENTS.READY
			];

			startEventLogTest(order, done);
		});
	});
});
