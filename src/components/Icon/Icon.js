import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.shape({
    symbol: PropTypes.string,
    viewBox: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

const defaultProps = {
  height: '40',
  width: '40',
};

// Для использования с svgSprite
const Icon = ({
  className, height, src, width, ...props
}) => (
  <svg
    {...props}
    className={className}
    height={height}
    role="img"
    viewBox={src.viewBox}
    width={width}
  >
    <use xlinkHref={src.symbol} />
  </svg>
);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
