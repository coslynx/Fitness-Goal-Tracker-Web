import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';

const MenuItem = ({ label, icon, onClick }) => {
  return (
    <MenuItem onClick={onClick}>
      {icon && icon}
      {label}
    </MenuItem>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  icon: null,
};

export default MenuItem;