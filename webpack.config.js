const path = require('path');

module.exports = {
  entry: {
    'wc': './src/index.js',
    'tests': './tests/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {minimize: false},
  context: path.resolve(__dirname),
  resolve: {
    modules: [
      __dirname,
      'node_modules',
      'tester'
    ],
  },
  devtool: 'source-map',
};
