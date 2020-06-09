const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config();

const resolve = (targetPath) => (relativePath) => path.resolve(targetPath, relativePath);
const appPath = fs.realpathSync(process.cwd());
const resolveApp = resolve(appPath);

const supportedImageTypes = ['svg', 'jpg', 'png', 'webp'];

// noinspection WebpackConfigHighlighting
module.exports = {
  name: 'Название проекта',
  copyright: '',
  pageTitle: 'Project name',
  paths: {
    ROOT: resolveApp('.'),
    SRC: resolveApp('src'),
    ASSETS: resolveApp('src/assets'),
    IMAGES: resolveApp('src/assets/images'),
    ICONS: resolveApp('src/assets/images/icons'),
    ICONS_TO_SPRITE: resolveApp('src/assets/images/icons/sprite'),
    FONTS: resolveApp('src/assets/fonts'),
    FAVICON: resolveApp('src/assets/favicon'),
    DIST: './dist/',
  },
  urls: {
    publicPath: () => process.env.PUBLIC_PATH || '/',
    serverPath: () => process.env.SERVER_PATH || undefined,
  },
  entries: {
    app: './src/index.js',
  },
  supportedImageTypes,
  base64ImageLimit: 10000, // jpg, png, gif файлы
  devServerConfig: {
    public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:7777',
    host: () => process.env.DEVSERVER_HOST || 'localhost',
    poll: () => process.env.DEVSERVER_POLL || false,
    port: () => process.env.DEVSERVER_PORT || 7777,
    https: () => process.env.DEVSERVER_HTTPS || false,
  },
  resolve: {
    alias: {
      api: resolveApp('src/api'),
      assets: resolveApp('src/assets'),
      components: resolveApp('src/components'),
      constants: resolveApp('src/constants'),
      hocs: resolveApp('src/hocs'),
      hooks: resolveApp('src/hooks'),
      layouts: resolveApp('src/layouts'),
      pages: resolveApp('src/pages'),
      store: resolveApp('src/store'),
      utils: resolveApp('src/utils'),
      styles: resolveApp('src/styles/index.less'),
    },
    extensions: ['.js', '.jsx', '.json', '.less', ...supportedImageTypes],
  },
  storybook: {
    alias: {
      resetStyles: resolveApp('src/styles/reset.less'),
      globalStyles: resolveApp('src/styles/global.less'),
    },
  },
  debugTargetBrowsers: false,
  checkUnusedFiles: false,
  analyzeBundles: false,
};
