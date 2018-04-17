import PanoViewerInjector from "inject-loader!../../../src/PanoViewer/PanoViewer";
import PanoViewer from "../../../src/PanoViewer/PanoViewer";
import PanoImageRenderer from "../../../src/PanoImageRenderer/PanoImageRenderer";
import {ERROR_TYPE, EVENTS} from "../../../src/PanoViewer/consts";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import { YawPitchControl } from "../../../src/YawPitchControl";

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
			cleanup();

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

		IT("should work with video", function(done) {
			// given
			var videlEl = document.createElement("video");
			videlEl.setAttribute("src", "./images/PanoViewer/pano.mp4");
			var readyTriggered = false;

			// when
			panoViewer = new PanoViewer(target, {
				video: videlEl
			}).on("ready", function() {
				readyTriggered = true;
				// then
				expect(readyTriggered).to.be.true;
				done();
			});

		});

		IT("should work with video when src defined after initiate PanoViewer", function(done) {
			// given
			var videlEl = document.createElement("video");
			var readyTriggered = false;
			panoViewer = new PanoViewer(target, {
				video: videlEl
			}).on("ready", function() {
				readyTriggered = true;
				// then
				expect(readyTriggered).to.be.true;
				done();
			});

			// when
			videlEl.setAttribute("src", "./images/PanoViewer/pano.mp4");
		});

		IT("should config cubemap layout", done => {
			// Given
			var MockedPanoViewer = PanoViewerInjector(
				{
					"../PanoImageRenderer": {
						PanoImageRenderer: (function() {
							class WrapedPanoImageRenderer extends PanoImageRenderer {
								constructor(image, width, height, isVideo, sphericalConfig) {
									super(image, width, height, isVideo, sphericalConfig, {
										preserveDrawingBuffer: true,
										antialias: false
									});
								}
							}
							return WrapedPanoImageRenderer;
						})()
					}
				}
            ).default;

			panoViewer = new MockedPanoViewer(target, {
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
			cleanup();

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
			panoViewer.setVideo("./images/PanoViewer/pano.mp4");

			// Then
			panoViewer.on(PanoViewer.EVENTS.READY, e => {
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
			}).on(PanoViewer.EVENTS.READY, e => {
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

	describe("static", function() {
		IT("should isGyroSensorAvailable return false when DeviceMotionEvent not exist.", function(done) {
			// Given
			var MockedPanoViewer = PanoViewerInjector(
				{
					"./browser": {
						DeviceMotionEvent: null
					}
				}
			).default;

			MockedPanoViewer.isGyroSensorAvailable(function(isGyroSensorAvailable) {
				expect(isGyroSensorAvailable).to.be.false;
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
			cleanup();

			if (!panoViewer) {
				return;
			}
			panoViewer.destroy();
			panoViewer = null;
		});

		IT("should set image content", function(done) {
			// Given
			panoViewer = new PanoViewer(target);

			panoViewer.on(PanoViewer.EVENTS.READY, e => {
				// Then
				const image = panoViewer.getImage();
				const projectionType = panoViewer.getProjectionType();

				expect(image).to.not.be.null;
				expect(projectionType).to.equal(PanoViewer.ProjectionType.EQUIRECTANGULAR);
				// expect(e.content).to.equal(image);
				// expect(e.projectionType).to.equal(projectionType);
				// expect(e.isVideo).to.be.false;
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
			panoViewer.once(PanoViewer.EVENTS.READY, evt1 => {
				const prevContentSrc = panoViewer.getImage().src;
				const prevProjectionType = panoViewer.getProjectionType();

				panoViewer.once(PanoViewer.EVENTS.READY, evt2 => {
					const currContentSrc = panoViewer.getImage().src;
					const currProjectionType = panoViewer.getProjectionType();

					// Then
					expect(currContentSrc).to.not.equal(prevContentSrc);
					expect(currProjectionType).to.not.equal(prevProjectionType);

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

	describe("#lookAt", function() {
		let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;
		});

		afterEach(() => {
			cleanup();
		});

		IT("should 'lookAt' works after ready event", done => {
			// Given
			const FIRST_REQ_DIR = {yaw: 10, pitch: 10};
			const SECOND_REQ_DIR = {yaw: 20, pitch: 20};
			const panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});

			// When
			const firstDir = {yaw: panoViewer.getYaw(), pitch:panoViewer.getPitch()};

			panoViewer.lookAt(FIRST_REQ_DIR, 0);
			const dir1 = {yaw: panoViewer.getYaw(), pitch:panoViewer.getPitch()};

			panoViewer.on(PanoViewer.EVENTS.READY, e => {
				panoViewer.lookAt(SECOND_REQ_DIR, 0);
				const dir2 = {yaw: panoViewer.getYaw(), pitch:panoViewer.getPitch()};

				// Then
				expect(dir1.yaw).to.equal(firstDir.yaw);
				expect(dir1.pitch).to.equal(firstDir.pitch);

				expect(dir1.yaw).to.not.equal(FIRST_REQ_DIR.yaw);
				expect(dir1.pitch).to.not.equal(FIRST_REQ_DIR.pitch);

				expect(dir2.yaw).to.equal(SECOND_REQ_DIR.yaw);
				expect(dir2.pitch).to.equal(SECOND_REQ_DIR.pitch);

				panoViewer.destroy();
				done();
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
			cleanup();

			if (!panoViewer) {
				return;
			}
			panoViewer.destroy();
			panoViewer = null;
		});

		IT("Should have isTrusted value true when trigged by user interaction", done => {
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

		IT("Should have isTrusted value false when trigged by javascript api", done => {
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
			cleanup();

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
				PanoViewer.EVENTS.READY
			];

			startEventLogTest(order, done);
		});
	});

	describe("Touch Direction Test", () => {
		let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div"></div>`;
		});

		afterEach(() => {
			cleanup();
		});

		IT("should set touchDirection as TOUCH_DIRECTION.ALL by default", () => {
			let panoViewer = new PanoViewer(target);

			expect(panoViewer.getTouchDirection()).to.be.equal(PanoViewer.TOUCH_DIRECTION.ALL);
			panoViewer.destroy();
		});

		IT("should set touchDirection by constructor", () => {
			const expectList = [
				PanoViewer.TOUCH_DIRECTION.NONE,
				PanoViewer.TOUCH_DIRECTION.YAW,
				PanoViewer.TOUCH_DIRECTION.PITCH,
				PanoViewer.TOUCH_DIRECTION.ALL
			];

			expectList.forEach(expectDir => {
				let panoViewer = new PanoViewer(target, {
					touchDirection: expectDir
				});

				expect(panoViewer.getTouchDirection()).to.be.equal(expectDir);
				panoViewer.destroy();
			})
		});

		IT("should set touchDirection by setTouchDirection", () => {
			const expectList = [
				PanoViewer.TOUCH_DIRECTION.NONE,
				PanoViewer.TOUCH_DIRECTION.YAW,
				PanoViewer.TOUCH_DIRECTION.PITCH,
				PanoViewer.TOUCH_DIRECTION.ALL
			];

			expectList.forEach(expectDir => {
				let panoViewer = new PanoViewer(target);
				panoViewer.setTouchDirection(expectDir);

				expect(panoViewer.getTouchDirection()).to.be.equal(expectDir);
				panoViewer.destroy();
			});
		});

		IT("should not set touchDirection if invalid direction(constructor)", () => {
			const exceptionList = [
				7,
				3,
				0,
				8
			];

			exceptionList.forEach(expectDir => {
				let panoViewer = new PanoViewer(target, {
					touchDirection: expectDir
				});

				expect(panoViewer.getTouchDirection()).to.be.equal(PanoViewer.TOUCH_DIRECTION.ALL);
				panoViewer.destroy();
			})
		});

		IT("should not set touchDirection if invalid direction(setTouchDirection)", () => {
			const exceptionList = [
				7,
				3,
				0,
				8
			];

			exceptionList.forEach(expectDir => {
				let panoViewer = new PanoViewer(target);
				panoViewer.setTouchDirection(expectDir);

				expect(panoViewer.getTouchDirection()).to.be.equal(PanoViewer.TOUCH_DIRECTION.ALL);
				panoViewer.destroy();
			})
		});
	});

	describe("Return value of setter", function() {
		IT("should return instance of PanoViewer when setter is called.", () => {
			// Given
			let target;
			let panoViewer;
			let returnValues = [];

			target = sandbox();
			target.innerHTML = `<div"></div>`;
			panoViewer = new PanoViewer(target);

			// When
			returnValues.push(panoViewer.keepUpdate(false));
			returnValues.push(panoViewer.setGyroMode("VR"));
			returnValues.push(panoViewer.setFovRange([40, 50]));
			returnValues.push(panoViewer.updateViewportDimensions());
			returnValues.push(panoViewer.setYawRange([-40, 40]));
			returnValues.push(panoViewer.setPitchRange([-40, 40]));
			returnValues.push(panoViewer.setShowPolePoint(false));
			returnValues.push(panoViewer.setUseKeyboard(false));
			returnValues.push(panoViewer.setUseZoom(false));
			returnValues.push(panoViewer.lookAt());
			returnValues.push(panoViewer.setTouchDirection(PanoViewer.TOUCH_DIRECTION.NONE));
			returnValues.push(panoViewer.destroy());

			// Then
			const foundIndex = returnValues.findIndex(ret => ret instanceof PanoViewer === false);
			expect(foundIndex).to.be.equal(-1);

			cleanup();
		});
	});
});
