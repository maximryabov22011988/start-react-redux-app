import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Radio.less';

const propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
};

const Radio = ({
  children,
  className,
  isChecked,
  isDisabled,
  isFocused,
  onChange,
  ...props
}) => (
  <label
    className={cn(className, 'radio', {
      'is-checked': isChecked,
      'is-focused': isFocused,
      'is-disabled': isDisabled,
    })}
  >
    <input
      {...props}
      checked={isChecked}
      className="radio__default-radio-input"
      disabled={isDisabled}
      type="radio"
      onChange={onChange}
    />

    <span className="radio__custom-radio-input" />

    <span className="radio__text">{children}</span>
  </label>
);

Radio.propTypes = propTypes;

export default Radio;
