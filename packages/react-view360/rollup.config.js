const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    input: "./src/index.ts",
    format: "esm",
    output: "./dist/view360.esm.js",
    exports: "named"
  },
  {
    ...defaultOptions,
    input: "./src/index.umd.ts",
    format: "cjs",
    output: "./dist/view360.cjs.js"
  },
]);
