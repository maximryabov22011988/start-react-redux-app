import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

const propTypes = {
  src: PropTypes.shape({
    symbol: PropTypes.string,
    viewBox: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  style: stylePropType,
  width: PropTypes.string,
};

const defaultProps = {
  height: '40',
  width: '40',
};

// Для использования с svgSprite
const Icon = ({
  className, height, src, style, width, ...props
}) => (
  <svg
    {...props}
    className={className}
    height={height}
    role="img"
    style={style}
    viewBox={src.viewBox}
    width={width}
  >
    <use xlinkHref={src.symbol} />
  </svg>
);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
