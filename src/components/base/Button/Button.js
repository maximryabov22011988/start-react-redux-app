import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Button.less';

const rootClass = 'button';

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  type: 'button',
};

function Button({ className, type, children, isDisabled, onClick, ...props }) {
  return (
    <button
      {...props}
      className={cn(rootClass, className, { withOutText: !children })}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
