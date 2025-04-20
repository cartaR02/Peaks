import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import GlobalStyle from './Style.js';
import ArrowButton from './ArrowButton.js';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

export default function Settings({ navigation }) {
  return (
    <SafeAreaView style={GlobalStyle.background}>
      <View style={styles.container}>
        <Text style={styles.settingstext}>Settings</Text>
        <View style={styles.settingList}>
          <View style={styles.rowList}>
            <Text style={[GlobalStyle.Gtext, styles.rowListText]}>Change Email</Text>
            <ArrowButton />
          </View>
          <View style={styles.rowList}>
            <Text style={[GlobalStyle.Gtext, styles.rowListText]}>Reset Account</Text>
            <ArrowButton />
          </View>
          <View style={styles.rowList}>
            <Text style={[GlobalStyle.Gtext, styles.rowListText]}>Workout Settings</Text>
            <ArrowButton />
          </View>
          <View style={styles.rowList}>
            <Text style={[GlobalStyle.Gtext, styles.rowListText]}>Notification Settings</Text>
            <ArrowButton />
          </View>
          <TouchableOpacity
            style={styles.rowList}
            onPress={async () => {
              try {
                await FIREBASE_AUTH.signOut();
                navigation.navigate('Login'); // Adjust the screen name based on your navigator
              } catch (error) {
                console.error('Error signing out: ', error);
              }
            }}
          >
            <Text style={[GlobalStyle.Gtext, styles.rowListText]}>LogOut</Text>
            <ArrowButton />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('Home')}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowListText: {
    textAlign: 'center',
    verticalAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    color: '#FFFF',
  },
  rowList: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  settingstext: {
    fontSize: 50,
    alignItems: 'left',
    borderRadius: '10',
    textAlign: 'left',
    padding: 15,
    flexDirection: 'column',
  },
  goBackButton: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    background: '#FF0000',
    height: 50,
  },
  settingList: {
    alignContent: 'row',
    alignItems: 'left',
    justifyContent: 'left',
  },
});
