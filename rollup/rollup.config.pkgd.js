const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const uglify = require("./uglify");
const pkgd = require("./banner").pkgd;
const merge = require("./merge").merge;

const commonSetting = {
	plugins: [
		resolve(),
		commonjs()
	],
	output: {
		banner: pkgd
	}
};

const pkgType = {};

pkgType.all = merge(commonSetting, {
	input: "./src/index.js",
	output: {
		file: "./dist/view360.pkgd.js"
	}
});

pkgType.panoviewer = merge(commonSetting, {
	input: "./src/PanoViewer/index.js",
	output: {
		file: "./dist/PanoViewer/view360.panoviewer.pkgd.js"
	}
});

pkgType.spinviewer = merge(commonSetting, {
	input: "./src/SpinViewer/index.js",
	output: {
		file: "./dist/SpinViewer/view360.spinviewer.pkgd.js"
	}
});

/* Make uglified pkg version */
Object.keys(pkgType).forEach(key => {
	const minKey = `${key}Min`;
	const pkg = pkgType[key];

	pkgType[minKey] = merge(pkg, {
		plugins: [uglify],
		output: {
			file: pkg.output.file.replace("pkgd", "pkgd.min")
		}
	});
});

const pkgList = Object.values(pkgType);

/**
 * view360.pkgd.js
 * view360.panoviewer.pkgd.js
 * view360.spinviewer.pkgd.js
 */
module.exports = pkgList;
