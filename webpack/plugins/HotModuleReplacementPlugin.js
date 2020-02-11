const webpack = require('webpack');

const createPlugin = require('./createPlugin');

module.exports = () => createPlugin(webpack.HotModuleReplacementPlugin);
