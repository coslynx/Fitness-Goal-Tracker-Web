import { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, getDocs, query, where } from '@firebase/firestore'; // Version 4.7.4
import { formatDateString } from '@utils/date'; // Version 4.1.0
import useDebounce from '@hooks/useDebounce';

const useDebouncedQuery = (queryKey: string, queryFilter: any, delay: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const db = getFirestore();
  const timeoutId = useRef(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (queryKey === 'goals') {
        const goalsCollection = collection(db, 'goals');
        const q = query(goalsCollection, where('userId', '==', queryFilter.userId));
        const querySnapshot = await getDocs(q);
        const goalsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(goalsData);
      } else if (queryKey === 'user-goals') {
        // ... Implement specific Firestore query based on user ID
      } else {
        // ... (API calls - update API URLs in @constants/index.js)
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [_, handleDebounce] = useDebounce(refetch, delay);

  useEffect(() => {
    handleDebounce();
  }, [queryFilter]);

  return { isLoading, error, data, refetch };
};

export default useDebouncedQuery;