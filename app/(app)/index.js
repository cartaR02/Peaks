import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import HomeScreen from "../homeScreen.js";
import WorkoutStart from "../src/PrimaryWorkout/workoutStart";
import Search from "../src/PrimaryWorkout/search";
import ExerciseName from "../src/PrimaryWorkout/exerciseName";
import EndWorkout from "../src/LeavingWorkout/EndWorkout";
import CancelWorkout from "../src/LeavingWorkout/CancelWorkout";
import SignIn from "../src/Login/signIn";

const Stack = createStackNavigator();

export default function Index() {
  const [user, setUser] = useState(null);

  // TODO use effect unsubscribe

  // TODO soon to be AuthenticatedStack
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartWorkout"
        component={WorkoutStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseName"
        component={ExerciseName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EndWorkout"
        component={EndWorkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CancelWorkout"
        component={CancelWorkout}
        options={{ headerShown: false }}
      />
        <Stack.Screen
            name="Login"
            component={SignIn}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}