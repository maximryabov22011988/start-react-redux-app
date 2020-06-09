import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import withInputHandlers from 'hocs/withInputHandlers';

import styles from './Radio.less';

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
    className={cn(className, styles.radio, {
      [styles['is-checked']]: isChecked,
      [styles['is-focused']]: isFocused,
      [styles['is-disabled']]: isDisabled,
    })}
  >
    <input
      {...props}
      checked={isChecked}
      className={styles.radio__default_radio_input}
      disabled={isDisabled}
      type="radio"
      onChange={onChange}
    />

    <span className={styles.radio__custom_radio_input} />

    <span className={styles.radio__text}>{children}</span>
  </label>
);

Radio.propTypes = propTypes;

export default withInputHandlers(Radio);
