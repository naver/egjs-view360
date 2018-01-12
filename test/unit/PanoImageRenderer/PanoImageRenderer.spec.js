import PanoImageRenderer from "../../../src/PanoImageRenderer/PanoImageRenderer";
import WebGLUtils from "../../../src/PanoImageRenderer/WebGLUtils";
import PanoImageRendererInjector from "inject-loader!../../../src/PanoImageRenderer/PanoImageRenderer";

const WEBGL_AVAILABILITY = WebGLUtils.isWebGLAvailable();
const IT = WEBGL_AVAILABILITY ? it : it.skip;
describe("PanoImageRenderer", function() {
	console.log(WEBGL_AVAILABILITY ? "gl available" : "no gl");
	const deviceRatio = window.devicePixelRatio;
	const suffix = `_${deviceRatio}x.png`;

	describe("#constructor", function() {
		IT("Instance", function() {
			// Given
			// When
			this.inst = new PanoImageRenderer("./images/test_equi.png", 200, 200, false, {
					yaw: 0,
					pitch: 0,
					imageType: "equirectangular",
					fieldOfView: 65
				});

			// Then
			expect(this.inst).to.be.exist;
		});
	});

	describe("#isImageLoaded", function() {
		IT("should return false before image loaded", () => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.png";
			const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

			// When
			const isImageLoaded = inst.isImageLoaded();

			// Then
			expect(isImageLoaded).to.be.false;
		});

		IT("should return true after image loaded", (done) => {
			// Given
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.png";
			const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

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
			const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});

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
				const inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
					initialYaw: 0,
					initialpitch: 0,
					imageType: "equirectangular",
					fieldOfView: 65
				});

				// When
				inst.setImage({
					image: "./images/test_equi_0_0_65.png"
				});
				const isImageLoaded = inst.isImageLoaded();

				// Then
				expect(isImageLoaded).to.be.false;
			});
	});

    describe("adaptive devicePixelRatio", function() {
        IT("when devicePixelRatio is 1, should use 1", function() {
            // Given
            var MockedPanoImageRenderer = PanoImageRendererInjector(
                {
                    "./browser": {
                        devicePixelRatio: 1
                    }
                }
            ).default;
          
            let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
            
            // When
            inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});
            
            // Then 
            expect(inst.canvas.width).to.be.equal(200);
            expect(inst.canvas.height).to.be.equal(200);
        });
        IT("when devicePixelRatio is 2, should use 2", function() {
            // Given
            var MockedPanoImageRenderer = PanoImageRendererInjector(
                {
                    "./browser": {
                        devicePixelRatio: 2
                    }
                }
            ).default;
          
            let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
            
            // When
            inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "equirectangular",
				fieldOfView: 65
			});
            
            // Then 
            expect(inst.canvas.width).to.be.equal(400);
            expect(inst.canvas.height).to.be.equal(400);
		});
        IT("when devicePixelRatio is 3, should use 2", function() {
            // Given
            var MockedPanoImageRenderer = PanoImageRendererInjector(
                {
                    "./browser": {
                        devicePixelRatio: 3
                    }
                }
            ).default;
          
            let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
            
            // When
            inst = new MockedPanoImageRenderer(sourceImg, 200, 200, false, {
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

    describe("error event", function() {
        IT("Should trigger error event when invalis image url", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();
            sourceImg.src = "./images/test_cube_not__exist.jpg";

            // When
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "vertical_cubestrip",
				fieldOfView: 65
            });
            inst.on("error", when);

            function when(e) {
                // Then
                expect(e.type).to.be.equal(12);
                done();
            }
        });
    });

    describe("renderingcontextlost event", function() { 
        IT("Should trigger renderingcontextlost event when lost context", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();
            sourceImg.src = "./images/test_cube.jpg";

            // When
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "vertical_cubestrip",
				fieldOfView: 65
            });
            inst.on("renderingContextLost", when);

            for(var i=0;i<16;i++) {
                new PanoImageRenderer(sourceImg, 200, 200, false, {
                    initialYaw: 0,
                    initialpitch: 0,
                    imageType: "vertical_cubestrip",
                    fieldOfView: 65
                });
            }

            function when(e) {
                // Then
                expect(inst.hasRenderingContext()).to.be.equal(false);
                done();
            }
        });
    });

	describe("Cubamap Rendering", function() { 
        IT("yaw: 0, pitch:0, fov:65", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "vertical_cubestrip",
				fieldOfView: 65
			});
			inst.on("imageLoaded", when);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						inst.render(0, 0, 65);
						// Then
						compare(`./images/PanoViewer/test_cube_0_0_65${suffix}`, inst.canvas, function(pct) {
								expect(pct).to.be.below(2);
								done();
							});
					});
			}
		});
		IT("yaw: 90, pitch:0, fov:65", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "vertical_cubestrip",
				fieldOfView: 65
			});
			inst.on("imageLoaded", when);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						inst.render(90, 0, 65);
						// Then
						compare(`./images/PanoViewer/test_cube_90_0_65${suffix}`, inst.canvas, function(pct) {
								expect(pct).to.be.below(2);
								done();
							});
					});
			}
        });

		IT("yaw: 45, pitch:45, fov:65", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "vertical_cubestrip",
				fieldOfView: 65
			});
			inst.on("imageLoaded", when);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						inst.render(45, 45, 65);
						// Then
						compare(`./images/PanoViewer/test_cube_45_45_65${suffix}`, inst.canvas, function(pct) {
								expect(pct).to.be.below(2);
								done();
							});
					});
			}
        });
		IT("yaw: -135, pitch:-45, fov:65", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_cube.jpg";
			inst = new PanoImageRenderer(sourceImg, 200, 200, false, {
				initialYaw: 0,
				initialpitch: 0,
				imageType: "vertical_cubestrip",
				fieldOfView: 65
			});
			inst.on("imageLoaded", when);

			function when() {
				// When
				inst.bindTexture()
					.then(() => {
						inst.render(-135, -45, 65);
						// Then
						compare(`./images/PanoViewer/test_cube_-135_-45_65${suffix}`, inst.canvas, function(pct) {
								expect(pct).to.be.below(2);
								done();
							});
					});
			}
		});
    });
	describe("Equirectangular Rendering", function() {
        IT("yaw: 0, pitch:0, fov:65", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
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
						compare(`./images/PanoViewer/test_equi_0_0_65${suffix}`, inst.canvas, function(pct) {
								expect(pct).to.be.below(2);
								done();
							});
					});
			}
        });
        IT("yaw: 0, pitch:0, fov:65 -> 30", function(done) {
			// Given
			let inst = this.inst;
			const sourceImg = new Image();

			sourceImg.src = "./images/test_equi.jpg";
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
						inst.render(0, 0, 30);
						// Then
						compare(`./images/PanoViewer/test_equi_0_0_30${suffix}`, inst.canvas, function(pct) {
								expect(pct).to.be.below(2);
								done();
							});
					});
			}
		});
	});
});
