/* eslint-env node */

module.exports = config => {
  const karmaConfig = {
    frameworks: [
      "mocha",
      "chai",
      "sinon",
      "karma-typescript",
      "viewport"
    ],
    mime: {
      "text/x-typescript": ["ts","tsx"]
    },
    client: {
      mocha: {
        opts: "./mocha.opts"
      }
    },
    files: [
      "./setup.ts",
      "./test-utils.ts",
      "./specs/**/*.spec.ts",
      "./!(node_modules)/**/*.ts",
      "../../packages/view360/src/**/*.ts",
    ],
    preprocessors: {
      "../../**/*.ts": ["karma-typescript"]
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
      reports: {
        lcovonly: {
          "directory": "coverage",
          "filename": "lcov.info",
          "subdirectory": "."
        }
      },
      coverageOptions: {
        instrumentation: false,
        exclude: /test/i
      }
    },
    browsers: [],
    customLaunchers: {
      CustomChromeHeadless: {
        base: "ChromeHeadless",
        flags: ["--window-size=640,480", "--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
    reporters: ["mocha"]
  };

  karmaConfig.browsers.push(config.chrome ? "Chrome" : "CustomChromeHeadless");

  if (config.coverage) {
    karmaConfig.reporters.push("karma-typescript");
    karmaConfig.singleRun = true;
  }

  config.set(karmaConfig);
};
