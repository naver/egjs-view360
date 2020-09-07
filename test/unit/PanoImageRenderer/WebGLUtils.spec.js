import {expect} from "chai";
import WebglUtilsInjector from "inject-loader!../../../src/PanoImageRenderer/WebGLUtils"; // eslint-disable-line import/no-duplicates
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils"; // eslint-disable-line import/no-duplicates

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;

describe("WebglUtils", () => {
	describe("#isWebGLAvailable", () => {
		IT("isWebGLAvailable", () => {
			// Given
			// When
			const webglAvailability = WebGLUtils.isWebGLAvailable();

			// Then
			expect(webglAvailability).to.be.true;
		});
	});

	describe("#isStableWebGL", () => {
		[
			{os: {name: "android", version: "6", majorVersion: 6}, browser: {name: "chrome"}},
			{os: {name: "android", version: "4.4", majorVersion: 4}, browser: {name: "chrome"}},
			{os: {name: "ios", version: "9", majorVersion: 9}, browser: {name: "safari"}}
		].forEach(agentInfo => {
			it(`on stable browser: ${JSON.stringify(agentInfo)}`, () => {
				// Given
				const MockWebglUtils = WebglUtilsInjector({
					"@egjs/agent": () => agentInfo
				}).default;

				// When
				const isStableWebGL = MockWebglUtils.isStableWebGL();

				// Then
				expect(isStableWebGL).to.be.true;
			});
		});

		[
			{os: {name: "android", version: "4.3", majorVersion: 4}, browser: {name: "chrome"}},
			{os: {name: "android", version: "4.4", majorVersion: 4}, browser: {name: "samsung internet"}}
		].forEach(agentInfo => {
			it(`on unstable browser: ${JSON.stringify(agentInfo)}`, () => {
				// Given
				const MockWebglUtils = WebglUtilsInjector({
					"@egjs/agent": () => agentInfo
				}).default;

				// When
				const isStableWebGL = MockWebglUtils.isStableWebGL();

				// Then
				expect(isStableWebGL).to.be.false;
			});
		});
	});

	describe("#getWebglContext", () => {
		IT("should have attribute antialias false as a default", () => {
			const canvas = document.createElement("canvas");
			const context = WebGLUtils.getWebglContext(canvas);

			expect(context.getContextAttributes().antialias).to.be.equal(false);
		});
	});

	describe("#texImage2D", () => {
		IT("should not fire exception despite of error", () => {
			// Given
			const WIDTH = 150;
			const HEIGHT = 150;

			// 3D Canvas to draw (Dest Image)
			const canvas = document.createElement("canvas");

			canvas.width = WIDTH;
			canvas.height = HEIGHT;

			const gl = WebGLUtils.getWebglContext(canvas);
			let exceptionOccurs = false;

			// When
			try {
				// Invalid pixels info
				WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, 0);
				// no parameter
				WebGLUtils.texImage2D();
			} catch (e) {
				exceptionOccurs = true;
			}

			// Then
			expect(exceptionOccurs).to.be.equal(false);
		});
	});
});
