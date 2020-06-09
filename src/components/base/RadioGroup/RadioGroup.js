import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import isArray from 'utils/isArray';
import isEmptyString from 'utils/isEmptyString';

import Radio, { RadioWithHelperText } from './Radio';

import styles from './RadioGroup.less';

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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

const RadioGroup = ({
  children,
  className,
  onChange,
  options,
  value: selectedValue,
  ...props
}) => (
  <div className={cn(className, styles.radio_group)}>
    {!children && isArray(options)
      ? options.map(
        ({
          helperText = '', isDisabled, label, value,
        }) => {
          const Component = !isEmptyString(helperText)
            ? RadioWithHelperText
            : Radio;

          return (
            <div className={styles.radio_group__wrap}>
              <Component
                {...props}
                {...(!isEmptyString(helperText) ? { helperText } : {})}
                isChecked={selectedValue === value}
                isDisabled={isDisabled}
                key={value}
                onChange={() => onChange(value)}
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

RadioGroup.propTypes = propTypes;

export default RadioGroup;
