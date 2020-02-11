import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.shape({
    symbol: PropTypes.string,
    viewBox: PropTypes.string,
  }).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

const defaultProps = {
  width: '40',
  height: '40',
};

// Для использования с svgSprite
function Icon({ className, width, height, src, style }) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox={src.viewBox}
      role="img"
    >
      <use xlinkHref={src.symbol} />
    </svg>
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
