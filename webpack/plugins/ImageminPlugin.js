const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const { supportedImageTypes } = require('../../webpack.settings');
const { supportedImages } = require('../utils');
const createPlugin = require('./createPlugin');

const getImageOptions = (imageType, options) =>
  supportedImageTypes.includes(imageType) ? options : null;

module.exports = () =>
  createPlugin(ImageminPlugin, {
    test: /\.(jpe?g|png|gif|svg)$/i,
    svgo: getImageOptions('svg', {
      plugins: [
        // Обязательные правила для работы SvgStorePlugin.loader
        { collapseGroups: true },
        { convertPathData: true },
        { convertStyleToAttrs: true },
        { convertTransform: true },
        { removeDesc: true },
        { removeDimensions: true },
        { cleanupIDs: false },
        { removeUnknownsAndDefaults: false },
        { removeViewBox: false },

      ],
    }),
    pngquant: getImageOptions('png', {
      speed: 1,
      quality: '70-80',
    }),
    gifsicle: getImageOptions('gif', {
      interlaced: true,
      optimizationLevel: 3,
    }),
    plugins: supportedImages.JPG
      ? [
          imageminMozjpeg({
            quality: 75,
            progressive: true,
          }),
        ]
      : undefined,
    jpegtran: null,
    optipng: null,
  });
