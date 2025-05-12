import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';
import { useState } from 'react';
import Constants from 'expo-constants';
export default function Search({ switchToExercise }) {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { EXERCISE_API_KEY } = Constants.expoConfig.extra; // Access the API key from environment variables

  const fetchExercises = async () => {
    if (!name.trim()) {
      setExercises([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.api-ninjas.com/v1/exercises?name=${encodeURIComponent(name)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': EXERCISE_API_KEY, // Use the environment variable for the API key
        },
      });

      if (!response.ok) {
        const errorString = response.statusText || response.status;
        console.log(errorString);
        throw new Error(`HTTP error! Status: ${errorString}`);
      }

      const data = await response.json();
      const namesArray = data.map((exercise) => exercise.name);
      console.log(namesArray);
      setExercises(namesArray);
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Optional header within the Search view */}
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.searchcontainer}
          placeholder="Search Exercise"
          placeholderTextColor="#ccc"
          onChangeText={setName}
          onSubmitEditing={fetchExercises}
          returnKeyType="search"
        />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {exercises.length > 0
            ? exercises.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chooseWorkoutButton}
                onPress={() => switchToExercise(item)}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))
            : !loading && <Text style={styles.message}>No Matching Exercise Found</Text>}
        </ScrollView>
        {/* You can also have a default button selection */}
        <Text style={styles.buttonText}>Suggestions</Text>
        <TouchableOpacity
          style={styles.chooseWorkoutButton}
          onPress={() => switchToExercise('Barbell Bench Press')}
        >
          <Text style={styles.buttonText}>Barbell Bench Press</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2A2A',
    padding: 0,
  },
  message: {
    fontSize: 40,
    color: '#C800FF',
    fontWeight: '400',
    fontFamily: 'Verdana',
    textAlign: 'center',
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
  buttonSpacer: {
    padding: 5,
  },
  scrollContainer: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 2,
    flex: 7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  searchcontainer: {
    // Ensure inputs take equal space
    //borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 8,
    height: 20,
    padding: 20,
    margin: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    textAlign: 'center',
  },
  chooseWorkoutButton: {
    backgroundColor: '#595447',
    minWidth: 50,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    padding: 5,
    borderColor: '#1D1C1C',
  },
});
