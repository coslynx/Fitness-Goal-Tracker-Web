import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { COLORS } from '@constants'; 

const SvgIcon = ({ src, size = 24, color = COLORS.PRIMARY, title, className }) => {
  const [error, setError] = useState(null);

  const svgElement = useMemo(() => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ color: color }}
        className={className}
        title={title}
        onError={handleError}
      >
        <use xlinkHref={src} /> 
      </svg>
    );
  }, [src, size, color, title, className]);

  const handleError = (event) => {
    setError(event);
    console.error("SVG Icon Error:", event);
  };

  return (
    <div className={className}> 
      {error ? ( 
        <div>Error loading icon</div> 
      ) : ( 
        svgElement
      )}
    </div>
  );
};

SvgIcon.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default SvgIcon;