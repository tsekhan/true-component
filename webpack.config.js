const path = require('path');

module.exports = {
  entry: {
    'wc': './src/index.js',
    'test': './tests/test.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: { minimize: false },
};
