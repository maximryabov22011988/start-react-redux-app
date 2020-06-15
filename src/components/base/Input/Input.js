import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import isEmptyString from 'utils/isEmptyString';

import './Input.less';

const propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  isFocused: PropTypes.bool,
  setInputRef: PropTypes.func,
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

const defaultProps = {
  type: 'text',
};

const Input = ({
  className,
  isDisabled,
  isError,
  isFocused,
  label,
  onBlur,
  onChange,
  onFocus,
  setInputRef,
  type,
  value,
  ...props
}) => (
  <label
    {...props}
    className={cn(className, 'input', {
      'is-error': isError,
      'is-focused': isFocused,
      'is-disabled': isDisabled,
      'with-value': !isEmptyString(value),
    })}
  >
    <input
      className="input__input"
      disabled={isDisabled}
      ref={setInputRef}
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />

    <span className="input__placeholder">{label}</span>
  </label>
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
