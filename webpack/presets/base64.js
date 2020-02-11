const { mode } = require('../utils');

const cacheLoader = require('../loaders/cache');
const base64Loader = require('../loaders/base64');

module.exports = (env) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          ...(mode.isProduction(env) ? [] : [cacheLoader()]),
          base64Loader(),
        ],
      },
    ],
  },
});
