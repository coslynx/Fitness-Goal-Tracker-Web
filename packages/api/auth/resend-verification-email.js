// packages/api/auth/resend-verification-email.js

import { getAuth, sendEmailVerification } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@constants/firebaseConfig'; 
import { validateEmail } from '@utils/validation';
import axios from 'axios'; // For API requests

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// The resendVerificationEmail function
const resendVerificationEmail = async (email: string): Promise<void> => {
  // Input validation
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    } else {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode',
        {
          requestType: 'VERIFY_EMAIL',
          email: email,
          returnUrl: 'https://your-app-url.com/verify-email', 
        }
      );

      if (response.status === 200) {
        console.log('Verification email sent successfully.');
      } else {
        console.error('Error sending verification email:', response.data);
        throw new Error('Error sending verification email.');
      }
    }
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else if (error.code === 'auth/user-not-found') {
      throw new Error('No user found with that email.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please try again later.');
    } else {
      throw new Error('An error occurred. Please try again later.');
    }
  }
};

export default resendVerificationEmail;