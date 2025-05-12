import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import GlobalStyle from './constants/globalStyles';


export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, GlobalStyle.background]}>
      <View style={styles.settingsBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <View style={styles.hamburger}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
          </View>
          <Text style={styles.settingsTXT}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.information}>
        <TouchableOpacity
          style={styles.startbutton}
          onPress={() => navigation.navigate('StartWorkout')}
        >
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
        <View style={styles.musclesworked}>
          <Text style={[GlobalStyle.Gtext, { fontSize: 24 }]}>Recent PR:</Text>
          <Text style={[GlobalStyle.Gtext, { fontSize: 24 }]}>Dumbbell Incline</Text>
          <Text style={[GlobalStyle.Gtext, { fontSize: 24 }]}>10 x 100 lbs</Text>
          <Image
            source={require('../assets/images/musclesworked.png')}
            style={{
              marginTop: 10,
              width: '100%',
              height: '70%',
              aspectRatio: 1,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  settingsBar: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  settingsTXT: {
    color: '#C800FF',
    fontWeight: '600',
    fontFamily: 'Verdana',
    fontSize: 10,
    marginTop: 5,
  },
  hamburger: {
    width: 30,
    height: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  information: {
    flex: 6,
  },
  musclesworked: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  line: {
    width: 30,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  startbutton: {
    backgroundColor: '#C800FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
  },
  buttonText: {
    fontFamily: 'Verdana',
    fontSize: 22,
  },
});
