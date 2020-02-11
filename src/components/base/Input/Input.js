import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import withInputHandlers from 'hocs/withInputHandlers';
import isEmptyString from 'utils/isEmptyString';

import './Input.less';

const rootClass = 'input';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  getRef: PropTypes.func,
  isError: PropTypes.bool,
  isFocused: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

const defaultProps = {
  type: 'text',
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.getRef = props.getRef || (() => null);
  }

  componentDidMount = () => {
    if (this.inputRef) {
      this.getRef(this.inputRef);
    }
  };

  componentWillUnmount = () => {
    this.getRef(null);
  };

  render() {
    const {
      className,
      label,
      type,
      value,
      isError,
      isFocused,
      isDisabled,
      onChange,
      onFocus,
      onBlur,
    } = this.props;

    return (
      <label
        className={cn(rootClass, className, {
          isError,
          isFocused,
          isDisabled,
          withValue: !isEmptyString(value),
        })}
      >
        <input
          ref={this.inputRef}
          className={`${rootClass}__input`}
          disabled={isDisabled}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className={`${rootClass}__placeholder`}>{label}</span>
      </label>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default withInputHandlers(Input);
