import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './components/HomeScreen';
import Settings from './components/Settings';
import Workout from './components/ExerciseType';
import CancelWorkout from './components/CancelWorkout';
import Search from './components/Search';
import EndWorkout from './components/EndWorkout';
import WorkoutStart from './components/WorkoutStart.js';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
