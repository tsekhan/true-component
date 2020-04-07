const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../.dist_tmp'),
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'tests/coverage-test.html' },
      { from: 'node_modules/mocha', to: 'test-resources/mocha' },
      { from: 'node_modules/chai', to: 'test-resources/chai' },
    ])
  ],
  entry: {
    'tests': '.tmp/tests/index.js',
  },
});
