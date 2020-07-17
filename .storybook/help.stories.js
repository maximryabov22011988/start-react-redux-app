import React from 'react';

import { storiesOf } from '@storybook/react';

const howAddStories = `
# Как добавить компонент в storybook

1. Создать файл **ComponentName.stories.js**.

2. Импортировать React для использования JSX-синтаксиса.

~~~js
import React from 'react';
~~~

3. Импортировать storiesOf для добавления stories компонента.

~~~js
import { storiesOf } from '@storybook/react';
~~~

4. Импортировать компонент (файл со stories лучше класть рядом с компонентом).

~~~js
import ComponentName from './index';
~~~

5. Добавить stories.

~~~js
storiesOf('ComponentName', module)
  .add(
    'Description',
    () => <ComponentName />
  )
~~~

Компоненты можно группировать с помощью символа |

~~~js
storiesOf('GroupName|ComponentName', module)
~~~

Компоненты можно группировать в папки с помощью символа /

~~~js
storiesOf('GroupName|FolderName/ComponentName', module)
~~~

6. Для добавления вариаций stories компонента используется метод **add**. Добавить к stories декоратор можно с помощью метода **addDecorator**.

~~~js
.add(
  'Description', // Описание модификации компонента
  () => <ComponentName /> // Функция, которая должны возвращать компонент
)
~~~

`;

const howAddInfoToKnobs = `
# Как заполнить вкладку Knobs?

1. Создать мапы title и defaultValue.

~~~js
const title = {};

const defaultValue = {};
~~~

В title будут храниться все заголовки.

В defaultValue будут храниться все дефолтные значения.

2. Импортировать withKnobs.

~~~js
import { withKnobs } from '@storybook/addon-knobs/react';
~~~

3. Добавить к stories декоратор с помощью метода **addDecorator**.

~~~js
storiesOf('ComponentName', module)
  .addDecorator(withKnobs)
  .add(
    'Description',
    () => <ComponentName />
  )
~~~

4. Для создания вкладок необходимо создать мапу внутри stories.

~~~js
storiesOf('ComponentName', module)
  .addDecorator(withKnobs)
  .add(
    'Description',
    () => {
      const tabId = {
        TAB_1: 'Tab 1',
        TAB_2: 'Tab 2',
      };

      return <ComponentName />;
    }
  )
~~~

5. Для примера создадим интерактивное представления для пропа **show**.

Импортируем boolean

~~~js
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
~~~

запишем заголовок в title

~~~js
const title = {
  SHOW: 'Show component'
};
~~~

запишем заголовок в defaultValue

~~~js
const defaultValue = {
  SHOW: false
};
~~~

использование в stories

~~~js
storiesOf('ComponentName', module)
  .addDecorator(withKnobs)
  .add(
    'Description',
    () => {
      const tabId = {
        TAB_1: 'Tab 1',
        TAB_2: 'Tab 2',
      };
      
      /*
       * tabId.TAB_1 необязательный параметр (поместит управление пропом show в Tab 1). 
       * Для отображения второй вкладки необходимо создать интерактивное управление 
       * еще одним пропом и положить в tabId.TAB_2
      */
      const show = boolean(title.SHOW, defaultValue.SHOW, tabId.TAB_1);

      return <ComponentName show={show} />;
    }
  )
~~~

[Еще примеры](https://github.com/storybookjs/storybook/tree/master/addons/knobs)

`;

const howAddInfoToNotes = `
# Как заполнить вкладку Notes?

1. Создать файл с описанием **ComponentName.md**.

2. Импортиртировать файл с описанием.

~~~js
// Description
import componentNameDesc from './ComponentName.md';
~~~

3. Добавить третим аргументом в метод **add** описание в stories.

~~~js
storiesOf('ComponentName', module)
  .add(
    'Description',
    () => <ComponentName {...actions} />,
    { notes: componentNameDesc }
  )
~~~

`;

const howAddInfoToActions = `
# Как заполнить вкладку Actions?

1. Импортировать action.

~~~js
import { action } from '@storybook/addon-actions';
~~~

2. Добавить мапу actions.

~~~js
// Event handlers
const actions = {
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};
~~~

3. Добавить actions компоненту в stories.

~~~js
storiesOf('ComponentName', module)
  .add(
    'Description',
    () => <ComponentName {...actions} />
  )
~~~

`;

const howAddStateToStories = `
# Как добавить state в stories

1. Импортировать State и Store.

~~~js
import { State, Store } from '@sambego/storybook-state';
~~~

2. Создать store.

~~~js
const store = new Store({
  value: '',
});
~~~

3. Обернуть ваш компонент компонентом State.

~~~js
storiesOf('ComponentName', module).add(
  'Description',
  () => (
    <State store={store}>
      {(props) => [
        <Component {...actions} value={props.value} />
      ]}
    </State>
  )
);
~~~

4. Для получения данных - **store.get(key)**, где key - ключ в store, в строковом формате.

5. Для изменения данных - **store.set({ key: value })**, где key - ключ в store; value - новое значение.

6. Для переключения значений (например: модальные окна, чекбоксы):

~~~js
const acitons = {
  onChange: () => {
    store.set({ isChecked: !store.get('isChecked') });
  },
};
~~~
`;

const howAddInfoToProps = `
# Как добавить state в stories

1. Открыть файл с компонентом.

2. Добавить описание пропсов компоненту с помощью PropTypes. На основании этого будет автоматически сформирована таблица описания пропсов.

3. Если есть необходимость добавить дополнительное описание в столбец description, нужно добавить комментарий перед пропсом, например:

~~~js
const propTypes = {
  /** ComponentName className [custom] */
  className: PropTypes.string,
};
~~~
`;

const wrapStyles = {
  width: '100%',
  height: '100%',
};

const ulStyles = {
  marginTop: 16,
  paddingLeft: 16,
};

const liStyles = {
  marginBottom: 12,
};

const TabsDesc = () => (
  <div style={wrapStyles}>
    <ul style={ulStyles}>
      <li style={liStyles}>
          Notes - текстовое описание в строчном формате, либо *.md файла.
      </li>
      <li style={liStyles}>
          Knobs - интерактивное представление API компонента.
      </li>
      <li style={liStyles}>Props - описание props компонента.</li>
      <li style={liStyles}>Actions - обработка аргументов любых handlers.</li>
    </ul>
  </div>
);

storiesOf(
  'Documentation|Intro',
  module,
).add('Как добавить компонент в storybook', TabsDesc, { notes: howAddStories });

storiesOf('Documentation|Intro', module).add(
  'Как заполнить вкладку Knobs?',
  TabsDesc,
  { notes: howAddInfoToKnobs },
);

storiesOf('Documentation|Intro', module).add(
  'Как заполнить вкладку Props?',
  TabsDesc,
  { notes: howAddInfoToProps },
);

storiesOf('Documentation|Intro', module).add(
  'Как заполнить вкладку Actions?',
  TabsDesc,
  { notes: howAddInfoToActions },
);

storiesOf('Documentation|Intro', module).add(
  'Как заполнить вкладку Notes?',
  TabsDesc,
  { notes: howAddInfoToNotes },
);

storiesOf('Documentation|Intro', module).add(
  'Как добавить state в stories?',
  TabsDesc,
  { notes: howAddStateToStories },
);
