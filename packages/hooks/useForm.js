import { useState } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, getDocs } from '@firebase/firestore';
import { API_URLS } from '@constants'; 
import axios from 'axios'; // For API requests

const db = getFirestore();

const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(values));
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        // Submit form data to backend or Firestore
        // Example using Firestore:
        const goalsCollection = collection(db, 'goals');
        await addDoc(goalsCollection, values);
        // Or, use axios for API requests:
        // await axios.post(API_URLS.GOALS, values);

        onSubmit();
        setValues(initialValues);
      } catch (error) {
        console.error('Form submission error:', error);
        // Handle errors based on your needs
        // For example, you can set the error state or display an error message
      } finally {
        setIsLoading(false);
      }
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, isLoading, handleChange, handleSubmit, reset };
};

export default useForm;