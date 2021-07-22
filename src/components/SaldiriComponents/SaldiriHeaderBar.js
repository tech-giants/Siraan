import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const SaldiriHeader = (props) => {
  // define extended styles
  const styles = EStyleSheet.create({
    SaldiriHeaderColored: {
      width: '100%',
      backgroundColor:  '#7c2981',
      padding: 5,
      flexDirection: 'row',
      marginBottom: 5,
    },
    SaldiriHeader: {
      width: '100%',
      backgroundColor:  '#fff',
      padding: 5,
      flexDirection: 'row',
      borderColor: '#a26ea6',
      borderWidth: 0.5,
      marginBottom: 5,

    },
    text: {
      fontSize: '1.5rem',
    },
    startComponent: {
      textTransform: 'uppercase',
    },
    midComponent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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

      <View
        style={
          props.colored ? styles.SaldiriHeaderColored : styles.SaldiriHeader
        }>
        <View
          style={
            props.startComponent ? styles.startComponent : styles.displayNone
          }>
          {props.startComponent}
        </View>
        <View
          style={
            props.midComponent ? styles.midComponent : styles.displayNone
          }>
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
