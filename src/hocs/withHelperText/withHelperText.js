import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import getDisplayName from 'hocs/getDisplayName';

import './withHelperText.less';

const rootClass = 'helper-text';

function withHelperText(Component) {
  const propTypes = {
    isDisabled: PropTypes.bool,
    isShowHelperText: PropTypes.bool,
    helperText: PropTypes.string,
    errorText: PropTypes.string,
  };

  const defaultProps = {
    isDisabled: false,
    isShowHelperText: true,
  };

  function WithHelperText({
    isDisabled,
    isShowHelperText,
    errorText,
    helperText,
    ...props
  }) {
    const isError = Boolean(errorText);

    return (
      <div className={cn(rootClass, { isError, isDisabled })}>
        <Component
          {...props}
          errorText={errorText}
          isError={isError}
          isDisabled={isDisabled}
        />

        {isShowHelperText && (
          <span className={cn(`${rootClass}__text`)}>
            {errorText || helperText}
          </span>
        )}
      </div>
    );
  }

  const componentName = getDisplayName(Component);
  WithHelperText.displayName = `withHelperText(${componentName})`;
  WithHelperText.propTypes = propTypes;
  WithHelperText.defaultProps = defaultProps;

  return WithHelperText;
}

export default withHelperText;
