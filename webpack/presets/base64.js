const cacheLoader = require('../loaders/cache');
const base64Loader = require('../loaders/base64');
const { mode } = require('../utils');

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
