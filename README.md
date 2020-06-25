# Стартовый проект с webpack + react + redux 


## Парадигма

- Настроены store, routing.
- Используется относительно жёсткий codestyle на базе AirBnb.
- Перед созданием коммита происходит проверка индексированных js и less
файлов. При ошибках коммит не происходит, ошибки выводятся в терминал.
- В hocs, hooks, utils находятся частоиспользуемые межпроектные хоки, хуки, утилиты.


## Возможности сборки:
- гибкая и простая настройка webpack.
- масштабируемая структура проекта.
- CLI-команды для генерации новых компонентов, stories, hocs, разделов store.
- [storybook](https://storybook.js.org/docs/guides/guide-react/) + библиотека базовых компонентов.
- сборка js файлов, как для современных (попадут только те полифилы, которые не поддерживаются),
  так и устаревших браузеров.
- [AirBnb codestyle](https://github.com/airbnb/javascript/tree/master/react).
- автоформатирование кода ([eslint](https://eslint.org/)).
- поддержка [less](http://lesscss.org/).
- [stylelint](https://github.com/stylelint/stylelint).
- настроенные тесты ([jest](https://jestjs.io/) + [enzyme](https://airbnb.io/enzyme/)).
- сборка svg-спрайтов.
- автогенерация React-компонента при импорте svg-файла.
- конвертирование изображений в base64 формат.
- минификация html, css, js (production сборка).
- поиск неиспользуемых файлов.
- анализ содержимого js бандла.
- деплой на gh-pages.


## Стек разработки
- [react](https://github.com/facebook/react)
- [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom)
- [react-redux](https://github.com/reduxjs/react-redux)
- [redux](https://github.com/reduxjs/redux)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [reselect](https://github.com/reduxjs/reselect)
- [axios](https://github.com/axios/axios)


## Настройка webpack

Все основные настройки находятся в файле `project.settings.js`.

`pageTitle` - заголовок html-страницы.

`publicPath`
- `develop` - путь при dev-разработке (по умолчанию `/`).
- `production` - путь до проекта на сервере (по умолчанию `/`).

`devServer`
- `port` - порт, на котором будет запускаться приложение.
- `proxyConfig` - прокси-настройки для обращения к backend API.

- `alias` - [webpack-алиасы](https://webpack.js.org/configuration/resolve/#resolvealias), используемые на проекте.

- `extensions` - файлы, которые поддерживаются на проекте.

- `modules` - для внутри-проектных библиотек / npm-модулей.

`checkUnusedFiles` - если `true`, проект будет проверен, есть ли неиспользуемые файлы.

`analyzeBundles` - если `true`, будет сформирован файл с размерами js-бандлов. Предварительно необходимо запустить скрипт `npm run build:modern` / `npm run build:old`, после успешной сборки остановить его. Далее запустить скрипт `npm run build:report`.


## Команды

```bash
npm start                      # запуск сервера разработки
npm run build:old              # сборка для устаревших браузеров, без запуска сервера разработки
npm run build:modern           # сборка для современных браузеров, без запуска сервера разработки
npm run prod                   # сборка для устаревших и современных браузеров, без запуска сервера разработки
npm run generate               # генерация компонентов, stories, hocs, раздела store
npm run lint:scripts           # проверить js-файлы
npm run format:scripts         # отформатировать js-файлы
npm run lint:styles            # проверить less-файлы
npm run format:styles          # отформатировать less-файлы
npm test                       # запуск тестов
npm run test:watch             # запуск тестов в watch-режиме
npm run new:component          # создать новый компонент
npm run new:stories            # создать stories для компонента
npm run new:page               # создать новый компонент-страницу
npm run new:hoc                # создать новый хок
npm run new:store:section      # создать новый раздел в store
npm run storybook              # запуск сервера разработки storybook
npm run storybook:build        # сборка storybook
npm run predeploy              # запуск сборки
npm run deploy                 # отправка содержимого папки сборки на gh-pages (нужен репозиторий на github.com)
npm run build:report           # сгенерировать страницу с размерами бандлов
```


## Структура

```bash
dist/                    # Папка сборки
src/                     # Исходники
  api/                   # Функции, для сетевых запросов
  assets/                # Статические файлы для сборки
    favicon/             # Фавиконки
    fonts/               # Шрифты
    images/              # Изображения
  components/            # Компоненты
    base/                # Базовые (кнопки, поля ввода и т.д.)
    common/              # Общие (шапка, футер и т.д.)
  constants/             # Глобальные константы
  hocs/                  # Переиспользуемые компоненты-декораторы
  hooks/                 # Переиспользуемые хуки
  layouts/               # Компоненты Root, App
  pages/                 # Страницы проекта
  store/                 # Хранение глобальных данных
  styles/                # Глобальные стили (цвета, типографика, миксины и т.д.)
  utils/                 # Служебные функции
```

## Генерация нового компонента, stories, hoc, раздела store

`npm run generate component`

Будет задан ряд вопросов, в результате которых будут созданы:
1. Папка в директории `src/components/base` / `src/components/common` с названием компонента.
2. Файл с названием компонента (класс или функция).
3. Файл `index.js` с реэкспортом компонента.
4. Less-файл с названием компонента.
5. Файл с тестами (если необходим).

`npm run generate story`

Будет задан ряд вопросов, в результате которых будет создан `*.stories.js` с названием компонента.

`npm run generate page`

Будет задан ряд вопросов, в результате которых будут созданы:
1. Папка в директории `src/pages` с названием компонента-страницы.
2. Файл с названием компонента (класс или функция).
3. Файл `index.js` с реэкспортом компонента-страницы.
4. Less-файл с названием компонента-страницы.
5. Файл с тестами (если необходим).

`npm run generate hoc`

Будет задан ряд вопросов, в результате которых будут созданы:
1. Папка в директории `src/hocs` с названием компонента.
2. Файл с названием хока (класс или функция).
3. Файл `index.js` с реэкспортом хока.
4. Less-файл с названием хока (если необходим).
5. Файл с тестами (если необходим).

`npm run generate store`

Будет задан ряд вопросов, в результате которых будут созданы:
1. Создана папка в директории `src/store/data` / `src/store/UI` / `src/store/app` с названием раздела store.
2. Файл `types.js`.
3. Файл `actions.js`.
4. Файл `reducer.js`.
5. Файл `index.js` с реэкспортом редьюсера.
6. Файл `operations.js` (если необходим).
7. Файл с тестами (если необходим).


## Store

Файловая структура имеет три основных раздела:
- `data` - данные, которые приходят с сервера.
- `UI` - установленные фильтры, сортировки и т.п.
- `app` - данные пользователя, глобальные ошибки и т.п.

В каждом из вышеописанных разделов с помощью `npm run new:store:section` можно создать подраздел, который будет иметь [ducks-структуру](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/).

## Routing

Все роуты лежат в `src/constants/routePath.js`. По умолчанию настроен роут для главной страницы `/`, для ненайденных страниц `*`.


## Стили

Стили для компонента находятся в папке с компонентом.

Используемый постпроцессинг:
- [autoprefixer](https://github.com/postcss/autoprefixer)

### Less

Все глобальные проектные стили находятся в `src/styles`:
- `breakpoints.less` - контрольные точки для адаптивного/резинового дизайна.
- `colors.less` - цвета, используемые на проекте.
- `fonts.less` - шрифты, используемые на проекте.
- `global.less` - глобальные стили для приложения.
- `index.less` - файл с реэкспортом вышеописанных файлов, кроме reset.less и global.less.
- `layers.less` - порядок слоёв (z-index).
- `mixins.less` - переиспользуемые миксины.
- `reset.less` - сброс браузерных стилей.
- `typography.less` - базовая типографика.


### Стилевой codestyle

Автопроверка и автоформатирование с [stylelint](https://stylelint.io/) и плагинами. См. `.stylelintrc`.

1. 1 компонент = 1 стилевой файл.
2. БЭМ-именование: `__` — разделитель элемента, `--` — разделитель модификатора.
3. Для изменения поведения компонента используются модификаторы с префиксом `is` (например, `is-open`).
4. Для комбинирования классов используется библиотека `classnames`. Импорт в файле компонента в формате `import cn from 'classnames';`.
5. Импорт проектных глобальных стилей в less-файле компонента - `@import "~styles";`.
6. Очередность селекторов:
    - Миксины
    - Стилевые правила сущности
    - Медиаусловия
    - Псевдоселекторы и псевдоэлементы
    - Элементы блока
    - Модификаторы блока
    - Сторонние вложенные селекторы


## Изображения

Для jpg/jpeg/png-изображений есть возможность трансформации в формат base64, необходимо лишь задать размер изображений, ниже которых будет происходить преобразование в base64.

При работе с svg-изображениями:

- если иконка используется во многих местах, лучше поместить ее в спрайт. Для этого достаточно поместить svg-файл в `assets/images/icons/sprite`. Для использования в компоненте достаточно импортировать иконку (пример - `import arrow from 'assets/images/icons/sprite/arrow.svg';`), компонент `import Icon from 'components/base/Icon';` и передать в src иконку (пример - `<Icon src={arrow} />`).

- если иконка / изображение используется разово, можно импортировать в формате `import { ReactComponent as Icon } from './icon.inline.svg';` и использовать как обычный react-компонент. Для корректной работы лоадера название файла иконки должно быть `название_иконки.inline.svg`.

Сжатие изображений, оптимизация svg происходит только в production-сборке.
