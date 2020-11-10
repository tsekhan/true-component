const path = require('path');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const RemoveStrictPlugin = require( 'remove-strict-webpack-plugin' );

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: 'tests',
        extractComments: false,
        terserOptions: {
          ecma: 2020,
          mangle: {
            properties: {
              reserved: ["HtmlComponent", "$", "registerClass", "html", "Ref", "template"],
            },
          },
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
  },
  plugins: [
    // new RemoveStrictPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'tests/test.html'},
        { from: 'node_modules/mocha', to: 'test-resources/mocha' },
        { from: 'node_modules/chai', to: 'test-resources/chai' },
      ]
    }),
  ],
  entry: {
    'tc': 'src/index.js',
    'tests': 'tests/source-map-wrapped.js',
  },
});
