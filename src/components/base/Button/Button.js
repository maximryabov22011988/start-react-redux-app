import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Button.less';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
};

const defaultProps = {
  children: 'Button',
};

const Button = ({
  children, className, isDisabled, onClick, ...props
}) => (
  <button
    type="button"
    {...props}
    className={cn('button', className, {
      'without-text': !children,
    })}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
