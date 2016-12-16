'use strict';

var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill','./src/lite-validator-es5.js'],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'lite-validator-es5.js',
    publicPath: ''
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ]
};
