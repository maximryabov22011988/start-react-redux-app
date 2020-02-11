const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) =>
  createPlugin(UnusedFilesWebpackPlugin, {
    failOnUnused: false,
    patterns: ['src/**/*.js', '!src/**/*.test.js', 'src/**/*.less'],
    ...options,
  });
