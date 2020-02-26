module.exports = [
	{
		external: ["@egjs/axes", "@egjs/component", "@egjs/component", "es6-promise", "gl-matrix", "@egjs/agent", "motion-sensors-polyfill"],
		input: "./src/index.js",
		output: {
			sourcemap: false,
			format: "es",
			exports: "named",
			file: "./dist/view360.esm.js"
		}
	}
];
