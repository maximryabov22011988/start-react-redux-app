import React from 'react';

import { State, Store } from '@sambego/storybook-state';

import Radio from './Radio';
import RadioGroup from './RadioGroup';

import 'resetStyles';
import 'globalStyles';

const store = new Store({
  selectedValues1: 2,
  selectedValues2: 4,
});

const handleChange = (radioGroupNumber) => (selectedValues) => store.set({
  [`selectedValues${radioGroupNumber}`]: selectedValues,
});

export default {
  title: 'Components|Base/RadioGroup',
  component: RadioGroup,
  id: 'demo-radio-group-id',
  parameters: {
    props: {
      propTables: [
        RadioGroup,
      ],
    },
  },
};

export const OptionsInProps = () => (
  <State store={store}>
    {(props) => [
      <RadioGroup
        options={[
          {
            label: 'Radio 1',
            value: 1,
            helperText: 'HelperText 1',
            isDisabled: true,
          },
          {
            label: 'Radio 2',
            value: 2,
          },
          {
            label: 'Radio 3',
            value: 3,
            helperText: 'HelperText 3',
          },
        ]}
        value={props.selectedValues1}
        onChange={handleChange(1)}
      />,
    ]}
  </State>
);
OptionsInProps.story = {
  name: 'options in props',
};

export const OptionsInChildren = () => (
  <State store={store}>
    {(props) => [
      <RadioGroup>
        {[
          {
            label: 'Radio 4',
            value: 4,
          },
          {
            label: 'Radio 5',
            value: 5,
          },
          {
            label: 'Radio 6',
            value: 6,
          },
        ].map((option) => (
          <Radio
            isChecked={props.selectedValues2 === option.value}
            isDisabled={option.isDisabled}
            onChange={() => handleChange(2)(option.value)}
          >
            {option.label}
          </Radio>
        ))}
      </RadioGroup>,
    ]}
  </State>
);
OptionsInChildren.story = {
  name: 'options in children',
};
