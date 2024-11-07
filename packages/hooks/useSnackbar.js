import { useState, useEffect, useContext } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { styled } from '@emotion/styled';
import CloseIcon from '@assets/icons/CloseIcon.jsx';
import { AuthContext } from '@context/AuthContext';

const CustomSnackbar = styled(Snackbar)`
  &.MuiSnackbar-root {
    // Custom snackbar styling goes here...
    // For example, adjust the position, padding, or z-index
  }
`;

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [action, setAction] = useState(null);
  const [autoHideDuration, setAutoHideDuration] = useState(6000);
  const { isAuthenticated } = useContext(AuthContext);

  const openSnackbar = (message, severity = 'info', action = null, autoHideDuration = 6000) => {
    if (!isAuthenticated) {
      return; // Don't show notifications if user is not authenticated
    }
    setMessage(message);
    setSeverity(severity);
    setAction(action);
    setAutoHideDuration(autoHideDuration);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeSnackbar();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration]);

  return { openSnackbar, closeSnackbar, open };
};

export default useSnackbar;