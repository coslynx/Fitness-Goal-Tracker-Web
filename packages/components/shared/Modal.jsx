import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledModal = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Modal = ({ open, onClose, title, content, actions }) => {
  return (
    <StyledModal open={open} onClose={onClose} aria-labelledby="modal-title">
      {title && <DialogTitle id="modal-title">{title}</DialogTitle>}
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
    </StyledModal>
  );
};

Modal.propTypes = {
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
};

export default Modal;