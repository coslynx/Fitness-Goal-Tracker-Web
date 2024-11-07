// packages/api/goals/get-goal.js

// Imports:
import { getFirestore, doc, getDoc } from '@firebase/firestore'; // Version 4.7.4 - Firebase Firestore library
import { getGoalError } from '@utils/error'; // Version 1.0.0 - Our custom error handling utility
import type { Goal } from '@types/Goal'; // Version 1.0.0 - Our Goal data model

// Exported Function:
export const getGoal = async (goalId: string): Promise<Goal> => {
  // 1. Connect to Firestore
  const db = getFirestore(); // Initialize Firestore connection
  const goalDocRef = doc(db, 'goals', goalId); // Access the 'goals' collection

  // 2. Fetch Goal Data 
  const goalDoc = await getDoc(goalDocRef); // Query the goals collection and filter by goalId

  // 3. Handle Results
  if (goalDoc.exists()) {
    return {
      id: goalDoc.id,
      ...goalDoc.data(),
    } as Goal;
  } else {
    throw new Error('Goal not found.');
  }
};