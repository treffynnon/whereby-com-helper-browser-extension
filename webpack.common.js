// tslint:disable:object-literal-sort-keys
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader');

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports = {
  entry: {
    'js/index': path.join(__dirname, 'src/index.ts'),
    'popup/index': path.join(__dirname, 'src/popup/index.ts'),
    'options/index': path.join(__dirname, 'src/options/index.ts'),
    //'vendor': ['semver'],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader',
    }, {
      test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
      exclude: /node_modules/,
      loader: 'file-loader?name=[name].[ext]',
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'html-loader',
    }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CheckerPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json',
      transform: content => {
        // generates the manifest file using the package.json information
        return Buffer.from(JSON.stringify({
          ...JSON.parse(content.toString()),
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
        }, null, 2));
      },
    }, {
      from: 'src/icons',
      to: 'icons',
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup', 'index.html'),
      filename: 'popup/index.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options', 'index.html'),
      filename: 'options/index.html',
      chunks: ['options'],
    }),
    new WriteFilePlugin(),
    // pack common vendor files
    new webpack.optimize.CommonsChunkPlugin({
      name: 'js/vendor',
      minChunks: Infinity,
    }),
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
