import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import HomeScreen from './homeScreen.js';
import WorkoutStart from './PrimaryWorkout/workoutStart';
import Search from './PrimaryWorkout/search';
import ExerciseName from './PrimaryWorkout/exerciseName';
import EndWorkout from './LeavingWorkout/EndWorkout';
import CancelWorkout from './LeavingWorkout/CancelWorkout';

const Stack = createStackNavigator();

export default function Index() {

  const [user, setUser] = useState(null);

  // TODO use effect unsubscribe


  // TODO soon to be AuthenticatedStack
  return (

    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="StartWorkout" component={WorkoutStart} options={{headerShown: false}}/>
      <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
      <Stack.Screen name="ExerciseName" component={ExerciseName} options={{headerShown: false}}/>
      <Stack.Screen name="EndWorkout" component={EndWorkout} options={{headerShown: false}}/>
        <Stack.Screen name="CancelWorkout" component={CancelWorkout} options={{headerShown: false}}/>

    </Stack.Navigator>
  );
}

function Unauthenticated() {
  return (
    <Stack.Navigator initialRouteName = "Login">
      <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
