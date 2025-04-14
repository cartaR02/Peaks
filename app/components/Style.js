// filepath: e:\Coding-Projects\Peaks\app\components\Settings.js
const styles = StyleSheet.create({
  // ...
  goBackButton: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    background: '#FF0000', // <-- change this
    height: 50,
  },
  // ...
});import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  Gtext: {
    color: '#C800FF',
    fontWeight: '400',
    fontFamily: 'Verdana',
    textAlign: 'center',
  },
  background: {
    background: '#2C2A2A',
    flex: 1,
  },
});

export default GlobalStyles;
