import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, TextField, Container, Box, Alert } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuth } from '@hooks/useAuthContext';
import { goals } from '@services';
import { GOAL_TYPE } from '@constants';
import Modal from '@components/shared/Modal';
import styles from './GoalForm.module.css';
import { format, parseISO } from 'date-fns';

const GoalForm = ({ isOpen, onClose, onGoalCreated, goalId, goalData }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(!!goalId);
  const [title, setTitle] = useState(goalData?.title || '');
  const [type, setType] = useState(goalData?.type || GOAL_TYPE.WEIGHT_LOSS);
  const [target, setTarget] = useState(goalData?.target || '');
  const [targetUnit, setTargetUnit] = useState(goalData?.targetUnit || 'KG');
  const [startDate, setStartDate] = useState(goalData?.startDate ? parseISO(goalData.startDate) : new Date());
  const [endDate, setEndDate] = useState(goalData?.endDate ? parseISO(goalData.endDate) : new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (goalData) {
      setTitle(goalData.title);
      setType(goalData.type);
      setTarget(goalData.target);
      setTargetUnit(goalData.targetUnit);
      setStartDate(parseISO(goalData.startDate));
      setEndDate(parseISO(goalData.endDate));
    }
  }, [goalData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'type') {
      setType(value);
    } else if (name === 'target') {
      setTarget(value);
    } else if (name === 'targetUnit') {
      setTargetUnit(value);
    } else if (name === 'startDate') {
      setStartDate(new Date(value));
    } else if (name === 'endDate') {
      setEndDate(new Date(value));
    }
  };

  const validateForm = () => {
    if (!title || !target) {
      setError({ message: 'Please fill in all required fields.' });
      return false;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError({ message: 'Start date must be before end date.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const goalData = {
      title,
      type,
      target,
      targetUnit,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      userId: user.uid,
      progress: 0
    };

    try {
      if (isEditing) {
        await goals.updateGoal(goalId, goalData);
      } else {
        const newGoal = await goals.createGoal(goalData);
        onGoalCreated(newGoal);
      }
      onClose();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Goal' : 'Create Goal'}
      </Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={handleInputChange}
              name="title"
              fullWidth
              error={!!error && error.code === 'invalid-title'}
              helperText={!!error && error.code === 'invalid-title' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Type"
              value={type}
              onChange={handleInputChange}
              name="type"
              fullWidth
            >
              {Object.entries(GOAL_TYPE).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Target"
              value={target}
              onChange={handleInputChange}
              name="target"
              fullWidth
              error={!!error && error.code === 'invalid-target'}
              helperText={!!error && error.code === 'invalid-target' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Target Unit"
              value={targetUnit}
              onChange={handleInputChange}
              name="targetUnit"
              fullWidth
            >
              <MenuItem key="KG" value="KG">
                KG
              </MenuItem>
              <MenuItem key="LB" value="LB">
                LB
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Start Date"
              type="date"
              value={format(startDate, 'yyyy-MM-dd')}
              onChange={handleInputChange}
              name="startDate"
              fullWidth
              error={!!error && error.code === 'invalid-date'}
              helperText={!!error && error.code === 'invalid-date' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="End Date"
              type="date"
              value={format(endDate, 'yyyy-MM-dd')}
              onChange={handleInputChange}
              name="endDate"
              fullWidth
              error={!!error && error.code === 'invalid-date'}
              helperText={!!error && error.code === 'invalid-date' ? error.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Goal'}
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error.message}
        </Alert>
      )}
    </Modal>
  );
};

export default GoalForm;