import { useState, useEffect, useRef } from 'react';

const useDebounce = (callback, delay) => {
  const timeoutId = useRef(null);
  const [debouncedValue, setDebouncedValue] = useState(null);

  const handleDebounce = (value) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      callback(value);
    }, delay);
  };

  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  return [debouncedValue, handleDebounce];
};

export default useDebounce;