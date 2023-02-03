/* eslint-env node */

const glslify = require("rollup-plugin-glslify");
const buildHelper = require("../../config/build-helper");

const name = "View360";
const fileName = "view360";

const external = {
  "@egjs/imready": "eg.ImReady",
  "@egjs/component": "Component",
  "gl-matrix": "glMatrix"
};
const tsconfig = "tsconfig.build.json";
const plugins = [
  glslify()
];

const common = {
  sourcemap: false,
  tsconfig,
  plugins
};

module.exports = buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.js`,
    format: "umd",
    external,
    ...common,
    plugins
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.min.js`,
    format: "umd",
    external,
    uglify: true,
    ...common,
    plugins
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.pkgd.js`,
    format: "umd",
    commonjs: true,
    resolve: true,
    ...common
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.pkgd.min.js`,
    format: "umd",
    commonjs: true,
    resolve: true,
    uglify: true,
    ...common
  },
  {
    input: "./src/index.ts",
    output: `./dist/${fileName}.esm.js`,
    format: "esm",
    exports: "named",
    external,
    ...common
  }
]);
