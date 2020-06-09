import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Checkbox, { CheckboxWithHelperText } from 'components/base/Checkbox';

import isArray from 'utils/isArray';
import isEmptyString from 'utils/isEmptyString';

import styles from './CheckboxGroup.less';

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
    <div className={cn(className, styles.checkbox_group)}>
      {!children && isArray(options)
        ? options.map(
          ({
            helperText = '', isDisabled, label, value,
          }) => {
            const Component = !isEmptyString(helperText)
              ? CheckboxWithHelperText
              : Checkbox;

            return (
              <div className={styles.checkbox_group__wrap}>
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
              </div>

            );
          },
        )
        : children}
    </div>
  );
};

CheckboxGroup.propTypes = propTypes;

export default CheckboxGroup;
