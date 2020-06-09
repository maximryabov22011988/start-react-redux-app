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
  supportedImages,
  transformFilename: (filename, targetBrowsers) => `${filename}.${targetBrowsers}`,
  getPlugins: (...plugins) => ({
    plugins,
  }),
};
