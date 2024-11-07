import { updateProfile } from '@firebase/auth';
import { getAuth } from 'firebase/auth'; // Version 4.7.4
import { firebaseConfig } from '@constants/firebaseConfig'; // Configuration values
import { validateEmail } from '@utils/validation'; // Data validation functions
import { validatePassword } from '@utils/helpers';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// The updateProfile function 
const updateProfile = async (updatedProfileData: { displayName?: string, photoURL?: string, email?: string }): Promise<void> => {
  // Input Validation
  if (updatedProfileData.email && !validateEmail(updatedProfileData.email)) {
    throw new Error('Invalid email address.');
  }

  if (updatedProfileData.password && !validatePassword(updatedProfileData.password)) {
    throw new Error('Password must meet security requirements.');
  }

  try {
    await updateProfile(auth.currentUser, updatedProfileData);
    // ... (Update authentication state in AuthContext or elsewhere)
  } catch (error) {
    // Error Handling (see error handling section above)
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

export default updateProfile;