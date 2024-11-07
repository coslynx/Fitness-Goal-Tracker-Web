import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@firebase/auth'; 
import { initializeApp } from 'firebase/app';
import { collection, doc, setDoc } from 'firebase/firestore'; 
import { firebaseConfig } from '@constants/firebaseConfig'; 
import { validateEmail } from '@utils/validation'; 
import { validatePassword } from '@utils/helpers'; 

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// The Signup function
const signup = async (email: string, password: string): Promise<UserCredential> => {
  // Input validation
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }
  if (!validatePassword(password)) {
    throw new Error('Password must meet security requirements.');
  }

  try {
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Handle successful signup
    await updateProfile(user, { displayName: 'Your Name' }); // Optional: Set additional profile details
    const usersCollection = collection(db, 'users'); // Replace with your actual collection name
    await setDoc(doc(usersCollection, user.uid), { ...user, // Include additional details if needed 
        // ... 
    });

    return userCredential; 
  } catch (error) {
    // Handle errors (see error handling section above)
    if (error.code === 'auth/invalid-email') {
      // ...
    } else if (error.code === 'auth/weak-password') {
      // ...
    } else if (error.code === 'auth/email-already-in-use') {
      // ...
    } else {
      // ...
    }

    throw error; // Re-throw the error to be handled further up the call stack
  }
};

export default signup;