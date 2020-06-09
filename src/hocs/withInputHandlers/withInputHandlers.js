import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import getDisplayName from 'hocs/getDisplayName';

import checkAndRunFunction from 'utils/checkAndRunFunction';

const withInputHandlers = (Component) => {
  const propTypes = {
    isDisabled: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  };

  const WithInputHandlers = ({
    isDisabled, onBlur, onChange, onFocus, ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = useCallback((event) => {
      if (isDisabled) {
        return;
      }
      const {
        target: { value },
      } = event;
      checkAndRunFunction(onChange, value);
    }, [isDisabled, onChange]);

    const handleFocus = useCallback((event) => {
      if (isDisabled) {
        return;
      }
      setIsFocused(true);
      checkAndRunFunction(onFocus, event);
    }, [isDisabled, onFocus]);

    const handleBlur = useCallback((event) => {
      if (isDisabled) {
        return;
      }
      setIsFocused(false);
      checkAndRunFunction(onBlur, event);
    }, [isDisabled, onBlur]);

    return (
      <Component
        {...props}
        isDisabled={isDisabled}
        isFocused={isFocused}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    );
  };

  WithInputHandlers.displayName = `withInputHandlers(${getDisplayName(Component)})`;
  WithInputHandlers.propTypes = propTypes;

  return WithInputHandlers;
};

export default withInputHandlers;
