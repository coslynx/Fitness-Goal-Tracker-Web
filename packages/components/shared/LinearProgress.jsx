import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';
import { styled } from '@emotion/react';
import { GOAL_TYPE } from '@constants';

const StyledLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 10px;
    borderRadius: 4px;
  }

  &.MuiLinearProgress-colorPrimary {
    backgroundColor: #e0e0e0;
  }

  &.MuiLinearProgress-barColorPrimary {
    backgroundColor: ${props =>
      props.goalType === GOAL_TYPE.WEIGHT_LOSS
        ? '#007bff'
        : props.goalType === GOAL_TYPE.MUSCLE_GAIN
        ? '#4CAF50'
        : props.goalType === GOAL_TYPE.RUN_DISTANCE
        ? '#FFC107'
        : '#007bff'
    };
  }
`;

const LinearProgress = ({ value, goalType, color, variant, ...rest }) => {
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

LinearProgress.propTypes = {
  value: PropTypes.number.isRequired,
  goalType: PropTypes.oneOf([
    GOAL_TYPE.WEIGHT_LOSS,
    GOAL_TYPE.MUSCLE_GAIN,
    GOAL_TYPE.RUN_DISTANCE,
  ]).isRequired,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['determinate', 'indeterminate']),
};

export default LinearProgress;