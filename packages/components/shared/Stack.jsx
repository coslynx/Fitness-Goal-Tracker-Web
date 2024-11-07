import React from 'react';
import { styled } from '@emotion/styled';
import { Box } from '@material-ui/core';

const StyledStack = styled(Box)`
  display: flex;
  flexDirection: column;
  justifyContent: ${props => props.justifyContent || 'flex-start'};
  alignItems: ${props => props.alignItems || 'stretch'};
  gap: ${props => props.gap || '1rem'};
`;

const Stack = ({ children, justifyContent, alignItems, gap, ...rest }) => {
  return (
    <StyledStack
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      {...rest}
    >
      {children}
    </StyledStack>
  );
};

Stack.propTypes = {
  children: PropTypes.node.isRequired,
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  alignItems: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
  ]),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Stack;