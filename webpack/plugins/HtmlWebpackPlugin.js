const HtmlWebpackPlugin = require('html-webpack-plugin');

const createPlugin = require('./createPlugin');
const { pageTitle: title, paths } = require('../../webpack.settings');
const { mode } = require('../utils');

module.exports = (env) =>
  createPlugin(HtmlWebpackPlugin, {
    title,
    inject: true,
    template: `${paths.ASSETS}/index.html`,
    minify: mode.isProduction(env)
      ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      : undefined,
  });
