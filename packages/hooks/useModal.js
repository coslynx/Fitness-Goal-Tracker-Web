import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { styled } from '@emotion/styled'; 

interface ModalAction {
  label: string;
  onClick: () => void;
}

const StyledModal = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const useModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(null);
  const [actions, setActions] = useState([]); 

  const openModal = (modalProps: { title?: string; content?: any; actions?: ModalAction[] }) => {
    setTitle(modalProps.title || '');
    setContent(modalProps.content || null);
    setActions(modalProps.actions || []);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { 
    openModal,
    closeModal,
    open,
    title,
    content,
    actions
  };
};

export default useModal;