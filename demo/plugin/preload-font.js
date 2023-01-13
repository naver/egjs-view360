const FontPreloadPlugin = require("webpack-font-preload-plugin");

module.exports = function() {
  return {
    name: "docusaurus-plugin-preload-font",
    configureWebpack() {
      return {
        plugins: [new FontPreloadPlugin({
          extensions: ["woff2"]
        })]
      };
    }
  };
};
