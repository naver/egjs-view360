import CubeRenderer from "../../../src/PanoImageRenderer/renderer/CubeRenderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;

function promiseFactory(canvas, answerFile, threshold = 2) {
	return new Promise(res => {
		compare(answerFile, canvas, (pct, data) => {
			expect(pct).to.be.below(threshold);
			res();
		});
	});
}

function renderAndCompareSequentially(tests) {
	return new Promise(res => {
		tests.reduce(
			(promiseChain, currentTask) => promiseChain.then(() => promiseFactory(...currentTask)
		), Promise.resolve([])).then(() => {
			res();
		});
	});
}

describe("CubeRenderer", () => {
	console.log(WEBGL_AVAILABILITY ? "gl available" : "no gl");
	const deviceRatio = window.devicePixelRatio;
	const suffix = `_${deviceRatio}x.png`;

	describe("static", () => {
		describe("extractTileFromImage", () => {
			IT("1x6 LRUDBF", done => {
				// Given
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_1x6_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[CubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});

			IT("2x3 LRUDBF", done => {
				// Given
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_2x3_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[CubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});

			IT("3x2 LRUDBF", done => {
				// Given
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_3x2_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[CubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});

			IT("3x2 LRUDBF video", done => {
				// Given
				const cubestripVideo = document.createElement("video");

				cubestripVideo.crossOrigin = "anonymous";
				cubestripVideo.src = "./images/test_cube_3x2_LRUDBF.mp4";
				cubestripVideo.preload = "auto";

				cubestripVideo.addEventListener("loadeddata", () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[CubeRenderer.extractTileFromImage(cubestripVideo, 0, 1536), `./images/test_cube_r.png`, 5],
							[CubeRenderer.extractTileFromImage(cubestripVideo, 1, 1536), `./images/test_cube_l.png`, 5],
							[CubeRenderer.extractTileFromImage(cubestripVideo, 2, 1536), `./images/test_cube_u.png`, 5],
							[CubeRenderer.extractTileFromImage(cubestripVideo, 3, 1536), `./images/test_cube_d.png`, 5],
							[CubeRenderer.extractTileFromImage(cubestripVideo, 4, 1536), `./images/test_cube_b.png`, 5],
							[CubeRenderer.extractTileFromImage(cubestripVideo, 5, 1536), `./images/test_cube_f.png`, 5]
						]
					).then(() => {
						done();
					});
				});
			});

			IT("6x1 LRUDBF", done => {
				// Given
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_6x1_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[CubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[CubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});
		});
	});
});
