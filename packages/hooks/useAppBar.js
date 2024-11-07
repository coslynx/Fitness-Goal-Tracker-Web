// packages/hooks/useAppBar.js

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { useAuth } from './useAuthContext';
import { LogoutIcon, SettingsIcon, UserIcon, HomeIcon } from '@assets/icons';
import { logo } from '@assets/images';
import { Link } from 'react-router-dom';
import styles from './AppBar.module.css';

const useAppBar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return {
    AppBar: (props) => (
      <AppBar position="static" className={styles.appBar} {...props}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" className={styles.title} {...props}>
            <Link to="/">
              <img src={logo} alt="Fitness Goal Tracker" className={styles.logo} />
            </Link>
          </Typography>
          <div className={styles.navigation} {...props}>
            <Link to="/goals">
              <Typography variant="body2">Goals</Typography>
            </Link>
            <Link to="/dashboard">
              <Typography variant="body2">Dashboard</Typography>
            </Link>
          </div>
          {isAuthenticated && (
            <div className={styles.profile} {...props}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <UserIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/profile">
                    <Typography variant="body2">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/settings">
                    <Typography variant="body2">Settings</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography variant="body2">Logout</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    ),
    Toolbar: (props) => (
      <Toolbar className={styles.toolbar} {...props} />
    ),
    Title: (props) => (
      <Typography variant="h6" className={styles.title} {...props} />
    ),
    Navigation: (props) => (
      <div className={styles.navigation} {...props} />
    ),
    Profile: (props) => (
      <div className={styles.profile} {...props} />
    ),
    handleMenuOpen,
    handleMenuClose,
  };
};

export default useAppBar;