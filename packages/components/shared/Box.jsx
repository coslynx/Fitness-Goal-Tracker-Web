import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { styled } from '@emotion/styled';

const CustomBox = styled(Box)`
  &.MuiBox-root {
    /* Add your custom styles for the Box component here.
     You can override Material-UI styles for a unique look
     or adjust things like width, font size, or colors to match
     your MVP's design.
     */
  }
`;

const Box = ({
  children,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  margin,
  padding,
  width,
  height,
  backgroundColor,
  className,
  ...rest
}) => {
  if (!['block', 'inline', 'flex', 'grid'].includes(display)) {
    console.error(
      `Invalid display value "${display}" for Box component. Reverting to default "block"`
    );
    display = 'block';
  }

  return (
    <CustomBox
      className={className}
      display={display}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      margin={margin}
      padding={padding}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      {...rest}
    >
      {children}
    </CustomBox>
  );
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.oneOf(['block', 'inline', 'flex', 'grid']),
  flexDirection: PropTypes.oneOf(['row', 'column']),
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
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
};

Box.defaultProps = {
  display: 'block',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: 0,
  padding: 0,
  width: 'auto',
  height: 'auto',
  backgroundColor: 'transparent',
};

export default Box;