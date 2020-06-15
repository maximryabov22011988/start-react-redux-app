const path = require('path');
const merge = require('webpack-merge');

const projectSettings = require('../project.settings');

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
      {
        module: {
          rules: [
            // {
            //   test: /\.(js|jsx)$/,
            //   use: [{
            //     loader: 'babel-loader',
            //     options: {
            //       cacheDirectory: true,
            //       presets: [
            //         '@babel/preset-react',
            //         ['@babel/preset-env', {
            //           modules: false,
            //           loose: true,
            //           useBuiltIns: 'usage',
            //           corejs: {
            //             version: 3,
            //             proposals: true,
            //           },
            //           targets: {
            //             browsers,
            //           },
            //         }],
            //       ],
            //       plugins: [
            //         '@babel/plugin-proposal-export-default-from',
            //         ['@babel/plugin-proposal-class-properties', { loose: true }],
            //         ['@babel/plugin-proposal-optional-chaining', { loose: true }],
            //         ['module:fast-async', { spec: true }],
            //       ],
            //     }
            //   }],
            // },
            {
              test: /\.inline.svg$/,
              exclude: path.resolve(__dirname, '../src/assets/images/icons/sprite'),
              use: ['@svgr/webpack', 'url-loader'],
            },
            {
              test: /\.(le|c)ss$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                  },
                },
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: false,
                  },
                },

              ],
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
          ],
        },
      },
      {
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            ...projectSettings.alias.webpack,
            ...projectSettings.alias.storybook,
          },
        },
      },
    ]);
  },
};
