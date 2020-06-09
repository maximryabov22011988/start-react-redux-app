const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cacheLoader = require('../loaders/cache');
const lessLoader = require('../loaders/less');
const cssLoader = require('../loaders/css');
const styleLoader = require('../loaders/style');
const postcssLoader = require('../loaders/postcss');
const { mode } = require('../utils');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          cacheLoader(),
          process.env.NODE_ENV === mode.PRODUCTION ? MiniCssExtractPlugin.loader : styleLoader(),
          cssLoader(),
          postcssLoader(),
          lessLoader(),
        ],
      },
    ],
  },
});
