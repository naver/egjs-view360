import {expect, assert} from "chai";
import sinon from "sinon";
import PanoViewerInjector from "inject-loader!../../../src/PanoViewer/PanoViewer"; // eslint-disable-line import/no-duplicates
import WebglUtilsInjector from "inject-loader!../../../src/PanoImageRenderer/WebGLUtils"; // eslint-disable-line import/no-duplicates
import PanoViewer from "../../../src/PanoViewer/PanoViewer"; // eslint-disable-line import/no-duplicates
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils"; // eslint-disable-line import/no-duplicates
import {compare, createPanoViewerForRenderingTest, sandbox, cleanup} from "../util";
import {ERROR_TYPE, PANOVIEWER_EVENTS as EVENTS} from "../../../src/PanoViewer/consts";

function promiseFactory(inst, yaw, pitch, fov, answerFile, threshold = 2) {
	return new Promise(res => {
		// When
		inst.lookAt({
			yaw, pitch, fov
		}, 0);

    // Then
    window.requestAnimationFrame(() => {
      compare(answerFile, inst._photoSphereRenderer.canvas, (pct, data) => {
        expect(pct).to.be.below(threshold);
        res();
      });
    })
	});
}

function renderAndCompareSequentially(inst, tests) {
	return new Promise(res => {
		tests.reduce(
			(promiseChain, currentTask) => promiseChain.then(() => promiseFactory(inst, ...currentTask)
			), Promise.resolve([])).then(res);
	});
}

