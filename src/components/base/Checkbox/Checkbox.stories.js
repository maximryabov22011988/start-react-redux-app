import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import Checkbox from './Checkbox';

import 'resetStyles';
import 'globalStyles';

const store = new Store({
  checkbox1: false,
  checkbox2: false,
});

const handleChange = (checkboxNumber) => () =>
  store.set({
    [`checkbox${checkboxNumber}`]: !store.get(`checkbox${checkboxNumber}`),
  });

storiesOf('Components|Base/Checkbox', module).add('no label', () => (
  <State store={store}>
    {(props) => [
      <Checkbox isChecked={props.checkbox1} onChange={handleChange(1)} />,
    ]}
  </State>
));

storiesOf('Components|Base/Checkbox', module).add('with label', () => (
  <State store={store}>
    {(props) => [
      <Checkbox isChecked={props.checkbox2} onChange={handleChange(2)}>
        Label
      </Checkbox>,
    ]}
  </State>
));

storiesOf('Components|Base/Checkbox', module).add('disabled', () => (
  <State store={store}>{() => [<Checkbox isDisabled>Label</Checkbox>]}</State>
));
