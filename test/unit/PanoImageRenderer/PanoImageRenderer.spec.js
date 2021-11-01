// eslint-disable-next-line max-classes-per-file
import {expect} from "chai";
import sinon from "sinon";
import {mat4} from "gl-matrix";
import PanoImageRendererForUnitTestInjector from "inject-loader!../PanoImageRendererForUnitTest";
import PanoImageRendererInjector from "inject-loader!../../../src/PanoImageRenderer/PanoImageRenderer"; // eslint-disable-line import/no-duplicates
import RendererInjector from "inject-loader!../../../src/PanoImageRenderer/renderer/Renderer";
import SphereRendererInjector from "inject-loader!../../../src/PanoImageRenderer/renderer/SphereRenderer";
import PanoImageRenderer from "../../../src/PanoImageRenderer/PanoImageRenderer"; // eslint-disable-line import/no-duplicates
import PanoImageRendererForUnitTest from "../PanoImageRendererForUnitTest";
import {compare, createPanoImageRenderer, renderAndCompareSequentially, isVideoLoaded, createVideoElement, sandbox, cleanup} from "../util";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import TestHelper from "../YawPitchControl/testHelper";
import {PROJECTION_TYPE, DEFAULT_CANVAS_CLASS} from "../../../src/PanoViewer/consts";

