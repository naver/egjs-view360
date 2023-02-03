/* eslint-env node */

import svelte from "rollup-plugin-svelte";
import sveltePreprocess, { replace } from "svelte-preprocess";
import nodeResolve from "@rollup/plugin-node-resolve";

import replaces from "./replace";
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

export default buildHelper([
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
