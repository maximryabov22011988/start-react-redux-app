const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },

  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: ['node_modules', 'src/'],
          },
        },
      },
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
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'react-hooks', 'compat', 'sonarjs', 'optimize-regex', 'sort-destructure-keys'],

  rules: {
    // оператор всегда впереди при переносе выражений на новую строку
    'operator-linebreak': [ERROR, 'before'],
    // перенос строки, отключен т.к. в windows и unix системах различное поведение
    'linebreak-style': OFF,
    // это правило устарело в ESLint v7.0.0
    'global-require': OFF,
    // запрет на использование alert
    'no-alert': ERROR,
    // позволяет записывать свойства в объект result при использовании в reduce
    'no-param-reassign': [ERROR, {
      'props': true,
      'ignorePropertyModificationsFor': ['result']
    }],
    // ++ только для for-цикла
    'no-plusplus': [ERROR, {
      allowForLoopAfterthoughts: true
    }],
    // базовый отступ 2 пробела, у case 2 пробела от switch
    indent: [ERROR, 2, {
      SwitchCase: 1,
      MemberExpression: 1,
      ignoredNodes: ['JSXElement'],
    }],
    // длина строки
    'max-len': [WARN, { code: 150 }],
    // кавычки вокруг ключей объектов, единообразно с остальными ключами объекта
    'quote-props': [ERROR, 'as-needed'],
    // минимальная длина имен (по-умолчанию от 2 символов)
    'id-length': [ERROR, {
      exceptions: ['_', 'i', 'j', 'x', 'y', 'z', 'a', 'b', 'e']
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
          'StoryRouter',
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
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'unknown'],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: [''],
        pathGroups: [
          {
            pattern: 'react-hot-loader/root',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '+(react|react-dom|react-router-dom|prop-types|react-styles-proptype|react-redux|redux|reselect|classnames|lodash)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '+(pages|components|hocs|hooks)/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'store/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: 'constants/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './*.+(less|css|svg)',
            group: 'sibling',
            position: 'after',
          },
        ],
      },
    ],
    // экспорт по дефолту, отдаём преимущество именованному экспорту
    'import/prefer-default-export': OFF,
    // обязательное использование расширений при импорте файлов (кроме js)
    'import/extensions': [ERROR, {
      js: 'never',
      less: 'always',
      svg: 'always'
    }],
    // в dependencies передаем только зависимости, для работы приложения
    'import/no-extraneous-dependencies': [ERROR, {
      'devDependencies': true
    }],

    // проверка href в ссылке, не корректно работает с компонентами поверх html-ссылок
    'jsx-a11y/anchor-is-valid': OFF,
    // отключено правило для читалок и людей с ограниченными способностями
    'jsx-a11y/click-events-have-key-events': OFF,
    // разрешаем интерактивные события на статических элементах (div, span)
    'jsx-a11y/no-static-element-interactions': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    // устаревшее правила
    'jsx-a11y/label-has-for': OFF,
    // отключена обязательная привязка label к полю ввода
    'jsx-a11y/label-has-associated-control': OFF,

    // в каких файлах может содержаться jsx
    'react/jsx-filename-extension': [ERROR, {
      extensions: ['.js', '.jsx']
    }],
    // объявление state в конструкторе, в разработке не всегда нужен конструктор
    'react/state-in-constructor': OFF,
    // дефолтные пропсы только там, где это необходимо
    'react/require-default-props': OFF,
    // не всегда методы класса должны использовать логику с this
    'class-methods-use-this': OFF,
    // разрешает spread пропсов только для html, для остальных нужно перечислить в exceptions
    'react/jsx-props-no-spreading': [ERROR, {
      html: 'ignore',
      exceptions: ['Component', 'Route', 'RouterLink'],
    }],
    // многострочная jsx разметка, кроме единственного вложенного элемента
    'react/jsx-one-expression-per-line': [ERROR, {
      allow: 'single-child'
    }],

    // сортировка ключей при деструктуризации
    'sort-destructure-keys/sort-destructure-keys': ERROR,
    // сортировка props в компонентах
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
    // сортировка prop-types
    'react/sort-prop-types': [
      ERROR,
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: true,
        sortShapeProp: true,
        noSortAlphabetically: false,
      },
    ],
    // сортировка default props
    'react/jsx-sort-default-props': [
      ERROR,
      {
        ignoreCase: false,
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
      files: ['**/*.stories.js'],
      rules: {
        'import/no-unresolved': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react/prop-types': OFF,
      },
    },
  ],
};
