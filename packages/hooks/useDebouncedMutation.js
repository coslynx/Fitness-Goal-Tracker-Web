// packages/hooks/useDebouncedMutation.js

import { useState, useRef } from 'react';
import axios from 'axios';
import { API_URLS } from '@constants'; 
import { getFirestore, doc, updateDoc, addDoc, collection, deleteDoc, getDoc } from '@firebase/firestore';
import { getGoalsError, createGoalError, updateGoalError, deleteGoalError } from '@utils/error'; 

const db = getFirestore();

const useDebouncedMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const timeoutId = useRef(null);

  const mutate = async (mutationType, mutationData, delay) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        switch (mutationType) {
          case 'createGoal':
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
            const goalRef = doc(db, 'goals', mutationData.id);
            await updateDoc(goalRef, mutationData);
            break;
          case 'deleteGoal':
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
    }, delay);
  };

  return { mutate, isLoading, error, data };
};

export default useDebouncedMutation;