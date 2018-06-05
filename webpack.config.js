const webpack = require("webpack");
const pkg = require("./package.json");
const path = require("path");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const Stylish = require("webpack-stylish");

const config = {
	entry: {
		"view360": "./src/index.js",
		"SpinViewer/view360.spinviewer": "./src/SpinViewer/index.js",
		"PanoViewer/view360.panoviewer": "./src/PanoViewer/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		library: [pkg.namespace.eg, "view360"],
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	externals: {
		"@egjs/component": {
			commonjs: "@egjs/component",
			commonjs2: "@egjs/component",
			amd: "@egjs/component",
			root: [pkg.namespace.eg, "Component"]
		},
		"@egjs/axes": {
			commonjs: "@egjs/axes",
			commonjs2: "@egjs/axes",
			amd: "@egjs/axes",
			root: [pkg.namespace.eg, "Axes"]
		}
	},
	mode: "none",
	devtool: "cheap-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.js$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /#__VERSION__#/ig,
							replacement: (match, p1, offset, string) => pkg.version
						}
					]
				})
			}
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new StringReplacePlugin(),
		new Stylish()
	],
	stats: "minimal"
};

module.exports = (env, argv) => {
	const mode = (env && env.mode) || "development";

	/* eslint-disable import/no-dynamic-require */
	return require(`./config/webpack.config.${mode}.js`)(config, env);
	/* eslint-enable import/no-dynamic-require */
};
