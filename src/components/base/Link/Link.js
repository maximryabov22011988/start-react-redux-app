import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import './Link.less';

const propTypes = {
  anchor: PropTypes.string,
  appearance: PropTypes.oneOf(['text', 'button']),
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  to: PropTypes.string,
  url: PropTypes.string,
};

const defaultProps = {
  appearance: 'text',
  children: 'Link',
};

const Link = ({
  anchor,
  appearance,
  children,
  className,
  isDisabled,
  to,
  url,
  ...props
}) => {
  const classes = cn('link', className, {
    'without-text': !children,
    'is-disabled': isDisabled,
    'link--text': appearance === 'text',
    'link--button': appearance === 'button',
  });

  const Component = (anchor || url) ? 'a' : RouterLink;

  return (
    <Component
      className={classes}
      {...{
        [(anchor || url) ? 'href' : 'to']: isDisabled ? undefined : anchor || url || to,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
