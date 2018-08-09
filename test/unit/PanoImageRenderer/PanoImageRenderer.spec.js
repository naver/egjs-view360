import PanoImageRenderer from "../../../src/PanoImageRenderer/PanoImageRenderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import PanoImageRendererInjector from "inject-loader!../../../src/PanoImageRenderer/PanoImageRenderer";
import {glMatrix, quat} from "../../../src/utils/math-util.js";

import RendererInjector from "inject-loader!../../../src/PanoImageRenderer/renderer/Renderer";
import SphereRendererInjector from "inject-loader!../../../src/PanoImageRenderer/renderer/SphereRenderer";
import TestHelper from "../YawPitchControl/testHelper";

const RendererOnIE11 = RendererInjector(
	{
		"@egjs/agent": function() {
			return {
				browser: {
					name: "ie",
					version: "11.0"
				}
			};
		}
	}
).default;

const SphereRendererOnIE11 = SphereRendererInjector(
	{
		"./Renderer": RendererOnIE11
	}
).default;

const PanoImageRendererOnIE11 = PanoImageRendererInjector(
	{
		"./renderer/SphereRenderer": SphereRendererOnIE11
	}
).default;
const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;
const DEBUG_CONTEXT_ATTRIBUTES = {
	preserveDrawingBuffer: true,
	antialias: false,
	premultipliedAlpha: false
};
const USE_QUATERNION = true;

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
			// console.log("COMPARE ===> ", pct, "DATA", data);
			expect(pct).to.be.below(threshold);
			res();
		});
	});
}

function renderAndCompareSequentially(inst, tests) {
	// console.log(">> renderAndCompareSequentially tests:", tests.length, tests);
	return new Promise(res => {
		tests.reduce(
			(promiseChain, currentTask) => promiseChain.then(() => promiseFactory(inst, ...currentTask)),
			Promise.resolve([])
		).then(res);
	});
}

const threshold = 3;

