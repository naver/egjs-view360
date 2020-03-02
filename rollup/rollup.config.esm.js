module.exports = [
	{
		external: ["@egjs/axes", "@egjs/component", "@egjs/component", "@egjs/agent", "gl-matrix"],
		input: "./src/index.js",
		output: {
			sourcemap: false,
			format: "es",
			exports: "named",
			file: "./dist/view360.esm.js"
		}
	}
];
