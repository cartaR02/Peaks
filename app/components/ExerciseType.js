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
import React, { useState, useEffect } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutDataEntry, { DataEntryTitles } from './Workout/WorkoutDataEntry';
import { textStyles } from './Workout/textStyles';

export default function ExerciseType({ navigation, sentExerciseData }) {
  const workoutName = sentExerciseData.exercise;
  const workoutSets = sentExerciseData.workoutData || [];
  console.log('Checking sent Exercise Data:', sentExerciseData.workoutData);

  const [entries, setEntries] = useState(
    workoutSets.length > 0 ? workoutSets.map((_, i) => i) : [0]
  );
  const [setData, setSetData] = useState(workoutSets);

  useEffect(() => {
    if (sentExerciseData && Array.isArray(sentExerciseData.workoutData)) {
      const workoutSets = sentExerciseData.workoutData;
      setEntries(workoutSets.map((_, i) => i)); // Reset entries
      setSetData(workoutSets); // Reset setData
    } else {
      setEntries([0]); // Default to one empty entry
      setSetData([{ reps: 0, weight: 0 }]); // Default to one empty set
    }
  }, [sentExerciseData]);

  const handleSetData = (index, data) => {
    setSetData((prevSetData) => {
      const updatedData = [...prevSetData];
      updatedData[index] = { ...updatedData[index], ...data }; // Merge new data with an existing set
      sentExerciseData.workoutData = updatedData; // Synchronize with sentExerciseData
      return updatedData;
    });
  };

  const addEntry = () => {
    setEntries((prevEntries) => [...prevEntries, prevEntries.length]);
    setSetData((prevSetData) => [...prevSetData, { reps: 0, weight: 0 }]);
  };

  const removeLastEntry = () => {
    setEntries((prevEntries) => prevEntries.slice(0, -1));
    setSetData((prevSetData) => prevSetData.slice(0, -1));
  };

  const printList = () => {
    console.log('Set Data:', JSON.stringify(setData, null, 2));
    console.log('Workout Data:', JSON.stringify(sentExerciseData, null, 2));
  };

  const renderWorkoutEntries = () => {
    return entries.map((_, index) => (
      <WorkoutDataEntry
        key={index}
        index={index}
        initialData={setData[index]} // Pass the correct
        onSetData={(data) => handleSetData(index, data)}
      />
    ));
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
        <ScrollView style={styles.scrollingwrapper}>{renderWorkoutEntries()}</ScrollView>
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
