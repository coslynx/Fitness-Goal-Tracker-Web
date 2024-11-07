// packages/api/goals/get-goals.js

// Imports:
import { getFirestore, collection, query, where, getDocs } from '@firebase/firestore'; // Version 4.7.4 - Firebase Firestore library
import { getGoalsError } from '@utils/error'; // Version 1.0.0 - Our custom error handling utility
import { useAuth } from '@hooks/useAuthContext'; // Version 1.0.0 - Our authentication context hook
import type { Goal } from '@types/Goal'; // Version 1.0.0 - Our Goal data model

// Exported Function:
export const getGoals = async (): Promise<Goal[]> => {
  //  1. Connect to Firestore
  const db = getFirestore(); // Initialize Firestore connection
  const goalsCollection = collection(db, 'goals'); // Access the 'goals' collection

  // 2. Authenticate User
  const { user } = useAuth(); // Get the currently logged-in user from the AuthContext
  if (!user) {
    throw new Error('AUTHENTICATION_ERROR'); // Throw an error if the user is not logged in
  }
  const userId = user.uid; // Extract the user's unique ID 

  // 3. Construct Firestore Query
  const querySnapshot = await getDocs(query(goalsCollection, where('userId', '==', userId))); // Query the goals collection and filter by userId 

  // 4. Format and Return Goals 
  const goals = querySnapshot.docs.map((doc) => ({
    id: doc.id, // Get the unique ID of each goal from Firestore
    ...doc.data() // Extract the data from each goal document
  })) as Goal[]; // Type cast to Goal[] to ensure consistency with our data model

  return goals; // Return the formatted array of Goal objects
};