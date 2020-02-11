const { paths } = require('../../webpack.settings');
const cacheLoader = require('../loaders/cache');
const svgrLoader = require('../loaders/inlineSvg');
const urlLoader = require('../loaders/url');
const { mode } = require('../utils');

module.exports = (env) => ({
  module: {
    rules: [
      {
        test: /\.inline.svg$/,
        exclude: [paths.ICONS_TO_SPRITE],
        use: [
          ...(mode.isProduction(env) ? [] : [cacheLoader()]),
          svgrLoader(),
          urlLoader(),
        ],
      },
    ],
  },
});
