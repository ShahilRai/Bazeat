/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/js/app'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/js/'
  
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.eot', '.woff2', '.woff', '.ttf', '.svg','.json'],
    modules: [
      'client',
      'node_modules',
    ],
  },
  module: {
    loaders: [{
      include: [
          path.resolve(__dirname, 'src')
        ],
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client/js')
    },{
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, 
      {
       test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    
      ]
  }
};