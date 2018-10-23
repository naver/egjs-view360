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
	return new Promise(res => {
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
		compare(answerFile, inst.canvas, (pct, data) => {
			res({
				success: pct < threshold,
				difference: pct,
				threshold
			});
		});
	});
}

function renderAndCompareSequentially(inst, tests) {
	return new Promise(res => {
		tests.reduce(
			(promiseChain, currentTask) => promiseChain.then(() => promiseFactory(inst, ...currentTask)),
			Promise.resolve([])
		).then(res);
	});
}

export {
	compare,
	createPanoImageRenderer,
	renderAndCompareSequentially
};
