// packages/hooks/useDialog.js

import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [actions, setActions] = useState([]); 

  const openDialog = (dialogProps: { title?: string; content?: any; actions?: { label: string; onClick: () => void }[] }) => {
    setTitle(dialogProps.title || '');
    setContent(dialogProps.content || null);
    setActions(dialogProps.actions || []);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return {
    openDialog,
    closeDialog,
    open,
    title,
    content,
    actions,
    Dialog: StyledDialog,
  };
};

export default useDialog;