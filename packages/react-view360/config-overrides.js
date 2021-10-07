const { aliasDangerous } = require("react-app-rewire-alias/lib/aliasDangerous");
const { override } = require("customize-cra");
const path = require("path");

const aliasMap = {
  "~": "../../src",
  "src": "./src"
}

module.exports = {
  paths: function (paths, env) {
    paths.appIndexJs = path.resolve(__dirname, "demo/index.tsx");
    paths.appSrc = path.resolve(__dirname, "demo");
    return paths;
  },
  webpack: override(
    aliasDangerous(aliasMap)
  )
}
