import buildHelper from "@egjs/build-helper";

const name = "eg.view360";
const plugins = [];

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/view360.pkgd.js",
    format: "umd",
    commonjs: true,
    resolve: true,
    plugins
  }
]);

