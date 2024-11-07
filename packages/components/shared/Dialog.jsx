import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledDialog = styled(Dialog)`
  &.MuiDialog-paper {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Dialog = ({ open, onClose, title, content, actions, className, ...rest }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  return (
    <StyledDialog open={isOpen} onClose={handleClose} className={className} {...rest}>
      {title && <DialogTitle id="dialog-title">{title}</DialogTitle>}
      <DialogContent>{content}</DialogContent>
      {actions && (
        <DialogActions>
          {actions.map((action, index) => (
            <Button key={index} onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Dialog;