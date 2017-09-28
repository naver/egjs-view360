var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");

var config = {
	entry: {
		"view360.pkgd": "./src/index.js",
		"view360.pkgd.min": "./src/index.js",
		"YawPitchControl/view360.yawpitchcontrol.pkgd": "./src/YawPitchControl/index.js",
		"YawPitchControl/view360.yawpitchcontrol.pkgd.min": "./src/YawPitchControl/index.js",
		"SpinViewer/view360.spinviewer.pkgd": "./src/SpinViewer/index.js",
		"SpinViewer/view360.spinviewer.pkgd.min": "./src/SpinViewer/index.js",
		"PanoViewer/view360.panoviewer.pkgd": "./src/PanoViewer/index.js",
		"PanoViewer/view360.panoviewer.pkgd.min": "./src/PanoViewer/index.js"
	},
	externals: [],
	plugins: [
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin([banner.common, "", banner.pkgd].join("\r\n"))
	]
};

module.exports = function (common) {
	return merge.strategy({
		entry: "replace",
		externals: "replace",
		plugins: "append"
	})(common, config);
};
