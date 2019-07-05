const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
  },
  entry: {
    'wc': 'src/index.js',
    'tests': 'tests/index.js',
  },
});
