import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP, initializeFirebaseAuth } from '../FirebaseConfig';
import { getAuth } from 'firebase/auth';

import HomeScreen from './components/HomeScreen';
import Settings from './components/Utility/Settings.js';
import Workout from './components/ExerciseType';
import CancelWorkout from './components/CancelWorkout';
import Search from './components/Search';
import EndWorkout from './components/EndWorkout';
import WorkoutStart from './components/WorkoutStart.js';
import LoginPage from './components/Login/Login.js';
import { UserProvider } from './components/Utility/UserContext';
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const setupAuth = async () => {
      try {
        await initializeFirebaseAuth();
        const auth = getAuth(FIREBASE_APP);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('Error setting up auth:', error);
      }
    };

    setupAuth();
  }, []);

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <UserProvider user={user}>
      <NavigationContainer>
        {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
      </NavigationContainer>
    </UserProvider>
  );
}
function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="Workout" component={Workout} options={{ headerShown: false }} />
      <Stack.Screen
        name="CancelWorkout"
        component={CancelWorkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Stack.Screen name="EndWorkout" component={EndWorkout} options={{ headerShown: false }} />
      <Stack.Screen
        name="WorkoutStart"
        component={WorkoutStart}
        options={{ unmountOnBlur: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}
