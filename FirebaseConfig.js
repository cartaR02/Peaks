import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA0lwnaSqu7yutrKYcWoXet1f3V7hhIQdA',
  authDomain: 'peaks-30fa5.firebaseapp.com',
  projectId: 'peaks-30fa5',
  storageBucket: 'peaks-30fa5.firebasestorage.app',
  messagingSenderId: '1091596182755',
  appId: '1:1091596182755:web:ba41b7a3dd452ec70091d6',
  measurementId: 'G-9FCM0930W2',
  dataBaseURL: 'https://peaks-30fa5-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

let FIREBASE_AUTH;
try {
  FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // If auth is already initialized, get the existing instance
  FIREBASE_AUTH = getAuth(FIREBASE_APP);
}

export { FIREBASE_AUTH };
export const database = getDatabase(FIREBASE_APP);
