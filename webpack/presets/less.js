const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { mode } = require('../utils');

const cacheLoader = require('../loaders/cache');
const lessLoader = require('../loaders/less');
const cssLoader = require('../loaders/css');
const styleLoader = require('../loaders/style');
const postcssLoader = require('../loaders/postcss');

module.exports = (env) => ({
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          mode.isProduction(env) ? MiniCssExtractPlugin.loader : styleLoader(),
          cacheLoader(),
          cssLoader(env),
          postcssLoader(env),
          lessLoader(env),
        ],
      },
    ],
  },
});
