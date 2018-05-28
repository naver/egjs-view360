import BrowserFeatureInjector from "inject-loader!../../../src/utils/browserFeature";

describe("util/browser", () => {
	describe("TRANSFORM", () => {
		it("should return transform string of each vendor", () => {
			// Given
			const vendorTransformStrings = ["transform", "webkitTransform", "msTransform", "mozTransform", ""];
			const resultTrsfString = [];
			let vendor;
			let browser;
			// When
			vendorTransformStrings.forEach(vendorTrsf => {
				browser = {
					window: {
						navigator: {}
					},
					document: {
						documentElement : {
							style: {}
						}
					}
				}
				browser.document.documentElement.style[vendorTrsf] = '';

				vendor = BrowserFeatureInjector({
					"./browser": browser
				});

				resultTrsfString.push(vendor.TRANSFORM);
			});

			// Then
			const allMatched = ["transform", "webkitTransform", "msTransform", "mozTransform", ""].every((trsfString, i) => trsfString === resultTrsfString[i]);
			expect(allMatched).to.equal(true);
		})
	});
});
