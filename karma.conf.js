module.exports = function(config) {
  var karmaConfig = {
    frameworks: ["mocha", "chai", "sinon"],

    browserNoActivityTimeout: 20000,

    // list of files / patterns to load in the browser
    files: [
      "./node_modules/resemblejs/resemble.js",
      "./node_modules/lite-fixture/index.js",
			"./node_modules/hammer-simulator/index.js",
			"./test/hammer-simulator.run.js",
			"./test/unit/util.js",
      "./test/unit/**/*.spec.js",
      {pattern: "./test/manual/img/**/*.*", watched: false, included: false, served: true},
      {pattern: "./test/img/*.*", watched: false, included: false, served: true},
    ],

		proxies: {
      "/images/": "/base/test/manual/img/"
		},

    client: {
      mocha: {
        opts: "./mocha.opts"
      }
    },

    webpack: {
      devtool: "inline-source-map",
      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  loader: "babel-loader",
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
        base: 'ChromeHeadless',
        flags: ['--disable-gpu', '--use-gl=osmesa', '--no-sandbox', '--disable-setuid-sandbox']
      }
    },
    reporters: ["mocha"],
    webpackMiddleware: {
        noInfo: true
    }
  };

  karmaConfig.browsers.push(config.chrome ? "Chrome" : "ChromeHeadlessGL");

  if(config.coverage) {
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
