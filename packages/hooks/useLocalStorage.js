// packages/hooks/useLocalStorage.js

import { useState, useEffect } from "react";

type StringifiedData = string | null;

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  // Get the initial value from localStorage, if it exists.
  const storedValue = localStorage.getItem(key);
  const initialValueAsString = storedValue !== null ? storedValue : typeof initialValue === "string" ? initialValue : JSON.stringify(initialValue); 

  // Initialize the state with the initial value.
  const [value, setValue] = useState<T>(() => {
    // Parse the stored value, if it's JSON. Otherwise, use the initial value.
    try {
      return JSON.parse(initialValueAsString as StringifiedData);
    } catch (error) {
      return initialValue;
    }
  });

  // Update the value in localStorage whenever the state changes.
  useEffect(() => {
    // Stringify the value, if it's not a string.
    const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  }, [key, value]);

  // Return the state and the update function.
  return [value, setValue];
};

export default useLocalStorage;