import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Container, Box, Alert } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { auth } from '@services/auth';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Input Validation
    if (!email || !password) {
      setError({ message: 'Please fill in all fields.' });
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError({ message: 'Please enter a valid email address.' });
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Login to Your Account
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
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              name="email"
              type="email"
              required
              fullWidth
              error={!!error && error.code === 'auth/invalid-email'}
              helperText={!!error && error.code === 'auth/invalid-email' ? 'Please enter a valid email.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              type="password"
              required
              fullWidth
              error={!!error && (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found')}
              helperText={!!error && (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') ? 'Invalid credentials.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;