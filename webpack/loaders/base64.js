const urlLoader = require('./url');

const { base64ImageLimit } = require('../../webpack.settings');

module.exports = () =>
  urlLoader({
    limit: base64ImageLimit,
    name: 'images/[name].[ext]',
  });
