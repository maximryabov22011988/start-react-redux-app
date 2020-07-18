import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Checkbox, { CheckboxWithHelperText } from 'components/Checkbox';

import { isArray } from 'utils/isArray';
import { isEmptyString } from 'utils/isEmptyString';

import './CheckboxGroup.less';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      helperText: PropTypes.string,
      isDisabled: PropTypes.bool,
    }),
  ),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

const CheckboxGroup = ({
  children,
  className,
  onChange,
  options,
  value: selectedValues,
  ...props
}) => {
  const handleChange = (value) => {
    let newSelectedValues;

    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter(
        (optionValue) => value !== optionValue,
      );
    } else {
      newSelectedValues = [...selectedValues, value];
    }

    onChange(newSelectedValues);
  };

  return (
    <div className={cn(className, 'checkbox-group')}>
      {!children && isArray(options)
        ? options.map(
          ({
            helperText = '', isDisabled, label, value,
          }) => {
            const Component = !isEmptyString(helperText)
              ? CheckboxWithHelperText
              : Checkbox;

            return (
              <Component
                {...props}
                {...(!isEmptyString(helperText) ? { helperText } : {})}
                isChecked={selectedValues.includes(value)}
                isDisabled={isDisabled}
                key={value}
                onChange={() => handleChange(value)}
              >
                {label}
              </Component>
            );
          },
        )
        : children}
    </div>
  );
};

CheckboxGroup.propTypes = propTypes;

export default CheckboxGroup;
