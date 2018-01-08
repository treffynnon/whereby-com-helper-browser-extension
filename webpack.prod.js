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
const ZipPlugin = require('zip-webpack-plugin');
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
          const dest = path.join(__dirname, `appear.in-meeting-room-helper-${process.env.npm_package_version}.crx`);
          await mv(path.join(__dirname, 'dist.crx'), dest);
          console.log(chalk.green(`Build complete: ${dest}`));
        } catch (e) {
          console.error(chalk.red(e.message));
          process.exit(2);
        }
      }
    }),

    new WebpackOnBuildPlugin(async stats => {
      const webExt = require('web-ext').default;

      webExt.cmd.sign({
        // These are command options derived from their CLI conterpart.
        // In this example, --source-dir is specified as sourceDir.
        firefox: path.join(__dirname, 'dist'),
        sourceDir: path.join(__dirname, 'dist'),
        artifactsDir: __dirname,
        apiKey: process.env.FIREFOX_API_KEY,
        apiSecret: process.env.FIREFOX_API_SECRET,
      }, {
        // These are non CLI related options for each function.
        // You need to specify this one so that your NodeJS application
        // can continue running after web-ext is finished.
        shouldExitProgram: false,
      })
        .then((extensionRunner) => {
          // The command has finished. Each command resolves its
          // promise with a different value.
          console.log(extensionRunner);
          // You can do a few things like:
          // extensionRunner.reloadAllExtensions();
          // extensionRunner.exit();
        })
        .catch(console.log);
    }),
    
    // produce a zip for uploading to Chrome webstore
    new ZipPlugin({
      path: '../',
      filename: path.join(__dirname, `appear.in-meeting-room-helper-${process.env.npm_package_version}.zip`),
    }),
  ],
});
