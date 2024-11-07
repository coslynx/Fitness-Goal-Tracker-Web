import { 
  getFirestore,
  doc, 
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc, 
  collection, 
  query,
  where,
  getDocs
} from '@firebase/firestore';

const createGoal = async (goalData) => {
  try {
    const db = getFirestore();
    const goalsCollection = collection(db, 'goals');
    const docRef = await addDoc(goalsCollection, goalData);
    const goal = await getDoc(doc(db, 'goals', docRef.id));
    if (goal.exists()) {
      return {
        id: goal.id,
        ...goal.data(),
      };
    } else {
      throw new Error('Goal not found after creation.');
    }
  } catch (error) {
    throw new Error(`Error creating goal: ${error.message}`);
  }
};

const updateGoal = async (goalId, goalData) => {
  try {
    const db = getFirestore();
    const goalRef = doc(db, 'goals', goalId);
    await updateDoc(goalRef, goalData);
  } catch (error) {
    throw new Error(`Error updating goal: ${error.message}`);
  }
};

const deleteGoal = async (goalId) => {
  try {
    const db = getFirestore();
    const goalRef = doc(db, 'goals', goalId);
    await deleteDoc(goalRef);
  } catch (error) {
    throw new Error(`Error deleting goal: ${error.message}`);
  }
};

const getGoal = async (goalId) => {
  try {
    const db = getFirestore();
    const goalDocRef = doc(db, 'goals', goalId);
    const goal = await getDoc(goalDocRef);
    if (goal.exists()) {
      return {
        id: goal.id,
        ...goal.data(),
      };
    } else {
      throw new Error('Goal not found.');
    }
  } catch (error) {
    throw new Error(`Error fetching goal: ${error.message}`);
  }
};

const getGoals = async (userId) => {
  try {
    const db = getFirestore();
    const goalsCollection = collection(db, 'goals');
    const q = query(goalsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const goals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return goals;
  } catch (error) {
    throw new Error(`Error fetching goals: ${error.message}`);
  }
};

export default {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
  getGoals,
};