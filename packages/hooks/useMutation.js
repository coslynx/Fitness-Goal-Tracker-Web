// packages/hooks/useMutation.js

import { useState } from 'react';
import axios from 'axios';
import { API_URLS } from '@constants'; // Import API URLs from constants file
import { getFirestore, doc, updateDoc, addDoc, collection, deleteDoc, getDoc } from '@firebase/firestore';
import { getGoalsError, createGoalError, updateGoalError, deleteGoalError } from '@utils/error'; // Import custom error functions

const db = getFirestore();

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (mutationType: string, mutationData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      switch (mutationType) {
        case 'createGoal':
          // Call the API or Firestore to create a new goal
          const goalsCollection = collection(db, 'goals');
          const docRef = await addDoc(goalsCollection, mutationData);
          const goal = await getDoc(doc(db, 'goals', docRef.id));
          if (goal.exists()) {
            setData({ id: goal.id, ...goal.data() });
          } else {
            throw new Error('Goal not found after creation.');
          }
          break;
        case 'updateGoal':
          // Call the API or Firestore to update an existing goal
          const goalRef = doc(db, 'goals', mutationData.id);
          await updateDoc(goalRef, mutationData);
          break;
        case 'deleteGoal':
          // Call the API or Firestore to delete a goal
          const goalRef = doc(db, 'goals', mutationData.id);
          await deleteDoc(goalRef);
          break;
        default:
          throw new Error(`Invalid mutation type: ${mutationType}`);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, data };
};

export default useMutation;