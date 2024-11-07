import React from 'react';
import { Card, CardContent, Typography, Grid, Button, IconButton, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EditIcon, DeleteIcon, InfoIcon } from '@assets/icons';
import { GOAL_TYPE } from '@constants';
import styles from './GoalCard.module.css';
import { goals } from '@services';
import { format, parseISO } from 'date-fns';

const GoalCard = ({ goal }) => {
  const handleDeleteGoal = async () => {
    try {
      await goals.deleteGoal(goal.id);
      // (Optional)  Update the parent component's state to remove the deleted goal.
    } catch (error) {
      console.error('Error deleting goal:', error);
      // (Optional)  Display an error message to the user.
    }
  };

  return (
    <Card className={styles.goalCard}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {goal.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              Type: {GOAL_TYPE[goal.type]}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Target: {goal.target} {goal.targetUnit}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Progress: {goal.progress}%
            </Typography>
            <Typography variant="body1" gutterBottom>
              Start Date: {format(parseISO(goal.startDate), 'yyyy-MM-dd')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              End Date: {format(parseISO(goal.endDate), 'yyyy-MM-dd')}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container justify="flex-end" spacing={1}>
        <Grid item>
          <Tooltip title="View Details">
            <IconButton component={Link} to={`/goals/${goal.id}`} aria-label="view details">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Edit Goal">
            <IconButton component={Link} to={`/goals/${goal.id}/edit`} aria-label="edit goal">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Delete Goal">
            <IconButton onClick={handleDeleteGoal} aria-label="delete goal">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
};

export default GoalCard;