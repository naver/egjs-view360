import PanoViewer from "../../../src/PanoViewer/PanoViewer";
import {ERROR_TYPE, EVENTS} from "../../../src/PanoViewer/consts";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";

describe("PanoViewer", function() {
	let It = WebGLUtils.isWebGLAvailable() ? it : it.skip;

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
		// It("should use one resource (image or video) property #1 (no proerpty used)", function(done) {
		// 	panoViewer = new PanoViewer(target);
		// 	panoViewer.on(EVENTS.ERROR, e => {
		// 		if (e.type === ERROR_TYPE.INVALID_RESOURCE) {
		// 			done();
		// 		}
		// 	});
		// });

		It("should use one resource (image or video) property #2 (both property used)", function(done) {
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

		It("should recognize image is not video", function() {
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});
			expect(panoViewer.getVideo()).to.be.null;
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

		It("should set video content", function(done) {
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

		It("should not set different content type and should persist previous status", function(done) {
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

		It("should set image content", function(done) {
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

		It("should replace image of other projection type", function(done) {
			// Given
			panoViewer = new PanoViewer(target, {
				image: "./images/test_equi.png"
			});

			// first `onContentLoad` event is for image specified in constructor.
			panoViewer.once(PanoViewer.EVENTS.CONTENT_LOADED, evt1 => {
				console.log("contentLoaded #1", evt1.content.src, evt1.projectionType);
				const prevContentSrc = evt1.content.src;
				const prevProjectionType = evt1.projectionType;

				panoViewer.once(PanoViewer.EVENTS.CONTENT_LOADED, evt2 => {
					console.log("contentLoaded #2", evt2.content.src, evt2.projectionType);
					// Then
					expect(evt2.content.src).to.not.equal(prevContentSrc);
					expect(evt2.projectionType).to.not.equal(prevProjectionType);
					done();
				});

				// When
				// Change image of other projection type.
				panoViewer.setImage("./images/glasscity_cube_1024.jpg", {projectionType: PanoViewer.ProjectionType.VERTICAL_CUBESTRIP});
			});
		});
	});

	describe.skip("event flow", function() {
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
				image: "/images/book_equi_1.jpg",
				projectionType: "equirectangular",
				controlMode: "gallery_yaw_pitch"
			}).on({
				"resume": eventLogger,
				"suspend": eventLogger,
				"viewChange": eventLogger,
				"animationEnd": eventLogger,
				"error": eventLogger,
				"init": eventLogger
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

		It("should follow event order on create", function(done) {
			var order = [
				PanoViewer.EVENTS.VIEW_CHANGE,
				PanoViewer.EVENTS.IMAGE_LOADED
			];

			startEventLogTest(order, done);
		});

		It("should follow event order on resume", function(done) {
			var order = [
				PanoViewer.EVENTS.VIEW_CHANGE,
				PanoViewer.EVENTS.IMAGE_LOADED,
				PanoViewer.EVENTS.INIT,
				PanoViewer.EVENTS.RESUMESTART,
				PanoViewer.EVENTS.RESUME
			];

			startEventLogTest(order, done, function(event) {
				if (event.eventType === PanoViewer.EVENTS.IMAGE_LOADED) {
					photo360Viewer.resume();
				}
			});
		});

		It("should follow event order on suspend", function(done) {
			var order = [
				PanoViewer.EVENTS.VIEW_CHANGE,
				PanoViewer.EVENTS.IMAGE_LOADED,
				PanoViewer.EVENTS.INIT,
				PanoViewer.EVENTS.RESUMESTART,
				PanoViewer.EVENTS.RESUME,
				PanoViewer.EVENTS.SUSPEND,
			];

			startEventLogTest(order, done, function(event) {
				if (event.eventType === PanoViewer.EVENTS.IMAGE_LOADED) {
					photo360Viewer.resume();
				} else if (event.eventType === PanoViewer.EVENTS.RESUME) {
					photo360Viewer.suspend();
				}
			});
		});
	});
});
