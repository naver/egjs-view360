module.exports = [
	{
		input: "./src/index.js",
		output: {
			sourcemap: false,
			format: "es",
			exports: "named",
			file: "./dist/view360.esm.js"
		}
	}
];
