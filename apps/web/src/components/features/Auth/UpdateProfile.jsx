import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Container, Box, Alert } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { updateProfile } from '@services/auth';
import styles from './UpdateProfile.module.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name) {
      setError({ message: 'Please enter a valid name.' });
      setIsLoading(false);
      return;
    }

    try {
      await updateProfile(user, { displayName: name });
      setIsLoading(false);
      navigate('/profile');
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Update Your Profile
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="name"
              fullWidth
              error={!!error && error.code === 'auth/invalid-email'}
              helperText={!!error && error.code === 'auth/invalid-email' ? 'Please enter a valid email.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateProfile;