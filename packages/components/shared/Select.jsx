import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import { styled } from '@emotion/styled';

const CustomSelect = styled(Select)`
  /* Add custom styles for the Select component here.
     You can override Material-UI styles for a unique look
     or adjust things like width, font size, or colors to match
     your MVP's design.
  */
`;

const Select = ({ label, value, onChange, options, placeholder, disabled, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  return (
    <CustomSelect
      label={label}
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </CustomSelect>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
};

export default Select;