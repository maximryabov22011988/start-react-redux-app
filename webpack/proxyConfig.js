module.exports = {
  '/api': {
    target: 'https://',
    auth: 'login:password',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api',
    },
    secure: false,
  },
};
