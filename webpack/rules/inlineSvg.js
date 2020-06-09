const { paths } = require('../../webpack.settings');
const cacheLoader = require('../loaders/cache');
const svgrLoader = require('../loaders/inlineSvg');
const urlLoader = require('../loaders/url');
const { mode } = require('../utils');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.inline.svg$/,
        exclude: [paths.ICONS_TO_SPRITE],
        use: [
          ...(process.env.NODE_ENV === mode.PRODUCTION ? [] : [cacheLoader()]),
          svgrLoader(),
          urlLoader(),
        ],
      },
    ],
  },
});
