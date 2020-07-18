import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import './Link.less';

const propTypes = {
  anchor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  theme: PropTypes.oneOf(['text', 'button']),
  to: PropTypes.string,
  url: PropTypes.string,
};

const defaultProps = {
  children: 'Link',
  theme: 'text',
};

const Link = ({
  anchor,
  children,
  className,
  isDisabled,
  theme,
  to,
  url,
  ...props
}) => {
  const classes = cn(className, 'link', {
    'without-text': !children,
    'is-disabled': isDisabled,
    'link--text': theme === 'text',
    'link--button': theme === 'button',
  });

  const isNativeLink = anchor || url;
  const Component = (isNativeLink) ? 'a' : RouterLink;

  return (
    <Component
      className={classes}
      {...{
        [(isNativeLink) ? 'href' : 'to']: isDisabled ? undefined : anchor || url || to,
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
