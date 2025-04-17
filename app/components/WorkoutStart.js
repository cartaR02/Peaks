import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Card } from 'react-native-paper';
import WorkoutMenu from './Workout/WorkoutMenu.js';
import GlobalStyle from './Style.js';
import Exercise from './ExerciseType.js';
import Search from './Search.js';

export default function WorkoutStart({ navigation }) {
  const [screens, setScreens] = useState([
    {
      id: 0,
      type: 'search',
      exercise: null,
      workoutData: [],
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Each container holds an id and a mode (either 'workout' or 'search').
  const createExerciseScreen = (exerciseName) => {
    setScreens((prevScreens) =>
      prevScreens.map((screen, index) => {
        if (index === currentIndex) {
          return {
            ...screen,
            type: 'workout',
            exercise: exerciseName,
            workoutData: [{ reps: 0, weight: 0 }], // Initialize with default values
          };
        }
        return screen;
      })
    );
  };

  // Function logic on the current index is handled with the button visibility
  const goBack = () => {
    saveWorkoutData(screens[currentIndex].workoutData);
    setCurrentIndex((currentIndex) => {
      return currentIndex - 1;
    });
  };

  // save the workout data at the current index and also
  const goForward = () => {
    setCurrentIndex((currentIndex) => {
      return currentIndex + 1;
    });
  };
  // Optional: If you also want to add a new search screen after switching:
  const addNewSearchScreen = () => {
    setScreens((prevScreens) => {
      // Save the current screen's workout data
      const updatedScreens = prevScreens.map((screen, index) => {
        if (index === currentIndex) {
          return {
            ...screen,
            workoutData: prevScreens[currentIndex].workoutData, // Save current workout data
          };
        }
        return screen;
      });

      // Add a new search screen
      const newScreens = [
        ...updatedScreens,
        { id: updatedScreens.length, type: 'search', exercise: null, workoutData: [] },
      ];

      // Update the current index to the new screen
      setCurrentIndex(newScreens.length - 1);

      return newScreens;
    });
  };

  // Retrieve the updated data for the current screen

  const saveWorkoutData = (workoutData) => {
    setScreens((prevScreens) =>
      prevScreens.map((screen, index) => {
        if (index === currentIndex) {
          return { ...screen, workoutData }; // Save the provided workout data
        }
        return screen;
      })
    );
  };

  // Render the current screen based on its type.
  const renderScreen = () => {
    // Make sure currentIndex is within bounds.
    const validIndex =
      currentIndex < 0 ? 0 : currentIndex >= screens.length ? screens.length - 1 : currentIndex;
    const currentScreen = screens[validIndex];

    switch (currentScreen.type) {
      case 'search':
        return <Search navigation={navigation} switchToExercise={createExerciseScreen} />;
      case 'workout':
        return <Exercise navigation={navigation} sentExerciseData={currentScreen} />;
      default:
        return <Search navigation={navigation} switchToExercise={createExerciseScreen} />;
    }
  };

  const removeCurrentScreen = () => {
    setScreens((prevScreens) => {
      let newScreens;
      if (prevScreens.length <= 1) {
        // If only one screen exists, reset it to a default search screen.
        newScreens = [{ id: 0, type: 'search' }];
      } else {
        // Remove the screen at currentIndex.
        newScreens = prevScreens.filter((_, index) => index !== currentIndex);
      }
      // Update the current index: if currentIndex is now out of range, set it to the last index.
      const newIndex = Math.min(currentIndex, newScreens.length - 1);
      setCurrentIndex(newIndex);
      return newScreens;
    });
  };

  const printScreens = () => {
    console.log(JSON.stringify(screens, null, 2));
  };
  return (
    <SafeAreaView style={[GlobalStyle.background, styles.background]}>
      <View style={styles.header}>
        <WorkoutMenu navigation={navigation} />
      </View>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.addWorkoutButton}
          onPress={removeCurrentScreen}
          disabled={screens.length === 1}
        >
          <Text style={styles.removeWorkoutText}>-</Text>
        </TouchableOpacity>

        {currentIndex >= 1 && (
          <TouchableOpacity
            style={styles.addWorkoutButton}
            onPress={goBack}
            disabled={screens.length === 1}
          >
            <Text style={styles.removeWorkoutText}>{currentIndex}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.removeWorkoutText}>Page {currentIndex + 1}</Text>
        {screens.length - 1 > currentIndex && (
          <TouchableOpacity
            style={styles.addWorkoutButton}
            onPress={goForward}
            disabled={screens.length === 1}
          >
            <Text style={styles.removeWorkoutText}>{currentIndex + 2}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.addWorkoutButton}
          onPress={addNewSearchScreen}
          disabled={screens[currentIndex]?.type === 'search'}
        >
          <Text style={styles.addWorkoutText}>+</Text>
        </TouchableOpacity>
        <Button title="print screens" onPress={printScreens} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {},

  content: {
    paddingVertical: 10,
    flex: 6,
  },
  background: {
    flex: 1,
  },
  addWorkoutButton: {
    backgroundColor: '#C800FF',
    width: 50, // Adjust as needed
    height: 50, // Matches X button height
    justifyContent: 'left',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  addWorkoutText: {
    fontSize: 40,
    color: '#FFFFFF',
    textAlignVertical: 'center',
  },
  removeWorkoutText: {
    fontSize: 40,
    color: '#FFFFFF',
    textAlignVertical: 'center',
  },
  wrapper: {
    flexDirection: 'row', // Lay out children horizontally.
    justifyContent: 'space-between', // Place first child at the start and the last at the end.
    alignItems: 'center', // Optionally, center them vertically.
    width: '100%', // Ensure it spans the full width (or use a fixed width).
    paddingHorizontal: 10,
    paddingBottom: 15, // Optional: add horizontal padding.
  },
});
