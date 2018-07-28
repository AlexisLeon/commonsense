const config = require('./webpack.config.js');
const webpack = require('webpack');

config.mode = 'production';

config.devtool = 'cheap-module-source-map';

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: false,
    __ENV__: 'production',
  })
);

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourcemap: false,
  })
);

module.exports = config;