describe("PanoViewer", () => {
	const IT = WebGLUtils.isWebGLAvailable() ? it : it.skip;
	const deviceRatio = window.devicePixelRatio;
	const suffix = `_${deviceRatio}x.png`;

	/**
	 * Function Test
	 */
	describe("constructor", () => {
		let target;
		let panoViewer;

		beforeEach(() => {
			target = sandbox();
      target.innerHTML = `<div></div>`;
      target.style.width = "2000px";
			target.style.height = "2000px";
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

		IT("should use one resource (image or video) property #2 (both property used)", done => {
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

		IT("should recognize image is not video", () => {
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});
			expect(panoViewer.getVideo()).to.be.null;
		});

		IT("should work with video", done => {
			// given
			const videlEl = document.createElement("video");
			let readyTriggered = false;

			videlEl.setAttribute("src", "./images/PanoViewer/pano.mp4");

			// when
			panoViewer = new PanoViewer(target, {
				video: videlEl
			}).on("ready", () => {
				readyTriggered = true;
				// then
				expect(readyTriggered).to.be.true;
				done();
			});
		});

		IT("should work with video when src defined after initiate PanoViewer", done => {
			// given
			const videlEl = document.createElement("video");
			let readyTriggered = false;

			panoViewer = new PanoViewer(target, {
				video: videlEl
			}).on("ready", () => {
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
			panoViewer = createPanoViewerForRenderingTest(target, {
				projectionType: "cubemap",
				showPolePoint: true,
        image: "./images/test_cube_1x6_naver.jpg",
				cubemapConfig: {
					tileConfig: {flipHorizontal: true, rotation: 0}
				}
      });

			// When
			panoViewer.on("ready", () => {
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
			});
		});
	});

	describe("#setVideo/getVideo", () => {
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

		IT("should set video content", done => {
			// Given
			panoViewer = new PanoViewer(target);

			// When
			panoViewer.setVideo("./images/PanoViewer/pano.mp4");

			// Then
			panoViewer.on(PanoViewer.EVENTS.READY, e => {
				const video = panoViewer.getVideo();
				const projectionType = panoViewer.getProjectionType();

				expect(video).to.not.be.null;
				expect(panoViewer.getImage()).to.be.null;
				expect(projectionType).to.equal(PanoViewer.ProjectionType.EQUIRECTANGULAR);
				done();
			});

			panoViewer.on(PanoViewer.EVENTS.ERROR, e => {
				assert.isOk(false, "Error event occurs");
				done();
			});
		});

		IT("should not set different content type and should persist previous status", done => {
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

	describe("static", () => {
		IT("should isGyroSensorAvailable return false when DeviceMotionEvent not exist.", done => {
			// Given
			const MockedPanoViewer = PanoViewerInjector({
				"../utils/browserFeature": {
					DeviceMotionEvent: null
				}
			}).default;

			MockedPanoViewer.isGyroSensorAvailable(isGyroSensorAvailable => {
				expect(isGyroSensorAvailable).to.be.false;
				done();
			});
		});

		IT("#isSupported", () => {
			const stableBrowsers = [
				{os: {name: "android", version: "6"}, browser: {name: "chrome"}},
				{os: {name: "android", version: "4.4"}, browser: {name: "chrome"}},
				{os: {name: "ios", version: "9"}, browser: {name: "safari"}}
			];

			const unstableBrowsers = [
				{os: {name: "android", version: "4.3", majorVersion: 4}, browser: {name: "chrome"}},
				{os: {name: "android", version: "4.4", majorVersion: 4}, browser: {name: "samsung internet"}}
			];

			const isAvailable = browserList => browserList.map(agentInfo => {
				// Given
				const MockWebglUtils = WebglUtilsInjector({
					"@egjs/agent": () => agentInfo
				}).default;

				// Given
				const MockedPanoViewer = PanoViewerInjector({
					"../PanoImageRenderer/WebGLUtils": MockWebglUtils
				}).default;

				return MockedPanoViewer.isSupported();
			});

			const result1 = isAvailable(stableBrowsers);
			const result2 = isAvailable(unstableBrowsers);

			expect(result1.every(v => v === true)).to.be.true;
			expect(result2.every(v => v === false)).to.be.true;
		});
	});

	describe("#setImage/getImage", () => {
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

		IT("should set image content", done => {
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
		IT("should replace image of other projection type", done => {
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

	describe("#lookAt", () => {
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
			const firstDir = {yaw: panoViewer.getYaw(), pitch: panoViewer.getPitch()};

			panoViewer.lookAt(FIRST_REQ_DIR, 0);
			const dir1 = {yaw: panoViewer.getYaw(), pitch: panoViewer.getPitch()};

			panoViewer.on(PanoViewer.EVENTS.READY, e => {
				panoViewer.lookAt(SECOND_REQ_DIR, 0);
				const dir2 = {yaw: panoViewer.getYaw(), pitch: panoViewer.getPitch()};

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

      IT("should trigger 'viewChange' event", done => {
        // Given
        const panoViewer = new PanoViewer(target, {
          image: "./images/test_equi.png"
        });
        const changeSpy = sinon.spy();
        panoViewer.on(EVENTS.VIEW_CHANGE, changeSpy);

        // When
        panoViewer.lookAt({yaw: 10, pitch: 10}, 0);

        // Then
        expect(changeSpy.calledOnce).to.be.true;
      });
		});
	});

	describe("#updateViewportDimension", () => {
		let target;
		let panoViewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:200px;height:200px"></div>`;

			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});
		});

		afterEach(() => {
			cleanup();

			if (!panoViewer) {
				return;
			}
			panoViewer.destroy();
			panoViewer = null;
		});

		IT("should set viewport(canvas) size as parameter or set container size if size property is not exist", done => {
			panoViewer.on("ready", () => {
				// Given
				const PIXEL_RATIO = window.devicePixelRatio;
				const canvas = target.querySelector("canvas");
				const containerSize = window.getComputedStyle(target);
				const containerW = parseInt(containerSize.width, 10);
				const containerH = parseInt(containerSize.height, 10);
				const expectedResult = [
					{width: 150, height: 100},
					{width: 120, height: containerH},
					{width: containerW, height: 160},
					{width: containerW, height: containerH}
				];
				const resultSizeArray = [];

				// When
				panoViewer.updateViewportDimensions({width: 150, height: 100});
				resultSizeArray.push({width: canvas.width, height: canvas.height});
				panoViewer.updateViewportDimensions({width: 120});
				resultSizeArray.push({width: canvas.width, height: canvas.height});
				panoViewer.updateViewportDimensions({height: 160});
				resultSizeArray.push({width: canvas.width, height: canvas.height});
				panoViewer.updateViewportDimensions();
				resultSizeArray.push({width: canvas.width, height: canvas.height});

				// Then
				resultSizeArray.forEach((size, index) => {
					expect(size.width / PIXEL_RATIO).to.be.equal(expectedResult[index].width);
					expect(size.height / PIXEL_RATIO).to.be.equal(expectedResult[index].height);
				});

				done();
			});
		});

		IT("should not change size if viewport size is not changed", done => {
			panoViewer.on("ready", () => {
				// Given
				const PIXEL_RATIO = window.devicePixelRatio;
				const canvas = target.querySelector("canvas");
				const containerSize = window.getComputedStyle(target);
				const containerW = parseInt(containerSize.width, 10);
				const containerH = parseInt(containerSize.height, 10);

				// When
				panoViewer.updateViewportDimensions({width: containerW, height: containerH});

				// Then
				expect(canvas.width / PIXEL_RATIO).to.be.equal(containerW);
				expect(canvas.height / PIXEL_RATIO).to.be.equal(containerH);

				done();
			});
		});

		IT("should update panScale if updateViewportDimension is called with other height value.", done => {
			const HORIZONTAL_MOVE = {
				pos: [50, 50],
				deltaX: 100, /* Small value is set to prevent angle from being over 360 */
				deltaY: 0,
				duration: 100,
				easing: "linear"
			};

			const event = document.createEvent("Event");

			event.initEvent("pointermove", true, true);
			target.dispatchEvent(event);

			panoViewer.on("ready", () => {
				// Given
				let currYaw = panoViewer.getYaw();
				let prevYaw = currYaw;
				let basisDeltaYaw;
				let smallerHeightDeltaYaw;
				let biggerHeightDeltaYaw;

				Simulator.gestures.pan(target, HORIZONTAL_MOVE, () => {
					currYaw = panoViewer.getYaw();
					basisDeltaYaw = Math.abs(currYaw - prevYaw);
					prevYaw = currYaw;

					// When
					// Update height smaller than first height(200).
					panoViewer.updateViewportDimensions({width: 100, height: 100});
					Simulator.gestures.pan(target, HORIZONTAL_MOVE, () => {
						currYaw = panoViewer.getYaw();
						smallerHeightDeltaYaw = Math.abs(currYaw - prevYaw);
						prevYaw = currYaw;

						// Update height bigger than first height(200).
						panoViewer.updateViewportDimensions({width: 300, height: 300});
						Simulator.gestures.pan(target, HORIZONTAL_MOVE, () => {
							currYaw = panoViewer.getYaw();
							biggerHeightDeltaYaw = Math.abs(currYaw - prevYaw);
							prevYaw = currYaw;

							// Then
							expect(smallerHeightDeltaYaw).to.be.above(basisDeltaYaw);
							expect(biggerHeightDeltaYaw).to.be.below(basisDeltaYaw);

							done();
						});
					});
				});
			});
		});
	});
	/**
	 * Event Test
	 */
	describe("viewChange event", () => {
		let target;
		let panoViewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div style="width:100px;height:100px"></div>`;
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

				panoViewer.on("animationEnd", e => {
					// Then
					expect(isTrustedOnChange).to.be.false;
					done();
				});

				// When
				panoViewer.lookAt({
					yaw: 20
				}, 1000);
			});
		});
	});

	describe("event flow", () => {
		let target;
		let photo360Viewer;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `></div>`;
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

			function eventLogger(event) {
				console.log(`=======================[${orderIndex}] ${event.eventType}========================`);
				// makes callback aync not to block following flow.
				if (callback) {
					setTimeout(() => {
						callback(event);
					}, 0);
				}

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

			photo360Viewer = new PanoViewer(target, {
				image: "/images/book_equi_1.jpg"
			}).on({
				"ready": eventLogger,
				"viewChange": eventLogger,
				"animationEnd": eventLogger,
				"error": eventLogger
			});
		}

		IT("should follow event order on create", done => {
			const order = [PanoViewer.EVENTS.READY];

			startEventLogTest(order, done);
		});
	});

	/**
	 * Touch Test
	 */
	describe("Touch Direction Test", () => {
		let target;

		beforeEach(() => {
			target = sandbox();
			target.innerHTML = `<div></div>`;
		});

		afterEach(() => {
			cleanup();
		});

		IT("should set touchDirection as TOUCH_DIRECTION.ALL by default", () => {
			const panoViewer = new PanoViewer(target);

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
				const panoViewer = new PanoViewer(target, {
					touchDirection: expectDir
				});

				expect(panoViewer.getTouchDirection()).to.be.equal(expectDir);
				panoViewer.destroy();
			});
		});

		IT("should set touchDirection by setTouchDirection", () => {
			const expectList = [
				PanoViewer.TOUCH_DIRECTION.NONE,
				PanoViewer.TOUCH_DIRECTION.YAW,
				PanoViewer.TOUCH_DIRECTION.PITCH,
				PanoViewer.TOUCH_DIRECTION.ALL
			];

			expectList.forEach(expectDir => {
				const panoViewer = new PanoViewer(target);

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
				const panoViewer = new PanoViewer(target, {
					touchDirection: expectDir
				});

				expect(panoViewer.getTouchDirection()).to.be.equal(PanoViewer.TOUCH_DIRECTION.ALL);
				panoViewer.destroy();
			});
		});

		IT("should not set touchDirection if invalid direction(setTouchDirection)", () => {
			const exceptionList = [
				7,
				3,
				0,
				8
			];

			exceptionList.forEach(expectDir => {
				const panoViewer = new PanoViewer(target);

				panoViewer.setTouchDirection(expectDir);

				expect(panoViewer.getTouchDirection()).to.be.equal(PanoViewer.TOUCH_DIRECTION.ALL);
				panoViewer.destroy();
			});
		});
	});

	describe("Return value of setter", () => {
		IT("should return instance of PanoViewer when setter is called.", () => {
			// Given
			const returnValues = [];
			const target = sandbox();

			target.innerHTML = `<div></div>`;

			const panoViewer = new PanoViewer(target);

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

	describe("#enableSensor", () => {
		let panoViewer;

		beforeEach(() => {
			const target = sandbox();

			panoViewer = new PanoViewer(target);
		});

		afterEach(() => {
			cleanup();
		});

		it("should be resolved on iOS13+ when permission is granted", async () => {
			// Given
			const resolveSpy = sinon.spy();
			const rejectSpy = sinon.spy();
			const origRequestPermission = DeviceMotionEvent.requestPermission;

			DeviceMotionEvent.requestPermission = () => Promise.resolve("granted");

			// When
			await panoViewer.enableSensor()
				.then(resolveSpy)
				.catch(rejectSpy);

			// Then
			expect(resolveSpy.calledOnce).to.be.true;
			expect(rejectSpy.called).to.be.false;
			DeviceMotionEvent.requestPermission = origRequestPermission;
		});

		it("should be rejected on iOS13+ when permission is not granted", async () => {
			// Given
			const resolveSpy = sinon.spy();
			const rejectSpy = sinon.spy();
			const origRequestPermission = DeviceMotionEvent.requestPermission;

			DeviceMotionEvent.requestPermission = () => Promise.resolve("not granted");

			// When
			await panoViewer.enableSensor()
				.then(resolveSpy)
				.catch(rejectSpy);

			// Then
			expect(resolveSpy.called).to.be.false;
			expect(rejectSpy.calledOnce).to.be.true;
			DeviceMotionEvent.requestPermission = origRequestPermission;
		});
	});

	describe("#disableSensor", () => {
		afterEach(() => {
			cleanup();
		});

		it("should return pano viewer instance", () => {
			// Given
			const panoViewer = new PanoViewer(sandbox());

			// When
			const returnVal = panoViewer.disableSensor();

			// Then
			expect(returnVal).deep.equals(panoViewer);
		});
	});

	describe("#enterVR", () => {
		let panoViewer;
		let imageRendererEnterVRStub;

		beforeEach(() => {
			const target = sandbox();

			panoViewer = new PanoViewer(target);
		});

		afterEach(() => {
			cleanup();
			imageRendererEnterVRStub && imageRendererEnterVRStub.restore();
		});

		it("should be rejected when it is not ready to present.", async () => {
			// Given
			const resolveSpy = sinon.spy();
			const rejectSpy = sinon.spy();
			const readySpy = sinon.spy();

			// When
			panoViewer.on("ready", readySpy);
			await panoViewer.enterVR()
				.then(resolveSpy)
				.catch(rejectSpy);

			// Then
			expect(readySpy.called).to.be.false;
			expect(resolveSpy.called).to.be.false;
			expect(rejectSpy.calledOnce).to.be.true;
		});

		it("should be rejected when entering VR in PanoImageRenderer fails", async () => {
			// Given
			const resolveSpy = sinon.spy();
			const rejectSpy = sinon.spy();
			const rejectReason = "I don't feel like to";
			const readySpy = sinon.spy();

			// When
			panoViewer.on("ready", readySpy);
			panoViewer.setImage("/images/book_equi_1.jpg");
			await new Promise(res => setTimeout(res, 1000));

			imageRendererEnterVRStub = sinon.stub(panoViewer._photoSphereRenderer, "enterVR");
			imageRendererEnterVRStub.returns(Promise.reject(rejectReason));

			await panoViewer.enterVR()
				.then(resolveSpy)
				.catch(rejectSpy);

			// Then
			expect(readySpy.called).to.be.true;
			expect(resolveSpy.called).to.be.false;
			expect(rejectSpy.calledOnceWith(rejectReason)).to.be.true;
		});

		it("should be rejected when enabling device sensor fails", async () => {
			// Given
			const resolveSpy = sinon.spy();
			const rejectSpy = sinon.spy();
			const enableSensorStub = sinon.stub(panoViewer, "enableSensor");
			const rejectReason = "It doesn't feel like to";
			const readySpy = sinon.spy();

			enableSensorStub.returns(Promise.reject(rejectReason));

			// When
			panoViewer.on("ready", readySpy);
			panoViewer.setImage("/images/book_equi_1.jpg");
			await new Promise(res => setTimeout(res, 1000));

			imageRendererEnterVRStub = sinon.stub(panoViewer._photoSphereRenderer, "enterVR");
			imageRendererEnterVRStub.returns(Promise.reject(rejectReason));

			await panoViewer.enterVR()
				.then(resolveSpy)
				.catch(rejectSpy);

			// Then
			expect(readySpy.called).to.be.true;
			expect(resolveSpy.called).to.be.false;
			expect(rejectSpy.calledOnceWith(rejectReason)).to.be.true;
		});
	});


	describe("#exitVR", () => {
		afterEach(() => {
			cleanup();
		});

		it("should return pano viewer instance", () => {
			// Given
			const panoViewer = new PanoViewer(sandbox());

			// When
			const returnVal = panoViewer.exitVR();

			// Then
			expect(returnVal).deep.equals(panoViewer);
		});
	});
});
