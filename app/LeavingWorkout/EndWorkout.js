import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyle from '../constants/globalStyles';
import { useEffect, useState } from 'react';
import { StoreWorkout } from '../Utility/StoreWorkout';

export default function EndWorkout({ navigation, route }) {
    const textSize = 30;
    const { completeWorkout } = route.params;
    console.log(route.params); // Default to an empty function if not passed
    const [compiledWorkouts, setCompiledWorkouts] = useState([]); // State to hold compiled workouts

    // Log the complete workout data
    useEffect(() => {
        if (completeWorkout) {
            const workouts = completeWorkout
                .filter((screen) => screen.type === 'workout')
                .map(({ exercise, workoutData }) => ({
                    exercise,
                    workoutData,
                }));
            console.log('Workout data compiled:', JSON.stringify(workouts, null, 2));
            setCompiledWorkouts(workouts);
        } else {
            console.log('No workout data to compile.');
        }
    }, [completeWorkout]); // Run once when the component mounts

    // Calls both storeworkout and navigate instead of button somehow doing both
    function StoreWorkoutWrapper() {
        StoreWorkout(compiledWorkouts);
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={GlobalStyle.background}>
            <Text style={[styles.Buttontext, { fontSize: 50 }]}>End Workout?</Text>
            <View style={styles.outerStats}>
                <ScrollView style={styles.stats}>
                    <Text style={styles.statsText}>Workout Stats</Text>
                    {compiledWorkouts.map((workout, index) => (
                        <View key={index} style={styles.stats}>
                            <Text style={styles.statsText}>{workout.exercise}</Text>
                            <View style={styles.statsText}>
                                {/* TODO make this text look good */}
                                {workout.workoutData.map((set, index) => (
                                    <View key={index} style={styles.statsText}>
                                        <Text>{set.reps}</Text>
                                        <Text>{set.weight}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.continueCancel, styles.Yes]} onPress={StoreWorkoutWrapper}>
                    <Text style={([GlobalStyle.GText], { fontSize: textSize })}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.continueCancel, styles.No]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={([GlobalStyle.GText], { fontSize: textSize })}>No</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
    },
    continueCancel: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 5,
        width: '25%',
    },
    statsText: {
        color: '#C800FF',
        fontWeight: '400',
        fontFamily: 'Verdana',
        textAlign: 'center',
        padding: 15,
        fontSize: 35,
    },
    outerStats: {
        flex: 10,
        padding: 10,
    },
    stats: {
        flex: 10,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#1D1C1C',
    },
    Yes: {
        backgroundColor: 'green',
    },
    No: {
        backgroundColor: 'red',
    },
    Buttontext: {
        color: '#C800FF',
        fontWeight: '400',
        fontFamily: 'Verdana',
        textAlign: 'center',
        padding: 15,
    },
});
