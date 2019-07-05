const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../..'),
  resolve: { modules: [ './', 'node_modules' ] },
  devtool: 'source-map',
};
