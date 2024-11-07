import { getFirestore, collection, addDoc, doc, getDoc } from '@firebase/firestore';
import { validateGoal } from '@utils/validation.js';
import { getAuth } from '@firebase/auth';
import { GOAL_CREATION_ERROR, INVALID_GOAL_DATA, SERVER_ERROR, AUTHENTICATION_ERROR } from '@constants';
import { formatError } from '@utils/error';

const db = getFirestore();

const createGoal = async (goalData: GoalCreationData): Promise<Goal> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

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

export default createGoal;