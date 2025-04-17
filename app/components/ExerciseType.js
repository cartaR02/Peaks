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
  // Using use states to control if a list is showing or not
  console.log(sentExerciseData);
  const currentData = {
    name: workoutName,
    sets: setData,
  };

  const workoutName = sentExerciseData.exercise;
  if (sentExerciseData.sets) {
    const workoutDataEntries = workoutData.sets.map((_, i) => i);
    setEntries(workoutDataEntries);

    setSetData(workoutData.sets);
  }
  const workoutSets = sentExerciseData?.sets || [];

  // set indexes for the sets
  const [entries, setEntries] = useState(
    initialSets.length > 0 ? initialSets.map((_, i) => i) : [0]
  );
  const [setData, setSetData] = useState(workoutSets); // To hold data from each set
  // Used for adding entries
  const addEntry = () => {
    setEntries([...entries, entries.length]);
  };

  // Used for taking entries away
  const removeLastEntry = () => {
    setEntries(entries.slice(0, -1));
    setSetData(setData.slice(0, -1));
  };

  // handle selecting an entry to display on the right
  const handleSetData = (index, data) => {
    const updatedData = [...setData];
    updatedData[index] = data;
    setSetData(updatedData);
  };

  const printList = () => {
    const allWeights = setData.map((set) => set.weight || 'N/A');
    console.log('all weights:', allWeights);
    const allReps = setData.map((set) => set.reps);
    console.log('all reps:', allReps);
    console.log(currentData);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[textStyles.textStyles, styles.textWrapper, { textAlignVertical: 'center' }]}>
          {exercise}
        </Text>
      </View>

      <View style={styles.middleContainer}>
        <DataEntryTitles />
        <ScrollView style={styles.scrollingwrapper}>
          {entries.map((_, index) => (
            <WorkoutDataEntry key={index} index={index} onSetData={handleSetData} />
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
