import React from 'react';
import { Typography, Grid, Container, Box, Link } from '@material-ui/core';
import { useAuth } from '@hooks/useAuthContext';

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justify="center" alignItems="center" style={{ height: '80vh' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h1" align="center" gutterBottom>
            404 Not Found
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            The page you're looking for doesn't exist.
          </Typography>
          <Box mt={3} textAlign="center">
            {isAuthenticated ? (
              <Link to="/">
                <Button variant="contained" color="primary">
                  Return to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/">
                <Button variant="contained" color="primary">
                  Return to Home
                </Button>
              </Link>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;