const RendererOnIE11 = RendererInjector(
	{
		"@egjs/agent": () => ({
			browser: {
				name: "ie",
				version: "11.0",
				majorVersion: 11,
			}
		})
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

const PanoImageRendererOnIE11ForTest = PanoImageRendererForUnitTestInjector(
	{
		"../../src/PanoImageRenderer/PanoImageRenderer": PanoImageRendererOnIE11
	}
).default;

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;
const USE_QUATERNION = true;

const threshold = 3;

describe("PanoImageRenderer", () => {
	console.log(WEBGL_AVAILABILITY ? "gl available" : "no gl");
	const deviceRatio = window.devicePixelRatio;
	const suffix = `_${deviceRatio}x.png`;

	describe("#constructor", () => {
		IT("Instance", () => {
			// Given
			// When
			const inst = createPanoImageRenderer("./images/test_equi.png", false, "equirectangular");

			// Then
			expect(inst).to.be.exist;
		});
	});

	describe("#setImage", () => {
		IT("should fire error when image is invalid", done => {
			// Given
			const inst = createPanoImageRenderer(null, false, "equirectangular");

			// When
			inst.setImage({
				image: "./images/invalid.png"
			});

			// Then
			inst.on("error", () => done());
		});
	});

	describe("#isImageLoaded", () => {
		IT("should return false before image loaded", () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.png";
			const inst = createPanoImageRenderer(sourceImg, false, "equirectangular");

			// When
			const isImageLoaded = inst.isImageLoaded();

			// Then
			expect(isImageLoaded).to.be.false;
		});

		IT("should return true after image loaded", done => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.png";
			const inst = createPanoImageRenderer(sourceImg, false, "equirectangular");

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
			const inst = createPanoImageRenderer(sourceImg, false, "equirectangular");

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
			const inst = createPanoImageRenderer(sourceImg, false, "equirectangular");

			// When
			inst.setImage({
				image: "./images/test_equi_0_0_65.png"
			});
			const isImageLoaded = inst.isImageLoaded();

			// Then
			expect(isImageLoaded).to.be.false;
		});
	});

	describe("adaptive devicePixelRatio", () => {
		IT("when devicePixelRatio is 1, should use 1", () => {
			// Given
			const MockedPanoImageRenderer = PanoImageRendererInjector({
				"../utils/browserFeature": {
					devicePixelRatio: 1
				}
			}).default;

			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";

			// When
			const inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// Then
			expect(inst.canvas.width).to.be.equal(200);
			expect(inst.canvas.height).to.be.equal(200);
		});

		IT("when devicePixelRatio is 2, should use 2", () => {
			// Given
			const MockedPanoImageRenderer = PanoImageRendererInjector({
				"../utils/browserFeature": {
					devicePixelRatio: 2
				}
			}).default;

			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";

			// When
			const inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// Then
			expect(inst.canvas.width).to.be.equal(400);
			expect(inst.canvas.height).to.be.equal(400);
		});

		IT("when devicePixelRatio is 3, should use 2", () => {
			// Given
			const MockedPanoImageRenderer = PanoImageRendererInjector({
				"../utils/browserFeature": {
					devicePixelRatio: 3
				}
			}).default;

			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";

			// When
			const inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
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

	describe("error event", () => {
		IT("Should trigger error event when invalid image url", done => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_not_exist.jpg";

			// When
			const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

			inst.on("error", e => {
				// Then
				expect(e.type).to.be.equal(12);
				done();
			});
		});
	});

	describe("renderingcontextlost / renderingcontextrestore event", () => {
		/**
		 * Skip this test after Chrome 69 update.
		 *
		 * it fails on Chrome Headless 69 of TRAVIS because "webglcontextlost" is not fired
		 * although webgl context is created more than 16.
		 *
		 * But it is working well on Chrome & Chrome Headless 69 of PC (Mac OS X)
		 */
		it.skip("Should trigger renderingcontextlost event when lost context", done => {
			// Given
			const REQUIRED_WEBGL_CONTEXT_COUNT_FOR_CONTEXT_LOST = 16;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "cubemap");
			/**
			 * Cache the context. beacuse it can not be acquired after context-lost
			 * https://stackoverflow.com/questions/37186897/webglcontextrestored-event-not-firing-after-context-lost
			 */
			const loseContext = inst.context.getExtension("WEBGL_lose_context");
			let hasRenderingContextAfterLost;

			inst.on("renderingContextLost", () => {
				hasRenderingContextAfterLost = inst.hasRenderingContext();

				// Force restore context after context lost. It should be fired after some timeout.
				// https://stackoverflow.com/questions/28135551/webgl-context-lost-and-not-restored
				setTimeout(() => loseContext.restoreContext(), 100);
			});
			inst.on("renderingContextRestore", e => {
				// Then
				expect(hasRenderingContextAfterLost).to.be.false;
				expect(inst.hasRenderingContext()).to.be.true;

				done();
			});

			// When
			for (let i = 0; i < REQUIRED_WEBGL_CONTEXT_COUNT_FOR_CONTEXT_LOST; i++) {
				// Following code triggers webgl context lost.
				createPanoImageRenderer(sourceImg, false, "cubemap");
			}
		});

		/**
		 * Above test case is replaced with following test case since Chrome 69 updates.
		 */
		IT("Should trigger renderingcontextlost event when lost context", done => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

			const loseContext = inst.context.getExtension("WEBGL_lose_context");
			let hasRenderingContextAfterLost;

			inst.on("renderingContextLost", () => {
				hasRenderingContextAfterLost = inst.hasRenderingContext();

				// Force restore context after context lost. It should be fired after some timeout.
				// https://stackoverflow.com/questions/28135551/webgl-context-lost-and-not-restored
				setTimeout(() => loseContext.restoreContext(), 100);
			});
			inst.on("renderingContextRestore", e => {
				// Then
				expect(hasRenderingContextAfterLost).to.be.false;
				expect(inst.hasRenderingContext()).to.be.true;

				done();
			});

			// When
			inst.forceContextLoss();
		});
	});

	describe("render without throwing exception", () => {
		IT("Should not render internaly when calling render without image loaded", () => {
			// Given
			let isDrawCalled = false;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_not_exist.jpg";

			const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

			inst._draw = () => {
				isDrawCalled = true;
				PanoImageRenderer.prototype._draw.call(inst);
			};

			// When
			inst.renderWithYawPitch(0, 0, 65);

			// Then
			expect(isDrawCalled).to.be.equal(false);
		});
	});

	describe("Cubemap Rendering", () => {
		describe("separated tiles", () => {
			IT("multiple img url", async () => {
				// Given
				const inst = createPanoImageRenderer([
					"./images/test_cube_r.png",
					"./images/test_cube_l.png",
					"./images/test_cube_u.png",
					"./images/test_cube_d.png",
					"./images/test_cube_b.png",
					"./images/test_cube_f.png"
				], false, "cubemap");

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("multiple img elements", async () => {
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

				const inst = createPanoImageRenderer(imgs, false, "cubemap");

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("multiple img url: order", async () => {
				// Given
				const inst = createPanoImageRenderer([
					"./images/test_cube_l.png",
					"./images/test_cube_r.png",
					"./images/test_cube_u.png",
					"./images/test_cube_b.png",
					"./images/test_cube_d.png",
					"./images/test_cube_f.png"
				], false, "cubemap", {
					order: "LRUBDF", // RLUDBF,
					tileConfig: [
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0}
					]
				});

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("multiple img url: flip", async () => {
				// Given
				const cubemapConfig = {
					tileConfig: [
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: false, rotation: 0},
						{flipHorizontal: true, rotation: 0}
					]
				};
				const inst = createPanoImageRenderer([
					"./images/test_cube_r.png",
					"./images/test_cube_l.png",
					"./images/test_cube_u.png",
					"./images/test_cube_d.png",
					"./images/test_cube_b.png",
					"./images/test_cube_f_hflip.png"
				], false, "cubemap", cubemapConfig);

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("multiple img url: flip rotation", async () => {
				// Given
				const cubemapConfig = {
					tileConfig: [
						{flipHorizontal: true, rotation: 0},
						{flipHorizontal: true, rotation: 0},
						{flipHorizontal: true, rotation: 180},
						{flipHorizontal: true, rotation: 180},
						{flipHorizontal: true, rotation: 0},
						{flipHorizontal: true, rotation: 0}
					]
				};
				const inst = createPanoImageRenderer([
					"./images/test_cube_r_hflip.png",
					"./images/test_cube_l_hflip.png",
					"./images/test_cube_u_hflip_180.png",
					"./images/test_cube_d_hflip_180.png",
					"./images/test_cube_b_hflip.png",
					"./images/test_cube_f_hflip.png"
				], false, "cubemap", cubemapConfig);

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});
		});

		describe("cubestrip", () => {
			IT("cubestrip 1x6", async () => {
				// Given
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_1x6_LRUDBF.jpg";
				const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, 2],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, 2],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, 2],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, 2],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, 2],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, 2]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("cubestrip 1x6: flip rotate", async () => {
				// Given
				const tileConfigForCubestrip = {flipHorizontal: true, rotation: 0};
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_1x6_naver.jpg";
				const inst = createPanoImageRenderer(sourceImg, false, "cubemap", {
					tileConfig: tileConfigForCubestrip
				});

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("cubestrip 1x6: rotate", async () => {
				// Given
				const tileConfigForCubestrip = [
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 0},
					{flipHorizontal: false, rotation: 180},
					{flipHorizontal: false, rotation: 180}
				];
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_1x6_krpano.jpg";

				const inst = createPanoImageRenderer(sourceImg, false, "cubemap", {
					order: "LFRBUD",
					tileConfig: tileConfigForCubestrip
				});

				await new Promise(res => inst.on("imageLoaded", res));


				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("cubestrip 3x2", async () => {
				// Given
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_3x2_LRUDBF.jpg";

				const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

      IT("cubemap 3x2 - trim", async () => {
				// Given
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_3x2_small.png";

				const inst_trim0 = createPanoImageRenderer(sourceImg, false, "cubemap", { trim: 0, order: "RLUDFB" });
        const inst_trim2 = createPanoImageRenderer(sourceImg, false, "cubemap", { trim: 2, order: "RLUDFB" });

        await Promise.all([
          new Promise(res => inst_trim0.on("imageLoaded", res)),
          new Promise(res => inst_trim2.on("imageLoaded", res))
        ]);

				// When
				await inst_trim0.bindTexture();
        await inst_trim2.bindTexture();

				// Then
				const result_trim0 = await renderAndCompareSequentially(
					inst_trim0, [[135, -45, 30, `./images/PanoViewer/test_cube_trim_0${suffix}`, threshold]]
				);

        const result_trim2 = await renderAndCompareSequentially(
					inst_trim2, [[135, -45, 30, `./images/PanoViewer/test_cube_trim_2${suffix}`, threshold]]
				);

				expect(result_trim0.success).to.be.equal(true);
        expect(result_trim2.success).to.be.equal(true);
			});

			IT("cubestrip 3x2 - trim", async () => {
				// Given
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_3x2_small.png";
        "RLUDFB"

				const inst_trim0 = createPanoImageRenderer(sourceImg, false, "cubestrip", { trim: 0 });
        const inst_trim2 = createPanoImageRenderer(sourceImg, false, "cubestrip", { trim: 2 });

        await Promise.all([
          new Promise(res => inst_trim0.on("imageLoaded", res)),
          new Promise(res => inst_trim2.on("imageLoaded", res))
        ]);

				// When
				await inst_trim0.bindTexture();
        await inst_trim2.bindTexture();

				// Then
				const result_trim0 = await renderAndCompareSequentially(
					inst_trim0, [[135, -45, 30, `./images/PanoViewer/test_cube_trim_0${suffix}`, threshold]]
				);

        const result_trim2 = await renderAndCompareSequentially(
					inst_trim2, [[135, -45, 30, `./images/PanoViewer/test_cube_trim_2${suffix}`, threshold]]
				);

				expect(result_trim0.success).to.be.equal(true);
        expect(result_trim2.success).to.be.equal(true);
			});

			// This test will fail on iOS safari, because video will not start load without use interaction.
			IT("cubestrip 3x2: video", async () => {
				// Given
				const isVideo = true;
				const video = createVideoElement("./images/test_cube_3x2_LRUDBF.mp4");

				const inst = createPanoImageRenderer(video, isVideo, "cubemap");

				await isVideoLoaded(video);

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, 6],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, 6],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, 6],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, 6],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, 6],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, 6]
					]
				);

				expect(result.success).to.be.equal(true);
				video.remove();
			});

			IT("cubestrip 2x3", done => {
				// Given
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_2x3_LRUDBF.jpg";

				const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

				inst.on("imageLoaded", () => {
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
				});
			});

			IT("cubestrip 6x1", async () => {
				// Given
				const sourceImg = new Image();

				sourceImg.src = "./images/test_cube_6x1_LRUDBF.jpg";
				const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});

			IT("cubestrip 6x1: flip", async () => {
				// Given
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

				const inst = createPanoImageRenderer(sourceImg, false, "cubemap", {
					tileConfig: tileConfigForCubestrip,
					order: "LFRBUD"
				});

				await new Promise(res => inst.on("imageLoaded", res));

				// When
				await inst.bindTexture();

				// Then
				const result = await renderAndCompareSequentially(
					inst,
					[
						[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
						[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
						[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
						[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
						[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
						[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
					]
				);

				expect(result.success).to.be.equal(true);
			});
		});
	});

	describe("Equirectangular Rendering with yaw / pitch", () => {
		IT("should render properly by yaw, pitch, fov", async () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "equirectangular");

			await new Promise(res => inst.on("imageLoaded", res));

			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
				]
			);

			expect(result.success).to.be.equal(true);
		});


		IT("yaw: 0, pitch:0, fov:65 : IE11", async () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			const inst = new PanoImageRendererOnIE11ForTest(sourceImg, 200, 200, false, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				imageType: "equirectangular",
				fieldOfView: 65
			});

			await new Promise(res => inst.on("imageLoaded", res));

			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
				]
			);

			expect(result.success).to.be.equal(true);
		});

		IT("yaw: 0, pitch:0, fov:65 : video IE11", async () => {
			// Given
			const sourceImg = createVideoElement("./images/test_equi.mp4");
			const isVideo = true;
			const thresholdMargin = 4; /* Exceptional Case */

			const inst = new PanoImageRendererOnIE11ForTest(sourceImg, 200, 200, isVideo, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// inst.on("imageLoaded", when); // 2018.02.26. imageLoaded does not gaurantee video is playable. (spec changed)
			await isVideoLoaded(sourceImg);

			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold + thresholdMargin],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold + thresholdMargin],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold + thresholdMargin],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold + thresholdMargin],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold + thresholdMargin],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold + thresholdMargin]
				]
			);

			expect(result.success).to.be.equal(true);
			inst.destroy();
			sourceImg.remove();
		});

		IT("yaw: 0, pitch:0, fov:65 : video IE11 change video size after loaded", async () => {
			// Given
			const sourceImg = createVideoElement("./images/test_equi_512.mp4");
			const isVideo = true;
			const thresholdMargin = 4; /* Exceptional Case */

			const inst = new PanoImageRendererOnIE11ForTest(sourceImg, 200, 200, isVideo, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// inst.once("imageLoaded", onFirstLoad); // 2018.02.26. imageLoaded does not gaurantee video is playable. (spec changed)
			await isVideoLoaded(sourceImg);

			// onFirstLoad
			await inst.bindTexture();

			// When
			sourceImg.src = "./images/test_equi.mp4";
			await isVideoLoaded(sourceImg);

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold + thresholdMargin],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold + thresholdMargin],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold + thresholdMargin],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold + thresholdMargin],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold + thresholdMargin],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold + thresholdMargin]
				]
			);

			expect(result.success).to.be.equal(true);
			sourceImg.remove();
			inst.destroy();
		});

		IT("yaw: 0, pitch:0, fov:65 : video", async () => {
			// Given
			const sourceImg = createVideoElement("./images/test_equi.mp4");
			const isVideo = true;
			const thresholdMargin = 4; /* Exceptional Case */

			const inst = createPanoImageRenderer(sourceImg, isVideo, "equirectangular");

			// inst.on("imageLoaded", when); // 2018.02.26. imageLoaded does not gaurantee video is playable. (spec changed)
			await isVideoLoaded(sourceImg);

			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold + thresholdMargin],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold + thresholdMargin],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold + thresholdMargin],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold + thresholdMargin],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold + thresholdMargin],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold + thresholdMargin]
				]
			);

			expect(result.success).to.be.equal(true);
			inst.destroy();
			sourceImg.remove();
		});

		IT("yaw: 0, pitch:0, fov:65 -> 30", done => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "equirectangular");

			inst.on("imageLoaded", () => {
				// When
				inst.bindTexture()
					.then(() => {
						inst.renderWithYawPitch(0, 0, 65);
						inst.renderWithYawPitch(0, 0, 30);
						// Then
						compare(`./images/PanoViewer/test_equi_0_0_30${suffix}`, inst.canvas, pct => {
							expect(pct).to.be.below(threshold);
							done();
						});
					});
			});
		});
	});

	describe("#keepUpdate", () => {
		IT("Should not render internaly when calling render when it doesn't need.", done => {
			// Given
			let isDrawCalled = false;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube.jpg";

			const inst = createPanoImageRenderer(sourceImg, false, "cubemap");

			inst.on("imageLoaded", () => {
				inst.renderWithYawPitch(0, 0, 65);
				inst._draw = () => {
					isDrawCalled = true;
					PanoImageRendererForUnitTest.prototype._draw.call(inst);
				};

				// When
				inst.keepUpdate(false);
				inst.renderWithYawPitch(0, 0, 65);

				// Then
				expect(isDrawCalled).to.be.equal(false);
				done();
			});
    });

    IT("should update video texture by default", async () => {
			// Given
			const thresholdMargin = 4; // Some test cases are fail on TRAVIS CI. So make it margin.
			const srcVideo = document.createElement("video");

			srcVideo.src = "./images/PanoViewer/pano.mp4";
			srcVideo.muted = true;
			const inst = createPanoImageRenderer(srcVideo, true, "equirectangular");

			await isVideoLoaded(srcVideo);
			await inst.bindTexture();

			// When
			srcVideo.currentTime = 1;

			// Video frame is updated very slowly on CI Evironment(Ubuntu 14). So apply moderately large timeout.
			await TestHelper.wait(1000);

			// Then
			/**
			 * following image is not exactly captured on 1 sec. It's 'about' time.
			 * It is captured on this test case after following render test.
			 */
			await renderAndCompareSequentially(
				inst, [[0, 0, 65, `./images/PanoViewer/pano_1sec_0_0_65${suffix}`, threshold + thresholdMargin]]
			);
    });

		IT("should not update video texture when keepUpdate(false) although it is playing", async () => {
			// Given
			const TIMEOUT = 1000;
			const srcVideo = document.createElement("video");

			srcVideo.src = "./images/PanoViewer/pano.mp4";
			srcVideo.muted = true;
			srcVideo.play();

			const inst = createPanoImageRenderer(srcVideo, true, "equirectangular");

			await isVideoLoaded(srcVideo);
			await inst.bindTexture();

			// When
			// render first frame.
			// We will compare the canvas image after 1 seconds playing.
			// keepUpdate(false) should not update canvas.
			inst.keepUpdate(false);
			inst.renderWithYawPitch(0, 0, 65);

			let beforeBlob;

			await new Promise(res => {
				inst.canvas.toBlob(canvasData => {
					beforeBlob = canvasData.slice();
					res();
				}, "image/png");
			});

			// Waiting for playing 1 seconds
			await TestHelper.wait(TIMEOUT);
			inst.renderWithYawPitch(0, 0, 65);

			let misMatchPercentage;

			await new Promise(res => {
				inst.canvas.toBlob(afterBlob => {
					window.resemble(beforeBlob)
						.compareTo(afterBlob)
						.onComplete(event => {
							// if keepUpdate is false, canvas should not be updated. So mismatch percenteage should be 0.
							misMatchPercentage = parseFloat(event.misMatchPercentage);
							res();
						});
				}, "image/png");
			});

			// Then
			expect(misMatchPercentage).to.be.equal(0);
			srcVideo.remove();
		});

		IT("should update video texture when keepUpdate(true)", async () => {
			// Given
			const thresholdMargin = 4; // Some test cases are fail on TRAVIS CI. So make it margin.
			const srcVideo = document.createElement("video");

			srcVideo.src = "./images/PanoViewer/pano.mp4";
			srcVideo.muted = true;
			const inst = createPanoImageRenderer(srcVideo, true, "equirectangular");

			await isVideoLoaded(srcVideo);
			await inst.bindTexture();

			// When
			srcVideo.currentTime = 1;
			inst.keepUpdate(true);

			// Video frame is updated very slowly on CI Evironment(Ubuntu 14). So apply moderately large timeout.
			await TestHelper.wait(1000);

			// Then
			/**
			 * following image is not exactly captured on 1 sec. It's 'about' time.
			 * It is captured on this test case after following render test.
			 */
			await renderAndCompareSequentially(
				inst, [[0, 0, 65, `./images/PanoViewer/pano_1sec_0_0_65${suffix}`, threshold + thresholdMargin]]
			);
		});
	});

	describe("Cubemap Rendering with Quaternion", () => {
		IT("should render by quaternion in cubemap mode", async () => {
			// Given
			const tileConfigForCubestrip = {flipHorizontal: true, rotation: 0};
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_1x6_naver.jpg";

			const inst = createPanoImageRenderer(sourceImg, false, "cubemap", {
				tileConfig: tileConfigForCubestrip
			});

			await new Promise(res => inst.on("imageLoaded", res));

			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold, USE_QUATERNION],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold, USE_QUATERNION],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold, USE_QUATERNION],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold, USE_QUATERNION],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold, USE_QUATERNION],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold, USE_QUATERNION]
				]
			);

			expect(result.success).to.be.equal(true);
		});
	});

	describe("Equirectangular Rendering with Quaternion", () => {
		IT("should render by quaternion in equirectangular mode", async () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "equirectangular");

			await new Promise(res => inst.on("imageLoaded", res));

			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold, USE_QUATERNION],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold, USE_QUATERNION],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold, USE_QUATERNION],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold, USE_QUATERNION],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold, USE_QUATERNION],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold, USE_QUATERNION]
				]
			);

			expect(result.success).to.be.equal(true);
		});
	});

	describe("CubeStrip Rendering (Only 3x2 is supported currently)", () => {
		/**
		 * This order (RLUDFB) is the way Facebook 3x2 Cubemap, Three.js, forgejs uses
		 */
		IT("should use order RLUDFB (default)", async () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_3x2_RLUDFB.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "cubestrip");

			await new Promise(res => inst.on("imageLoaded", res));

			// inst.attachTo(target);
			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
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
			);

			expect(result.success).to.be.equal(true);
		});

		IT("should support cubemap order(RLUDBF), apply rotation on some faces.", async () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube_3x2_LRUDBF.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "cubestrip", {
				order: "RLUDBF",
				tileConfig:
				[{rotation: 0}, {rotation: 0}, {rotation: 180}, {rotation: 180}, {rotation: 0}, {rotation: 0}]
			});

			await new Promise(res => inst.on("imageLoaded", res));


			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold],
					[90, 0, 90, `./images/PanoViewer/test_cube_90_0_90${suffix}`, threshold],
					[180, 0, 90, `./images/PanoViewer/test_cube_180_0_90${suffix}`, threshold],
					[270, 0, 90, `./images/PanoViewer/test_cube_270_0_90${suffix}`, threshold],
					[0, 90, 90, `./images/PanoViewer/test_cube_0_90_90${suffix}`, threshold + 1],
					[0, -90, 90, `./images/PanoViewer/test_cube_0_-90_90${suffix}`, threshold]
				]
			);

			expect(result.success).to.be.equal(true);
		});

		IT("should support YouTube cubemap format(EAC)", async () => {
			// Given
			const sourceImg = new Image();

			// Source: https://www.youtube.com/watch?v=8RadEwX29pA ([360 VR] 힐링에세이 ‘쉼표’ _ 경희궁(Gyeonghuigung Palace 慶熙宮) 편)
			sourceImg.src = "./images/PanoViewer/EAC/EAC_1280x720.jpg";
			const inst = createPanoImageRenderer(sourceImg, false, "cubestrip", {
				order: "BLFDRU",
				tileConfig:
					[{rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: -90}, {rotation: 180}]
			}, {width: 300, height: 300});

			await new Promise(res => inst.on("imageLoaded", res));

			// When
			await inst.bindTexture();

			// Then
			const result = await renderAndCompareSequentially(
				inst,
				[
					[0, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_0_0_90${suffix}`, threshold],
					[90, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_90_0_90${suffix}`, threshold],
					[180, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_180_0_90${suffix}`, threshold],
					[270, 0, 90, `./images/PanoViewer/EAC/EAC_1280x720_270_0_90${suffix}`, threshold],
					[0, 90, 90, `./images/PanoViewer/EAC/EAC_1280x720_0_90_90${suffix}`, threshold],
					[0, -90, 90, `./images/PanoViewer/EAC/EAC_1280x720_0_-90_90${suffix}`, threshold]
				]
			);

			expect(result.success).to.be.equal(true);
		});
	});

	describe("#enterVR", () => {
		let inst;
		let reqPresentStub;
		const origGetVRDisplays = navigator.getVRDisplays;

		class MockAnimator {
			setCallback() {}
			setContext() {}
			start() {}
			stop() {}
		}

		const PanoImageRendererVR = PanoImageRendererInjector({
			"../utils/browserFeature": {
				devicePixelRatio: 2,
				WEBXR_SUPPORTED: false,
			},
			"./WebGLAnimator": MockAnimator,
		}).default;

		before(() => {
			// I've chosen WebVR API as it's slightly more easier to test with
			window.WebVRConfig = {
				FORCE_ENABLE_VR: true,
			};

			// eslint-disable-next-line no-new
			new window.WebVRPolyfill();

			reqPresentStub = sinon.stub(window.VRDisplay.prototype, "requestPresent");

			reqPresentStub.returns(Promise.resolve());
		});

		beforeEach(async () => {
			const sourceImg = new Image();

			sourceImg.src = "./images/PanoViewer/Stereoscopic/stereoscopic1.png";
			inst = new PanoImageRendererVR(sourceImg, 200, 200, false, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				fieldOfView: 65,
				imageType: PROJECTION_TYPE.STEREOSCOPIC_EQUI,
			});

			const wrapper = sandbox();

			inst.attachTo(wrapper);
			await inst.bindTexture();
		});

		afterEach(() => {
			inst && inst.destroy();
			inst = null;
			cleanup();
			navigator.getVRDisplays = origGetVRDisplays;
		});

		after(() => {
			reqPresentStub.restore();
		});

		it("can't enter VR when WebVR is not available in browser", async () => {
			// Given
			const rejectSpy = sinon.spy();

			navigator.getVRDisplays = null;

			// When
			await inst.enterVR()
				.catch(rejectSpy);

			// Then
			expect(rejectSpy.called).to.be.true;
		});

		it("can enter VR with WebVR-polyfill enabled", done => {
			// Given
			const resolveSpy = sinon.spy();

			// When
			try {
				inst.enterVR()
					.then(resolveSpy)
					.then(() => {
						// Then
						expect(resolveSpy.called).to.be.true;
						done();
					});
			} catch (e) {
				done();
			}
		});

		it("should attach display present change event on window after enter VR", async () => {
			// Give
			const eventAddSpy = sinon.spy(window, "addEventListener");

			// When
			await inst.bindTexture();
			await inst.enterVR();

			// Then
			window.addEventListener.restore();
			expect(eventAddSpy.calledWith("vrdisplaypresentchange")).to.be.true;
		});

		it("should return canvas size back to normal after exitVR is called", async () => {
			// Give
			inst.renderWithYawPitch(0, 0, 65); // render to update viewport

			const canvas = inst.canvas;
			const origViewport = [canvas.width, canvas.height];

			await inst.enterVR();

			// When
			const beforeExit = [canvas.width, canvas.height];

			inst.exitVR();

			const afterExit = [canvas.width, canvas.height];

			// Then
			expect(beforeExit).not.deep.equals(origViewport);
			expect(afterExit).deep.equals(origViewport);
		});

		it("should call destroy & stop animation when requestPresent rejected", async () => {
			// Given
			const requestPresentStub = sinon.stub();
			const rejectSpy = sinon.spy();
			const destroySpy = sinon.spy();
			const startAnimSpy = sinon.spy();
			const stopAnimSpy = sinon.spy();

			class XRManagerStub {
				destroy = destroySpy
				requestPresent = reqPresentStub
			}
			class WebGLAnimatorStub {
				start = startAnimSpy
				stop = stopAnimSpy
			}

			requestPresentStub.returns(Promise.reject());

			const PanoImageRendererVRWithManagerMocked = PanoImageRendererInjector({
				"./vr/XRManager": XRManagerStub,
				"./WebGLAnimator": WebGLAnimatorStub,
				"../utils/browserFeature": {
					devicePixelRatio: 2,
					WEBXR_SUPPORTED: true,
				},
			}).default;

			const sourceImg = new Image();

			sourceImg.src = "./images/PanoViewer/Stereoscopic/stereoscopic1.png";
			inst = new PanoImageRendererVRWithManagerMocked(sourceImg, 200, 200, false, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				fieldOfView: 65,
				imageType: PROJECTION_TYPE.STEREOSCOPIC_EQUI,
			});

			// When
			await inst.enterVR()
				.catch(rejectSpy);

			// Then
			expect(rejectSpy.calledOnce).to.be.true;
			expect(destroySpy.calledOnce).to.be.true;
			expect(startAnimSpy.calledOnce).to.be.true;
			expect(stopAnimSpy.calledOnce).to.be.true;
			expect(stopAnimSpy.calledBefore(startAnimSpy)).to.be.true;
		});
	});

	describe("calibration on first VR frame", () => {
		const addCallbackSpy = sinon.spy();
		const setYawOffsetSpy = sinon.spy();
		const getEyeParamsStub = sinon.stub();
		const sourceImg = new Image();

		sourceImg.src = "./images/PanoViewer/Stereoscopic/stereoscopic1.png";

		class XRManagerStub {
			context = window;
			addEndCallback = addCallbackSpy;
			setYawOffset = setYawOffsetSpy;
			getEyeParams = getEyeParamsStub;
			requestPresent() { return Promise.resolve(); }
			canRender() { return true; }
			beforeRender() {}
			afterRender() {}
			destroy() {}
		}

		const PanoImageRendererXR = PanoImageRendererInjector({
			"./vr/XRManager": XRManagerStub,
			"../utils/browserFeature": {
				WEBXR_SUPPORTED: true,
			},
		}).default;

		afterEach(() => {
			setYawOffsetSpy.resetHistory();
			addCallbackSpy.resetHistory();
			getEyeParamsStub.reset();
		});

		it("should apply correct yaw offset", async () => {
			// Given
			const renderer = new PanoImageRendererXR(sourceImg, 200, 200, false, document.createElement("div"), DEFAULT_CANVAS_CLASS, {
				fieldOfView: 65,
				imageType: PROJECTION_TYPE.STEREOSCOPIC_EQUI,
			});

			// Let's say that it's looking opposite direction
			getEyeParamsStub.returns([
				{
					// From the values I've tested on Samsung browser
					mvMatrix: mat4.rotateY(mat4.create(), mat4.create(), Math.PI),
					pMatrix: mat4.fromValues(
						1, 0, 0, 0,
						0, 1, 0, 0,
						0, 0, -1, 0,
						0, 0, 0, 1,
					),
					viewport: [0, 0, 0.5, 1]
				},
				{
					mvMatrix: mat4.create(),
					pMatrix: mat4.create(),
					viewport: [0, 0, 0.5, 1]
				}, // second one is not important
			]);

			// When
			await renderer.bindTexture();
			await renderer.enterVR();
			await new Promise(res => {
				setTimeout(res, 100);
			}); // wait for the first rendering happen

			// Then
			expect(setYawOffsetSpy.calledWith(-Math.PI)).to.be.true;
		});
	});
});
