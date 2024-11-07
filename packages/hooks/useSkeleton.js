import React from 'react';
import { styled } from '@emotion/styled';
import { Skeleton as MuiSkeleton } from '@material-ui/core';

const StyledSkeleton = styled(MuiSkeleton)`
  &.skeleton-text {
    width: 100%;
  }

  &.skeleton-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const Skeleton = ({ variant }) => {
  switch (variant) {
    case 'text':
      return <StyledSkeleton className="skeleton-text" />;
    case 'avatar':
      return <StyledSkeleton className="skeleton-avatar" />;
    default:
      return <StyledSkeleton />;
  }
};

const useSkeleton = (variant) => {
  return {
    Skeleton: Skeleton,
  };
};

export default useSkeleton;