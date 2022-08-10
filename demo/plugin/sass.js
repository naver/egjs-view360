module.exports = function(context, options) {
  return {
    name: "docusaurus-plugin-glslify",
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.sass$/,
              exclude: /node_modules/,
              use: [
                "sass-to-string",
                {
                  loader: "sass-loader",
                  options: {
                    sassOptions: {
                      outputStyle: "compressed"
                    }
                  }
                }
              ]
            }
          ]
        }
      };
    }
  };
};
