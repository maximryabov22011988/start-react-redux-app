import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Checkbox, { CheckboxWithHelperText } from 'components/base/Checkbox';
import isEmptyString from 'utils/isEmptyString';
import isArray from 'utils/isArray';

import './CheckboxGroup.less';

const rootClass = 'checkbox-group';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      helperText: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isDisabled: PropTypes.bool,
    })
  ),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

function CheckboxGroup({
  className,
  children,
  value: selectedValues,
  options,
  onChange,
  ...props
}) {
  const handleChange = (value) => {
    let newSelectedValues;

    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter(
        (optionValue) => value !== optionValue
      );
    } else {
      newSelectedValues = [...selectedValues, value];
    }

    onChange(newSelectedValues);
  };

  return (
    <div className={cn(rootClass, className)}>
      {!children && isArray(options)
        ? options.map(
            ({ value, label, helperText = '', isDisabled }, index) => {
              const Component = !isEmptyString(helperText)
                ? CheckboxWithHelperText
                : Checkbox;

              return (
                <Component
                  {...props}
                  {...(!isEmptyString(helperText) ? { helperText } : {})}
                  key={index}
                  isDisabled={isDisabled}
                  isChecked={selectedValues.includes(value)}
                  onChange={() => handleChange(value)}
                >
                  {label}
                </Component>
              );
            }
          )
        : children}
    </div>
  );
}

CheckboxGroup.propTypes = propTypes;

export default CheckboxGroup;
