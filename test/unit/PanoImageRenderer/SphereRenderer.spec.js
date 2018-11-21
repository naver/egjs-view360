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
		let target;
		const deviceRatio = window.devicePixelRatio;
		const suffix = `_${deviceRatio}x.png`;

		beforeEach(() => {
			target = sandbox();

			target.style.width = "300px";
			target.style.height = "300px";
		});

		afterEach(() => {
			// cleanup();
		});

		IT("should use half height texture coordinate relative to default sphere renerer texture coordniates", () => {
			// Given
			const defaultEquiRenderer = new SphereRenderer();
			const stereoEquiRenderer = new SphereRenderer({isStereoscopic: true});

			// When
			const textureCoord1 = defaultEquiRenderer.getTextureCoordData();
			const textureCoord2 = stereoEquiRenderer.getTextureCoordData();

			// Then
			expect(textureCoord1.length).to.be.equal(textureCoord2.length);
			const successAll = textureCoord1.every((val, index) => {
				// texture coord in vertical direction should be half of default texture coord.
				if (index % 2 === 1 && textureCoord2[index] !== val / 2) {
					return false;
				}

				return true;
			});
			expect(successAll).to.be.equal(true);
		});

		IT("should render streoscopic equirectangular image using PanoViewer", async () => {
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
	});
});
