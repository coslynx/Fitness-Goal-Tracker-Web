import { useState, useEffect, useRef } from 'react';
import { getFirestore, doc, setDoc } from '@firebase/firestore'; // Version 4.7.4
import axios from 'axios'; // Version 1.4.0
import { formatError } from '@utils/error'; // Import custom error formatting function

const db = getFirestore();

const useErrorHandling = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutId = useRef(null);

  const logError = async (error: any) => {
    setIsLoading(true);
    try {
      // Format the error
      const formattedError = formatError(error);

      // Get a unique error ID
      const uniqueErrorId = Date.now().toString() + Math.random().toString(36).substring(2, 15); 

      // Write the formatted error to Firestore
      await setDoc(doc(db, 'errors', uniqueErrorId), formattedError);

      // Optional: Send the error to your backend API (if you have one)
      // await axios.post('/api/errors', formattedError); 
    } catch (logErr) {
      console.error('Error logging error:', logErr); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: any) => {
    setError(error);
    logError(error);
  };

  return { error, isLoading, handleError };
};

export default useErrorHandling;