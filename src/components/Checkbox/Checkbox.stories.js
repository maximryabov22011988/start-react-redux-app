import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { withA11y } from '@storybook/addon-a11y';

import Checkbox from './Checkbox';

import 'resetStyles';
import 'globalStyles';

const store = new Store({
  checkbox1: false,
  checkbox2: false,
});

const handleChange = (checkboxNumber) => () => store.set({
  [`checkbox${checkboxNumber}`]: !store.get(`checkbox${checkboxNumber}`),
});

export default {
  title: 'Components|Base/Checkbox',
  component: Checkbox,
  id: 'demo-checkbox-id',
  parameters: {
    props: {
      propTables: [
        Checkbox,
      ],
    },
  },
  decorators: [withA11y],
};

export const NoLabel = () => (
  <State store={store}>
    {(props) => [
      <Checkbox isChecked={props.checkbox1} onChange={handleChange(1)} />,
    ]}
  </State>
);
NoLabel.story = {
  name: 'no label',
};

export const WithLabel = () => (
  <State store={store}>
    {(props) => [
      <Checkbox isChecked={props.checkbox2} onChange={handleChange(2)}>
        Label
      </Checkbox>,
    ]}
  </State>
);
WithLabel.story = {
  name: 'with label',
};


export const Disabled = () => (
  <State store={store}>{() => [<Checkbox isDisabled>Label</Checkbox>]}</State>
);
Disabled.story = {
  name: 'disabled',
};
