import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const LineButton = (props) => {
  const { onPress, text } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.lineButtonCont}>
          <Text style={styles.lineButtonText}>{ text}</Text>
    </TouchableOpacity>
  );
};

export default LineButton;

const styles = StyleSheet.create({
  lineButtonCont: {
    // width: '100%',
    padding: 5,
  },
  lineButtonText: {
    color: '#7c2981',
    fontWeight: 'bold',
    fontSize: 15,
    //   width: '100%',
    borderColor: 'rgba(124, 41, 129, 0.5)',
    borderBottomWidth: 1,
    // textDecorationLine: 'underline',
  },
});
