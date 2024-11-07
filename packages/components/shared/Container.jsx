// packages/components/shared/Container.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { styled } from '@emotion/styled';

const ContainerComponent = styled(Container)`
  &.MuiContainer-root {
    /* Add your custom styles for the Container component here. */
    background-color: #f5f5f5;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Container = ({ children, maxWidth, className, ...rest }) => {
  return (
    <ContainerComponent maxWidth={maxWidth} className={className} {...rest}>
      {children}
    </ContainerComponent>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'false']),
  className: PropTypes.string,
};

Container.defaultProps = {
  maxWidth: 'lg',
};

export default Container;