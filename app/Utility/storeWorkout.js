import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

// Helper function to format date to "YYYY-MM-DD_HH-mm"
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
    
    // Use doc() with a custom ID based on the formatted timestamp
    const workoutDocRef = doc(db, 'CompletedWorkouts', safeTimestamp);

    await setDoc(workoutDocRef, {
      timestamp: timestampISO, // retain the full ISO timestamp if needed
      exercises: compiledWorkouts,
    });

    console.log('Workout saved to Firestore with id:', safeTimestamp);
  } catch (error) {
    console.error('Error saving workout:', {
      message: error.message,
      code: error.code || 'no_error_code',
      stack: error.stack,
    });
  }
}