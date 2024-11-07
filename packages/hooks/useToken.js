import { useState, useEffect } from 'react';
import { setItem, getItem, removeItem } from '@utils/local-storage';

const useToken = () => {
  const [token, setToken] = useState(null);

  const getToken = () => {
    const storedToken = getItem('authToken');
    return storedToken ? storedToken : null;
  };

  const setToken = (newToken) => {
    setItem('authToken', newToken);
  };

  useEffect(() => {
    const existingToken = getToken();
    setToken(existingToken);
  }, []);

  return [token, setToken];
};

export default useToken;