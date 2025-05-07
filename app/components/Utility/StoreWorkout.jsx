import { getDatabase, ref, set } from 'firebase/database';

export function StoreWorkout(userId, exercise) {
  const database = getDatabase();

  // This will unwrap the data currently expecting a object that contains a list of exercies with each object holding
  // a name and then the workout sets and reps
  const repList = []
  const weightList = []

  set(ref(database, `users/${userId}/workouts`),
    workoutInformation);
}