import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

// Trying to create X and add workout button along with end workout

export default function WorkoutMenu({ navigation, finishWorkoutScreens }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* X Button */}
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.xButton}
          onPress={() => navigation.navigate('CancelWorkout')}
        >
          <Text style={styles.xText}>X</Text>
        </TouchableOpacity>

        {/* End Workout Button */}
        <TouchableOpacity
          style={styles.endWorkoutButton}
          onPress={() =>
            navigation.navigate('EndWorkout', { completeWorkout: finishWorkoutScreens })
          }
        >
          <Text style={styles.buttonText}>End Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center', // Ensures buttons align vertically
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
  wrapper: {
    flexDirection: 'row', // Lay out children horizontally.
    justifyContent: 'space-between', // Place first child at the start and the last at the end.
    alignItems: 'center', // Optionally, center them vertically.
    width: '100%', // Ensure it spans the full width (or use a fixed width).
    paddingHorizontal: 10, // Optional: add horizontal padding.
  },
  xButton: {
    justifyContent: 'left',
    alignItems: 'center',
    width: 50, // Set a fixed width for consistency
    height: 50, // Matches the End Workout button height
  },
  xText: {
    fontSize: 40,
    color: '#ff1100',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  endWorkoutButton: {
    backgroundColor: '#ff1100',
    width: 120, // Adjust as needed
    height: 50, // Matches X button height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});