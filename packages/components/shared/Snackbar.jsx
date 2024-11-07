import React, { useState, useEffect } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { styled } from '@emotion/styled';
import CloseIcon from '@assets/icons/CloseIcon.jsx';

const CustomSnackbar = styled(Snackbar)`
  &.MuiSnackbar-root {
    // Custom snackbar styling goes here...
    // For example, adjust the position, padding, or z-index
  }
`;

const Snackbar = ({ open, message, action, autoHideDuration, onClose, ...rest }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(open);
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    onClose && onClose();
  };

  return (
    <CustomSnackbar
      open={snackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...rest}
    >
      <SnackbarContent
        message={message}
        action={
          action && (
            <React.Fragment>
              <Button color="secondary" size="small" onClick={action.onClick}>
                {action.label}
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          )
        }
      />
    </CustomSnackbar>
  );
};

export default Snackbar;