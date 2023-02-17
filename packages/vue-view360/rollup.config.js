/* eslint-env node */
const buildHelper = require("../../config/build-helper");
const VuePlugin = require("rollup-plugin-vue");

const external = {
  "vue": "Vue",
  "@egjs/view360": "View360",
  "@egjs/component": "Component",
  "@egjs/imready": "eg.ImReady",
  "gl-matrix": "glMatrix"
};

const defaultOptions = {
  sourcemap: true,
  plugins: [VuePlugin()],
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
