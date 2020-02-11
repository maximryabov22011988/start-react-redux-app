const CopyWebpackPlugin = require('copy-webpack-plugin');

const createPlugin = require('./createPlugin');

const copy = ({ from, to, regexExp = '*.*' }) => ({
  // Сontext необходим, чтобы не копировать все промежуточные папки
  context: from,
  from: regexExp,
  to,
});

module.exports = (options) =>
  createPlugin(CopyWebpackPlugin, options.map(copy));
