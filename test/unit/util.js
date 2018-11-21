import PanoViewerInjector from "inject-loader!../../src/PanoViewer/PanoViewer";
import PanoImageRendererForUnitTest from "./PanoImageRendererForUnitTest";
import {glMatrix, quat} from "../../src/utils/math-util.js";

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
				.onComplete(data => {
					const pct = parseFloat(data.misMatchPercentage);

					callback(pct, data);
				});
		}, "image/png");
	});
}

function createPanoViewerForRenderingTest(target, options) {
	const TestPanoViewer = PanoViewerInjector({
		"../PanoImageRenderer": {
			PanoImageRenderer: PanoImageRendererForUnitTest
		}
	}).default;

	return new TestPanoViewer(target, options);
}

function createPanoImageRenderer(image, isVideo, projectionType, cubemapConfig = {},
	options = {fieldOfView: 65, width: 200, height: 200}) {
	const sphericalConfig = {
		fieldOfView: options.fieldOfView,
		imageType: projectionType,
		cubemapConfig
	};

	return new PanoImageRendererForUnitTest(
		image, options.width, options.height, isVideo, sphericalConfig);
}

function promiseFactory(inst, yaw, pitch, fov, answerFile, threshold = 2, isQuaternion) {
	return new Promise((res, rej) => {
		// When
		if (isQuaternion) {
			const quaternion = quat.create();

			quat.rotateY(quaternion, quaternion, glMatrix.toRadian(-yaw));
			quat.rotateX(quaternion, quaternion, glMatrix.toRadian(-pitch));
			inst.renderWithQuaternion(quaternion, fov);
		} else {
			inst.render(yaw, pitch, fov);
		}

		// Then
		compare(answerFile, inst.canvas, (diff, data) => {
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
		glMatrix.toDegree(Math.atan(0.5)) * 2 : (360 / aspectRatio)).toFixed(5); // Make it 5 fixed as axes does.
}

function isVideoLoaded(video) {
	return new Promise(res => {
		/* Ref https://www.w3schools.com/tags/av_prop_readystate.asp */
		// If it is already loaded.
		if (video.readyState >= 2) {
			res();
		}

		video.addEventListener("loadeddata", res);
	});
}

export {
	compare,
	createPanoViewerForRenderingTest,
	createPanoImageRenderer,
	renderAndCompareSequentially,
	calcFovOfPanormaImage,
	isVideoLoaded
};
