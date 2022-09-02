module.exports = function(context, options) {
  return {
    name: "docusaurus-sass",
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
