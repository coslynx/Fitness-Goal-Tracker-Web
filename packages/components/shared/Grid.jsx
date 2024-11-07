import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { styled } from '@emotion/styled';

const Grid = ({ children, container, spacing, alignItems, justify, className, ...rest }) => {
  const StyledGrid = styled(Grid)`
    &.MuiGrid-root {
      display: 'flex';
      flex-wrap: wrap;
      gap: ${spacing}rem;
      align-items: ${alignItems};
      justify-content: ${justify};
    }
  `;

  if (typeof spacing !== 'number' || spacing < 0) {
    console.error('Invalid spacing value. Spacing must be a non-negative number.');
    spacing = 2;
  }

  if (!alignItems || !['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].includes(alignItems)) {
    console.error('Invalid alignItems value. Please use one of the following: "flex-start", "center", "flex-end", "stretch", "baseline".');
    alignItems = 'center';
  }

  if (!justify || !['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].includes(justify)) {
    console.error('Invalid justify value. Please use one of the following: "flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly".');
    justify = 'flex-start';
  }

  return (
    <StyledGrid
      container={container}
      spacing={spacing}
      alignItems={alignItems}
      justify={justify}
      className={className}
      {...rest}
    >
      {children}
    </StyledGrid>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.bool,
  spacing: PropTypes.number,
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
  className: PropTypes.string,
};

export default Grid;