import React from 'react';
import { View, Text, StatusBar, Image, Platform  } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
const SaldiriHeader = (props) => {
  // define extended styles
  const styles = EStyleSheet.create({
    SaldiriHeaderColored: {
      width: '100%',
      backgroundColor: '#934F97',
      padding: 5,
      flexDirection: 'row',
      // marginBottom: 5,
      paddingHorizontal: 10,
      maxHeight: Platform.OS === 'ios' ? 44 : 56,
    },
    SaldiriHeader: {
      width: '100%',
      backgroundColor: '#fff',
      padding: 5,
      flexDirection: 'row',
      borderColor: '#a26ea6',
      borderWidth: 0.5,
      // marginBottom: 5,
      paddingHorizontal: 10,
      maxHeight: Platform.OS === 'ios' ? 44 : 56,
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
      justifyContent: 'center',
      alignItems: 'center',
      // flex: 1,
    },
    displayNone: {
      display: 'none',
    },
    headerTitle: {
      fontSize: 20,
      textTransform: 'capitalize',
      // fontWeight: 'bold',
      marginVertical: 5,
      color: props.colored ? '#fff' : '#19161a',
    },
    headerLogo: {
      width: 150,
      height: 30,
      resizeMode: 'contain',
      marginVertical: 8,
    },
  });

  return (
    <>
      <View
        style={
          props.colored ? styles.SaldiriHeaderColored : styles.SaldiriHeader
        }>
        {/* start */}
        <View
          style={
            props.startComponent || props.startHeaderTitle
              ? styles.startComponent
              : styles.displayNone
          }>
          {props.startComponent}
          {props.startHeaderTitle ? (
            <Text style={styles.headerTitle}>{props.startHeaderTitle}</Text>
          ) : null}
        </View>
        {/* medium */}
        <View
          style={
            props.midComponent || props.midHeaderTitle || props.midLogo
              ? styles.midComponent
              : styles.displayNone
          }>
          {props.midHeaderTitle ? (
            <Text style={styles.headerTitle}>{props.midHeaderTitle}</Text>
          ) : null}
          {props.midLogo ? (
            <FastImage
              style={styles.headerLogo}
              source={require('../../assets/siraan_logo.png')}
              resizeMode={FastImage.resizeMode.contain}
              // source={{ uri: 'https://siraan.com/moblogo/moblogo.png' }}
            />
          ) : null}
          {props.midComponent}
        </View>
        {/* end */}
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
