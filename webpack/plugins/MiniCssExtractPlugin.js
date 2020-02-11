const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { mode } = require('../utils');
const createPlugin = require('./createPlugin');

module.exports = (env) =>
  createPlugin(MiniCssExtractPlugin, {
    filename: mode.isProduction(env) ? '[name].[hash].css' : '[name].css',
    chunkFilename: mode.isProduction(env) ? '[name].[hash].css' : '[name].css',
  });
