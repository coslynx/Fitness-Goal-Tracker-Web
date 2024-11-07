// packages/api/goals/delete-goal.js

import { getFirestore, doc, deleteDoc } from '@firebase/firestore'; // Version 4.7.4
import { getAuth, User } from '@firebase/auth'; // Import for authentication
import { AUTHENTICATION_ERROR, GOAL_NOT_FOUND_ERROR, SERVER_ERROR } from '@constants';

const db = getFirestore();

const deleteGoal = async (goalId: string): Promise<void> => {
  try {
    const auth = getAuth();
    const user: User | null = auth.currentUser;

    if (!user) {
      throw new Error(AUTHENTICATION_ERROR);
    }

    const goalRef = doc(db, 'goals', goalId);
    await deleteDoc(goalRef);
  } catch (error) {
    // Error Handling
    if (error.code === 'auth/user-not-found') {
      throw new Error(AUTHENTICATION_ERROR);
    } else if (error.code === 'firestore/not-found') {
      throw new Error(GOAL_NOT_FOUND_ERROR);
    } else {
      throw new Error(SERVER_ERROR);
    }
  }
};

export default deleteGoal;