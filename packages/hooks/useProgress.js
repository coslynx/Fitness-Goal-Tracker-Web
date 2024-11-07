import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from '@firebase/firestore';
import { format, parseISO, differenceInDays } from 'date-fns';
import { goals } from '@utils';

const useProgress = (goalId: string) => {
  const [progress, setProgress] = useState<number | null>(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goalDocRef = doc(db, 'goals', goalId);
        const goalDoc = await getDoc(goalDocRef);

        if (goalDoc.exists()) {
          const goal = goalDoc.data();
          const startDate = parseISO(goal.startDate);
          const endDate = parseISO(goal.endDate);
          const daysPassed = differenceInDays(new Date(), startDate);
          const totalDays = differenceInDays(endDate, startDate);
          const calculatedProgress = (daysPassed / totalDays) * 100;
          setProgress(calculatedProgress);
        } else {
          console.error(`Goal with ID ${goalId} not found.`);
        }
      } catch (error) {
        console.error(`Error fetching goal: ${error.message}`);
      }
    };

    if (goalId) {
      fetchGoal();
    }
  }, [goalId]);

  return progress;
};

export default useProgress;