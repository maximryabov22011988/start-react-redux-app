const MinifyCSSPlugin = require('optimize-css-assets-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) =>
  createPlugin(MinifyCSSPlugin, {
    cssProcessorOptions: {
      safe: true,
      map: {
        inline: false,
        annotation: true,
      },
      discardComments: {
        removeAll: true,
      },
    },
    canPrint: true,
    ...options,
  });
