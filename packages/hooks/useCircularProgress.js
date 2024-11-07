import { CircularProgress } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useMemo } from 'react';

const StyledProgress = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    color: ${({ color }) => color};
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    stroke-width: ${({ thickness }) => thickness}px;
  }
`;

const useCircularProgress = ({
  size = 40,
  color = '#007bff',
  thickness = 4,
  isLoading = false,
}) => {
  const styledProgress = useMemo(() => <StyledProgress size={size} color={color} thickness={thickness} />, [size, color, thickness]);

  if (isLoading) {
    return (
      <div className="circular-progress-container">
        {styledProgress}
      </div>
    );
  }

  return null;
};

export default useCircularProgress;