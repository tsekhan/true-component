const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../../dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'tests/test.html'},
        { from: 'node_modules/mocha', to: 'test-resources/mocha' },
        { from: 'node_modules/chai', to: 'test-resources/chai' },
      ]
    })
  ],
  entry: {
    'tc': 'src/index.js',
    'tests': 'tests/source-map-wrapped.js',
  },
});
