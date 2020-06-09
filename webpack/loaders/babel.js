const { debugTargetBrowsers } = require('../../webpack.settings');
const { mode } = require('../utils');

module.exports = (browserList) => ({
  loader: 'babel-loader',
  options: {
    babelrc: process.env.NODE_ENV === mode.TEST,
    configFile: process.env.NODE_ENV === mode.TEST,
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
      'react-hot-loader/babel',
    ],
  },
});
