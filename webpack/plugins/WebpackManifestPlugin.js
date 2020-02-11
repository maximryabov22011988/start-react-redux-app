const WebpackManifestPlugin = require('webpack-manifest-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) => createPlugin(WebpackManifestPlugin, options);
