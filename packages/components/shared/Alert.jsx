import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertTitle, IconButton } from '@material-ui/core';
import { styled } from '@emotion/styled';
import CloseIcon from '@assets/icons/CloseIcon.jsx';

const StyledAlert = styled(Alert)`
  &.MuiAlert-root {
    /* Add your custom styles for the Alert component here */
  }
`;

const Alert = ({ severity, message, onClose, action, ...rest }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  return (
    <StyledAlert severity={severity} onClose={handleClose} {...rest}>
      {message && <AlertTitle>{message}</AlertTitle>}
      {action && (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={action.onClick}
        >
          {action.label}
        </IconButton>
      )}
    </StyledAlert>
  );
};

Alert.propTypes = {
  severity: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

export default Alert;