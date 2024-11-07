// packages/components/shared/Chip.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import styled from '@emotion/styled';

const StyledChip = styled(Chip)`
  &.MuiChip-root {
    // Your custom styling for the chip goes here.
    // Ensure it matches the design and styling of your MVP.
  }
`;

const Chip = ({ 
  label, 
  onDelete, 
  clickable, 
  onClick, 
  variant = 'default', 
  color = 'primary', 
  size = 'medium', 
  ...rest
}) => {
  return (
    <StyledChip
      label={label}
      onDelete={onDelete && ((event) => { 
        event.stopPropagation();
        onDelete(event); // Trigger the onDelete callback
      })}
      clickable={clickable}
      onClick={clickable ? onClick : undefined} // Only trigger if clickable
      variant={variant}
      color={color}
      size={size}
      {...rest}
    />
  );
};

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  color: PropTypes.oneOf(['primary', 'secondary', 'default', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Chip;