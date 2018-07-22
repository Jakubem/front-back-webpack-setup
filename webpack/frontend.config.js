const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const bundlePath = path.join(__dirname, '../', 'dist/');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './frontend/js/main.js',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'bundle-frontend.js',
    path: bundlePath,
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'frontend/index.html'
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new ExtractTextPlugin({
      filename: 'bundle-style.css',
      disable: false,
      allChunks: true
    }),
    new CopyWebpackPlugin([
      // { from: '', to: '' },
    ]),
  ],
};