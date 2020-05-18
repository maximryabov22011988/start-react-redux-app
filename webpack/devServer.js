const path = require('path');

const settings = require('../webpack.settings');
const proxyConfig = require('./proxyConfig');

module.exports = () => ({
  devServer: {
    public: settings.devServerConfig.public(),
    host: settings.devServerConfig.host(),
    port: settings.devServerConfig.port(),
    https: !!parseInt(settings.devServerConfig.https(), 10),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    proxy: proxyConfig,
  },
});
