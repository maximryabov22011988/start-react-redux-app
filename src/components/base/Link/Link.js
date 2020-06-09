import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './Link.less';

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
  const classes = cn(className, styles.link, {
    [styles['without-text']]: !children,
    [styles['is-disabled']]: isDisabled,
    [styles['link--text']]: theme === 'text',
    [styles['link--button']]: theme === 'button',
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
