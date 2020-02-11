const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const createPlugin = require('./createPlugin');

module.exports = (options) =>
  createPlugin(BundleAnalyzerPlugin, {
    analyzerMode: 'disabled',
    generateStatsFile: true,
    statsOptions: { source: false },
    ...options,
  });
