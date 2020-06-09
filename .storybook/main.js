const merge = require('webpack-merge');

const settings = require('../webpack.settings');
const projectConfig = require('../webpack.config.js');

const babelPreset = require('../webpack/rules/babel');
const lessPreset = require('../webpack/rules/less');
const inlineSvgPreset = require('../webpack/rules/inlineSvg.js');
const fontsPreset = require('../webpack/rules/fonts');

const NotifierPlugin = require('../webpack/plugins/WebpackNotifierPlugin');
const { getPlugins } = require('../webpack/utils');

module.exports = {
  webpackFinal: (config) => {
    // Отключаем дефолтную обработку svg, т.к. конфликует с svgr
    config.module.rules = config.module.rules.map((rule) => {
      if (!rule.test.test('.svg')) {
        return rule;
      }
      const newRule = rule;
      newRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
      return newRule;
    });

    return merge([
      config,
      babelPreset(),
      lessPreset(),
      inlineSvgPreset(),
      fontsPreset(),
      getPlugins(NotifierPlugin({ title: 'Storybook' })),
      {
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            ...projectConfig.resolve.alias,
            ...settings.storybook.alias,
          },
        },
      },
    ]);
  },
};
