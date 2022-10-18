const FontPreloadPlugin = require("webpack-font-preload-plugin");

module.exports = function() {
  return {
    name: "docusaurus-plugin-glslify-preload-font",
    configureWebpack() {
      return {
        plugins: [new FontPreloadPlugin({
          extensions: ["woff2"]
        })]
      };
    }
  };
};
