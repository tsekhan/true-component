const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'wc.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: false
  },
};
