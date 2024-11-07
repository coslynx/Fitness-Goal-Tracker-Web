import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { styled } from '@emotion/styled';

const CustomAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    /* Add custom styles for the Avatar component here. 
       You can override Material-UI styles for a unique look
       or adjust things like width, font size, or colors to match
       your MVP's design.
    */
  }
`;

const Avatar = ({ src, alt, children, size, className, ...rest }) => {
  const hasImage = !!src;
  const initials = children || '';

  const handleImageError = () => {
    // Implement error handling logic here
    // For example:
    // - Display a default avatar icon
    // - Show the initials instead
    // - Log the error to your console for debugging
    console.error(`Image failed to load: ${src}`);
  };

  return (
    <CustomAvatar
      alt={alt}
      src={hasImage ? src : undefined}
      style={{ width: size, height: size }}
      className={className}
      {...rest}
      onError={handleImageError}
    >
      {!hasImage && initials}
    </CustomAvatar>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  children: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  size: 40,
};

export default Avatar;