const { paths } = require('../../webpack.settings');
const cacheLoader = require('../loaders/cache');
const fontFilesLoader = require('../loaders/fontFiles');
const { mode } = require('../utils');

module.exports = (env) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: paths.FONTS,
        use: [
          ...(mode.isProduction(env) ? [] : [cacheLoader()]),
          fontFilesLoader(),
        ],
      },
    ],
  },
});
