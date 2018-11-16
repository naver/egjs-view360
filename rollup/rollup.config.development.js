const merge = require("./merge").merge;
const pkgConfigList = require("./rollup.config.pkgd");

const defaultConfig = {
	external: ["@egjs/axes", "@egjs/component"],
	output: {
		globals: {
			"@egjs/axes": "eg.Axes",
			"@egjs/component": "eg.Component"
		}
	}
};

const devConfigList = pkgConfigList.map(config => {
	const newConfig = Object.assign({}, defaultConfig);

	newConfig.output.file = config.output.file.replace(".pkgd", "");

	return merge(config, newConfig);
});

module.exports = devConfigList;
