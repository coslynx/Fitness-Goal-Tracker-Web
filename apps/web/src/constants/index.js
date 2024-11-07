import { API_ENDPOINTS } from '@env';

export const API_URLS = {
  AUTH: API_ENDPOINTS.AUTH,
  GOALS: API_ENDPOINTS.GOALS,
};

export const ERROR_CODES = {
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  GOAL_CREATION_ERROR: 'GOAL_CREATION_ERROR',
  GOAL_UPDATE_ERROR: 'GOAL_UPDATE_ERROR',
  GOAL_DELETION_ERROR: 'GOAL_DELETION_ERROR',
};

export const GOAL_TYPE = {
  WEIGHT_LOSS: 'WEIGHT_LOSS',
  MUSCLE_GAIN: 'MUSCLE_GAIN',
  RUN_DISTANCE: 'RUN_DISTANCE',
};

export const USER_DATA_SCHEMA = {
  uid: 'string',
  displayName: 'string',
  email: 'string',
};

export const COLORS = {
  PRIMARY: '#007bff', // Material Blue
  SECONDARY: '#673ab7', // Purple
};

export const FONT_SIZES = {
  HEADING_1: '2rem',
  HEADING_2: '1.5rem',
  BODY_1: '1rem',
};

export const FORM_DEFAULTS = {
  GOAL_TYPE: GOAL_TYPE.WEIGHT_LOSS, // Default goal type for new goals
  WEIGHT_UNIT: 'KG', // Default weight unit
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB file upload limit
export const MAX_USERNAME_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = 30;