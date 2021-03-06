const path = require('path');

const projectSettings = require('../project.settings');

module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)', './*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-docs',
    'storybook-dark-mode/register',
    '@storybook/addon-viewport/register',
    'storybook-addon-react-docgen/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource/register',
  ],
  webpackFinal: (config) => {
    const customConfig = config;

    customConfig.module.rules = customConfig.module.rules.map((rule) => {
      // Отключаем дефолтную обработку svg, т.к. конфликует с svgr
      if (rule.test.test('.svg')) {
        const newRule = rule;
        newRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
        return newRule;
      }

      // Переопределяем обработку css, т.к. не корректно обрабатывает стили из node_modules
      if (rule.test.test('.css')) {
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
        };
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
      {
        test: /\.stories\.js$/,
        loaders: [
          {
            loader: require.resolve('@storybook/source-loader'),
            options: { parser: 'javascript' },
          },
        ],
        enforce: 'pre',
      },
    ]);

    customConfig.resolve.alias = {
      ...customConfig.resolve.alias,
      ...projectSettings.alias.webpack,
      ...projectSettings.alias.storybook,
    };

    return customConfig;
  },
};
