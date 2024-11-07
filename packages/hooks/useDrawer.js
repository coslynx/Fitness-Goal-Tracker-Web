import { useState, useEffect, useRef } from 'react';
import { Drawer } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { Typography } from '@components/shared/Typography';
import { Button } from '@components/shared/Button';

const StyledDrawer = styled(Drawer)`
  &.MuiDrawer-root {
    background-color: #fff;
    color: #000;
    padding: 1rem;
    border-radius: 4px;
  }
`;

const useDrawer = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);
  const [actions, setActions] = useState([]);
  const drawerRef = useRef(null);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const addAction = (action) => {
    setActions((prevActions) => [...prevActions, action]);
  };

  useEffect(() => {
    // Optionally add logic to focus the drawer content if needed.
    // drawerRef.current.focus();
  }, [open]);

  return {
    open,
    openDrawer,
    closeDrawer,
    drawerRef,
    actions,
    addAction,
  };
};

export default useDrawer;