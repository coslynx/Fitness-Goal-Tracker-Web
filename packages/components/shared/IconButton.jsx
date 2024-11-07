import React from 'react';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@emotion/styled';

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    padding: 1rem 1.5rem;
    border-radius: 4px;
    background-color: #007bff; /* Blue */
    color: white;

    &:hover {
      background-color: #0056b3; /* Darker Blue on Hover */
    }
  }
`;

const IconButton = ({ icon, onClick, disabled, color, size, ...rest }) => {
  return (
    <StyledIconButton
      onClick={onClick}
      disabled={disabled}
      color={color}
      size={size}
      {...rest}
    >
      {icon}
    </StyledIconButton>
  );
};

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

IconButton.defaultProps = {
  color: 'primary',
  size: 'medium',
};

export default IconButton;