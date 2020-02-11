module.exports = {
  '/api': {
    target: 'https://uat.broker.domrf.ru',
    auth: 'broker:Supermegabroker555',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api',
    },
    secure: false,
  },
};
