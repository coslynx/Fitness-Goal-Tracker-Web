import React, { useState, useMemo } from 'react';
import { styled } from '@emotion/styled';
import PropTypes from 'prop-types';
import { COLORS } from '@constants';
import SvgIcon from '@components/shared/SvgIcon.jsx';

const useSvgIcon = ({ src, size = 24, color = COLORS.PRIMARY, title, className }) => {
  const [error, setError] = useState(null);

  const svgElement = useMemo(() => {
    return (
      <SvgIcon src={src} size={size} color={color} title={title} className={className} />
    );
  }, [src, size, color, title, className]);

  const handleError = (event) => {
    setError(event);
    console.error('SVG Icon Error:', event);
  };

  return { SvgIcon: svgElement, error };
};

useSvgIcon.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default useSvgIcon;