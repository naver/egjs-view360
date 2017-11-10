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

		It("should use one resource (image or video) property #1 (no proerpty used)", function(done) {
			panoViewer = new PanoViewer(target);
			panoViewer.on(EVENTS.ERROR, e => {
				if (e.type === ERROR_TYPE.INVALID_RESOURCE) {
					done();
				}
			});
		});

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
				image: "./images/test_qui.jpg"
			});
			expect(panoViewer.getVideo()).to.be(null);
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
				imageType: "equirectangular",
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
