// packages/hooks/useFetch.js

import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have axios installed

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);
        setData(response.data); 
      } catch (error) {
        setError(error); 
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch data if the URL is provided
    if (url) {
      fetchData();
    }

    // Cleanup function (optional): Cancel the request if the component unmounts
    return () => {
      // If you're using a library like Axios, you can use its cancelToken mechanism to cancel requests
      //  axios.CancelToken.source().cancel('Request canceled');
    };
  }, [url]); 

  return { data, isLoading, error };
};

export default useFetch;