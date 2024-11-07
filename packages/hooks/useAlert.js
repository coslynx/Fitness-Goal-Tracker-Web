// packages/hooks/useAlert.js

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

const useAlert = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [action, setAction] = useState(null); 
    const [autoHideDuration, setAutoHideDuration] = useState(6000); 
    const { isAuthenticated } = useContext(AuthContext);
 
    const openAlert = (alertProps: { message: string, severity: string, action?: { label: string, onClick: () => void }, autoHideDuration?: number }) => {
        if (!isAuthenticated) {
            return; 
        }
        setMessage(alertProps.message);
        setSeverity(alertProps.severity);
        setAction(alertProps.action); 
        setAutoHideDuration(alertProps.autoHideDuration || 6000); 
        setOpen(true);
    };

    const closeAlert = () => {
        setOpen(false);
    };

    const addAction = (action: { label: string, onClick: () => void }) => {
        setAction(action);
    };

    useEffect(() => {
        const timer = setTimeout(closeAlert, autoHideDuration);
        return () => clearTimeout(timer);
    }, [autoHideDuration]);

    return { openAlert, closeAlert, open };
};

export default useAlert;