import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledToolbar = styled(Toolbar)`
  background-color: #007bff; /* Blue */
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3; /* Darker Blue on Hover */
  }
`;

const Toolbar = ({ children, spacing, alignItems, justify, className }) => {
  return (
    <StyledToolbar
      className={className}
      style={{
        display: 'flex',
        justifyContent: justify,
        alignItems: alignItems,
        gap: `${spacing}rem`,
      }}
    >
      {children}
    </StyledToolbar>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
  className: PropTypes.string,
};

Toolbar.defaultProps = {
  spacing: 2,
  alignItems: 'center',
  justify: 'flex-start',
};

export default Toolbar;