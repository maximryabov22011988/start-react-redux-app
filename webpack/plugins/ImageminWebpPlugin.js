const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) =>
  createPlugin(ImageminWebpWebpackPlugin, {
    config: [
      {
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75,
        },
      },
    ],
    overrideExtension: true,
    detailedLogs: true,
    strict: true,
    ...options,
  });
