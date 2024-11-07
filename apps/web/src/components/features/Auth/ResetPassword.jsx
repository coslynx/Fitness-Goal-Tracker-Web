import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Container, Box, Alert } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!/^[^\\s@]+@[^\\s@]+.[^\\s@]+$/.test(email)) {
      setError({ message: 'Please enter a valid email address.' });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error);
      console.error('Error sending password reset email:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Reset Your Password
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error.message}
        </Alert>
      )}
      {success && (
        <Typography variant="body1" color="primary">
          A password reset email has been sent to your email address.
        </Typography>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          name="email"
          type="email"
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Send Reset Link
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;