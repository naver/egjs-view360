import {expect} from "chai";
import CubeStripRenderer from "../../../src/PanoImageRenderer/renderer/CubeStripRenderer";
import Renderer from "../../../src/PanoImageRenderer/renderer/Renderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;

describe("CubeStripRenderer", () => {
	describe("Events", () => {
		IT("should fire error events if image is too big", done => {
			// Given
			const canvas = document.createElement("canvas");
			const gl = WebGLUtils.getWebglContext(canvas);
			const MAX_SIZE = WebGLUtils.getMaxTextureSize(gl);
			const cubeRenderer = new CubeStripRenderer();

			cubeRenderer.on(Renderer.EVENTS.ERROR, e => {
				// Then
				expect(e.message).to.be.a("string");
				done();
			});

			// When
			cubeRenderer.bindTexture(gl, null, {naturalWidth: MAX_SIZE + 1, naturalHeight: MAX_SIZE + 1});
		});
	});
});
