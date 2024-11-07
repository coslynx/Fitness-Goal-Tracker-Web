import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { styled } from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 10px;
    borderRadius: 4px;
  }

  &.MuiLinearProgress-colorPrimary {
    backgroundColor: #e0e0e0;
  }

  &.MuiLinearProgress-barColorPrimary {
    backgroundColor: ${props => props.goalType === 'WEIGHT_LOSS' ? '#007bff' : props.goalType === 'MUSCLE_GAIN' ? '#4CAF50' : props.goalType === 'RUN_DISTANCE' ? '#FFC107' : '#007bff'};
  }
`;

const Progress = ({ value, goalType, color, variant, ...rest }) => {
  return (
    <StyledLinearProgress
      value={value}
      goalType={goalType}
      variant={variant}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  goalType: PropTypes.oneOf(['WEIGHT_LOSS', 'MUSCLE_GAIN', 'RUN_DISTANCE']).isRequired,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
};

export default Progress;