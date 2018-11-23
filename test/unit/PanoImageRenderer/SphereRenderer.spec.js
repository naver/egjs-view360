import PanoViewer from "../../../src/PanoViewer/PanoViewer";
import SphereRenderer from "../../../src/PanoImageRenderer/renderer/SphereRenderer";
import Renderer from "../../../src/PanoImageRenderer/renderer/Renderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import {renderAndCompareSequentially, createPanoViewerForRenderingTest} from "../util";

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;

describe("SphereRenderer", () => {
	describe("Events", () => {
		IT("should fire error events if image is too big", done => {
			// Given
			const canvas = document.createElement("canvas");
			const gl = WebGLUtils.getWebglContext(canvas);
			const MAX_SIZE = WebGLUtils.getMaxTextureSize(gl);
			const renderer = new SphereRenderer();

			renderer.on(Renderer.EVENTS.ERROR, then);

			// When
			renderer.bindTexture(gl, null, {naturalWidth: MAX_SIZE + 1, naturalHeight: MAX_SIZE + 1});

			// Then
			function then(e) {
				expect(e.message).to.be.a("string");
				done();
			}
		});
	});

	describe("Stereoscopic", () => {
		IT("should use half height texture coordinate relative to default sphere renerer texture coordniates", () => {
			// Given
			const defaultEquiRenderer = new SphereRenderer();
			const stereoEquiRenderer = new SphereRenderer({isStereoscopic: true});

			// When
			const textureCoord1 = defaultEquiRenderer.getTextureCoordData();
			const textureCoord2 = stereoEquiRenderer.getTextureCoordData();

			const checkHeightIsHalf = (val, index) => {
				// texture coord in vertical direction should be half of default texture coord.
				if (index % 2 === 1 && textureCoord2[index] !== val / 2) {
					return false;
				}

				return true;
			};

			// Then
			expect(textureCoord1.length).to.be.equal(textureCoord2.length);
			expect(textureCoord1.every(checkHeightIsHalf)).to.be.equal(true);
		});

		IT("isStereoscopic == false is same with undefined ", () => {
			// Given
			const defaultEquiRenderer = new SphereRenderer();
			const stereoEquiRenderer = new SphereRenderer({isStereoscopic: false});

			// When
			const textureCoord1 = defaultEquiRenderer.getTextureCoordData();
			const textureCoord2 = stereoEquiRenderer.getTextureCoordData();

			const checkSameWithTextureCoord2 = (val, index) => {
				return textureCoord2[index] === val;
			};

			// Then
			expect(textureCoord1.length).to.be.equal(textureCoord2.length);
			expect(textureCoord1.every(checkSameWithTextureCoord2)).to.be.equal(true);
		});
	});

	describe("Stereoscopic rendering test using PanoViewer", () => {
		let target;
		const deviceRatio = window.devicePixelRatio;
		const suffix = `_${deviceRatio}x.png`;

		beforeEach(() => {
			target = sandbox();

			target.style.width = "300px";
			target.style.height = "300px";
		});

		afterEach(() => {
			cleanup();
		});

		IT("should render streoscopic equirectangular image (2:1 ratio)", async () => {
			/**
			 * Given / When
			 */
			const viewer = createPanoViewerForRenderingTest(target, {
				image: "./images/PanoViewer/Stereoscopic/stereoscopic1.png",
				projectionType: PanoViewer.PROJECTION_TYPE.STEREOSCOPIC_EQUI
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
				projectionType: PanoViewer.PROJECTION_TYPE.STEREOSCOPIC_EQUI
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
			const threashold = 3;

			const stereoTarget = sandbox("stereo");
			const defTarget = sandbox("default");

			defTarget.style.width = "200px";
			defTarget.style.height = "200px";

			stereoTarget.style.width = "300px";
			stereoTarget.style.height = "300px";

			/**
			 * This test is needed because streoscopic is working by sphererRenderer
			 * Given / When
			 */
			const stereoEquiViewer = createPanoViewerForRenderingTest(stereoTarget, {
				image: "./images/PanoViewer/Stereoscopic/stereoscopic2.png",
				projectionType: PanoViewer.PROJECTION_TYPE.STEREOSCOPIC_EQUI
			});

			const defaultEquiViewer = createPanoViewerForRenderingTest(defTarget, {
				image: "./images/test_equi.jpg",
				projectionType: PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR
			});

			await Promise.all([
				new Promise(res => defaultEquiViewer.on("ready", res)),
				new Promise(res => stereoEquiViewer.on("ready", res))
			]);

			// Then
			const result1 = await renderAndCompareSequentially(
				stereoEquiViewer,
				[[0, 0, 65, `./images/PanoViewer/Stereoscopic/stereoscopic2_0_0_65${suffix}`, threashold]]
			);

			const result2 = await renderAndCompareSequentially(
				defaultEquiViewer,
				[[0, 0, 90, `./images/PanoViewer/test_cube_0_0_90${suffix}`, threashold]],
			);

			expect(result1.success).to.be.equal(true);
			expect(result2.success).to.be.equal(true);
		});
	});
});
