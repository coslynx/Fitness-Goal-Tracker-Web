import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Typography } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledBadge = styled(Badge)`
  &.MuiBadge-root {
    // Customize the badge appearance here using styled-components.
    // Remember to align your styles with the MVP's design principles.
  }
`;

const BadgeComponent = ({ children, icon, color = 'primary', size = 'medium', ...rest }) => {
  return (
    <StyledBadge color={color} badgeContent={<Typography variant="caption" color="white">{children}</Typography>} size={size} {...rest}>
      {icon}
    </StyledBadge>
  );
};

BadgeComponent.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.element, // Optional icon
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default BadgeComponent;