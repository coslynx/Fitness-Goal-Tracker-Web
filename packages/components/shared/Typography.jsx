import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@emotion/styled';

const StyledTypography = styled(Typography)`
  /* Custom styles here. You can use emotion's syntax to style the component.
  For example:
  fontSize: "1.2rem";
  fontWeight: "600";
  color: "blue"; */
`;

const Typography = ({ children, variant, color, align, fontWeight, ...rest }) => {
  return (
    <StyledTypography variant={variant} color={color} align={align} fontWeight={fontWeight} {...rest}>
      {children}
    </StyledTypography>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline', 'inherit']),
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']),
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  fontWeight: PropTypes.oneOf(['regular', 'medium', 'bold', 'lighter', 'bolder']),
};

Typography.defaultProps = {
  variant: 'body1',
  color: 'inherit',
  align: 'inherit',
  fontWeight: 'regular',
};

export default Typography;