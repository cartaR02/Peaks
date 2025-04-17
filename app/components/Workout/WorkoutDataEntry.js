import { Text, View, StyleSheet, Image, Button, TextInput, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { textStyles } from './textStyles';

// Change the value of each flex here to make edited them easier
const repsFlex = 2;
const weightFlex = 3;
const setsFlex = 1;
const typeFlex = 2;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    flexDirection: 'row', // Ensures child components are in a row
    justifyContent: 'space-between', // Distribute space between elements
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    elevation: 5,
    marginVertical: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  setcontainer: {
    flex: 1, // Ensure inputs take equal space
    //borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 7,
    margin: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    textAlign: 'center',
  },
  inputWrapper: {
    flex: 1, // Ensures that the wrapper takes equal space for each item
    padding: 5,
  },
});

export default function WorkoutDataEntry({ index, onSetData, initialData }) {
  console.log('Logging for WorkoutDataEntry');
  console.log('initialData ', JSON.stringify(initialData, null, 2));
  // The card that will be used to hold all of the data entry screens
  const [reps, setReps] = useState(initialData?.reps || 0); // Initialize reps with initialData or empty string
  const [weight, setWeight] = useState(initialData?.weight || 0); // Initialize weight with initialData or empty string
  const [setType, setSetType] = useState('');

  useFocusEffect(
    useCallback(() => {
      setReps(initialData?.reps?.toString() ?? '');
      setWeight(initialData?.weight?.toString() ?? '');
    }, [initialData])
  );
  console.log('Reps:', reps);
  console.log('Weight:', weight);
  // currently not used
  const handleSetTypeChange = (value) => {
    setSetType(value);
  };

  const handleRepsChange = (value) => {
    const parsedReps = parseInt(value, 10) || 0; // Ensure numeric value
    setReps(parsedReps);
    onSetData({ reps: parsedReps, weight }); // Pass updated data to parent
  };

  // Handle changes to weight
  const handleWeightChange = (value) => {
    const parsedWeight = parseFloat(value) || 0; // Ensure numeric value
    setWeight(parsedWeight);
    onSetData({ reps, weight: parsedWeight }); // Pass updated data to parent
  };

  return (
    <SafeAreaView style={styles.card}>
      <View style={{ flex: setsFlex }}>
        <Text style={[textStyles.textStyles]}>{index + 1}</Text>
      </View>
      <View style={[styles.inputWrapper, { flex: typeFlex }]}>
        <TextInput style={styles.setcontainer} />
      </View>
      <View style={[styles.inputWrapper, { flex: repsFlex }]}>
        <TextInput
          style={styles.setcontainer}
          placeholder={weight === '' ? '0' : ''}
          placeholderTextColor="#fff"
          value={reps}
          keyboardType="numeric"
          onChangeText={handleRepsChange}
        />
      </View>
      <View style={[styles.inputWrapper, { flex: weightFlex }]}>
        <TextInput
          style={styles.setcontainer}
          placeholder={weight === '' ? '0' : ''}
          placeholderTextColor="#fff"
          value={weight === '' ? '' : weight}
          onChangeText={handleWeightChange}
          keyboardType="numeric"
        />
      </View>
    </SafeAreaView>
  );
}

export function DataEntryTitles() {
  return (
    <View style={styles.card}>
      <Text style={[textStyles.textStyles, { flex: setsFlex }]}>Set</Text>
      <Text style={[textStyles.textStyles, { flex: typeFlex }]}>Type</Text>
      <Text style={[textStyles.textStyles, { flex: repsFlex }]}>Reps</Text>
      <Text style={[textStyles.textStyles, { flex: weightFlex }]}>Weight</Text>
    </View>
  );
}
