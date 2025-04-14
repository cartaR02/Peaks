import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import GlobalStyle from './Style.js';


export default function CancelWorkout({ navigation }) {
  const textSize = 30;
  return (
    <SafeAreaView style={GlobalStyle.background}>
    <Text style={[styles.Buttontext, { fontSize: 50 }]}>
          Cancel Workout?
        </Text>
      <View style={styles.container}>
        
        <TouchableOpacity style={[styles.continueCancel, styles.Yes]} onPress={() => navigation.navigate('Home')}>
          <Text style={[GlobalStyle.GText], {fontSize: textSize}}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.continueCancel, styles.No]} onPress={() => navigation.goBack()}>
          <Text style={[GlobalStyle.GText],  {fontSize: textSize } }>No</Text>
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
  },
  continueCancel: {
    flex:1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 5,
    width: "25%",
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
  }
});
