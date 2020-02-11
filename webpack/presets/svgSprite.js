const { paths } = require('../../webpack.settings');

const svgSpriteLoader = require('../loaders/svgSprite');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: paths.ICONS_TO_SPRITE,
        use: [svgSpriteLoader()],
      },
    ],
  },
});
