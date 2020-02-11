const { debugTargetBrowsers } = require('../../webpack.settings');
const { mode } = require('../utils');

module.exports = (browserList, env) => ({
  loader: 'babel-loader',
  options: {
    babelrc: mode.isTest(env),
    configFile: mode.isTest(env),
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          debug: debugTargetBrowsers,
          corejs: {
            version: 3,
            proposals: true,
          },
          useBuiltIns: 'usage',
          targets: {
            browsers: browserList,
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      ['module:fast-async', { spec: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-optional-chaining',
    ],
  },
});
