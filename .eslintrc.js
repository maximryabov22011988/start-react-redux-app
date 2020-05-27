const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['^api', './src/api'],
          ['^assets', './src/assets'],
          ['^components', './src/components'],
          ['^constants', './src/constants'],
          ['^hocs', './src/hocs'],
          ['^layouts', './src/layouts'],
          ['^pages', './src/pages'],
          ['^store', './src/store'],
          ['^utils', './src/utils'],
          ['^styles', './src/styles/index.less'],
        ],
        extensions: ['.js', '.jsx', '.json', '.less', '.svg']
      }
    },
  },

  // Глобальные переменные, которые нужно передать из webpack в приложение
  globals: {},

  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    jsx: true,
  },

  extends: ['airbnb', 'airbnb/hooks'],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'react-hooks', 'compat', 'sonarjs', 'optimize-regex'],

  rules: {
    // перенос строки, отключен т.к. в windows и unix системах различное поведение
    'linebreak-style': OFF,
    // запрет на использование alert
    'no-alert': ERROR,
    // позволяет записывать свойства в объект result при использовании в reduce
    'no-param-reassign': [ERROR, {
      "props": true,
      "ignorePropertyModificationsFor": ["result"]
    }],
    // ++ только для for-цикла
    'no-plusplus': [ERROR, {
      allowForLoopAfterthoughts: true
    }],
    // базовый отступ 2 пробела, у case 2 пробела от switch
    indent: [ERROR, 2, {
      SwitchCase: 1,
    }],
    // длина строки
    'max-len': [WARN, { code: 150 }],
    // кавычки вокруг ключей объектов, единообразно с остальными ключами объекта
    'quote-props': [ERROR, 'as-needed'],
    // минимальная длина имен (по-умолчанию от 2 символов)
    'id-length': [ERROR, {
      exceptions: ['_', 'i', 'j', 'k']
    }],
    // наименования переменных, функций и тд только в camelСase
    camelcase: [
      ERROR,
      {
        allow: [
          'UNSAFE_componentDidMount',
          'UNSAFE_componentWillReceiveProps',
          'UNSAFE_componentWillUpdate',
        ],
      },
    ],
    // можно писать с большой буквы только имена классов (конструкторов)
    'new-cap': [
      ERROR,
      {
        capIsNewExceptions: [
          'SortableContainer',
          'SortableElement',
          'List',
          'Map',
          'Set',
        ],
      },
    ],

    // порядок импортов
    'import/order': [
      ERROR,
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'unknown'],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: [''],
        pathGroups: [
          {
            pattern: './*.+(less|css)',
            group: 'sibling',
            position: 'after',
          },
          {
            pattern: '+(react|prop-types)',
            group: 'external',
            position: 'before',
          },
        ],
      },
    ],
    // экспорт по дефолту, отдаём преимущество именованному экспорту
    'import/prefer-default-export': OFF,
    // обязательное использование расширений при импорте файлов (кроме js)
    'import/extensions': [ERROR, {
      js: 'never',
      less: 'always'
    }],

    // проверка href в ссылке, не корректно работает с компонентами поверх html-ссылок
    'jsx-a11y/anchor-is-valid': OFF,
    // отключено правило для читалок и людей с ограниченными способностями
    'jsx-a11y/click-events-have-key-events': OFF,
    // разрешаем интерактивные события на статических элементах (div, span)
    'jsx-a11y/no-static-element-interactions': OFF,
    // устаревшее правила
    'jsx-a11y/label-has-for': OFF,
    // устаревшее правила
    'jsx-a11y/label-has-associated-control': OFF,

    // в каких файлах может содержаться jsx
    'react/jsx-filename-extension': [ERROR, {
      extensions: ['.js', '.jsx']
    }],
    // объявление state в конструкторе, в разработке не всегда нужен конструктор
    'react/state-in-constructor': OFF,
    // не всегда методы класса должны использовать логику с this
    'class-methods-use-this': OFF,
    // разрешает spread пропсов только для html, для остальных нужно перечислить в exceptions
    'react/jsx-props-no-spreading': [ERROR, {
      html: 'ignore',
      exceptions: ['Component', 'Route'],
    }],
    // сортировка пропсов в компонентах
    'react/jsx-sort-props': [
      ERROR,
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: false,
      },
    ],
    // порядок методов в компоненте-классе
    'react/sort-comp': [
      ERROR,
      {
        order: [
          'static-methods',
          'lifecycle',
          'everything-else',
          '/^(get|set).+$/',
          '/^handle.+$/',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'constructor',
            'statics',
            'contextTypes',
            'childContextTypes',
            'state',
            'getDefaultProps',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentDidMount',
            'shouldComponentUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
    },
    {
      files: ['./.storybook/**'],
    },
    {
      files: ['**/*.stories.js'],
      rules: {
        'react/jsx-props-no-spreading': OFF,
        'react/prop-types': OFF,
      },
    },
  ],
};
