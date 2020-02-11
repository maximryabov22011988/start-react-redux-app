module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': 'off', // с Windows работает плохо
    'consistent-return': 'off', // нет смысла возвращать undefined из функции
    'arrow-parens': 'off', // несовместимо с prettier
    'object-curly-newline': 'off', // несовместимо с prettier
    'no-mixed-operators': 'off', // несовместимо с prettier
    'function-paren-newline': 'off', // несовместимо с prettier
    'space-before-function-paren': 0, // несовместимо с prettier
    'no-console': 'error', // airbnb использует warn
    'no-alert': 'error', // airbnb использует warn
    'no-param-reassign': 'off', // не дает корректно использовать reduce
    'prefer-promise-reject-errors': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'func-names': 'off',
    radix: 'off',
    'arrow-body-style': 1,
    'no-use-before-define': [
      'error',
      { functions: false, variables: false, classes: true },
    ],

    'import/no-unresolved': 'off', // не работает с webpack alias
    'import/extensions': 'off', // не подходит для react компонентов
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'react/require-default-props': 'off', // airbnb использует error
    'react/forbid-prop-types': 'off', // airbnb использует error
    'react/no-did-update-set-state': 'off', // не дает работать с componentDidUpdate
    'react/button-has-type': 'off',
    'react/jsx-indent': 'off',
    'react/no-array-index-key': 'off',
    'react/state-in-constructor': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/jsx-props-no-spreading': [
      'error',
      {
        exceptions: [
          'a',
          'img',
          'input',
          'source',
          'button',
          'Component',
          'Route',
          'ReactRouterDomLink',
          'Radio',
          'RadioWithHelperText',
        ],
      },
    ],

    'jsx-a11y/label-has-for': 'off', // deprecated
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',

    'prettier/prettier': ['error'],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'no-undef': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      files: ['./.storybook/**'],
      rules: {
        'no-use-before-define': 'off',
        'import/newline-after-import': 'off',
        'max-len': 'off',
      },
    },
    {
      files: ['**/*.stories.js'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
};
