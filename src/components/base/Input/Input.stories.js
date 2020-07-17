import React from 'react';

import { State, Store } from '@sambego/storybook-state';
import { withA11y } from '@storybook/addon-a11y';

import Input, { InputWithHelperText, InputWithoutHandler } from './index';

import 'resetStyles';
import 'globalStyles';

const store = new Store({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
  value6: '',
});

const InputWrapper = ({ children }) => <div style={{ width: 400 }}>{children}</div>;

export default {
  title: 'Components|Base/Input',
  component: InputWithHelperText,
  id: 'demo-input-id',
  decorators: [withA11y],
  parameters: {
    props: {
      propTables: [InputWithoutHandler],
      propTablesExclude: [InputWithHelperText, InputWrapper],
    },
  },
};

export const NoLabel = () => (
  <InputWrapper>
    <State store={store}>
      {(props) => [
        <Input
          value={props.value1}
          onChange={(value) => {
            store.set({ value1: value });
          }}
        />,
      ]}
    </State>
  </InputWrapper>
);
NoLabel.story = {
  name: 'no label',
};

export const NoValue = () => (
  <InputWrapper>
    <State store={store}>
      {(props) => [
        <Input
          label="Label"
          value={props.value2}
          onChange={(value) => {
            store.set({ value2: value });
          }}
        />,
      ]}
    </State>
  </InputWrapper>
);
NoValue.story = {
  name: 'no value',
};

export const WithLabelAndNoValue = () => (
  <InputWrapper>
    <State store={store}>
      {(props) => [
        <Input
          label="Label"
          value={props.value3}
          onChange={(value) => {
            store.set({ value3: value });
          }}
        />,
      ]}
    </State>
  </InputWrapper>
);
WithLabelAndNoValue.story = {
  name: 'with label and no value',
};

export const WithLabelAndValue = () => (
  <InputWrapper>
    <State store={store}>
      {(props) => [
        <Input
          label="Label"
          value={props.value4}
          onChange={(value) => {
            store.set({ value4: value });
          }}
        />,
      ]}
    </State>
  </InputWrapper>
);
WithLabelAndValue.story = {
  name: 'with label and value',
};

export const WithHelperText = () => (
  <InputWrapper>
    <State store={store}>
      {(props) => [
        <InputWithHelperText
          helperText="Helper text"
          label="Label"
          value={props.value5}
          onChange={(value) => {
            store.set({ value5: value });
          }}
        />,
      ]}
    </State>
  </InputWrapper>
);
WithHelperText.story = {
  name: 'with helper text',
};

export const Error = () => (
  <InputWrapper>
    <State store={store}>
      {(props) => [
        <Input
          isError
          label="Label"
          value={props.value6}
          onChange={(value) => {
            store.set({ value6: value });
          }}
        />,
      ]}
    </State>
  </InputWrapper>
);
Error.story = {
  name: 'error',
};

export const Disable = () => (
  <InputWrapper>
    <State store={store}>
      {() => [<Input isDisabled label="Label" value="Some value" />]}
    </State>
  </InputWrapper>
);
Disable.story = {
  name: 'disable',
};
