import { format, parseISO, differenceInYears } from 'date-fns';
import { GOAL_TYPE } from '@constants';

export const formatDateString = (dateString: string, formatPattern: string = 'yyyy-MM-dd'): string | null => {
  if (!dateString) {
    return null; 
  }
  const date = parseISO(dateString);
  if (isNaN(date.getTime())) {
    return null; 
  }
  return format(date, formatPattern);
};

export const calculateAge = (dateOfBirth: string): number | null => {
  if (!dateOfBirth) {
    return null;
  }
  const birthDate = parseISO(dateOfBirth);
  if (isNaN(birthDate.getTime())) {
    return null;
  }
  const today = new Date();
  return differenceInYears(today, birthDate);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }
  if (!/[a-z]/.test(password)) {
    throw new Error('Password must contain at least one lowercase letter.');
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter.');
  }
  if (!/[0-9]/.test(password)) {
    throw new Error('Password must contain at least one number.');
  }
  return true;
};

interface Workout {
  name: string;
  description: string;
  duration: number;
  intensity: string;
}

export const generateRandomWorkout = (goalType: string): Workout => {
  switch (goalType) {
    case GOAL_TYPE.WEIGHT_LOSS:
      return {
        name: 'Cardio Blast',
        description: 'High-intensity interval training to burn calories.',
        duration: 30,
        intensity: 'High',
      };
    case GOAL_TYPE.MUSCLE_GAIN:
      return {
        name: 'Strength Circuit',
        description: 'Circuit training focusing on major muscle groups.',
        duration: 45,
        intensity: 'Moderate',
      };
    case GOAL_TYPE.RUN_DISTANCE:
      return {
        name: 'Long Run',
        description: 'Steady-paced run to build endurance.',
        duration: 60,
        intensity: 'Low',
      };
    default:
      throw new Error('Invalid goal type');
  }
};

export const generateRandomQuote = (): string => {
  const quotes = [
    'The only way to do great work is to love what you do.',
    'Believe you can and you’re halfway there.',
    'The journey of a thousand miles begins with a single step.',
    'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    'The best revenge is massive success.',
    'The mind is everything. What you think you become.',
    'You miss 100% of the shots you don’t take.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
    'You can’t use up creativity. The more you use, the more you have.',
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const calculateProgress = (goal: any, currentDate: Date): number => {
  const startDate = new Date(goal.startDate);
  const endDate = new Date(goal.endDate);
  const daysPassed = differenceInYears(currentDate, startDate);
  const totalDays = differenceInYears(endDate, startDate);
  const progress = (daysPassed / totalDays) * 100;
  return progress;
};