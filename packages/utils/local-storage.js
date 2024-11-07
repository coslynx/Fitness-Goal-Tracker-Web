import type { StringifiedData } from '@types/Shared';

export const setItem = (key: string, value: any): void => {
  try {
    const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error(`Error storing item in local storage: ${error.message}`);
  }
};

export const getItem = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? (typeof item === 'string' ? JSON.parse(item) : item) : null;
  } catch (error) {
    console.error(`Error retrieving item from local storage: ${error.message}`);
    return null;
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from local storage: ${error.message}`);
  }
};