import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import HomeScreen from './components/HomeScreen';
import Settings from './components/Utility/Settings.js';
import Workout from './components/ExerciseType';
import CancelWorkout from './components/CancelWorkout';
import Search from './components/Search';
import EndWorkout from './components/EndWorkout';
import WorkoutStart from './components/WorkoutStart.js';
import LoginPage from './components/Login/Login.js';
const Stack = createStackNavigator();

export default function App() {
  // setting up auth
  const [user, setUser] = (useState < User) | (null > null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('User state changed:', user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        // Show login if user is not logged in and when user is loggin in show home
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        )}
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
    </NavigationContainer>
  );
}
