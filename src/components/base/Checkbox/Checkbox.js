import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import withInputHandlers from 'hocs/withInputHandlers';

import { ReactComponent as TickIcon } from './tick.inline.svg';
import './Checkbox.less';

const rootClass = 'checkbox';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  getRef: PropTypes.func,
};

class Checkbox extends React.Component {
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
      isDisabled,
      isFocused,
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
          className={`${rootClass}__default-checkbox-input`}
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={onChange}
        />

        <span className={`${rootClass}__custom-checkbox-input`}>
          <TickIcon className={`${rootClass}__icon`} />
        </span>
        <span className={`${rootClass}__text`}>{children}</span>
      </label>
    );
  }
}

Checkbox.propTypes = propTypes;

export default withInputHandlers(Checkbox);
