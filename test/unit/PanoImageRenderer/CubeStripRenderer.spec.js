import {expect} from "sinon";
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
			const errors = [];

			cubeRenderer.on(Renderer.EVENTS.ERROR, e => {
				errors.push(e);
			});

			// When
			cubeRenderer.bindTexture(gl, null, {naturalWidth: MAX_SIZE + 1, naturalHeight: MAX_SIZE + 1});

			// Then
			expect(errors.length).equals(1);
			errors.forEach(e => {
				expect(e.message).to.be.a("string");
			});
		});
	});
});
