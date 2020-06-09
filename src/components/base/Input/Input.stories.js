import React from 'react';

import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import Input, { InputWithHelperText } from './index';

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

storiesOf('Components|Base/Input', module).add('no label', () => (
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
));

storiesOf('Components|Base/Input', module).add('no value', () => (
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
));

storiesOf('Components|Base/Input', module).add(
  'with label and no value',
  () => (
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
  ),
);

storiesOf('Components|Base/Input', module).add('with label and value', () => (
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
));

storiesOf('Components|Base/Input', module).add('with helper text', () => (
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
));

storiesOf('Components|Base/Input', module).add('error', () => (
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
));

storiesOf('Components|Base/Input', module).add('disable', () => (
  <InputWrapper>
    <State store={store}>
      {() => [<Input isDisabled label="Label" value="Some value" />]}
    </State>
  </InputWrapper>
));

function InputWrapper({ children }) {
  return <div style={{ width: 400 }}>{children}</div>;
}
