import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, Container, Box, Alert, CircularProgress } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { verifyEmail } from '@api/auth';
import styles from './VerifyEmail.module.css';

const VerifyEmail = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { uid } = useParams();

    const handleVerifyEmail = async () => {
      setIsLoading(true);
      try {
        await verifyEmail(uid);
        setVerified(true);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (uid) {
      handleVerifyEmail();
    }
  }, []);

  useEffect(() => {
    if (verified) {
      navigate('/login');
    }
  }, [verified]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error.message}
        </Alert>
      )}

      {verified && (
        <Typography variant="h4" gutterBottom>
          Your email has been verified! You can now log in.
        </Typography>
      )}

      {!verified && !isLoading && (
        <Typography variant="body1" gutterBottom>
          We've sent a verification email to your address. Please check your inbox and click the verification link to continue.
        </Typography>
      )}
    </Container>
  );
};

export default VerifyEmail;