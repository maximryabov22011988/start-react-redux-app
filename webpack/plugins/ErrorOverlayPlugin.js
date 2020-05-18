const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) => createPlugin(ErrorOverlayPlugin, options);
