// packages/api/auth/login.js

import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'; // Version 4.7.4
import { initializeApp } from 'firebase/app'; // Version 4.7.4
import { firebaseConfig } from '@constants/firebaseConfig'; // Configuration values
import { validateEmail, validatePassword } from '@utils/validation'; // Data validation functions
import { setItem } from '@utils/local-storage'; // For storing user tokens
import { API_URLS } from '@constants'; // API endpoint definitions

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// The Login Function
const login = async (email, password): Promise<UserCredential | null> => {
  // Input Validation
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }
  if (!validatePassword(password)) {
    throw new Error('Password must meet security requirements.');
  }

  try {
    // Authenticate the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; 

    // Store the user token
    const token = await userCredential.user.getIdToken(); // Retrieve ID token for secure API access
    setItem('authToken', token); 

    // ... (Update authentication state in AuthContext or elsewhere)

    return userCredential; // Return the authentication credentials
  } catch (error) {
    // Error Handling (see error handling section below)
    if (error.code === 'auth/invalid-email') {
      // ... [Handle invalid email error]
    } else if (error.code === 'auth/wrong-password') {
      // ... [Handle incorrect password error]
    } else if (error.code === 'auth/user-not-found') {
      // ... [Handle user not found error]
    } else {
      // ... [Handle other Firebase auth errors]
    }

    throw error; // Re-throw the error to be handled further up the call stack
  }
};

export default login;