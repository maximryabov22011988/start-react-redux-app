import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import cn from 'classnames';

import './Link.less';

const rootClass = 'link';

const propTypes = {
  className: PropTypes.string,
  appearance: PropTypes.oneOf(['text', 'button']),
  anchor: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
};

const defaultProps = {
  appearance: 'text',
};

function Link({
  className,
  children,
  appearance,
  anchor,
  to,
  isDisabled,
  ...props
}) {
  const classes = cn(rootClass, className, {
    isDisabled,
    [`${rootClass}--text`]: appearance === 'text',
    [`${rootClass}--button`]: appearance === 'button',
    withOutText: !children,
  });

  return (
    <>
      {anchor ? (
        <a
          className={classes}
          href={isDisabled ? undefined : anchor}
          {...props}
        >
          {children}
        </a>
      ) : (
        <ReactRouterDomLink
          className={classes}
          to={isDisabled ? undefined : to}
          {...props}
        >
          {children}
        </ReactRouterDomLink>
      )}
    </>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
