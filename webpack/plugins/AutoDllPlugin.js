const AutoDllPlugin = require('autodll-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) => createPlugin(AutoDllPlugin, options);
