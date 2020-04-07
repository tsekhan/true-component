const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../..'),
  resolve: { modules: [ './', 'node_modules' ] },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: 'tests',
        extractComments: false,
        terserOptions: {
          mangle: {
            properties: {
              reserved: ["HtmlComponent", "$", "registerClass", "html", "Ref"],
            },
          },
        },
      }),
    ],
  },
};
