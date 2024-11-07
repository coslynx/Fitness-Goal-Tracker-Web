// packages/components/shared/Flex.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@emotion/styled'; 

const Flex = ({ children, direction, justifyContent, alignItems, gap, className, ...rest }) => {
  const validatedDirection = ['row', 'column'].includes(direction) ? direction : 'row';
  const validatedJustifyContent = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].includes(justifyContent) ? justifyContent : 'flex-start';
  const validatedAlignItems = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].includes(alignItems) ? alignItems : 'flex-start';
  const validatedGap = typeof gap === 'number' && gap >= 0 ? gap : 1;

  if (!['row', 'column'].includes(direction)) {
    console.warn(
      `Invalid "direction" prop value for Flex component. Defaulting to "row".`
    );
  }

  if (!['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].includes(justifyContent)) {
    console.warn(
      `Invalid "justifyContent" prop value for Flex component. Defaulting to "flex-start".`
    );
  }

  if (!['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].includes(alignItems)) {
    console.warn(
      `Invalid "alignItems" prop value for Flex component. Defaulting to "flex-start".`
    );
  }

  if (typeof gap !== 'number' || gap < 0) {
    console.warn(
      `Invalid "gap" prop value for Flex component. Must be a non-negative number. Defaulting to "1".`
    );
  }

  const StyledFlex = styled('div')`
    display: flex;
    flex-direction: ${validatedDirection};
    justify-content: ${validatedJustifyContent};
    align-items: ${validatedAlignItems};
    gap: ${validatedGap}rem;
  `;

  return (
    <StyledFlex
      direction={validatedDirection}
      justifyContent={validatedJustifyContent}
      alignItems={validatedAlignItems}
      gap={validatedGap}
      className={className}
      {...rest}
    >
      {children} 
    </StyledFlex>
  );
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['row', 'column']),
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  gap: PropTypes.number,
  className: PropTypes.string,
};

Flex.defaultProps = {
  direction: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: 1,
};

export default Flex;