import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ArrowButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.arrowContainer}>
        {/* Top Line */}
        <View style={styles.lineTop} />
        {/* Bottom Line */}
        <View style={styles.lineBottom} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,  // You can adjust the size of the button
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  arrowContainer: {
    width: 20,  // Width of the arrow container
    height: 20, // Height of the arrow container
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineTop: {
    width: 20,
    height: 3,
    backgroundColor: '#C800FF',  // Arrow line color
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    top: +6,
    borderStartEndRadius: '56',
  },
  lineBottom: {
    width: 20,
    height: 3,
    backgroundColor: '#C800FF',  // Arrow line color
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    top: -6,
  },
});
