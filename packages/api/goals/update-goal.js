// packages/api/goals/update-goal.js

import { getFirestore, doc, updateDoc } from '@firebase/firestore';
import { getAuth, User } from '@firebase/auth'; // Import for authentication
import { validateGoalUpdateData } from '@utils/validation';
import { AUTHENTICATION_ERROR, INVALID_GOAL_DATA, SERVER_ERROR } from '@constants';

const db = getFirestore();

const updateGoal = async (goalId: string, goalData: GoalUpdateData): Promise<void> => {
  try {
    const auth = getAuth();
    const user: User | null = auth.currentUser;

    if (!user) {
      throw new Error(AUTHENTICATION_ERROR);
    }

    // Validate goal data
    await validateGoalUpdateData(goalData); // Make sure to await the validation

    const goalRef = doc(db, 'goals', goalId);
    await updateDoc(goalRef, goalData);
  } catch (error) {
    // Error Handling
    if (error.code === 'auth/user-not-found') {
      throw new Error(AUTHENTICATION_ERROR);
    } else if (error.code === 'firestore/invalid-argument') {
      throw new Error(INVALID_GOAL_DATA);
    } else {
      throw new Error(SERVER_ERROR);
    }
  }
};

export default updateGoal;