describe("PanoImageRenderer", function() {
	console.log(WEBGL_AVAILABILITY ? "gl available" : "no gl");
	const deviceRatio = window.devicePixelRatio;
	const suffix = `_${deviceRatio}x.png`;

	describe("#constructor", function() {
		IT("Instance", function() {
			// Given
			// When
			this.inst = new PanoImageRenderer("./images/test_equi.png", 200, 200, false, {
					yaw: 0,
					pitch: 0,
					imageType: "equirectangular",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);

			// Then
			expect(this.inst).to.be.exist;
		});
	});

	describe("#setImage", function () {
		IT("should fire error when image is invalid", function(done) {
			// Given
			this.inst = new PanoImageRenderer(null, 200, 200, false, {
				yaw: 0,
				pitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			// When
			this.inst.setImage({
				image: "./images/invalid.png"
			});

			// Then
			this.inst.on("error", () => done());
		});
	});

	describe("#isImageLoaded", function() {
		IT("should return false before image loaded", () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.png";
			const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			// When
			const isImageLoaded = inst.isImageLoaded();

			// Then
			expect(isImageLoaded).to.be.false;
		});

		IT("should return true after image loaded", (done) => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.png";
			const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			inst.on("imageLoaded", () => {
				// When
				const isImageLoaded = inst.isImageLoaded();

				// Then
				expect(isImageLoaded).to.be.ok;
				done();
			});
		});

		IT("should return false when set another image after image loaded", done => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.png";
			const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			inst.once("imageLoaded", () => {
				// When
				inst.setImage({
					image: "./images/test_equi_0_0_65.png"
				});
				const isImageLoaded = inst.isImageLoaded();

				// Then
				expect(isImageLoaded).to.be.false;
				done();
			});
		});

		IT("should return false when set another image before the first image loaded", () => {
				// Given
				const sourceImg = new Image();

				sourceImg.src = "./images/test_equi.png";
				const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "equirectangular",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);

				// When
				inst.setImage({
					image: "./images/test_equi_0_0_65.png"
				});
				const isImageLoaded = inst.isImageLoaded();

				// Then
				expect(isImageLoaded).to.be.false;
			});
	});

	describe("adaptive devicePixelRatio", function() {
		IT("when devicePixelRatio is 1, should use 1", function() {
			// Given
			var MockedPanoImageRenderer = PanoImageRendererInjector({
				"../utils/browserFeature": {
					devicePixelRatio: 1
				}}).default;

			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";

			// When
			inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// Then
			expect(inst.canvas.width).to.be.equal(200);
			expect(inst.canvas.height).to.be.equal(200);
		});

		IT("when devicePixelRatio is 2, should use 2", function() {
			// Given
			var MockedPanoImageRenderer = PanoImageRendererInjector({
				"../utils/browserFeature": {
					devicePixelRatio: 2
				}
			}).default;

			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";

			// When
			inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// Then
			expect(inst.canvas.width).to.be.equal(400);
			expect(inst.canvas.height).to.be.equal(400);
		});

		IT("when devicePixelRatio is 3, should use 2", function() {
			// Given
			var MockedPanoImageRenderer = PanoImageRendererInjector({
				"../utils/browserFeature": {
					devicePixelRatio: 3
				}
			}).default;

			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";

			// When
			inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// Then
			expect(inst.canvas.width).to.be.equal(400);
			expect(inst.canvas.height).to.be.equal(400);
		});
	});

	describe("error event", function() {
		IT("Should trigger error event when invalis image url", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();
						sourceImg.src = "./images/test_cube_not_exist.jpg";

						// When
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "cubemap",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			inst.on("error", when);

			function when(e) {
					// Then
					expect(e.type).to.be.equal(12);
					done();
			}
		});
	});

	describe("renderingcontextlost event", function() {
		IT("Should trigger renderingcontextlost event when lost context", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();
						sourceImg.src = "./images/test_cube.jpg";

						// When
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "cubemap",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			inst.on("renderingContextLost", when);

			for(var i=0;i<16;i++) {
					new PanoImageRenderer(sourceImg, 200, 200, false, {
							initialYaw: 0,
							initialpitch: 0,
							imageType: "cubemap",
							fieldOfView: 65
					}, DEBUG_CONTEXT_ATTRIBUTES);
			}

			function when(e) {
					// Then
					expect(inst.hasRenderingContext()).to.be.equal(false);
					done();
			}
		});
	});

	describe("render without throwing exception", function() {
		IT("Should not render internally when calling render without image loaded", function() {
			// Given
			let inst = this.inst;
			let isDrawCalled = false;
			const sourceImg = new Image();
			sourceImg.src = "./images/test_cube_not_exist.jpg";

			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "cubemap",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			inst._draw = function() {
				isDrawCalled = true;
				PanoImageRenderer.prototype._draw.call(inst);
			};

			// When
			inst.render(0, 0, 65);

			// Then
			expect(isDrawCalled).to.be.equal(false);
		});
	});

	describe("Cubemap Rendering", function() {
		describe("separated tiles", function() {
			IT("multiple img url", function(done) {
				// Given
				const inst = new PanoImageRenderer([
					"./images/test_cube_r.png",
					"./images/test_cube_l.png",
					"./images/test_cube_u.png",
					"./images/test_cube_d.png",
					"./images/test_cube_b.png",
					"./images/test_cube_f.png"
				], 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);

				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("multiple img elements", function(done) {
				// Given
				const imgs = [
					"./images/test_cube_r.png",
					"./images/test_cube_l.png",
					"./images/test_cube_u.png",
					"./images/test_cube_d.png",
					"./images/test_cube_b.png",
					"./images/test_cube_f.png"
				].map(imgUrl => {
					const img = new Image();

					img.src = imgUrl;
					return img;
				});

				const inst = new PanoImageRenderer(imgs, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);

				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("multiple img url: order", function(done) {
				// Given
				const inst = new PanoImageRenderer([
					"./images/test_cube_l.png",
					"./images/test_cube_r.png",
					"./images/test_cube_u.png",
					"./images/test_cube_b.png",
					"./images/test_cube_d.png",
					"./images/test_cube_f.png"
				], 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65,
					cubemapConfig: {
						order: "LRUBDF", // RLUDBF,
						tileConfig: [
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0}
						]
					}
				}, DEBUG_CONTEXT_ATTRIBUTES);

				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("multiple img url: flip", function(done) {
				// Given
				const inst = new PanoImageRenderer([
					"./images/test_cube_r.png",
					"./images/test_cube_l.png",
					"./images/test_cube_u.png",
					"./images/test_cube_d.png",
					"./images/test_cube_b.png",
					"./images/test_cube_f_hflip.png"
				], 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65,
					cubemapConfig: {
						tileConfig: [
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: false, rotation: 0},
							{flipHorizontal: true, rotation: 0}
						]
					}
				}, DEBUG_CONTEXT_ATTRIBUTES);

				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("multiple img url: flip rotation", function(done) {
				// Given
				const inst = new PanoImageRenderer([
					"./images/test_cube_r_hflip.png",
					"./images/test_cube_l_hflip.png",
					"./images/test_cube_u_hflip_180.png",
					"./images/test_cube_d_hflip_180.png",
					"./images/test_cube_b_hflip.png",
					"./images/test_cube_f_hflip.png"
				], 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65,
					cubemapConfig: {
						tileConfig: [
							{flipHorizontal: true, rotation: 0},
							{flipHorizontal: true, rotation: 0},
							{flipHorizontal: true, rotation: 180},
							{flipHorizontal: true, rotation: 180},
							{flipHorizontal: true, rotation: 0},
							{flipHorizontal: true, rotation: 0}
						]
					}
				}, DEBUG_CONTEXT_ATTRIBUTES);

				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});
		});

		describe("cubestrip", function() {
			IT("cubestrip 1x6", function(done) {
				// Given
				let inst = this.inst;
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_1x6_LRUDBF.jpg";
				inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);
				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
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
				}
			});

			IT("cubestrip 1x6: flip rotate", function(done) {
				// Given
				const tileConfigForCubestrip = {flipHorizontal: true, rotation: 0};
				let inst = this.inst;
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_1x6_naver.jpg";
				inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65,
					cubemapConfig: {
						tileConfig: tileConfigForCubestrip
					}
				}, DEBUG_CONTEXT_ATTRIBUTES);
				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("cubestrip 1x6: rotate", function(done) {
				// Given
				const tileConfigForCubestrip = [
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 180},
					{flipHorizontal: false, rotation: 180}
				];
				let inst = this.inst;
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_1x6_krpano.jpg";
				inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65,
					cubemapConfig: {
						order: "LFRBUD",
						tileConfig: tileConfigForCubestrip
					}
				}, DEBUG_CONTEXT_ATTRIBUTES);
				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("cubestrip 3x2", function(done) {
				// Given
				let inst = this.inst;
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_3x2_LRUDBF.jpg";
				inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);
				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			// This test will fail on iOS safari, because video will not start load with out use interaction.
			IT("cubestrip 3x2: video", function(done) {
				// Given
				let inst = this.inst;
				const isVideo = true;
				const video = document.createElement("video");

				video.src = "./images/test_cube_3x2_LRUDBF.mp4";
				video.setAttribute("crossorigin", "anonymous");
				video.setAttribute("webkit-playsinline", "");
				video.setAttribute("playsinline", "");

				inst = new PanoImageRenderer(video, 200, 200, isVideo, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);

				video.addEventListener("loadeddata", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, 6],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, 6],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, 6],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, 6],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, 6],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, 6]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("cubestrip 2x3", function(done) {
				// Given
				let inst = this.inst;
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_2x3_LRUDBF.jpg";
				inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);
				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("cubestrip 6x1", function(done) {
				// Given
				let inst = this.inst;
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_6x1_LRUDBF.jpg";
				inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65
				}, DEBUG_CONTEXT_ATTRIBUTES);
				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});

			IT("cubestrip 6x1: flip", function(done) {
				// Given
				let inst = this.inst;
				const tileConfigForCubestrip = [
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 180},
					{flipHorizontal: false, rotation: 180}
				];
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_6x1_krpano.jpg";
				inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "cubemap",
					fieldOfView: 65,
					cubemapConfig: {
						tileConfig: tileConfigForCubestrip,
						order: "LFRBUD"
					}
				}, DEBUG_CONTEXT_ATTRIBUTES);
				inst.on("imageLoaded", when);

				function when() {
					// When
					inst.bindTexture()
						.then(() => {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
									[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
									[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
									[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
									[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
									[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
								]
							).then(() => {
								done();
							});
						});
				}
			});
		});
	});

	describe("Equirectangular Rendering with yaw / pitch", function() {
		IT("should render properly by yaw, pitch, fov", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);
			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
							]
						).then(() => {
							done();
						});
					});
			}
		});


		IT("yaw: 0, pitch:0, fov:65 : IE11", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			inst = new PanoImageRendererOnIE11(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);
			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
							]
						).then(() => {
							done();
						});
					});
			}
		});

		IT("yaw: 0, pitch:0, fov:65 : video IE11", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = document.createElement("video");

			sourceImg.src = "./images/test_equi.mp4";
			sourceImg.load();
			const isVideo = true;
			const threshold = 7;

			inst = new PanoImageRendererOnIE11(sourceImg, 200, 200, isVideo, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			// inst.on("imageLoaded", when); // 2018.02.26. imageLoaded does not gaurantee video is playable. (spec changed)
			sourceImg.addEventListener("loadeddata", when);

			function when(e) {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
							]
						).then(() => {
							done();
						});
					});
			}
		});

		IT("yaw: 0, pitch:0, fov:65 : video IE11 change video size after loaded", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = document.createElement("video");

			sourceImg.src = "./images/test_equi_512.mp4";
			sourceImg.load();
			const isVideo = true;
			const threshold = 7;

			inst = new PanoImageRendererOnIE11(sourceImg, 200, 200, isVideo, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			// inst.once("imageLoaded", onFirstLoad); // 2018.02.26. imageLoaded does not gaurantee video is playable. (spec changed)
			TestHelper.once(sourceImg, "loadeddata", onFirstLoad)

			function onFirstLoad() {
				inst.bindTexture()
				.then(() => {
					// When
					TestHelper.once(sourceImg, "loadeddata", when);
					sourceImg.src = "./images/test_equi.mp4";
				});
			}

			function when() {
				// Then
				renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				).then(() => {
					done();
				});
			}
		});

		IT("yaw: 0, pitch:0, fov:65 : video", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = document.createElement("video");

			sourceImg.src = "./images/test_equi.mp4";
			sourceImg.load();
			const isVideo = true;
			const threshold = 7;

			sourceImg.src = "./images/test_equi.mp4";
			inst = new PanoImageRenderer(sourceImg, 200, 200, isVideo, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			// inst.on("imageLoaded", when); // 2018.02.26. imageLoaded does not gaurantee video is playable. (spec changed)
			sourceImg.addEventListener("loadeddata", when);


			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
							]
						).then(() => {
							done();
						});
					});
			}
		});

		IT("yaw: 0, pitch:0, fov:65 -> 30", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);
			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						inst.render(0, 0, 65);
						inst.render(0, 0, 30);
						// Then
						compare(`./images/PanoViewer/test_equi_0_0_30${suffix}`, inst.canvas, function(pct) {
								expect(pct).to.be.below(threshold);
								done();
							});
					});
			}
		});
	});

	describe("#keepUpdate", () => {
		IT("Should not render internaly when calling render when it doesn't need.", function(done) {
			// Given
			let inst = this.inst;
			let isDrawCalled = false;
			const sourceImg = new Image();
			sourceImg.src = "./images/test_cube.jpg";

			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "cubemap",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			inst.on("imageLoaded", () => {
				inst.render(0, 0, 65);
				inst._draw = function() {
					isDrawCalled = true;
					PanoImageRenderer.prototype._draw.call(inst);
				};

				// When
				inst.keepUpdate(false);
				inst.render(0, 0, 65);

				// Then
				expect(isDrawCalled).to.be.equal(false);
				done();
			});
		});

		IT("should not update video texture after keepUpdate(false) called", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = document.createElement("video");

			sourceImg.src = "./images/PanoViewer/pano.mp4";
			sourceImg.play();
			const isVideo = true;
			const threshold = 7;

			inst = new PanoImageRenderer(sourceImg, 200, 200, isVideo, {
				initialYaw: 90,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);

			sourceImg.addEventListener("loadeddata", when);

			function when() {
				inst.bindTexture()
					.then(() => {
						// When
						inst.keepUpdate(false);

						setTimeout(function() {
							// Then
							renderAndCompareSequentially(
								inst,
								[
									[0, 0, 65, `./images/PanoViewer/pano_0_0_65${suffix}`, threshold],
								]
							).then(() => {
								done();
							});
						}, 1000);
					});
			}
		});
	});

	describe("Cubemap Rendering with Quaternion", () => {
		IT("should render by quaternion in cubemap mode", function(done) {
			// Given
			const tileConfigForCubestrip = {flipHorizontal: true, rotation: 0};
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_1x6_naver.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "cubemap",
				fieldOfView: 65,
				cubemapConfig: {
					tileConfig: tileConfigForCubestrip
				}
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold, USE_QUATERNION],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold, USE_QUATERNION],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold, USE_QUATERNION],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold, USE_QUATERNION],
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold, USE_QUATERNION],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold, USE_QUATERNION]
							]
						).then(() => {
							done();
						});
					});
			}
		});
	});

	describe("Equirectangular Rendering with Quaternion", () => {
		IT("should render by quaternion in equirectangular mode", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);
			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold, USE_QUATERNION],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold, USE_QUATERNION],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold, USE_QUATERNION],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold, USE_QUATERNION],
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold, USE_QUATERNION],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold, USE_QUATERNION]
							]
						).then(() => {
							done();
						});
					});
			}
		});
	});

	describe("CubeStrip Rendering (Only 3x2 is supported currently)", () => {
		/**
		 * This order (RLUDFB) is the way Facebook 3x2 Cubemap, Three.js, forgejs uses
		 */
		IT("should use order RLUDFB (default)", done => {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_3x2_RLUDFB.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				imageType: "cubestrip"
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);

			// inst.attachTo(target);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
								/**
								 * We use reversed image because the bottom & up is rendered differently with ProjectionType.CUBEMAP
								 * But CUBESTRIP is more general way to project on cube
								 */
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90_reverse${suffix}`, threshold],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90_reverse${suffix}`, threshold]
							]
						).then(done);
					});
			}
		});

		IT("should support cubemap order(RLUDBF), apply rotation on some faces.", done => {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_3x2_LRUDBF.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				imageType: "cubestrip",
				"cubemapConfig": {
					order: "RLUDBF",
					tileConfig:
						[{rotation: 0}, {rotation: 0}, {rotation: 180}, {rotation: 180}, {rotation: 0}, {rotation: 0}]
				}
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
								[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
								[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
								[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
								[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold + 1],
								[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
							]
						).then(done);
					});
			}
		});

		IT("should support YouTube cubemap format(EAC)", done => {
			// Given
			let inst = this.inst;
			// TODO: Temporary code until https://github.com/naver/egjs-view360/issues/225 is solved.
			const TEMPORARY_MARGIN_FOR_TRAVIS_FAILURE = 15;
			const sourceImg = new Image();

			// Source: https://www.youtube.com/watch?v=8RadEwX29pA ([360 VR] 힐링에세이 ‘쉼표’ _ 경희궁(Gyeonghuigung Palace 慶熙宮) 편)
			sourceImg.src = "./images/PanoViewer/EAC/EAC_1280x720.jpg";
			inst = new PanoImageRenderer(sourceImg, 300, 300, false, {
				imageType: "cubestrip",
				cubemapConfig: {
					order: "BLFDRU",
					tileConfig:
						[{rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: -90}, {rotation: 180}]
				}
			}, DEBUG_CONTEXT_ATTRIBUTES);
			inst.on("imageLoaded", when);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						// Then
						renderAndCompareSequentially(
							inst,
							[
								[0, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_0_0_90${suffix}`, threshold + TEMPORARY_MARGIN_FOR_TRAVIS_FAILURE],
								[90, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_90_0_90${suffix}`, threshold + TEMPORARY_MARGIN_FOR_TRAVIS_FAILURE],
								[180, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_180_0_90${suffix}`, threshold + TEMPORARY_MARGIN_FOR_TRAVIS_FAILURE],
								[270, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_270_0_90${suffix}`, threshold + TEMPORARY_MARGIN_FOR_TRAVIS_FAILURE],
								[0, 90, 90, `./images/PanoViewer/EAC/EAC_1280x720_0_90_90${suffix}`, threshold + TEMPORARY_MARGIN_FOR_TRAVIS_FAILURE],
								[0, -90, 90, `./images/PanoViewer/EAC/EAC_1280x720_0_-90_90${suffix}`, threshold + TEMPORARY_MARGIN_FOR_TRAVIS_FAILURE]
							]
						).then(done);
					});
			}
		});
	});
});
