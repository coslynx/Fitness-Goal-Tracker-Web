import React from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledRadioGroup = styled(RadioGroup)`
  /* Add custom styles for the RadioGroup component here. 
     You can override Material-UI styles for a unique look
     or adjust things like width, font size, or colors to match
     your MVP's design.
  */
`;

const Radio = ({ value, label, name, checked, onChange, disabled, ...rest }) => {
  return (
    <StyledRadioGroup value={value} name={name} onChange={onChange} {...rest}>
      <FormControlLabel value={value} control={<Radio checked={checked} disabled={disabled} />} label={label} />
    </StyledRadioGroup>
  );
};

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
};

export default Radio;