import SphereRenderer from "../../../src/PanoImageRenderer/renderer/SphereRenderer";
import Renderer from "../../../src/PanoImageRenderer/renderer/Renderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;

describe("SphereRenderer", () => {
	describe("Events", () => {
		IT("should fire error events if image is too big", done => {
			// Given
			const canvas = document.createElement("canvas");
			const gl = WebGLUtils.getWebglContext(canvas);
			const MAX_SIZE = WebGLUtils.getMaxTextureSize(gl);
			const cubeRenderer = new SphereRenderer();

			cubeRenderer.on(Renderer.EVENTS.ERROR, then);

			// When
			cubeRenderer.bindTexture(gl, null, {naturalWidth: MAX_SIZE + 1, naturalHeight: MAX_SIZE + 1});

			// Then
			function then(e) {
				expect(e.message).to.be.a("string");
				done();
			}
		});
	});
});
