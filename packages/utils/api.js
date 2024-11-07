import axios from 'axios';
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from '@firebase/firestore';

const API_URLS = {
  AUTH: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  GOALS: process.env.REACT_APP_FIREBASE_PROJECT_ID + '/goals' 
};

const db = getFirestore();

const fetchUserData = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};

const createGoal = async (goalData) => {
  try {
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
    const goalRef = doc(db, 'goals', goalId);
    await updateDoc(goalRef, goalData);
  } catch (error) {
    throw new Error(`Error updating goal: ${error.message}`);
  }
};

const deleteGoal = async (goalId) => {
  try {
    const goalRef = doc(db, 'goals', goalId);
    await deleteDoc(goalRef);
  } catch (error) {
    throw new Error(`Error deleting goal: ${error.message}`);
  }
};

const getGoal = async (goalId) => {
  try {
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
  fetchUserData,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
  getGoals,
};