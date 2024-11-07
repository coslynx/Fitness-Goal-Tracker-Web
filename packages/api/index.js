import { 
  getFirestore,
  collection,
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs 
} from '@firebase/firestore'; 
import { getAuth, User } from '@firebase/auth';
import { 
  GOAL_CREATION_ERROR, 
  INVALID_GOAL_DATA, 
  SERVER_ERROR, 
  AUTHENTICATION_ERROR 
} from '@constants';
import { formatError } from '@utils/error';

const db = getFirestore();

const createGoal = async (goalData: GoalCreationData): Promise<Goal> => {
  try {
    const auth = getAuth();
    const user: User | null = auth.currentUser;

    if (!user) {
      throw new Error(AUTHENTICATION_ERROR);
    }

    const validationResult = validateGoal(goalData);
    if (!validationResult) {
      throw new Error(INVALID_GOAL_DATA);
    }

    const goalsCollection = collection(db, 'goals');
    const docRef = await addDoc(goalsCollection, goalData);
    const goalDoc = await getDoc(doc(db, 'goals', docRef.id));

    if (goalDoc.exists()) {
      return {
        id: goalDoc.id,
        ...goalDoc.data(),
      } as Goal;
    } else {
      throw new Error('Goal not found after creation.');
    }
  } catch (error) {
    console.error('Error creating goal:', error);
    const formattedError = formatError(error);

    if (error.code === 'auth/user-not-found') {
      throw new Error(AUTHENTICATION_ERROR);
    } else if (error.code === 'firestore/invalid-argument') {
      throw new Error(INVALID_GOAL_DATA);
    } else {
      throw new Error(SERVER_ERROR);
    }
  }
};

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

const getGoal = async (goalId: string): Promise<Goal> => {
  try {
    const goalDocRef = doc(db, 'goals', goalId);
    const goalDoc = await getDoc(goalDocRef);

    if (goalDoc.exists()) {
      return {
        id: goalDoc.id,
        ...goalDoc.data(),
      } as Goal;
    } else {
      throw new Error('Goal not found.');
    }
  } catch (error) {
    throw getGoalError(error);
  }
};

const getGoals = async (userId: string): Promise<Goal[]> => {
  try {
    const goalsCollection = collection(db, 'goals');
    const querySnapshot = await getDocs(query(goalsCollection, where('userId', '==', userId)));
    const goals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Goal[];

    return goals;
  } catch (error) {
    throw getGoalsError(error);
  }
};

export default {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
  getGoals,
};