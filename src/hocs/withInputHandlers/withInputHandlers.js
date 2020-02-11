import React from 'react';
import PropTypes from 'prop-types';

import getDisplayName from 'hocs/getDisplayName';
import checkAndRunFunction from 'utils/checkAndRunFunction';

function withInputHandlers(Component) {
  const propTypes = {
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  class WithInputHandlers extends React.Component {
    state = {
      isFocused: false,
    };

    handleChange = (event) => {
      const { isDisabled, onChange } = this.props;

      if (isDisabled) {
        return;
      }

      const {
        target: { value },
      } = event;

      checkAndRunFunction(onChange, value);
    };

    handleFocus = (event) => {
      const { isDisabled, onFocus } = this.props;

      if (isDisabled) {
        return;
      }

      this.setState({
        isFocused: true,
      });

      checkAndRunFunction(onFocus, event);
    };

    handleBlur = (event) => {
      const { isDisabled, onBlur } = this.props;

      if (isDisabled) {
        return;
      }

      this.setState({
        isFocused: false,
      });

      checkAndRunFunction(onBlur, event);
    };

    render() {
      const { isFocused } = this.state;

      return (
        <Component
          {...this.props}
          isFocused={isFocused}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      );
    }
  }

  const componentName = getDisplayName(Component);
  WithInputHandlers.displayName = `withInputHandlers(${componentName})`;
  WithInputHandlers.propTypes = propTypes;

  return WithInputHandlers;
}

export default withInputHandlers;
