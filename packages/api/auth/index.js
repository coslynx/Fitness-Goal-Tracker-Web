import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification 
} from 'firebase/auth';

import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import { firebaseConfig } from '@constants/firebaseConfig'; 
import { validateEmail } from '@utils/validation'; 
import { validatePassword } from '@utils/helpers'; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const initializeAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return {
    signup,
    login,
    logout,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification
  };
};

const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // ... [Update authentication state in AuthContext]
    return user;
  } catch (error) {
    // ... [Handle errors and display user-friendly messages]
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // ... [Update authentication state in AuthContext]
    return user;
  } catch (error) {
    // ... [Handle errors and display user-friendly messages]
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    // ... [Update authentication state in AuthContext]
  } catch (error) {
    // ... [Handle errors and display user-friendly messages]
  }
};

const updateProfile = async (updatedProfileData) => {
  try {
    await updateProfile(auth.currentUser, updatedProfileData);
    // ... [Update authentication state in AuthContext]
    return auth.currentUser;
  } catch (error) {
    // ... [Handle errors and display user-friendly messages]
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // ... [Update authentication state in AuthContext]
  } catch (error) {
    // ... [Handle errors and display user-friendly messages]
  }
};

const sendEmailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    // ... [Update authentication state in AuthContext]
  } catch (error) {
    // ... [Handle errors and display user-friendly messages]
  }
};

export default initializeAuth;