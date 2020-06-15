const { browsers } = require('./browsers');

const baseConfig = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      loose: true,
      useBuiltIns: 'usage',
      corejs: {
        version: 3,
        proposals: true,
      },
      targets: {
        browsers,
      },
    }],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['module:fast-async', { spec: true }],
  ],
};

const jestConfig = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
  ],
};

function getConfig(api) {
  if (api.env('test')) {
    return jestConfig;
  }

  if (api.env('development')) {
    baseConfig.plugins.push('react-hot-loader/babel');
  }

  return baseConfig;
}

module.exports = getConfig;
