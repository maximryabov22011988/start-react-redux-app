const { paths } = require('../../webpack.settings');

const { mode } = require('../utils');

module.exports = (env) => ({
  loader: 'postcss-loader',
  options: {
    sourceMap: !mode.isProduction(env),
    config: {
      path: `${paths.ROOT}/postcss.config.js`,
    },
  },
});
