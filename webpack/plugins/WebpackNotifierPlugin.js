const WebpackNotifierPlugin = require('webpack-notifier');

const createPlugin = require('./createPlugin');

module.exports = (options) =>
  createPlugin(WebpackNotifierPlugin, {
    title: 'Webpack',
    excludeWarnings: true,
    alwaysNotify: true,
    ...options,
  });
