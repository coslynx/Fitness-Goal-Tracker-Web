import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Typography, 
  Grid, 
  Container, 
  Box, 
  CircularProgress, 
  Alert,
  Button, 
} from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext'; 
import { goals } from '@services'; 
import GoalProgressChart from '@components/features/Goals/GoalProgressChart'; 
import GoalDetailsForm from '@components/features/Goals/GoalDetailsForm'; 
import { GOAL_TYPE } from '@constants';
import styles from './GoalDetails.module.css'; 

const GoalDetails = () => {
  const { goalId } = useParams(); 
  const { user } = useAuth(); 
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchGoal = async () => {
      setIsLoading(true);
      try {
        const goal = await goals.getGoal(goalId); 
        setGoal(goal);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && goalId) {
      fetchGoal();
    }
  }, [user, goalId]);

  const handleEditGoal = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleGoalUpdated = (updatedGoal) => {
    setGoal(updatedGoal);
    setIsEditing(false);
  };

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

      {goal && (
        <>
          <Grid container spacing={3} className={styles.goalDetails}>
            <Grid item xs={12}>
              <Typography variant="h4" className={styles.goalTitle}>
                {goal.title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Type: {GOAL_TYPE[goal.type]}
              </Typography>
              <Typography variant="body1">
                Target: {goal.target} {goal.targetUnit}
              </Typography>
              <Typography variant="body1">
                Progress: {goal.progress}%
              </Typography>
              <Typography variant="body1">
                Start Date: {new Date(goal.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                End Date: {new Date(goal.endDate).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          <GoalProgressChart goal={goal} /> 

          <Button variant="contained" color="primary" onClick={handleEditGoal}>
            Edit
          </Button>

          {isEditing && (
            <GoalDetailsForm goal={goal} 
                              onClose={handleCloseForm}
                              onGoalUpdated={handleGoalUpdated} 
            />
          )}
        </>
      )}
    </Container>
  );
};

export default GoalDetails;