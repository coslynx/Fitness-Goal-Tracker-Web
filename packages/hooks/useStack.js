// packages/hooks/useStack.js
import { useState, useEffect } from 'react';
import { Box, styled } from '@material-ui/core';
import { Stack as MuiStack } from '@components/shared';

const StyledStack = styled(MuiStack)`
  &.MuiStack-root {
    width: ${props => props.width};
    height: ${props => props.height};
    backgroundColor: ${props => props.backgroundColor};
    alignItems: ${props => props.alignItems};
    justifyContent: ${props => props.justifyContent};
    gap: ${props => props.gap};
  }
`;

const useStack = (initialStackProps = {
  direction: 'column',
  gap: 1,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}) => {
  const [stackProps, setStackProps] = useState(initialStackProps);

  const updateStackProps = (newStackProps) => {
    setStackProps((prevProps) => ({ ...prevProps, ...newStackProps }));
  };

  const resetStackProps = () => {
    setStackProps(initialStackProps);
  };

  const renderStack = (children) => {
    return (
      <StyledStack {...stackProps}>
        {children}
      </StyledStack>
    );
  };

  return {
    stackProps,
    updateStackProps,
    resetStackProps,
    renderStack,
  };
};

export default useStack;