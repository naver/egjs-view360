import { expect } from "chai";
import { compare } from "../util";
import CubeRenderer from "../../../src/PanoImageRenderer/renderer/CubeRenderer"; // eslint-disable-line import/no-duplicates
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import Renderer from "../../../src/PanoImageRenderer/renderer/Renderer";
import CubeRendererInjector from "inject-loader!../../../src/PanoImageRenderer/renderer/CubeRenderer"; // eslint-disable-line import/no-duplicates

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
			(promiseChain, currentTask) => promiseChain.then(() => promiseFactory(...currentTask)),
			Promise.resolve([])).then(() => res());
	});
}

describe("CubeRenderer", () => {
	console.log(WEBGL_AVAILABILITY ? "gl available" : "no gl");

	describe("Methods", () => {
		describe("getMaxCubeMapTextureSize", () => {
			let canvas = null;
			let gl = null;

			beforeEach(() => {
				canvas = document.createElement("canvas");
				gl = WebGLUtils.getWebglContext(canvas);
			});

			afterEach(() => {
				canvas = null;
				gl = null;
			});

			IT("should return 1536 on chrome when input size is 1536", done => {
				// Given
				const img = new Image();

				img.src = "./images/test_cube_2x3_LRUDBF.jpg";
				img.onload = function() {
					// Given
					const renderer = new CubeRenderer();
					// When
					const textureSize = renderer.getMaxCubeMapTextureSize(gl, img);

					// Then
					expect(textureSize).to.be.equal(1536);
					done();
				};
			});

			IT("should return 512 on ios 8 when input size is 1536", done => {
				// Given
				const MockedCubeRenderer = CubeRendererInjector(
					{
						"@egjs/agent": function() {
							return {
								browser: {
									name: "safari"
								},
								os: {
									name: "ios",
									version: "8",
									majorVersion: 8,
								}
							};
						}
					}
				).default;
				const img = new Image();

				img.src = "./images/test_cube_2x3_LRUDBF.jpg";
				img.onload = function() {
					// When
					const renderer = new MockedCubeRenderer();
					const textureSize = renderer.getMaxCubeMapTextureSize(gl, img);

					// Then
					expect(textureSize).to.be.equal(512);
					done();
				};
			});
			IT("should return 1024 on ios 9 when input size is 1536", done => {
				// Given
				const MockedCubeRenderer = CubeRendererInjector(
					{
						"@egjs/agent": function() {
							return {
								browser: {
									name: "safari"
								},
								os: {
									name: "ios",
									version: "9",
									majorVersion: 9,
								}
							};
						}
					}
				).default;
				const img = new Image();

				img.src = "./images/test_cube_2x3_LRUDBF.jpg";
				img.onload = function() {
					// When
					const renderer = new MockedCubeRenderer();
					const textureSize = renderer.getMaxCubeMapTextureSize(gl, img);

					// Then
					expect(textureSize).to.be.equal(1024);
					done();
				};
			});
			IT("should return 2048 on ie11 when input size is 1536", done => {
				// Given
				const MockedCubeRenderer = CubeRendererInjector(
					{
						"@egjs/agent": function() {
							return {
								browser: {
									name: "ie",
									version: "11",
									majorVersion: 11,
								},
								os: {
									name: "windows",
									version: "10",
									majorVersion: 10,
								}
							};
						}
					}
				).default;
				const img = new Image();

				img.src = "./images/test_cube_2x3_LRUDBF.jpg";
				img.onload = function() {
					// When
					const renderer = new MockedCubeRenderer();
					const textureSize = renderer.getMaxCubeMapTextureSize(gl, img);

					// Then
					expect(textureSize).to.be.equal(2048);
					done();
				};
			});
			IT("should return 1024 on ie11 when input size is 1024", done => {
				// Given
				const MockedCubeRenderer = CubeRendererInjector(
					{
						"@egjs/agent": function() {
							return {
								browser: {
									name: "ie",
									version: "11",
									majorVersion: 11,
								},
								os: {
									name: "windows",
									version: "10",
									majorVersion: 10,
								}
							};
						}
					}
				).default;
				const img = new Image();

				img.src = "./images/test_cube_2x3_LRUDBF_1024.jpg";
				img.onload = function() {
					// When
					const renderer = new MockedCubeRenderer();
					const textureSize = renderer.getMaxCubeMapTextureSize(gl, img);

					// Then
					expect(textureSize).to.be.equal(1024);
					done();
				};
			});
		});


		describe("extractTileFromImage", () => {
			IT("1x6 LRUDBF", done => {
				// Given
				const cubeRenderer = new CubeRenderer();
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_1x6_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[cubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});

			IT("2x3 LRUDBF", done => {
				// Given
				const cubeRenderer = new CubeRenderer();
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_2x3_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[cubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});

			IT("3x2 LRUDBF", done => {
				// Given
				const cubeRenderer = new CubeRenderer();
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_3x2_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[cubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});

			IT("3x2 LRUDBF video", done => {
				// Given
				const cubeRenderer = new CubeRenderer();
				const cubestripVideo = document.createElement("video");

				cubestripVideo.crossOrigin = "anonymous";
				cubestripVideo.src = "./images/test_cube_3x2_LRUDBF.mp4";
				cubestripVideo.preload = "auto";
				cubestripVideo.load();

				cubestripVideo.addEventListener("loadeddata", () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[cubeRenderer.extractTileFromImage(cubestripVideo, 0, 1536), `./images/test_cube_r.png`, 5],
							[cubeRenderer.extractTileFromImage(cubestripVideo, 1, 1536), `./images/test_cube_l.png`, 5],
							[cubeRenderer.extractTileFromImage(cubestripVideo, 2, 1536), `./images/test_cube_u.png`, 5],
							[cubeRenderer.extractTileFromImage(cubestripVideo, 3, 1536), `./images/test_cube_d.png`, 5],
							[cubeRenderer.extractTileFromImage(cubestripVideo, 4, 1536), `./images/test_cube_b.png`, 5],
							[cubeRenderer.extractTileFromImage(cubestripVideo, 5, 1536), `./images/test_cube_f.png`, 5]
						]
					).then(() => {
						done();
					});
				});
			});

			IT("6x1 LRUDBF", done => {
				// Given
				const cubeRenderer = new CubeRenderer();
				const cubestripImg = new Image();

				cubestripImg.src = "./images/test_cube_6x1_LRUDBF.jpg";
				cubestripImg.onload = () => {
					// When & Then
					renderAndCompareSequentially(
						[
							[cubeRenderer.extractTileFromImage(cubestripImg, 0, 1536), `./images/test_cube_r.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 1, 1536), `./images/test_cube_l.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 2, 1536), `./images/test_cube_u.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 3, 1536), `./images/test_cube_d.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 4, 1536), `./images/test_cube_b.png`],
							[cubeRenderer.extractTileFromImage(cubestripImg, 5, 1536), `./images/test_cube_f.png`]
						]
					).then(() => {
						done();
					});
				};
			});
		});
	});

	describe("Events", () => {
		it("should fire error events if invalid calls occur", () => {
			// Given
			const cubeRenderer = new CubeRenderer();
			const errors = [];

			cubeRenderer.on(Renderer.EVENTS.ERROR, e => {
				errors.push(e);
			});

			// When
			cubeRenderer.updateTexture(0, 0, {}); // invalid parameter

			// Then
			expect(errors.length).equals(1);
			errors.forEach(e => {
				expect(e.message).to.be.a("string");
			});
		});
	});
});
