module.exports = config => {
	const karmaConfig = {
		frameworks: ["mocha", "chai", "sinon"],

		browserNoActivityTimeout: 60000,

		// list of files / patterns to load in the browser
		files: [
			"./node_modules/resemblejs/resemble.js",
			"./node_modules/hammer-simulator/index.js",
			"./test/hammer-simulator.run.js",
			"./test/unit/**/*.spec.js",
			{pattern: "./test/manual/img/**/*.*", watched: false, included: false, served: true},
		],

		proxies: {
			"/images/": "/base/test/manual/img/"
		},

		client: {
			mocha: {
				opts: "./mocha.opts",
				timeout: "20000"
			}
		},

		webpack: {
			devtool: "inline-source-map",
			mode: "none",
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "babel-loader",
						options: {
							"babelrc": false,
							"presets": [
								[
									"@babel/preset-env", {
										"targets": {"chrome": "55"},
										"debug": true
									}
								]
							],
							"plugins": [
								"@babel/plugin-transform-modules-commonjs",
								["@babel/plugin-proposal-class-properties", {"loose": true}],
							]
						}
					}
				]
			}
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./test/**/*.spec.js": config.coverage ? ["webpack"] : ["webpack", "sourcemap"]
		},

		browsers: [],
		customLaunchers: {
			ChromeHeadlessGL: {
				base: "Chrome",
				flags: [
					"--headless",
					"--hide-scrollbars",
					"--mute-audio",
					"--no-sandbox",
					"--disable-setuid-sandbox",
					// Without a remote debugging port, Google Chrome exits immediately.
					"--remote-debugging-port=9222",
					// Although --use-gl=osmesa is not specified. it need to install libosmesa in TRAVIS setting to test sucessfully
				]
			}
		},
		reporters: ["mocha"],
		webpackMiddleware: {
			noInfo: true
		}
	};

	karmaConfig.browsers.push(config.chrome ? "Chrome" : "ChromeHeadlessGL");

	if (config.coverage) {
		karmaConfig.reporters.push("coverage-istanbul");
		karmaConfig.coverageIstanbulReporter = {
			reports: ["text-summary", "html", "lcovonly"],
			dir: "./coverage"
		};
		karmaConfig.webpack.module.rules.unshift({
			test: /\.js$/,
			exclude: /(node_modules|test)/,
			loader: "istanbul-instrumenter-loader"
		});
		karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
};
