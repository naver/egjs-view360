const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const json = require("rollup-plugin-json");
const version = process.env.NIGHTLY || require("./package.json").version;
const merge = require("./rollup/merge").mergeList;
const banner = require("./rollup/banner").banner;

const replaceVersion = replace({
	"#__VERSION__#": version,
	delimiters: ["", ""]
});

const defaultConfig = {
	plugins: [
		babel({
			include: ["src/**"],
			configFile: "./babel.config.js"
		}),
		replaceVersion,
		json(),
	],
	output: {
		name: "eg.view360",
		banner,
		freeze: false,
		format: "umd",
		interop: false,
		sourcemap: true
	}
};

export default merge(defaultConfig, [
	...require("./rollup/rollup.config.esm"),
	...require("./rollup/rollup.config.development"),
	...require("./rollup/rollup.config.pkgd")
]);
