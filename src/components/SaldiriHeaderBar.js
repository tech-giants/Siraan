import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const SaldiriHeader = (props) => {
  // define extended styles
  const styles = EStyleSheet.create({
    SaldiriHeader: {
      width: '100%',
      backgroundColor: props.colored? '#7c2981': '#fff',
      padding: 5,
    },
    text: {
      fontSize: '1.5rem',
    },
    startComponent: {
      textTransform: 'uppercase',
    },
    midComponent: {
      flex: 1,
    },
    endComponent: {
      textTransform: 'uppercase',
    },
    displayNone: {
      display: 'none',
    },
  });

  return (
    <>
      <StatusBar backgroundColor="#7c2981" barStyle="dark-light" />

      <View style={styles.SaldiriHeader}>
        <View
          style={
            props.startComponent ? styles.startComponent : styles.displayNone
          }>
          {props.startComponent}
        </View>
        <View
          style={props.midComponent ? styles.midComponent : styles.displayNone}>
          {props.midComponent}
        </View>
        <View
          style={props.endComponent ? styles.endComponent : styles.displayNone}>
          {props.endComponent}
        </View>
        {/* {props.children} */}
        {/* <Text style={styles.text}>Header</Text> */}
      </View>
    </>
  );
};

export default SaldiriHeader;
