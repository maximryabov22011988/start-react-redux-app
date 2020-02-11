const SvgStorePlugin = require('external-svg-sprite-loader');

const createPlugin = require('./createPlugin');

module.exports = (option) => createPlugin(SvgStorePlugin, option);
