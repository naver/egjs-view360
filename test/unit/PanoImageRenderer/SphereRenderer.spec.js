import {expect} from "chai";
import PanoViewer from "../../../src/PanoViewer/PanoViewer";
import SphereRenderer from "../../../src/PanoImageRenderer/renderer/SphereRenderer";
import Renderer from "../../../src/PanoImageRenderer/renderer/Renderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import {renderAndCompareSequentially, createPanoViewerForRenderingTest, sandbox, cleanup} from "../util";

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;

describe("SphereRenderer", () => {
	describe("Events", () => {
		IT("should fire error events if image is too big", done => {
			// Given
			const canvas = document.createElement("canvas");
			const gl = WebGLUtils.getWebglContext(canvas);
			const MAX_SIZE = WebGLUtils.getMaxTextureSize(gl);
			const renderer = new SphereRenderer({
				format: PanoViewer.STEREO_FORMAT.NONE
			});
			const errors = [];

			renderer.on(Renderer.EVENTS.ERROR, e => {
				errors.push(e);
			});

			// When
			renderer.bindTexture(gl, null, {naturalWidth: MAX_SIZE + 1, naturalHeight: MAX_SIZE + 1});

			// Then
			expect(errors.length).equals(1);
			errors.forEach(e => {
				expect(e.message).to.be.a("string");
			});
			done();
		});
	});

	describe("Stereoscopic rendering test using PanoViewer", () => {
		let target;
		const deviceRatio = window.devicePixelRatio;
		const suffix = `_${deviceRatio}x.png`;

		beforeEach(() => {
      target = sandbox();

			target.style.width = "2000px";
			target.style.height = "2000px";
		});

		afterEach(() => {
			cleanup();
		});

		IT("should render stereoscopic equirectangular image (2:1 ratio)", async () => {
			/**
			 * Given / When
			 */
			const viewer = createPanoViewerForRenderingTest(target, {
				image: "./images/PanoViewer/Stereoscopic/stereoscopic1.png",
        projectionType: PanoViewer.PROJECTION_TYPE.STEREOSCOPIC_EQUI,
      });

      await new Promise(res => viewer.on("ready", res));

			// Then
      const renderer = viewer._photoSphereRenderer;
			const result = await renderAndCompareSequentially(
				renderer,
				[[0, 0, 65, `./images/PanoViewer/Stereoscopic/stereoscopic1_0_0_65${suffix}`, 2]]
			);

			expect(result.success).to.be.equal(true);
		});

		IT("should render streoscopic equirectangular image (1:1 ratio)", async () => {
			/**
			 * Given / When
			 */
			const viewer = createPanoViewerForRenderingTest(target, {
				image: "./images/PanoViewer/Stereoscopic/stereoscopic2.png",
				projectionType: PanoViewer.PROJECTION_TYPE.STEREOSCOPIC_EQUI,
        stereoFormat: PanoViewer.STEREO_FORMAT.TOP_BOTTOM,
			});

			await new Promise(res => viewer.on("ready", res));

			// Then
			const renderer = viewer._photoSphereRenderer;
			const result = await renderAndCompareSequentially(
				renderer,
				[[0, 0, 65, `./images/PanoViewer/Stereoscopic/stereoscopic2_0_0_65${suffix}`, 2]]
			);

			expect(result.success).to.be.equal(true);
		});

		IT("default equirectangular rendering and stereo rendering should not affect each other", async () => {
			const threshold = 3;

			const stereoTarget = sandbox("stereo");
			const defTarget = sandbox("default");

			defTarget.style.width = "2000px";
			defTarget.style.height = "2000px";

			stereoTarget.style.width = "3000px";
			stereoTarget.style.height = "3000px";

			/**
			 * This test is needed because streoscopic is working by sphererRenderer
			 * Given / When
			 */
			const stereoEquiViewer = createPanoViewerForRenderingTest(stereoTarget, {
				image: "./images/PanoViewer/Stereoscopic/stereoscopic2.png",
				projectionType: PanoViewer.PROJECTION_TYPE.STEREOSCOPIC_EQUI,
        stereoFormat: PanoViewer.STEREO_FORMAT.TOP_BOTTOM,
			});

			const defaultEquiViewer = createPanoViewerForRenderingTest(defTarget, {
				image: "./images/test_equi.jpg",
        projectionType: PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR,
			});

			await Promise.all([
				new Promise(res => defaultEquiViewer.on("ready", res)),
				new Promise(res => stereoEquiViewer.on("ready", res))
			]);

			// Then
			const result1 = await renderAndCompareSequentially(
				stereoEquiViewer,
				[[0, 0, 65, `./images/PanoViewer/Stereoscopic/stereoscopic2_0_0_65${suffix}`, threshold]]
      );

			const result2 = await renderAndCompareSequentially(
				defaultEquiViewer,
				[[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threshold]],
      );

			expect(result1.success).to.be.equal(true);
			expect(result2.success).to.be.equal(true);
		});
	});
});
