// tslint:disable:no-console
const { promisify } = require('util');
const chalk = require('chalk');
const exec = promisify(require('child_process').exec);
const mv = promisify(require('mv'));
const path = require('path');
const WebpackOnBuildPlugin = require('on-build-webpack');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    // runs commands after the build is complete to produce the chrome extension
    // CRX file
    new WebpackOnBuildPlugin(async stats => {
      if (stats.compilation.errors.length === 0) {
        const chromeLocation = require('chrome-location');
        const command = [
          `"${chromeLocation}"`,
          `--pack-extension="${path.join(__dirname, 'dist')}"`,
          `--pack-extension-key="${path.join(__dirname, 'key.pem')}"`,
          '--disable-gpu',
        ].join(' ');
        try {
          await exec(command);
          const dest = path.join(__dirname, `appear-in-meeting-room-helper-${process.env.npm_package_version}.crx`);
          await mv(path.join(__dirname, 'dist.crx'), dest);
          console.log(chalk.green(`Build complete: ${dest}`));
        } catch (e) {
          console.error(chalk.red(e.message));
        }
      }
    }),
  ],
});
