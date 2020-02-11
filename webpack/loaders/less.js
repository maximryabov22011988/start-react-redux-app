const { mode } = require('../utils');

module.exports = (env) => ({
  loader: 'less-loader',
  options: {
    sourceMap: !mode.isProduction(env),
  },
});
