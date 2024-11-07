import React from 'react';
import { styled } from '@emotion/styled';
import PropTypes from 'prop-types';
import SvgIcon from '@components/shared/SvgIcon.jsx';

const iconMapping = {
  'home': '@assets/icons/HomeIcon.svg',
  'settings': '@assets/icons/SettingsIcon.svg',
  'arrow-down': '@assets/icons/ArrowDownIcon.svg',
  // ... Add more icon mappings as needed
};

const Icon = ({ name, size = 24, color = '#007bff', title, className }) => {
  const iconSrc = iconMapping[name];

  if (!iconSrc) {
    console.warn(`Icon with name ${name} not found.`);
    return null;
  }

  return (
    <SvgIcon 
      src={iconSrc} 
      size={size} 
      color={color} 
      title={title} 
      className={className}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;