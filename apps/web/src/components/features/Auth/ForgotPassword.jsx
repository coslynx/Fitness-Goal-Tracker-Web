// apps/web/src/components/features/Auth/ForgotPassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Container, Box, Alert } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state on each submission

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      setError({ message: 'Please enter a valid email address.' });
      return;
    }

    try {
      await sendPasswordResetEmail(email);
      setSuccess(true); // Set success state to true
      setTimeout(() => {
        navigate('/login'); // Redirect to login after a delay
      }, 2000); // 2 seconds delay before redirection
    } catch (error) {
      // Handle Firebase Auth error
      setError(error); 
      // Additionally, log the error to your console for debugging.
      console.error("Error sending password reset email:", error);
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

export default ForgotPassword;