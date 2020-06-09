const cacheLoader = require('../loaders/cache');
const base64Loader = require('../loaders/base64');
const { mode } = require('../utils');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          ...(process.env.NODE_ENV === mode.PRODUCTION ? [] : [cacheLoader()]),
          base64Loader(),
        ],
      },
    ],
  },
});
