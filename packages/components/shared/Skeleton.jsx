import React from 'react';
import { styled } from '@emotion/styled';

const Skeleton = ({ variant }) => {
  const StyledSkeleton = styled.div`
    background-color: #f5f5f5;
    height: 1rem;
    border-radius: 4px;

    &.skeleton-text {
      width: 100%;
    }

    &.skeleton-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  `;

  switch (variant) {
    case 'text':
      return <StyledSkeleton className="skeleton-text" />;
    case 'avatar':
      return <StyledSkeleton className="skeleton-avatar" />;
    default:
      return <StyledSkeleton />;
  }
};

export default Skeleton;