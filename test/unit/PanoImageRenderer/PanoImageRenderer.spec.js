import PanoImageRenderer from "../../../src/PanoImageRenderer/PanoImageRenderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";

const IT = WebGLUtils.isWebGLAvailable() ? it : it.skip;
console.log(WebGLUtils.isWebGLAvailable() ? "gl available" : "no gl");
describe("PanoImageRenderer", function() {
	describe("#constructor", function() {
		IT("Instance", function() {
			// Given
			// When
			this.inst = new PanoImageRenderer("./base/test/img/test_equi.png", 200, 200, false, {
				yaw: 0,
				pitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// Then
			expect(this.inst).to.be.exist;
		});
	});

	describe("Equirectangular Rendering", function() {
		IT("yaw: 0, pitch:0, fov:65", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./base/test/img/test_equi.png";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});
			inst.on("imageLoaded", when);
			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						inst.render(0, 0, 65);
						// Then
						compare("./base/test/img/test_equi_0_0_65.png", inst.canvas, function(pct) {
							expect(pct).to.be.below(2);
							done();
						});
					}, () => {
						expect(false, "Failed to bind texture");
						done();
					});
			}
		});
	});
});
