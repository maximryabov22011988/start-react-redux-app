import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  path: PropTypes.string,
  filename: PropTypes.string,
  extension: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isSupportedWebp: PropTypes.bool,
  isLazy: PropTypes.bool,
};

const defaultProps = {
  isSupportedWebp: false,
  isLazy: false,
};

function Image({
  className,
  src,
  path,
  filename,
  extension,
  width,
  height,
  alt,
  isSupportedWebp,
  isLazy,
}) {
  const getSrcProps = (tagName) => {
    // Проверить, работает ли с webp
    const isSourceTag = tagName === 'source';
    const lazySrc = `${path}${filename}.${isSourceTag ? 'webp' : extension}`;
    if (isLazy && !src) {
      return {
        [isLazy
          ? `data-src${isSourceTag ? 'set' : ''}`
          : `src${isSourceTag ? 'Set' : ''}`]: lazySrc,
      };
    }

    return { src };
  };

  const img = (
    <img
      className={cn(className, {
        lazyload: isLazy,
      })}
      width={width}
      height={height}
      alt={alt}
      {...getSrcProps()}
    />
  );

  return isSupportedWebp ? (
    <picture>
      <source
        className={cn({
          lazyload: isLazy,
        })}
        type="image/webp"
        {...getSrcProps('source')}
      />
      {img}
    </picture>
  ) : (
    img
  );
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
