import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GlobalStyle from './Style.js';

export default function CancelWorkout({ navigation }) {
  const textSize = 30;
  return (
    <SafeAreaView style={GlobalStyle.background}>
      <Text style={[styles.Buttontext, { fontSize: 50 }]}>End Workout?</Text>
      <View style={styles.outerStats}>
        <ScrollView style={styles.stats}>
          <Text style={styles.statsText}>Workout Stats</Text>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.continueCancel, styles.Yes]}
          onPress={() => navigation.navigate('Home')}>
          <Text style={([GlobalStyle.GText], { fontSize: textSize })}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueCancel, styles.No]}
          onPress={() => navigation.goBack()}>
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
