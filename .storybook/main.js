const path = require('path');

const projectSettings = require('../project.settings');

module.exports = {
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.map((rule) => {
      // Отключаем дефолтную обработку svg, т.к. конфликует с svgr
      if (rule.test.test('.svg')) {
        const newRule = rule;
        newRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
        return newRule;
      }

      // Переопределяем обработку css, т.к. не корректно обрабатывает стили из node_modules
      if (rule.test.test('.less') || rule.test.test('.css')) {
        return {
          test: /\.(less|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          exclude: /node_modules\/(?!(rc-dialog))/,
        }
      }

      return rule;
    }).concat([
      {
        test: /\.inline.svg$/,
        exclude: path.resolve(__dirname, '../src/assets/images/icons/sprite'),
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, '../src/assets/fonts'),
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        }],
      },
    ]);

    config.resolve.alias = Object.assign(
        {},
        config.resolve.alias,
        projectSettings.alias.webpack,
        projectSettings.alias.storybook
    );

    return config;
  },
};
