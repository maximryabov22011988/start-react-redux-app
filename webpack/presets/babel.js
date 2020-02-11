const cacheLoader = require('../loaders/cache');
const babelLoader = require('../loaders/babel');

module.exports = (browserList, env) => ({
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: [/(node_modules|bower_components)/],
        use: [cacheLoader(), babelLoader(browserList, env)],
      },
    ],
  },
});
