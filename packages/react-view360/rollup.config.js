const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    input: "./src/react-view360/index.ts",
    format: "esm",
    output: "./dist/view360.esm.js",
    exports: "named"
  },
  {
    ...defaultOptions,
    input: "./src/react-view360/index.umd.ts",
    format: "cjs",
    output: "./dist/view360.cjs.js"
  },
]);
