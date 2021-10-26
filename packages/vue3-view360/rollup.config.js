const buildHelper = require("@egjs/build-helper");
const commonjs = require("rollup-plugin-commonjs");
const vue = require("rollup-plugin-vue");

const external = {
  "vue": "Vue",
  "vue-class-component": "VueClassComponent",
  "@egjs/view360": "View360",
  "@egjs/axes": "eg.Axes",
  "@egjs/component": "eg.Component"
};

const defaultOptions = {
  sourcemap: true,
  plugins: [
    commonjs(),
    vue()
  ],
  external
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    exports: "named",
    input: "./src/index.ts",
    output: "./dist/view360.esm.js"
  },
  {
    ...defaultOptions,
    format: "cjs",
    input: "./src/index.umd.ts",
    output: "./dist/view360.cjs.js"
  }
]);
