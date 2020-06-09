import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'components/base/Icon';
import Button from 'components/base/Button';
import getDisplayName from 'hocs/getDisplayName';

import arrow from 'assets/images/icons/sprite/arrow.svg';

import './withCollapsing.less';

const withCollapsing = (Component) => {
  const propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
  };

  const WithCollapsing = ({
    children, className, ...props
  }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const contentRef = useRef(null);

    const getContentHeight = () => ({
      maxHeight: !isCollapsed && contentRef.current ? contentRef.current.scrollHeight : 0,
    });

    const toggleCollapse = useCallback(() => {
      setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
    }, []);

    return (
      <div
        className={cn('with-collapsing', className, {
          isExpanded: !isCollapsed,
        })}
      >
        {children && (
          <div className="with-collapsing__header">
            {children}
          </div>
        )}

        <Button
          className="with-collapsing__button"
          onClick={toggleCollapse}
        >
          <Icon className="with-collapsing__arrow-icon" src={arrow} />
        </Button>

        <div
          className="with-collapsing__content"
          ref={contentRef}
          style={getContentHeight()}
        >
          <Component {...props} />
        </div>
      </div>
    );
  };

  WithCollapsing.displayName = `withCollapsing(${getDisplayName(Component)})`;
  WithCollapsing.propTypes = propTypes;

  return WithCollapsing;
};

export default withCollapsing;
