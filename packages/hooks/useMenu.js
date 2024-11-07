import { useState, useRef, useEffect } from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { SvgIcon } from '@components/shared/SvgIcon.jsx';
import { MenuItem as CustomMenuItem } from '@components/shared/MenuItem.jsx';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactElement;
}

interface UseMenuProps {
  items: MenuItemProps[];
  defaultOpen?: boolean;
  onItemClick: (label: string) => void;
}

const useMenu = ({ items, defaultOpen = false, onItemClick }: UseMenuProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuRef = useRef<null | HTMLDivElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleItemClick = (label: string) => {
    onItemClick(label);
    handleClose();
  };

  return {
    isOpen,
    anchorEl,
    handleOpen,
    handleClose,
    menuRef,
  };
};

export default useMenu;