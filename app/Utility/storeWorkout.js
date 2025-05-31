// ✅ storeWorkout.js

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // make sure this path is correct

export const StoreWorkout = async (compiledWorkouts) => {
  try {
    const workoutsRef = collection(db, 'workouts');

    await addDoc(workoutsRef, {
      timestamp: new Date().toISOString(),
      exercises: compiledWorkouts,
    });

    console.log('Workout saved to Firestore');
  } catch (error) {
    console.error('Error saving workout:', error);
  }
};
