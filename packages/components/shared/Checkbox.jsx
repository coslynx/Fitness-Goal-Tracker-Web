// packages/components/shared/Checkbox.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { styled } from '@emotion/styled';

// Customize the checkbox appearance
const StyledCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    color: #007bff; // Example customization
  }
`;

const Checkbox = ({ checked, onChange, label, disabled }) => {
  return (
    <FormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  disabled: false,
};

export default Checkbox;