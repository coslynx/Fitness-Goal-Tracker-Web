import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Container, Box } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { logo } from '@assets/images';
import styles from './Home.module.css';

const HeroBanner = styled(Box)`
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const HomePageContent = styled(Box)`
  padding: 2rem 0;
`;

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      <HeroBanner>
        <Typography variant="h2" className={styles.heroHeading}>
          Start Your Fitness Journey Today!
        </Typography>
        <Typography variant="body1" className={styles.heroText}>
          Get fit, stay motivated, and track your progress with our user-friendly fitness tracker.
        </Typography>
        {!isAuthenticated && (
          <Button variant="contained" color="primary" component={Link} to="/signup">
            Sign Up Now
          </Button>
        )}
      </HeroBanner>
      <HomePageContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Key Features</Typography>
            <ul>
              <li>
                <Typography variant="body1">Set personalized fitness goals</Typography>
              </li>
              <li>
                <Typography variant="body1">Track your progress with detailed logs</Typography>
              </li>
              <li>
                <Typography variant="body1">Visualize your achievements with charts and graphs</Typography>
              </li>
              <li>
                <Typography variant="body1">Stay motivated with a supportive community</Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Get Started</Typography>
            {isAuthenticated ? (
              <Typography variant="body1">Welcome back! You're already logged in.</Typography>
            ) : (
              <Button variant="contained" color="primary" component={Link} to="/login">
                Log In
              </Button>
            )}
          </Grid>
        </Grid>
      </HomePageContent>
    </Container>
  );
};

export default Home;