import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import withInputHandlers from 'hocs/withInputHandlers';

import { ReactComponent as TickIcon } from './tick.inline.svg';
import styles from './Checkbox.less';

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
    className={cn(className, styles.checkbox, {
      [styles['is-checked']]: isChecked,
      [styles['is-focused']]: isFocused,
      [styles['is-disabled']]: isDisabled,
    })}
  >
    <input
      {...props}
      checked={isChecked}
      className={styles.checkbox__default_checkbox_input}
      disabled={isDisabled}
      type="checkbox"
      onChange={onChange}
    />

    <span className={styles.checkbox__custom_checkbox_input}>
      <TickIcon className={styles.checkbox__icon} />
    </span>

    <span className={styles.checkbox__text}>{children}</span>
  </label>
);
Checkbox.propTypes = propTypes;

export default withInputHandlers(Checkbox);
