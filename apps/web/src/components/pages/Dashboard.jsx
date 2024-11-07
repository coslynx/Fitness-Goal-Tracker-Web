import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Container, Box, CircularProgress, Alert } from '@material-ui/core';
import { useAuth } from '@hooks/useAuthContext';
import { goals } from '@services';
import DashboardStats from '@components/features/Dashboard/DashboardStats';
import { GOAL_TYPE } from '@constants';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      const fetchGoals = async () => {
        setIsLoading(true);
        try {
          const userGoals = await goals.getGoals(user.uid);
          setGoals(userGoals);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchGoals();
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Your Fitness Dashboard
      </Typography>

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

      {goals.length > 0 && (
        <Grid container spacing={3} className={styles.dashboardContent}>
          <Grid item xs={12} md={6}>
            <DashboardStats goals={goals} type={GOAL_TYPE.WEIGHT_LOSS} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardStats goals={goals} type={GOAL_TYPE.MUSCLE_GAIN} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardStats goals={goals} type={GOAL_TYPE.RUN_DISTANCE} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;