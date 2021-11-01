/* eslint-disable */
import {glMatrix, quat} from "gl-matrix";
import PanoViewerInjector from "inject-loader!../../src/PanoViewer/PanoViewer";
import PanoImageRendererForUnitTest from "./PanoImageRendererForUnitTest";
import {util as mathUtil} from "../../src/utils/math-util";
import { DEFAULT_CANVAS_CLASS } from "../../src/PanoViewer/consts"
import PanoViewer from "../../src/PanoViewer/PanoViewer";

const resemble = window.resemble;

function getImageBlob(path, callback) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", path, true);
	if (window.URL) {
		xhr.responseType = "blob";
	} else {
		xhr.responseType = "arraybuffer";
	}
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState !== 4 || xhr.status !== 200) {
			return;
		}
		callback(this.response);
	};
	xhr.send();
}

function compare(path, canvas, callback) {
	getImageBlob(path, reference => {
		canvas.toBlob(canvasData => {
			resemble(reference)
				.compareTo(canvasData)
				.scaleToSameSize()
				.ignoreAntialiasing()
				.onComplete(data => {
          const pct = parseFloat(data.misMatchPercentage);

					callback(pct, data);
				});
		}, "image/png");
	});
}

function createPanoViewerForRenderingTest(target, options) {
	const TestPanoViewer = PanoViewerInjector({
		"../PanoImageRenderer/PanoImageRenderer": PanoImageRendererForUnitTest
	}).default;

	return new TestPanoViewer(target, options);
}

function createPanoImageRenderer(image, isVideo, projectionType, cubemapConfig = {},
	options = {fieldOfView: 65, width: 200, height: 200},
  stereoFormat = PanoViewer.STEREO_FORMAT.TOP_BOTTOM,
  renderingContextAttributes = {}) {
	const sphericalConfig = {
		fieldOfView: options.fieldOfView,
		imageType: projectionType,
		cubemapConfig,
		stereoFormat,
	};

	return new PanoImageRendererForUnitTest(
		image, options.width, options.height, isVideo, document.createElement("div"), DEFAULT_CANVAS_CLASS, sphericalConfig);
}

function promiseFactory(inst, yaw, pitch, fov, answerFile, threshold = 2, isQuaternion) {
	return new Promise((res, rej) => {
		const canvas = inst.canvas || inst._photoSphereRenderer.canvas;

		// inst is PanoViewer
		if (inst.lookAt) {
      inst.lookAt({yaw, pitch, fov});
		} else if (isQuaternion) {
			const quaternion = quat.create();

			quat.rotateY(quaternion, quaternion, glMatrix.toRadian(-yaw));
			quat.rotateX(quaternion, quaternion, glMatrix.toRadian(-pitch));
			inst.renderWithQuaternion(quaternion, fov);
		} else {
			inst.renderWithYawPitch(yaw, pitch, fov);
    }

    // Then
    // console.log(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    compare(answerFile, canvas, (diff, data) => {
      const result = {
        success: diff < threshold,
        difference: diff,
        threshold
      };

      if (result.success) {
        res(result);
      } else {
        rej(result);
      }
    });
	});
}

function renderAndCompareSequentially(inst, tests) {
	return tests.reduce((chain, task) => chain.then(() => promiseFactory(inst, ...task)),
		Promise.resolve([])
	);
}

function calcFovOfPanormaImage(image) {
	let aspectRatio = image.naturalWidth / image.naturalHeight;

	if (aspectRatio < 1) {
		aspectRatio = 1 / aspectRatio;
	}

	return +(aspectRatio < 6 ?
		mathUtil.toDegree(Math.atan(0.5)) * 2 : (360 / aspectRatio));
}

function isVideoLoaded(video) {
	return new Promise(res => {
		/* Ref https://www.w3schools.com/tags/av_prop_readystate.asp */
		// If it is already loaded.
		if (video.readyState >= 2) {
			console.log("debug: isVideodLoaded - readyState", video.readyState);
			res();
			return;
		}

		console.log("debug: isVideoLoaded - addEventListener");

		function loadEventHandler(e) {
			console.log(`debug: isVideoLoaded - event(${e.type}, timestamp(${new Date()}, target=${e.target}))`);
			video.removeEventListener("canplay", loadEventHandler);
			/**
			 * To guarantee that video is shown (There's no API to check video is renderened.)
			 * Is there way to video is rendered?
			 */
			setTimeout(res, 100);
		}

		video.addEventListener("canplay", loadEventHandler);

		function etcEventHandler(e) {
			video.removeEventListener(e.type, etcEventHandler);
			console.log(`debug: isVideoLoaded - event(${e.type}, timestamp(${new Date()}))`);
		}

		["loadstart", "durationchange", "loadedmetadata", "canplay", "loadeddata", "play"].forEach(eventName => {
			video.addEventListener(eventName, etcEventHandler);
		});
	});
}

function createVideoElement(videoPath) {
	const video = document.createElement("video");

	video.src = videoPath;
	video.setAttribute("crossorigin", "anonymous");
	video.setAttribute("webkit-playsinline", "");
	video.setAttribute("playsinline", "");
	// video.setAttribute("autoplay", "");
	// video.setAttribute("muted", "");
	/**
	 * It is not renderable to canvas if video element is not attached to DOM.
	 */
	video.style.visibility = "hidden";
	document.body.appendChild(video);
	return video;
}

function sandbox(obj, prop) {
	const tmp = document.createElement("div");

	tmp.className = "_tempSandbox_";
	if (typeof obj === "string") {
		tmp.id = obj;
	} else {
		tmp.id = "sandbox";
	}

	if (typeof obj === "object" || typeof prop === "object") {
		const attrs = typeof prop === "object" ? prop : obj;

		for (const p in attrs) {
			if (/class|className/.test(p)) {
				tmp.setAttribute(p, `${attrs[p]} _tempSandbox_`);
			} else {
				tmp.setAttribute(p, attrs[p]);
			}
		}
	}
	return document.body.appendChild(tmp);
}

function cleanup() {
	const elements = [].slice.call(document.querySelectorAll("._tempSandbox_"));

	elements.forEach(v => {
		v.parentNode.removeChild(v);
	});
}

function createVRDisplayMock() {
	return {
		capabilities: {
			canPresent: true,
			hasExternalDisplay: false
		},
		async requestPresent() {
			this.presenting = true;
			return "pass";
		},
		exitPresent() {
			this.presenting = false;
		},
		isPresenting() {
			return this.presenting;
		},
		getLayers() {
			return [];
		},
		getEyeParameters() {
			return {
				renderWidth: 100,
				renderHeight: 100,
				fieldOfView: 65,
				offset: 0,
			};
		},
		submitFrame() {},
		requestAnimationFrame() {}
	};
}

export {
	compare,
	createPanoViewerForRenderingTest,
	createPanoImageRenderer,
	renderAndCompareSequentially,
	calcFovOfPanormaImage,
	isVideoLoaded,
	createVideoElement,
	sandbox,
	cleanup,
	createVRDisplayMock
};
