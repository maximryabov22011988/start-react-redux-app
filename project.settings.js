const path = require('path');

module.exports = {
  pageTitle: 'Проект Х',
  publicPath: {
    develop: '/',
    production: '/',
  },
  devServer: {
    port: 7777,
    proxyConfig: {
      '/api': {
        target: 'https://',
        auth: 'login:password',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  alias: {
    webpack: {
      api: path.resolve('src/api'),
      assets: path.resolve('src/assets'),
      components: path.resolve('src/components'),
      constants: path.resolve('src/constants'),
      hocs: path.resolve('src/hocs'),
      hooks: path.resolve('src/hooks'),
      layouts: path.resolve('src/layouts'),
      pages: path.resolve('src/pages'),
      store: path.resolve('src/store'),
      utils: path.resolve('src/utils'),
      styles: path.resolve('src/styles/index.less'),
    },
    storybook: {
      resetStyles: path.resolve('src/styles/reset.less'),
      globalStyles: path.resolve('src/styles/global.less'),
    },
  },
  extensions: ['.jsx', '.js', '.less', '.svg'],
  modules: [],
  isNeedCheckUnusedFiles: true,
  isNeedAnalyzeBundles: true,
};
