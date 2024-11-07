import { getAuth, verifyEmail as firebaseVerifyEmail } from '@firebase/auth'; // Version 4.7.4
import { firebaseConfig } from '@constants/firebaseConfig'; // Configuration values

// The Verify Email Function
const verifyEmail = async (uid: string): Promise<void> => {
  const auth = getAuth(initializeApp(firebaseConfig)); // Initialize Firebase Authentication

  try {
    await firebaseVerifyEmail(auth, uid); // Verify the email address
    // ... (Update user state, potentially send a success message) 
  } catch (error) {
    // Handle errors, see error handling section below
    if (error.code === 'auth/invalid-email') {
      // Handle invalid email address (e.g., log the error, display a message)
      throw new Error('Invalid email address.'); 
    } else if (error.code === 'auth/network-request-failed') {
      // Handle network issues (e.g., retry, display a network error message) 
      throw new Error('Network error. Please try again later.'); 
    } else if (error.code === 'auth/email-already-verified') {
      // Handle email already verified (e.g., log the error, redirect to login) 
      throw new Error('Email is already verified.');
    } else {
      // Handle other Firebase errors (e.g., log the error, display a general error message)
      throw new Error('An error occurred while verifying your email. Please try again later.');
    } 
  }
};

export default verifyEmail;