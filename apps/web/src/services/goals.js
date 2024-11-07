import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@firebase/firestore';

import { db } from '@context/AuthContext';

import { GoalType } from '@constants/GoalType';

import { Goal, GoalCreationData, GoalUpdateData } from '@types/Goal';

import {
  createGoalError,
  updateGoalError,
  deleteGoalError,
  getGoalError,
  getGoalsError,
} from '@utils/error';

const createGoal = async (goalData: GoalCreationData): Promise<Goal> => {
  try {
    const goalsCollection = collection(db, 'goals');
    const docRef = await addDoc(goalsCollection, goalData);
    const goal = await getDoc(doc(db, 'goals', docRef.id));

    if (goal.exists()) {
      return {
        id: goal.id,
        ...goal.data(),
      } as Goal;
    } else {
      throw new Error('Goal not found after creation.');
    }
  } catch (error) {
    throw createGoalError(error);
  }
};

const updateGoal = async (goalId: string, goalData: GoalUpdateData): Promise<void> => {
  try {
    const goalRef = doc(db, 'goals', goalId);
    await updateDoc(goalRef, goalData);
  } catch (error) {
    throw updateGoalError(error);
  }
};

const deleteGoal = async (goalId: string): Promise<void> => {
  try {
    const goalRef = doc(db, 'goals', goalId);
    await deleteDoc(goalRef);
  } catch (error) {
    throw deleteGoalError(error);
  }
};

const getGoal = async (goalId: string): Promise<Goal> => {
  try {
    const goalDocRef = doc(db, 'goals', goalId);
    const goal = await getDoc(goalDocRef);

    if (goal.exists()) {
      return {
        id: goal.id,
        ...goal.data(),
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
    const querySnapshot = await getDocs(goalsCollection);
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