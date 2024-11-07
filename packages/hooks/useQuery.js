import { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import axios from 'axios';
import { API_URLS } from '@constants';
import { formatDateString } from '@utils/date';

const useQuery = (queryKey: string, options?: { initialData?: any, refetchOnWindowFocus?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(options?.initialData || null);
  const db = getFirestore();
  const refetchTimeoutId = useRef(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (queryKey === 'goals') {
        const goalsCollection = collection(db, 'goals');
        const querySnapshot = await getDocs(goalsCollection);
        const goalsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  useEffect(() => {
    refetch();

    if (options?.refetchOnWindowFocus) {
      const handleFocus = () => {
        if (refetchTimeoutId.current) {
          clearTimeout(refetchTimeoutId.current);
        }
        refetchTimeoutId.current = setTimeout(refetch, 500);
      };

      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }
  }, [queryKey, options]);

  return { isLoading, error, data, refetch };
};

export default useQuery;