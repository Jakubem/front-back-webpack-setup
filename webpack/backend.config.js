const path = require('path');
const bundlePath = path.join(__dirname, '../', 'bin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './backend/app.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'bundle-backend.js',
    path: bundlePath
  },
  stats: 'errors-only',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new NodemonPlugin({
      quiet: true,
    }),
  ]
};
 