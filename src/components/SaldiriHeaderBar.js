import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const SaldiriHeader = (props) => {
  // define extended styles
  const styles = EStyleSheet.create({
    SaldiriHeader: {
      width: '100%',
      backgroundColor: '#7c2981',
      padding: 5,
    },
    text: {
      fontSize: '1.5rem',
    },
  });

  return (
    <>
      <StatusBar backgroundColor="#7c2981" barStyle="dark-light" />

      <View style={styles.SaldiriHeader}>
        {props.children}
        {/* <Text style={styles.text}>Header</Text> */}
      </View>
    </>
  );
};

export default SaldiriHeader;
