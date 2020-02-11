const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cacheLoader = require('../loaders/cache');
const cssLoader = require('../loaders/css');
const styleLoader = require('../loaders/style');
const postcssLoader = require('../loaders/postcss');
const { mode } = require('../utils');

module.exports = (env) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          mode.isProduction(env) ? MiniCssExtractPlugin.loader : styleLoader(),
          cacheLoader(),
          cssLoader(env),
          postcssLoader(env),
        ],
      },
    ],
  },
});
