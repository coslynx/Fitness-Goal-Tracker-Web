// packages/utils/index.js

// Date Utilities
import { formatDateString, calculateTimeDifferenceInDays } from './date.js';

// API Utilities
import { createGoal, updateGoal, deleteGoal, getGoal, getGoals } from './api.js';

// Authentication Utilities
import { signup, login, logout, updateProfile, sendPasswordResetEmail, sendEmailVerification } from './auth.js';

// Local Storage Utilities
import { setItem, getItem, removeItem } from './local-storage.js';

// Storage Utilities
import { createGoal: createGoalFirestore, updateGoal: updateGoalFirestore, deleteGoal: deleteGoalFirestore, getGoal: getGoalFirestore, getGoals: getGoalsFirestore } from './storage.js';

// Validation Utilities
import { 
  validateEmail, 
  validateGoalTitle, 
  validateGoalType, 
  validateGoalTarget, 
  validateGoalStartDate, 
  validateGoalEndDate, 
  validateProgress
} from './validation.js';

// Helpers
import { 
  formatDateString: formatDateStringHelper, 
  calculateAge, 
  validateEmail: validateEmailHelper, 
  validatePassword, 
  generateRandomWorkout, 
  generateRandomQuote, 
  generateRandomColor,
  calculateProgress: calculateProgressHelper 
} from './helpers.js';

export default {
  // Date Utilities
  formatDateString,
  calculateTimeDifferenceInDays,

  // API Utilities
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
  getGoals,

  // Authentication Utilities
  signup,
  login,
  logout,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,

  // Local Storage Utilities
  setItem,
  getItem,
  removeItem,

  // Storage Utilities
  createGoalFirestore,
  updateGoalFirestore,
  deleteGoalFirestore,
  getGoalFirestore,
  getGoalsFirestore,

  // Validation Utilities
  validateEmail,
  validateGoalTitle,
  validateGoalType,
  validateGoalTarget,
  validateGoalStartDate,
  validateGoalEndDate,
  validateProgress,

  // Helpers
  formatDateStringHelper,
  calculateAge,
  validateEmailHelper,
  validatePassword,
  generateRandomWorkout,
  generateRandomQuote,
  generateRandomColor,
  calculateProgressHelper,
};