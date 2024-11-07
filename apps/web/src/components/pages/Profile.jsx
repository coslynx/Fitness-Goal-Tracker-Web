import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Typography, 
  Grid, 
  Container, 
  TextField, 
  Button, 
  Avatar,
  IconButton, 
  Menu, 
  MenuItem 
} from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext'; 
import { updateProfile } from '@services/auth'; 
import { ProfileIcon, SettingsIcon, LogoutIcon } from '@assets/icons'; 
import styles from './Profile.module.css'; 

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); 
    } else {
      setName(user?.displayName || '');
      setEmail(user?.email || '');
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value.trim());
    } else if (name === 'email') {
      setEmail(value.trim());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 

    try {
      await updateProfile(user, { 
        displayName: name,
        email: email
      });
      // Handle successful update (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false); 
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <Grid container spacing={3} className={styles.profileContent}>
        <Grid item xs={12} md={6} className={styles.profileDetails}>
          <Avatar alt={name} src={user?.photoURL || ''} className={styles.profileAvatar}>
            {user?.displayName ? user?.displayName.charAt(0) : ' '}
          </Avatar>
          <Typography variant="h6" gutterBottom className={styles.profileName}>
            {name}
          </Typography>
          <TextField
            label="Name"
            value={name}
            onChange={handleInputChange}
            name="name"
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={handleInputChange}
            name="email"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6} className={styles.profileActions}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          {/* ... (Additional profile actions, such as connecting devices) */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <SettingsIcon />
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
              <Link to="/settings">
                <Typography variant="body2">Settings</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;