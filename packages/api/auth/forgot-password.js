import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import { firebaseConfig } from '@constants/firebaseConfig';
import { validateEmail } from '@utils/validation';

const sendPasswordResetEmail = async (email: string): Promise<void> => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    // Handle errors and display user-friendly messages
    if (error.code === 'auth/invalid-email') {
      // ...
    } else if (error.code === 'auth/user-not-found') {
      // ...
    } else if (error.code === 'auth/network-request-failed') {
      // ...
    } else {
      // ...
    }

    throw error;
  }
};

export default sendPasswordResetEmail;