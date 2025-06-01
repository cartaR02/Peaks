// ✅ storeWorkout.js

import { collection, addDoc,setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // make sure this path is correct

const buildWorkoutId = () => {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const weekday = now.toLocaleString('default', { weekday: 'long' });
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();

  return `${weekday}-${mm}-${dd}-${yyyy}`;
}


export const StoreWorkout = async (compiledWorkouts) => {
  try {
    const workoutId = buildWorkoutId();
    const workoutsRef  = doc(collection(db, 'CompletedWorkouts'), workoutId);


    await setDoc(workoutsRef, {
      timestamp: serverTimestamp(),
      exercises: compiledWorkouts,
    });

    console.log('Workout saved to Firestore');
  } catch (error) {
    console.error('Error saving workout:', error);
  }
};
