const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const createPlugin = require('./createPlugin');

module.exports = (options) => createPlugin(CleanWebpackPlugin, options);
