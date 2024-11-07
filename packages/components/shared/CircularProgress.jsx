// packages/components/shared/CircularProgress.jsx

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@emotion/styled';

const StyledCircularProgress = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    /* Add custom styles for the CircularProgress component here. 
       You can override Material-UI styles for a unique look
       or adjust things like width, font size, or colors to match
       your MVP's design.
    */
  }
`;

const CircularProgress = ({ size, color, thickness, className, ...rest }) => {
  return (
    <StyledCircularProgress
      size={size}
      color={color}
      thickness={thickness}
      className={className}
      {...rest}
    />
  );
};

CircularProgress.propTypes = {
  size: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'secondary', '#007bff']), // Example color options
  thickness: PropTypes.number,
  className: PropTypes.string,
};

CircularProgress.defaultProps = {
  size: 40,
  color: 'primary',
  thickness: 4,
};

export default CircularProgress;