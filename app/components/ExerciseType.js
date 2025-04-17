import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutDataEntry, { DataEntryTitles } from './Workout/WorkoutDataEntry';
import { textStyles } from './Workout/textStyles';

export default function ExerciseType({ navigation, sentExerciseData }) {
  // Log the received data for debugging
  console.log(sentExerciseData);

  // Extract workout name and sets from sentExerciseData
  const workoutName = sentExerciseData.exercise;
  const workoutSets = sentExerciseData?.sets || [];

  // State to manage entries and set data
  const [entries, setEntries] = useState(
    workoutSets.length > 0 ? workoutSets.map((_, i) => i) : [0]
  );
  const [setData, setSetData] = useState(workoutSets); // To hold data from each set

  // Add a new entry
  const addEntry = () => {
    setEntries((prevEntries) => [...prevEntries, prevEntries.length]);
    setSetData((prevSetData) => [...prevSetData, { reps: 0, weight: 0 }]); // Add default set
  };

  // Remove the last entry
  const removeLastEntry = () => {
    setEntries((prevEntries) => prevEntries.slice(0, -1));
    setSetData((prevSetData) => prevSetData.slice(0, -1));
  };

  // Update set data for a specific entry
  const handleSetData = (index, data) => {
    setSetData((prevSetData) => {
      const updatedData = [...prevSetData];
      updatedData[index] = { ...updatedData[index], ...data }; // Merge new data with existing set
      return updatedData;
    });

    // Synchronize with sentExerciseData
    sentExerciseData.sets = setData;
  };

  // Print the current state of sets
  const printList = () => {
    console.log('Set Data:', setData);
    console.log('Workout Data:', sentExerciseData);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[textStyles.textStyles, styles.textWrapper, { textAlignVertical: 'center' }]}>
          {workoutName}
        </Text>
      </View>

      <View style={styles.middleContainer}>
        <DataEntryTitles />
        <ScrollView style={styles.scrollingwrapper}>
          {entries.map((_, index) => (
            <WorkoutDataEntry
              key={index}
              index={index}
              onSetData={(data) => handleSetData(index, data)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addEntry}>
          <Text style={styles.buttonText}>Add set</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={printList}>
          <Text style={styles.buttonText}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={removeLastEntry}
          disabled={entries.length === 1}
        >
          <Text style={styles.buttonText}>Remove Set</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2A2A',
    padding: 10,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    paddingVertical: 5,
  },
  scrollingwrapper: {
    flex: 1,
    height: 200,
  },
  textWrapper: {
    paddingVertical: 0,
  },
  middleContainer: {
    flex: 15, // Takes up the available space between top and bottom
    // Prevents the ScrollView from growing infinitely
    borderWidth: 1,
    backgroundColor: '#1D1C1C',
    //borderColor: '#FFF',
    borderRadius: 15,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#C800FF',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
