import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import getDisplayName from 'hocs/getDisplayName';

import styles from './withHelperText.less';

const withHelperText = (Component) => {
  const propTypes = {
    errorText: PropTypes.string,
    helperText: PropTypes.string,
    isDisabled: PropTypes.bool,
    isShowHelperText: PropTypes.bool,
  };

  const defaultProps = {
    isDisabled: false,
    isShowHelperText: true,
  };

  const WithHelperText = ({
    errorText,
    helperText,
    isDisabled,
    isShowHelperText,
    ...props
  }) => {
    const isError = Boolean(errorText);

    return (
      <div className={cn(styles.helper_text, {
        [styles['is-error']]: isError,
        [styles['is-disabled']]: isDisabled,
      })}
      >
        <Component
          {...props}
          errorText={errorText}
          isDisabled={isDisabled}
          isError={isError}
        />

        {isShowHelperText && (
          <span className={styles.helper_text__text}>
            {errorText || helperText}
          </span>
        )}
      </div>
    );
  };

  WithHelperText.displayName = `withHelperText(${getDisplayName(Component)})`;
  WithHelperText.propTypes = propTypes;
  WithHelperText.defaultProps = defaultProps;

  return WithHelperText;
};

export default withHelperText;
