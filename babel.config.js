const { browsers } = require('./browsers');

const developConfig = {
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
    'react-hot-loader/babel',
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

const productionConfig = {
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
  env: {
    production: {
      plugins: [
        ['transform-react-remove-prop-types', { removeImport: true }],
      ],
    },
  },
};

module.exports = function getConfig(api) {
  if (api.env('development')) {
    return developConfig;
  }
  if (api.env('test')) {
    return jestConfig;
  }
  return productionConfig;
};
