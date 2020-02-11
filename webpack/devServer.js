const path = require('path');

const settings = require('../webpack.settings');
const proxyConfig = require('./proxyConfig');

module.exports = () => ({
  devServer: {
    public: settings.devServerConfig.public(),
    host: settings.devServerConfig.host(),
    port: settings.devServerConfig.port(),
    https: !!parseInt(settings.devServerConfig.https()),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    clientLogLevel: 'none',
    disableHostCheck: true,
    watchContentBase: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    compress: true,
    hot: true,
    open: true,
    overlay: true,
    proxy: proxyConfig,
  },
});
