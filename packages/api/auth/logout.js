// packages/api/auth/logout.js

import { getAuth, signOut } from '@firebase/auth'; // Version 4.7.4
import { firebaseConfig } from '@constants/firebaseConfig'; 
import { removeItem } from '@utils/local-storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// The logout function 
const logout = async () => {
  try {
    await signOut(auth);
    removeItem('authToken'); // Remove the token from local storage
  } catch (error) {
    console.error('Logout Error:', error); 
  }
};

export default logout;