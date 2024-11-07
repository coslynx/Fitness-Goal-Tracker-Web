import { GOAL_TYPE, ERROR_CODES } from '@constants';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateGoalTitle = (title: string): boolean => {
  if (title.length > 50) {
    throw new Error(`Goal title cannot exceed 50 characters.`);
  }
  return true;
};

const validateGoalType = (type: string): boolean => {
  if (!Object.values(GOAL_TYPE).includes(type)) {
    throw new Error(`Invalid goal type. Please choose from ${Object.values(GOAL_TYPE).join(', ')}.`);
  }
  return true;
};

const validateGoalTarget = (target: number, type: string): boolean => {
  if (typeof target !== 'number' || target <= 0) {
    throw new Error('Goal target must be a positive number.');
  }
  switch (type) {
    case GOAL_TYPE.WEIGHT_LOSS:
      if (target > 50) {
        throw new Error('Goal target for weight loss cannot exceed 50 kg.');
      }
      break;
    case GOAL_TYPE.MUSCLE_GAIN:
      if (target > 20) {
        throw new Error('Goal target for muscle gain cannot exceed 20 kg.');
      }
      break;
    case GOAL_TYPE.RUN_DISTANCE:
      if (target > 100) {
        throw new Error('Goal target for run distance cannot exceed 100 km.');
      }
      break;
    default:
      throw new Error('Invalid goal type.');
  }
  return true;
};

const validateGoalStartDate = (startDate: string): boolean => {
  const date = new Date(startDate);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid start date format.');
  }
  if (date < new Date()) {
    throw new Error('Start date cannot be in the past.');
  }
  return true;
};

const validateGoalEndDate = (endDate: string, startDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid start or end date format.');
  }
  if (end < start) {
    throw new Error('End date cannot be before start date.');
  }
  return true;
};

const validateProgress = (progress: number): boolean => {
  if (typeof progress !== 'number' || progress < 0 || progress > 100) {
    throw new Error('Progress value must be a number between 0 and 100.');
  }
  return true;
};

export default {
  validateEmail,
  validateGoalTitle,
  validateGoalType,
  validateGoalTarget,
  validateGoalStartDate,
  validateGoalEndDate,
  validateProgress,
};