import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import withInputHandlers from 'hocs/withInputHandlers';

import { ReactComponent as TickIcon } from './tick.inline.svg';
import './Checkbox.less';

const propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  errorText: PropTypes.string,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  isFocused: PropTypes.bool,
};

const Checkbox = ({
  children,
  className,
  errorText,
  isChecked,
  isDisabled,
  isError,
  isFocused,
  onChange,
  ...props
}) => (
  <label
    className={cn('checkbox', className, {
      'is-checked': isChecked,
      'is-focused': isFocused,
      'is-disabled': isDisabled,
    })}
  >
    <input
      {...props}
      checked={isChecked}
      className="checkbox__default-checkbox-input"
      disabled={isDisabled}
      type="checkbox"
      onChange={onChange}
    />

    <span className="checkbox__custom-checkbox-input">
      <TickIcon className="checkbox__icon" />
    </span>

    <span className="checkbox__text">{children}</span>
  </label>
);
Checkbox.propTypes = propTypes;

export default withInputHandlers(Checkbox);
