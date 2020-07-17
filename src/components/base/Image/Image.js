import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  alt: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  extension: PropTypes.string,
  filename: PropTypes.string,
  /** C помощью тегов picture/source */
  isSupportedWebp: PropTypes.bool,
  path: PropTypes.string,
  src: PropTypes.string,
};

const defaultProps = {
  isSupportedWebp: false,
};

const Image = ({
  alt,
  className,
  extension,
  filename,
  height,
  isSupportedWebp,
  path,
  src,
  width,
  ...props
}) => {
  const getSrcProps = (tagName) => ({
    src: src || `${path}${filename}.${tagName === 'source' ? 'webp' : extension}`,
  });

  const img = (
    <img
      {...props}
      alt={alt}
      className={className}
      height={height}
      width={width}
      {...getSrcProps()}
    />
  );

  return isSupportedWebp ? (
    <picture>
      <source
        type="image/webp"
        {...getSrcProps('source')}
      />
      {img}
    </picture>
  ) : (
    img
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
