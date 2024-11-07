import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, Box, CircularProgress, Alert, Button } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { goals } from '@services';
import GoalForm from '@components/features/Goals/GoalForm';
import GoalCard from '@components/features/Goals/GoalCard';
import styles from './Goals.module.css'; 

const GoalList = () => {
  const { user, isAuthenticated } = useAuth(); 
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isAddingGoal, setIsAddingGoal] = useState(false); 

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect if not authenticated 
    } else {
      const fetchGoals = async () => {
        setIsLoading(true);
        try {
          const userGoals = await goals.getGoals(user.uid); // Retrieve goals for the current user
          setGoals(userGoals); 
        } catch (error) {
          setError(error); 
        } finally {
          setIsLoading(false);
        }
      };
      fetchGoals(); 
    }
  }, [isAuthenticated, user]); 

  const handleAddGoal = () => {
    setIsAddingGoal(true); 
  }; 

  const handleCloseForm = () => {
    setIsAddingGoal(false); 
  }; 

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Your Fitness Goals
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

      {isAddingGoal && (
        <GoalForm
          onClose={handleCloseForm}
          onGoalCreated={(newGoal) => {
            setGoals([...goals, newGoal]); // Update the goals state with the new goal
            handleCloseForm();
          }}
        />
      )}

      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item key={goal.id} xs={12} md={6}>
            <GoalCard goal={goal} /> 
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={handleAddGoal}>
        Add Goal
      </Button>
    </Container>
  );
};

export default GoalList;