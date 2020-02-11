/* eslint-disable */
const path = require('path');

const { entries } = require('../../webpack.settings');
const createPlugin = require('./createPlugin');

const entryNames = Object.keys(entries);

class LegacyScriptPlugin {
  apply(compiler) {
    const pluginName = 'add-legacy-script-plugin';
    const legacyManifest = require(`${path.resolve('dist')}/manifest.json`);

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // Подписываемся на хук html-webpack-plugin, где меняем данные HTML
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        pluginName,
        (data, cb) => {
          // Добавляем type="module" для скрипта modern-браузеров
          data.body.forEach((tag) => {
            if (tag.tagName === 'script' && tag.attributes) {
              tag.attributes.type = 'module';
            }
          });

          entryNames.forEach((entryName) => {
            // Добавляем скрипт для legacy-браузеров с атрибутом nomodule
            const legacyScript = {
              tagName: 'script',
              closeTag: true,
              attributes: {
                src: legacyManifest[`${entryName}.js`],
                nomodule: true,
                defer: true,
              },
            };
            data.body.push(legacyScript);
          });

          cb();
        }
      );
    });
  }
}

module.exports = () => createPlugin(LegacyScriptPlugin);
