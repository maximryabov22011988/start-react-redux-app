import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import RcDialog from 'rc-dialog';

import 'rc-dialog/assets/index.css';

import { ReactComponent as CloseIcon } from './close.inline.svg';
import './Dialog.less';

let mousePosition;

const getClickPosition = (event) => {
  mousePosition = {
    x: event.pageX,
    y: event.pageY,
  };

  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition);
}

const propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  afterClose: PropTypes.func,
  animation: PropTypes.string,
  className: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element,
  ]),
  isCloseByEsc: PropTypes.bool,
  isCloseByOverlay: PropTypes.bool,
  isForceRender: PropTypes.bool,
  isShowOverlay: PropTypes.bool,
  overlayAnimation: PropTypes.string,
  style: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element,
  ]),
  wrapClassName: PropTypes.string,
  zIndex: PropTypes.number,
  onClose: PropTypes.func,
};

const defaultProps = {
  animation: 'zoom',
  isCloseByEsc: true,
  isCloseByOverlay: true,
  isForceRender: false,
  isShowOverlay: true,
  overlayAnimation: 'fade',
  zIndex: 1000,
};

const Dialog = ({
  afterClose,
  animation,
  children,
  className,
  footer,
  isCloseByEsc,
  isCloseByOverlay,
  isForceRender,
  isOpen,
  isShowOverlay,
  onClose,
  overlayAnimation,
  style,
  title,
  wrapClassName,
  zIndex,
}) => {
  const getStyle = useCallback(() => style || {
    top: '40px',
    width: '80%',
    height: 'auto',
  }, [style]);

  const renderCloseIcon = useCallback(() => <CloseIcon />, []);

  return (
    <RcDialog
      afterClose={afterClose}
      animation={animation}
      className={className}
      closeIcon={renderCloseIcon()}
      footer={footer}
      forceRender={isForceRender}
      keyboard={isCloseByEsc}
      mask={isShowOverlay}
      maskAnimation={overlayAnimation}
      maskClosable={isCloseByOverlay}
      mousePosition={mousePosition}
      style={getStyle()}
      title={title}
      visible={isOpen}
      wrapClassName={wrapClassName}
      zIndex={zIndex}
      onClose={onClose}
    >
      {children}
    </RcDialog>
  );
};

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;
