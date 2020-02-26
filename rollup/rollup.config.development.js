const merge = require("./merge").merge;
const banner = require("./banner").common;
const pkgConfigList = require("./rollup.config.pkgd");

const defaultConfig = {
	external: ["@egjs/axes", "@egjs/component", "es6-promise", "gl-matrix", "@egjs/agent", "motion-sensors-polyfill"],
	output: {
		globals: {
			"@egjs/axes": "eg.Axes",
			"@egjs/component": "eg.Component",
			"@egjs/agent": "eg.Agent"
		},
		banner
	},
};

const devConfigList = pkgConfigList.map(config => {
	const newConfig = Object.assign({}, defaultConfig);

	newConfig.output.file = config.output.file.replace(".pkgd", "");

	return merge(config, newConfig);
});

module.exports = devConfigList;
