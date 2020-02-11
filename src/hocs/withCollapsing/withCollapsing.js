import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'components/base/Icon';
import Button from 'components/base/Button';

import getDisplayName from 'hocs/getDisplayName';

import arrow from 'assets/images/icons/sprite/arrow.svg';
import './withCollapsing.less';

const rootClass = 'with-collapsing';

function withCollapsing(Component) {
  const propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    isCollapsed: PropTypes.bool,
    onCollapseToggle: PropTypes.func,
  };

  class WithCollapsing extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isCollapsed: true,
        isTouched: false,
      };

      this.contentRef = React.createRef();
      this.componentHeight = null;
    }

    componentDidUpdate(prevProps, prevState) {
      const { isCollapsed, isTouched } = this.state;
      if (
        (prevProps.isCollapsed !== isCollapsed ||
          prevState.isCollapsed !== isCollapsed) &&
        !isTouched &&
        this.contentRef
      ) {
        this.setState(
          {
            isTouched: true,
          },
          () => {
            this.componentHeight = this.contentRef.current.scrollHeight;
          }
        );
      }
    }

    getContentHeight() {
      return {
        maxHeight: !this.isCollapsed() ? this.componentHeight : 0,
      };
    }

    handleCollapseToggle = () => {
      this.setState((prevState) => ({
        isCollapsed: !prevState.isCollapsed,
      }));
    };

    isCollapsed() {
      const { props, state } = this;
      return typeof props.isCollapsed === 'boolean'
        ? props.isCollapsed
        : state.isCollapsed;
    }

    render() {
      const { className, children, onCollapseToggle } = this.props;

      return (
        <div
          className={cn(rootClass, className, {
            isExpanded: !this.isCollapsed(),
          })}
        >
          {children && <div className={`${rootClass}__header`}>{children}</div>}

          <Button
            className={`${rootClass}__button`}
            onClick={onCollapseToggle || this.handleCollapseToggle}
          >
            <Icon className={`${rootClass}__arrow-icon`} src={arrow} />
          </Button>

          <div
            className={`${rootClass}__content`}
            style={this.getContentHeight()}
            ref={this.contentRef}
          >
            <Component {...this.props} />
          </div>
        </div>
      );
    }
  }

  const componentName = getDisplayName(Component);
  WithCollapsing.displayName = `withCollapsing(${componentName})`;
  WithCollapsing.propTypes = propTypes;

  return WithCollapsing;
}

export default withCollapsing;
