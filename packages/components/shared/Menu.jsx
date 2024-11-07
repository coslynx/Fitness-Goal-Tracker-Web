import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';

const Menu = ({ open, onClose, anchorEl, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(open);
  const menuRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const handleItemClick = (label) => {
    onItemClick && onItemClick(label);
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isOpen}
      onClose={handleClose}
      ref={menuRef}
    >
      {items.map((item) => (
        <MenuItem key={item.label} onClick={() => handleItemClick(item.label)}>
          {item.icon && item.icon}
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
  onItemClick: PropTypes.func,
};

export default Menu;