const { base64ImageLimit } = require('../../webpack.settings');

const urlLoader = require('./url');

module.exports = () =>
  urlLoader({
    limit: base64ImageLimit,
    name: 'images/[name].[ext]',
  });
