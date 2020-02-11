const MinifyJSPlugin = require('terser-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) =>
  createPlugin(MinifyJSPlugin, {
    sourceMap: true,
    terserOptions: {
      output: {
        comments: false,
      },
    },
    extractComments: false,
    ...options,
  });
