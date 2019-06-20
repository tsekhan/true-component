const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  resolve: { modules: [ __dirname, 'node_modules' ] },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // instrument only testing sources with Istanbul
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'istanbul-instrumenter-loader',
      //     query: {
      //       esModules: true
      //     }
      //   },
      //   enforce: "post",
      //   include: path.resolve('src/'),
      // },
    ],
  },
};
