import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { styled } from '@emotion/styled';

const CustomTextField = styled(TextField)`
  &.MuiTextField-root {
    margin-bottom: 1rem;
    width: 100%;
  }

  &.MuiOutlinedInput-root {
    border-radius: 4px;
  }
`;

const TextField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled,
  required,
  fullWidth,
  variant,
  size,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  return (
    <CustomTextField
      label={label}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      error={!!error}
      helperText={!!error && error.message}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      {...rest}
    />
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  size: PropTypes.oneOf(['small', 'medium']),
};

TextField.defaultProps = {
  type: 'text',
  disabled: false,
  fullWidth: false,
  variant: 'outlined',
  size: 'medium',
};

export default TextField;