const { paths } = require('../../webpack.settings');

module.exports = () => ({
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    config: {
      path: `${paths.ROOT}/postcss.config.js`,
    },
  },
});
