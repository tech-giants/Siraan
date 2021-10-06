import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import SaldiriTextInput from './SaldiriTextInput';

export default () => {
  return (
    <View style={styles.container}>
      <CountryPicker
        withEmoji
        withFilter
        onSelect={(e) => console.log('country selected==>', e)}>
        <Text>helo</Text>
      </CountryPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    width: '100%',
  },
});
