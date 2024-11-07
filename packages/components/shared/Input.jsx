import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { styled } from '@emotion/styled';

const CustomTextField = styled(TextField)`
  /* Add custom styles for the input field here. 
  You can use styled-components to override default Material-UI styles
  and achieve a more tailored look.
  */
`;

const Input = ({ label, type, placeholder, value, onChange, error, helperText, disabled, ...rest }) => {
  const [inputValue, setInputValue] = useState(value);

  // Handle changes to the input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  // Render the custom input field
  return (
    <CustomTextField
      label={label}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      error={!!error}
      helperText={helperText}
      disabled={disabled}
      {...rest}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  disabled: false,
};

export default Input;