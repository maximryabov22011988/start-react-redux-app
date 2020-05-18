const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) =>
  createPlugin(FriendlyErrorsWebpackPlugin, options);
