const SvgStorePlugin = require('external-svg-sprite-loader');

module.exports = () => ({
  loader: SvgStorePlugin.loader,
  options: {
    name: 'images/sprite.svg',
    iconName: '[name]-[hash:5]',
    svgoOptions: {
      // Обязательное правило для работы SvgStorePlugin.loader
      plugins: [{ removeViewBox: false }],
    },
  },
});
