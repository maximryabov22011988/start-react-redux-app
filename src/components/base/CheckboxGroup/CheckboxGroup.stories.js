import React from 'react';

import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import Checkbox from 'components/base/Checkbox';

import CheckboxGroup from './CheckboxGroup';

import 'resetStyles';
import 'globalStyles';

const store = new Store({
  selectedValues1: [],
  selectedValues2: [],
});

const handleChange = (checkboxGroupNumber) => (selectedValues) => store.set({
  [`selectedValues${checkboxGroupNumber}`]: selectedValues,
});

storiesOf('Components|Base/CheckboxGroup', module).add(
  'options in props',
  () => (
    <State store={store}>
      {(props) => [
        <CheckboxGroup
          options={[
            {
              label: 'Checkbox 1',
              value: 1,
              helperText: 'HelperText 1',
              isDisabled: true,
            },
            {
              label: 'Checkbox 2',
              value: 2,
            },
            {
              label: 'Checkbox 3',
              value: 3,
              helperText: 'HelperText 3',
            },
          ]}
          value={props.selectedValues1}
          onChange={handleChange(1)}
        />,
      ]}
    </State>
  ),
);

storiesOf('Components|Base/CheckboxGroup', module).add(
  'options in children',
  () => (
    <State store={store}>
      {(props) => [
        <CheckboxGroup>
          {[
            {
              label: 'Checkbox 4',
              value: 4,
            },
            {
              label: 'Checkbox 5',
              value: 5,
            },
            {
              label: 'Checkbox 6',
              value: 6,
            },
          ].map((option) => {
            const handleCheckboxGroupChange = (value) => {
              let newSelectedValues;

              if (props.selectedValues2.includes(value)) {
                newSelectedValues = props.selectedValues2.filter(
                  (optionValue) => value !== optionValue,
                );
              } else {
                newSelectedValues = [...props.selectedValues2, value];
              }

              handleChange(2)(newSelectedValues);
            };

            return (
              <Checkbox
                isChecked={props.selectedValues2.includes(option.value)}
                isDisabled={option.isDisabled}
                onChange={() => handleCheckboxGroupChange(option.value)}
              >
                {option.label}
              </Checkbox>
            );
          })}
        </CheckboxGroup>,
      ]}
    </State>
  ),
);
