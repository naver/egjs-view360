import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import WebglUtilsInjector from "inject-loader!../../../src/PanoImageRenderer/WebGLUtils";

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;

describe("WebglUtils", function() {
	describe("#isWebGLAvailable", function() {
		IT("isWebGLAvailable", () => {
            // Given
			// When
            const webglAvailability = WebGLUtils.isWebGLAvailable();

			// Then
			expect(webglAvailability).to.be.true;
		});
    });

	describe("#isStableWebGL", function() {

        [
            {os: {name: "android", version: "6"}, browser: {name: "chrome"}},
            {os: {name: "android", version: "4.4"}, browser: {name: "chrome"}},
            {os: {name: "ios", version: "9"}, browser: {name: "safari"}}
        ].forEach(agentInfo => {
            it("on stable browser: " + JSON.stringify(agentInfo), () => {
                // Given
                var MockWebglUtils = WebglUtilsInjector(
                    {
                        "@egjs/agent": function() {
                            return agentInfo;
                        }
                    }
                ).default;

                // When
                const isStableWebGL = MockWebglUtils.isStableWebGL();

                // Then
                expect(isStableWebGL).to.be.true;
            });
        });

        [
            {os: {name: "android", version: "4.3"}, browser: {name: "chrome"}},
            {os: {name: "android", version: "4.4"}, browser: {name: "samsung internet"}}
        ].forEach(agentInfo => {
            it("on unstable browser: " + JSON.stringify(agentInfo), () => {
                // Given
                var MockWebglUtils = WebglUtilsInjector(
                    {
                        "@egjs/agent": function() {
                            return agentInfo;
                        }
                    }
                ).default;

                // When
                const isStableWebGL = MockWebglUtils.isStableWebGL();

                // Then
                expect(isStableWebGL).to.be.false;
            });
        })
	});

	describe("#getWebglContext", function() {
		IT("should have attribute antialias false as a default", () => {
			const canvas = document.createElement("canvas");
			const context = WebGLUtils.getWebglContext(canvas);

			expect(context.getContextAttributes().antialias).to.be.equal(false);
		});
	});

	describe("#texImage2D", function() {
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
			} catch(e) {
				exceptionOccurs = true;
			}

			// Then
			expect(exceptionOccurs).to.be.equal(false);
		});
	});
});
