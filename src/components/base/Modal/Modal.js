import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import FocusLock from 'react-focus-lock';

import Button from 'components/base/Button';

import keyCode from 'constants/keyCode';

import { ReactComponent as CloseIcon } from './close.inline.svg';
import styles from './Modal.less';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const defaultProps = {
  children: 'Content',
  header: 'Header',
};

const Modal = ({
  actions,
  children,
  className,
  header,
  isOpen,
  onClose,
}) => {
  const [fadeType, setFadeType] = useState('out');

  const handleKeyUp = useCallback((event) => {
    if (event.keyCode === keyCode.ESC) {
      onClose();
    }
  }, [onClose]);

  const handleOutsideClick = useCallback((event) => {
    const { target } = event;
    if (!target.classList.contains(styles.modal__overlay)) {
      return;
    }
    onClose();
  }, [onClose]);

  const htmlElement = useRef();
  const modalsContainerElement = useRef();
  useEffect(() => {
    htmlElement.current = document.querySelector('html');
    modalsContainerElement.current = document.getElementById('modals');
  });

  useEffect(() => {
    const lockHtmlScroll = () => {
      htmlElement.current.classList.add(styles['is-lock-scroll']);
    };
    const unlockHtmlScroll = () => {
      htmlElement.current.classList.remove(styles['is-lock-scroll']);
    };

    const addEventListeners = () => {
      window.addEventListener('keyup', handleKeyUp, false);
      document.addEventListener('click', handleOutsideClick, false);
    };
    const removeEventListeners = () => {
      window.removeEventListener('keyup', handleKeyUp, false);
      document.removeEventListener('click', handleOutsideClick, false);
    };

    if (isOpen) {
      lockHtmlScroll();
      addEventListeners();
      setTimeout(() => setFadeType('in'), 0);
    } else {
      unlockHtmlScroll();
      removeEventListeners();
      setTimeout(() => setFadeType('out'), 0);
    }

    return () => {
      unlockHtmlScroll();
      removeEventListeners();
    };
  }, [isOpen, handleKeyUp, handleOutsideClick]);

  const fadeStyles = fadeType === 'in' ? styles['fade-in'] : styles['fade-out'];

  return ReactDOM.createPortal(
    <FocusLock>
      <div>
        <div
          className={cn(styles.modal__overlay, fadeStyles)}
          tabIndex="-1"
          onClick={handleOutsideClick}
        />

        <div className={cn(className, styles.modal, fadeStyles)}>
          {isOpen && (
            <>
              <Button
                className={styles.modal__close_button}
                onClick={onClose}
              >
                <span className={styles.modal__close_text}>Закрыть</span>
                <CloseIcon />
              </Button>

              {header && <div className={styles.modal__header}>{header}</div>}

              <div className={styles.modal__content}>{children}</div>

              {actions && (
                <div className={styles.modal__actions}>{actions}</div>
              )}
            </>
          )}
        </div>
      </div>
    </FocusLock>,
    modalsContainerElement.current || document.body,
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
