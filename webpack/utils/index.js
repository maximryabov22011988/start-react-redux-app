const { supportedImageTypes } = require('../../webpack.settings');

const mode = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
  isProduction: (env) => env === mode.PRODUCTION,
  isTest: (env) => env === mode.TEST,
};

const browsers = {
  LEGACY: 'legacy',
  MODERN: 'modern',
  ONLY_MODERN: 'only_modern',
};

const cssSupported = {
  less(css) {
    return css.includes('less');
  },
  CSSModule(css) {
    return css.includes('css-module');
  },
};

const isSupportedJpg = supportedImageTypes.includes('jpg');
const isSupportedJpeg = supportedImageTypes.includes('jpeg');
const isSupportedPng = supportedImageTypes.includes('png');
const isSupportedWebp = supportedImageTypes.includes('webp');

const supportedImages = {
  JPG: isSupportedJpg,
  PNG: isSupportedPng,
  WEBP:
    isSupportedWebp && (isSupportedJpg || isSupportedJpeg || isSupportedPng),
};

module.exports = {
  mode,
  browsers,
  cssSupported,
  supportedImages,
  transformFilename: (filename, targetBrowsers) =>
    `${filename}.${targetBrowsers}`,
  getPlugins: (...plugins) => ({
    plugins,
  }),
};
