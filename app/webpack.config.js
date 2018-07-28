const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',

  // devtool: 'eval-source-map',
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    './src/index',
  ],

  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './public/',
    // hot: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: 'transform-class-properties',
        },
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      __ENV__: 'development',
    })
  ],
};
