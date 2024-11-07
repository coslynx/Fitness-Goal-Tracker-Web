import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { LogoutIcon, SettingsIcon, UserIcon, HomeIcon } from '@assets/icons';
import { logo } from '@assets/images';
import { Link } from 'react-router-dom';
import styles from './AppBar.module.css';

const StyledAppBar = styled(AppBar)`
  &.MuiAppBar-root {
    background-color: #007bff; /* Blue */
    color: #fff;
  }
`;

const AppBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.title}>
          <Link to="/">
            <img src={logo} alt="Fitness Goal Tracker" className={styles.logo} />
          </Link>
        </Typography>

        <div className={styles.navigation}>
          <Link to="/goals">
            <Typography variant="body2">Goals</Typography>
          </Link>
          <Link to="/dashboard">
            <Typography variant="body2">Dashboard</Typography>
          </Link>
        </div>

        {isAuthenticated && (
          <div className={styles.profile}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
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
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/profile">
                  <Typography variant="body2">Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
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
    </StyledAppBar>
  );
};

export default AppBar;