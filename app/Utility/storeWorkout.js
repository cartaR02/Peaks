// ✅ storeWorkout.js

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig'; // make sure this path is correct

const formatDateForID = (date) => {
  const pad = (n) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}_${hours}-${minutes}`;
};


export const StoreWorkout = async (compiledWorkouts) => {
  try {

    const now = new Date();
    const timestampISO = now.toISOString();
    const safeTimestamp = formatDateForID(now);


    console.log('db type:', typeof db);
    console.log('db instance:', db);

    const workoutsRef = collection(db, 'CompletedWorkouts', safeTimestamp);
    console.log("what about here")
    console.log(workoutsRef)
    await addDoc(workoutsRef, {
      timestamp: timestampISO,
      exercises: compiledWorkouts,
    });

    console.log('Workout saved to Firestore with id: ', safeTimestamp);
  } catch (error) {
    console.error("erro hits")
    console.error('Error saving workout:', {
      message: error.message,
      code: error.code || 'no_error_code',
      stack: error.stack,
    });

  }
}