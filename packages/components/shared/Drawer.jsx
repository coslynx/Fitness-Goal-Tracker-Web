import React, { useState, useEffect } from 'react';
import { Drawer } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@emotion/styled';
import { Typography } from '@components/shared/Typography';
import { Button } from '@components/shared/Button';

const StyledDrawer = styled(Drawer)`
  &.MuiDrawer-root {
    /* Add your custom styles for the Drawer component here.
     You can override Material-UI styles for a unique look
     or adjust things like width, font size, or colors to match
     your MVP's design.
    */
  }
`;

const Drawer = ({ open, onClose, variant, anchor, children, actions, ...rest }) => {
  return (
    <StyledDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      variant={variant}
      {...rest} // Spread the remaining props
    >
      {/* Drawer Content */}
      {children}

      {/* Drawer Actions */}
      {actions && (
        <div className="drawer-actions">
          {actions.map((action, index) => (
            <Button key={index} onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </StyledDrawer>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['persistent', 'temporary']).isRequired,
  anchor: PropTypes.oneOf(['left', 'top', 'bottom', 'right']).isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
};

export default Drawer;