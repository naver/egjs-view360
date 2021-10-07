import buildHelper from "@egjs/build-helper";

const external = {
  "@egjs/axes": "eg.Axes",
  "@egjs/component": "eg.Component",
  "@egjs/agent": "eg.agent",
  "@egjs/imready": "eg.ImReady",
  "gl-matrix": "glMatrix",
  "promise-polyfill": "Promise"
}
const name = "eg.view360";
const plugins = [];

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/view360.js",
    format: "umd",
    commonjs: true,
    external,
    plugins
  },
  {
    name,
    input: "./src/PanoViewer/index.umd.ts",
    output: "./dist/PanoViewer/view360.panoviewer.js",
    format: "umd",
    commonjs: true,
    external,
    plugins
  },
  {
    name,
    input: "./src/SpinViewer/index.umd.ts",
    output: "./dist/SpinViewer/view360.spinviewer.js",
    format: "umd",
    commonjs: true,
    external,
    plugins
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/view360.min.js",
    format: "umd",
    commonjs: true,
    uglify: true,
    external,
    plugins
  },
  {
    name,
    input: "./src/PanoViewer/index.umd.ts",
    output: "./dist/PanoViewer/view360.panoviewer.min.js",
    format: "umd",
    commonjs: true,
    uglify: true,
    external,
    plugins
  },
  {
    name,
    input: "./src/SpinViewer/index.umd.ts",
    output: "./dist/SpinViewer/view360.spinviewer.min.js",
    format: "umd",
    commonjs: true,
    uglify: true,
    external,
    plugins
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/view360.pkgd.js",
    format: "umd",
    commonjs: true,
    resolve: true,
    plugins
  },
  {
    name,
    input: "./src/PanoViewer/index.umd.ts",
    output: "./dist/PanoViewer/view360.panoviewer.pkgd.js",
    format: "umd",
    commonjs: true,
    resolve: true,
    plugins
  },
  {
    name,
    input: "./src/SpinViewer/index.umd.ts",
    output: "./dist/SpinViewer/view360.spinviewer.pkgd.js",
    format: "umd",
    commonjs: true,
    resolve: true,
    plugins
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/view360.pkgd.min.js",
    format: "umd",
    commonjs: true,
    resolve: true,
    uglify: true,
    plugins
  },
  {
    name,
    input: "./src/PanoViewer/index.umd.ts",
    output: "./dist/PanoViewer/view360.panoviewer.pkgd.min.js",
    format: "umd",
    commonjs: true,
    resolve: true,
    uglify: true,
    plugins
  },
  {
    name,
    input: "./src/SpinViewer/index.umd.ts",
    output: "./dist/SpinViewer/view360.spinviewer.pkgd.min.js",
    format: "umd",
    commonjs: true,
    resolve: true,
    uglify: true,
    plugins
  },
  {
    input: "./src/index.ts",
    output: "./dist/view360.esm.js",
    format: "esm",
    exports: "named",
    commonjs: true,
    external,
    sourcemap: false,
    plugins
  }
]);

