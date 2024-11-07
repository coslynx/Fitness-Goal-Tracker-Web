import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { styled } from '@emotion/styled';

const CustomButton = styled(Button)`
  background-color: #007bff; /* Blue */
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3; /* Darker Blue on Hover */
  }
`;

const Button = ({ children, onClick, disabled, variant, color, size, ...rest }) => {
  return (
    <CustomButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </CustomButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
};

export default Button;