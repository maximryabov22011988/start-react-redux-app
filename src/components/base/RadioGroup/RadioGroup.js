import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import isArray from 'utils/isArray';
import isEmptyString from 'utils/isEmptyString';

import Radio, { RadioWithHelperText } from './Radio';

import './RadioGroup.less';

const rootClass = 'radio-group';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      helperText: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      isDisabled: PropTypes.bool,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

function RadioGroup({
  className,
  children,
  value: selectedValue,
  options,
  onChange,
  ...props
}) {
  return (
    <div className={cn(rootClass, className)}>
      {!children && isArray(options)
        ? options.map(
            ({ value, label, helperText = '', isDisabled }, index) => {
              const Component = !isEmptyString(helperText)
                ? RadioWithHelperText
                : Radio;

              return (
                <Component
                  {...props}
                  {...(!isEmptyString(helperText) ? { helperText } : {})}
                  key={index}
                  isDisabled={isDisabled}
                  isChecked={selectedValue === value}
                  onChange={() => onChange(value)}
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

RadioGroup.propTypes = propTypes;

export default RadioGroup;
