import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import withInputHandlers from 'hocs/withInputHandlers';

import './Radio.less';

const rootClass = 'radio';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  getRef: PropTypes.func,
};

class Radio extends Component {
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
      children,
      isChecked,
      isFocused,
      isDisabled,
      onChange,
      ...props
    } = this.props;

    return (
      <label
        className={cn(rootClass, className, {
          isChecked,
          isFocused,
          isDisabled,
        })}
      >
        <input
          {...props}
          ref={this.inputRef}
          className={`${rootClass}__default-radio-input`}
          type="radio"
          checked={isChecked}
          disabled={isDisabled}
          onChange={onChange}
        />
        <span className={`${rootClass}__custom-radio-input`} />
        <span className={`${rootClass}__text`}>{children}</span>
      </label>
    );
  }
}

Radio.propTypes = propTypes;

export default withInputHandlers(Radio);
