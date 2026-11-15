/* eslint-env node */

const svelte = require("rollup-plugin-svelte");
const sveltePreprocess = require("svelte-preprocess");
const nodeResolve = require("@rollup/plugin-node-resolve");
const { replace } = sveltePreprocess;

const replaces = require("./replace.cjs");
const buildHelper = require("../../config/build-helper");

const defaultOptions = {
	external: {
		svelte: "svelte",
    "@egjs/view360": "View360",
    "@egjs/component": "Component",
    "gl-matrix": "glMatrix"
	},
	plugins: [
		svelte({
      preprocess: [
        sveltePreprocess(),
        replace(replaces)
      ]
    }),
    nodeResolve({
      browser: true
    })
	]
};

module.exports = buildHelper([
	{
		...defaultOptions,
		input: "./src/index.umd.ts",
		output: "dist/view360.cjs.js",
		format: "cjs",
    resolve: false
	},
	{
		...defaultOptions,
		input: "./src/index.ts",
		output: "dist/view360.esm.js",
		format: "es",
		exports: "named",
    resolve: false
	}
]);
