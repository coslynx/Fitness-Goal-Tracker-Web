import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import { firebaseConfig } from '@constants/firebaseConfig';
import { validateEmail } from '@utils/validation';

// The sendPasswordResetEmail function
const sendPasswordResetEmail = async (email: string): Promise<void> => {
  // Input validation
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  // Initialize Firebase
  const auth = getAuth(); 

  try {
    await sendPasswordResetEmail(auth, email); 
  } catch (error) {
    // Handle errors and display user-friendly messages
    if (error.code === 'auth/invalid-email') {
      // ... [Handle invalid email error]
    } else if (error.code === 'auth/user-not-found') {
      // ... [Handle user not found error]
    } else if (error.code === 'auth/network-request-failed') {
      // ... [Handle network error]
    } else {
      // ... [Handle other Firebase auth errors]
    }

    throw error; // Re-throw the error to be handled further up the call stack
  }
};

export default sendPasswordResetEmail;