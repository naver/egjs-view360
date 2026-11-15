/* eslint-disable prefer-arrow/prefer-arrow-functions */
const svelte = require("rollup-plugin-svelte");
const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const livereload = require("rollup-plugin-livereload");
const terser = require("@rollup/plugin-terser");
const sveltePreprocess = require("svelte-preprocess");
const css = require("rollup-plugin-css-only");
const fs = require("fs-extra");

const { replace } = sveltePreprocess;
const replaces = require("./replace.cjs");

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
				stdio: ["ignore", "inherit", "inherit"],
				shell: true
			});

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		}
	};
}

module.exports = {
	input: "demo/main.ts",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/build/bundle.js"
	},
	plugins: [
		svelte({
			preprocess: [
        sveltePreprocess({
          sourceMap: !production
        }),
        replace(replaces)
      ],
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
    typescript(),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: function(styles, styleNodes) {
      fs.ensureDirSync('public/build');
      fs.writeFileSync('public/build/bundle.css', styles);
    }}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload("public"),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
