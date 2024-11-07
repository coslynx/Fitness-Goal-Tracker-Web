import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledPaper = styled(Paper)`
  background-color: ${props => props.bgColor || '#f5f5f5'};
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PaperComponent = ({ children, elevation, bgColor, className, ...rest }) => {
  return (
    <StyledPaper 
      elevation={elevation} 
      bgColor={bgColor} 
      className={className} 
      {...rest}
    >
      {children}
    </StyledPaper>
  );
};

PaperComponent.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.number,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

PaperComponent.defaultProps = {
  elevation: 1,
};

export default PaperComponent;