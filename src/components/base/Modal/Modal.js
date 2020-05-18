import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from 'components/base/Button';
import keyCode from 'constants/keyCode';

import { ReactComponent as CloseIcon } from './close.inline.svg';
import './Modal.less';

const rootClass = 'modal';
const modalOverlayClass = `${rootClass}__overlay`;

const propTypes = {
  actions: PropTypes.node,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const defaultProps = {};

class Modal extends React.Component {
  state = {
    fadeType: 'out',
  };

  componentDidMount() {
    this.html = document.querySelector('html');

    const { isOpen } = this.props;

    if (isOpen) {
      this.lockHtmlScroll();
      this.addEventListeners();
    }
  }

  componentDidUpdate(prevProps) {
    this.modalsContainer = document.getElementById('modals');

    const { isOpen } = this.props;

    if (prevProps.isOpen !== isOpen) {
      if (isOpen) {
        this.lockHtmlScroll();
        this.addEventListeners();
        setTimeout(() => this.setState({ fadeType: 'in' }), 0);
      } else {
        this.unlockHtmlScroll();
        this.removeEventListeners();
        setTimeout(() => this.setState({ fadeType: 'out' }), 0);
      }
    }
  }

  componentWillUnmount() {
    this.unlockHtmlScroll();
    this.removeEventListeners();
  }

  handleKeyUp = (event) => {
    const { onClose } = this.props;

    if (event.keyCode === keyCode.ESC) {
      onClose();
    }
  };

  handleOutsideClick = (event) => {
    const { onClose } = this.props;
    const { target } = event;

    if (!target.classList.contains(modalOverlayClass)) {
      return;
    }

    onClose();
  };

  lockHtmlScroll = () => {
    this.html.classList.add('isLockScroll');
  };

  unlockHtmlScroll = () => {
    this.html.classList.remove('isLockScroll');
  };

  addEventListeners() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  removeEventListeners() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  render() {
    const {
      actions,
      children,
      className,
      header,
      isOpen,
      onClose,
    } = this.props;
    const { fadeType } = this.state;

    const modal = (
      <div>
        <div
          className={cn(modalOverlayClass, `fade-${fadeType}`)}
          onClick={this.handleOutsideClick}
          tabIndex="-1"
        />
        <div className={cn(rootClass, className, `fade-${fadeType}`)}>
          {isOpen && (
            <>
              <Button
                className={`${rootClass}__close-button`}
                onClick={onClose}
              >
                <span className={`${rootClass}__close-text`}>Закрыть</span>
                <CloseIcon />
              </Button>

              {header && <div className={`${rootClass}__header`}>{header}</div>}

              <div className={`${rootClass}__content`}>{children}</div>

              {actions && (
                <div className={`${rootClass}__actions`}>{actions}</div>
              )}
            </>
          )}
        </div>
      </div>
    );

    return this.modalsContainer
      ? ReactDOM.createPortal(modal, this.modalsContainer)
      : modal;
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
